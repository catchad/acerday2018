import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
// import classNames from "classnames";
import "./index.scss";
// import music from "./music.mp3";
// import * as PIXI from "pixi.js";

class Background extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createPortal(<div ref="bg" className="background" style={this.props.transparent ? { zIndex: this.props.zIndex } : { background: `linear-gradient(225deg, ${this.props.color1}, ${this.props.color2})`, zIndex: this.props.zIndex }} />, document.getElementById("portal"));
    }
}

Background.propTypes = {
    color1: PropTypes.string,
    color2: PropTypes.string
};

Background.defaultProps = {
    color1: "#00fbe8",
    color2: "#016ecd"
};

export default Background;
