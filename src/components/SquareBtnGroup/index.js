import React, { Component } from "react";
import "./index.scss";

class SquareBtnGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue ? this.props.defaultValue : null
        };
    }

    _clickHandler = (e, value) => {
        this.setState(
            {
                value
            },
            () => {
                if (this.props.onChange) this.props.onChange(value);
            }
        );
    };

    _getValue = () => {
        return this.state.value;
    };

    render() {
        return (
            <div className="squareBtnGroup">
                {this.props.data.map((el, id) => {
                    return (
                        <a
                            key={id}
                            className={`squareBtn ${this.state.value == el.value ? "squareBtn--active" : ""}`}
                            onClick={e => {
                                this._clickHandler(e, el.value);
                            }}
                        >
                            <div className="squareBtn__wrapper">
                                {el.icon ? <img className="squareBtn__icon" src={el.icon} /> : ""}
                                <p className="squareBtn__text">{el.text}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    }
}

export default SquareBtnGroup;
