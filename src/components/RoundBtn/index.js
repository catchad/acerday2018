import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./index.scss";

class RoundBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ww: window.innerWidth
        };

        window.addEventListener("resize", this._resizeHandler);
        this.classnames = classNames("gradientBtn", this.props.className, { "gradientBtn--secondary": this.props.secondary }, { "gradientBtn--noMargin": this.props.noMargin }, { "gradientBtn--fixedSizeS": this.props.fixedSize == "S" }, { "gradientBtn--fixedSizeM": this.props.fixedSize == "M" }, { "gradientBtn--fixedSizeL": this.props.fixedSize == "L" }, { "gradientBtn--disabled": this.props.disabled }, { "gradientBtn--zIndexUp": this.props.zIndexUp }, { "gradientBtn--sizeS": this.props.size == "S" }, { "gradientBtn--sizeM": this.props.size == "M" }, { "gradientBtn--sizeL": this.props.size == "L" });
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._resizeHandler);
    }
    _resizeHandler = () => {
        this.setState({
            ww: window.innerWidth
        });
    };
    render() {
        return this.props.routerLink ? (
            <Link ref="btn" id={this.props.id} to={this.props.routerLink} className={this.classnames} onClick={this.props.disabled ? null : this.props.onClick} style={this.props.disabled || this.props.secondary ? null : { background: `linear-gradient(45deg, ${this.props.color2}, ${this.props.color1})` }}>
                {this.props.children}
            </Link>
        ) : (
            <a ref="btn" id={this.props.id} className={this.classnames} href={this.props.disabled ? null : this.props.href} target={this.props.target} onClick={this.props.disabled ? null : this.props.onClick} style={this.props.disabled || this.props.secondary ? null : { background: `linear-gradient(45deg, ${this.props.color2}, ${this.props.color1})` }}>
                {this.props.children}
            </a>
        );
    }
}

RoundBtn.propTypes = {
    color1: PropTypes.string,
    color2: PropTypes.string
    // target: PropTypes.string
};

RoundBtn.defaultProps = {
    color1: "#fe6231",
    color2: "#ff0e41"
    // target: "_self"
};

export default RoundBtn;
