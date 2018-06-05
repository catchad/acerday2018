import React, { Component } from "react";
import classNames from "classnames";
import "./index.scss";

class CircleBtn extends Component {
    constructor(props) {
        super(props);
        this.classnames = classNames("circleBtn", this.props.className, { "circleBtn--secondary": this.props.secondary }, { "circleBtn--s": this.props.size == "s" });
    }

    render() {
        return (
            <a className={this.classnames} onClick={this.props.onClick}>
                <img className="circleBtn__icon" src={this.props.icon} />
            </a>
        );
    }
}

CircleBtn.defaultProps = {
    className: ""
};

export default CircleBtn;
