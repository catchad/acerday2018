import React, { Component } from "react";
import "./index.scss";

class ColorRect extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // if (this.props.animate) {
        //     TweenMax.from(this.refs.rect, 0.5, { x: `+=${this.props.animate.x}`, y: `+=${this.props.animate.y}`, delay: this.props.animate.delay });
        // }
    }

    render() {
        return (
            <div className="colorRect" style={{ transform: `translate(${this.props.x}%, ${this.props.y}%)`, width: `${this.props.width}%` }}>
                <div className="colorRect__ratioHolder" style={{ paddingTop: `${this.props.ratio * 100}%` }} />
                <div ref="rect" className="colorRect__color" style={{ backgroundColor: `${this.props.bgColor}` }} />
            </div>
        );
    }
}

export default ColorRect;
