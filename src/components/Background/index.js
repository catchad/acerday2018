import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./index.scss";
// import music from "./music.mp3";
import * as PIXI from "pixi.js";

class Background extends Component {
    constructor(props) {
        super(props);

        this.hData = [0.19, 0.43, 0.56, 0.65, 0.32, 0.47, 0.63, 0.78, 0.91, 1, 0.81, 0.67, 0.6, 0.5, 0.42, 0.33, 0.23, 0.37, 0.21, 0.11, 0.18, 0.28, 0.39, 0.47, 0.63, 0.76, 0.59, 0.51, 0.43, 0.33, 0.49, 0.56, 0.68, 0.84, 0.57, 0.49, 0.41, 0.28, 0.33, 0.44, 0.6, 0.71, 0.84, 0.72, 0.63, 0.44, 0.37, 0.58, 0.46, 0.36, 0.56, 0.7, 0.81, 0.88, 0.72, 0.6, 0.42, 0.51, 0.6, 0.36, 0.41, 0.31, 0.21, 0.39, 0.46, 0.33, 0.39, 0.25, 0.28, 0.15, 0.25, 0.51, 0.66, 0.39, 0.56, 0.3, 0.22, 0.57, 0.37, 0.63, 0.36, 0.72, 0.79, 0.94, 0.69, 0.51, 0.28, 0.47, 0.79, 0.47, 0.43, 0.31, 0.44, 0.69, 0.59, 0.39, 0.44, 0.28, 0.43, 0.32];
    }
    componentDidMount() {
        this.ww = this.refs.bg.clientWidth;
        this.wh = Math.min(700, this.refs.bg.clientHeight - 40);

        this.app = new PIXI.Application(this.ww, this.wh, { transparent: true, view: this.refs.pixiCanvas, preserveDrawingBuffer: false });
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        this._createBars();

        this.app.ticker.add(delta => {
            for (var i = 0; i < this.container.children.length; i++) {
                this.container.children[i].height = this.container.children[i].baseHeight - Math.abs(Math.sin(this.container.children[i].t)) * this.container.children[i].baseHeight * 0.5;
                this.container.children[i].t += Math.PI / 60 * delta;
            }
        });

        window.addEventListener("resize", this._resizeHandler);
    }

    componentWillUnmount() {
        this.app.stop();
        this.app.destroy();
        window.removeEventListener("resize", this._resizeHandler);
    }
    _createBars() {
        for (var i = 0, l = this.container.children.length; i < l; i++) {
            this.container.removeChildAt(0);
        }
        var j = 0;
        for (var i = 0; i < this.ww / (10 + 8); i++) {
            this.bar = new PIXI.Graphics();
            this.bar.beginFill(0xffffff);
            this.bar.drawRect(-5, -this.wh / 2, 10, this.wh);
            this.bar.endFill();
            this.bar.alpha = 0.2;
            this.bar.x = i * (10 + 8) + 5;
            this.bar.y = this.wh / 2;
            this.bar.t = Math.random() * Math.PI;
            this.bar.height = this.hData[j] * this.wh;
            this.bar.baseHeight = this.hData[j] * this.wh;
            j++;
            if (j >= this.hData.length) j = 0;
            this.container.addChild(this.bar);
        }
    }
    _resizeHandler = () => {
        this.ww = this.refs.bg.clientWidth;
        this.wh = Math.min(700, this.refs.bg.clientHeight - 40);
        this.app.renderer.resize(this.ww, this.wh);
        this._createBars();
    };

    render() {
        return createPortal(
            <div ref="bg" className="background" style={{ background: `linear-gradient(225deg, ${this.props.color1}, ${this.props.color2})` }}>
                <canvas ref="pixiCanvas" className="background__wave" />
            </div>,
            document.getElementById("portal")
        );
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
