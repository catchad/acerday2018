import React, { Component } from "react";
import { createPortal } from "react-dom";
import { FormattedMessage } from "react-intl";
import "./index.scss";
import { TweenMax } from "gsap";

class SelectingBox extends Component {
    constructor(props) {
        super(props);
    }
    componentWillEnter(callback) {
        TweenMax.fromTo(this.refs.box, 0.25, { opacity: 0 }, { opacity: 1, onComplete: callback });
        TweenMax.staggerFromTo(this.refs.box.children[0].children, 0.3, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: Back.easeOut }, 0.1);
    }

    componentWillLeave(callback) {
        TweenMax.fromTo(this.refs.box, 0.25, { opacity: 1 }, { opacity: 0, onComplete: callback });
    }

    render() {
        return createPortal(
            <div ref="box" className="selectingBox">
                <div className="selectingBox__grid">
                    {this.props.options.map((el, id) => {
                        return (
                            <div key={id} className="selectingBox__option">
                                <a className="squareBtn" onClick={e => this.props._closeLightbox(e, el)}>
                                    <div className="squareBtn__wrapper">
                                        <img className="squareBtn__icon" src={el.icon} />
                                        <p className="squareBtn__text">{el.name}</p>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                    <div className="selectingBox__option">
                        <a className="squareBtn" onClick={e => this.props._closeLightbox(e, { name: "", value: "" })}>
                            <div className="squareBtn__wrapper">
                                <p className="squareBtn__text">
                                    <FormattedMessage id="intl.select.cancel" />
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>,
            window.document.getElementById("portal")
        );
    }
}

export default SelectingBox;
