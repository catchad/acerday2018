import React, { Component } from "react";
import SelectingBox from "../SelectingBox";
import { connect } from "react-redux";
import { setScrollbar } from "../../action";
import "./index.scss";
import arrowDown from "./arrowDown.svg";

import ReactTransitionGroup from "react-addons-transition-group";
import { FormattedMessage } from "react-intl";
import { IntlContextConsumer } from "../../IntlContext";

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selecting: false,
            selected: {
                name: "",
                icon: "",
                value: ""
            }
        };
        this._openLightbox = this._openLightbox.bind(this);
        this._closeLightbox = this._closeLightbox.bind(this);
        this._getValue = this._getValue.bind(this);
        console.log(this.props);
    }
    _openLightbox() {
        // this.props.setScrollbar(false);
        this.setState({
            selecting: true
        });
        document.body.classList.add("body--hideScrollbar");
    }
    _closeLightbox(event, selected) {
        // console.log(selected);
        // this.props.setScrollbar(true);
        this.setState({
            selecting: false,
            selected: selected
        });
        document.body.classList.remove("body--hideScrollbar");
        if (this.props.onChange) this.props.onChange(selected.value);
    }
    _getValue() {
        return this.state.selected.value;
    }
    render() {
        return (
            <div className={`select ${this.props.className}`}>
                <div className="select__selector" onClick={this._openLightbox}>
                    {this.state.selected.icon ? <img className="select__icon" src={this.state.selected.icon} /> : ""}
                    <IntlContextConsumer>
                        {context => {
                            return <p className="select__name">{this.state.selected.name ? this.state.selected.name : this.props.defaultName}</p>;
                        }}
                    </IntlContextConsumer>

                    <img className="select__arrow" src={arrowDown} />
                </div>
                <ReactTransitionGroup component="div">{this.state.selecting ? <SelectingBox options={this.props.options} _closeLightbox={this._closeLightbox} /> : ""}</ReactTransitionGroup>
            </div>
        );
    }
}

export default Select;
