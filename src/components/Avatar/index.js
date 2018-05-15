import React, { Component, Fragment } from "react";
import "./index.scss";
import assets from "./assets";
// import arrow from "./arrow.svg";
import { TweenMax } from "gsap";
import ColorPropsPlugin from "gsap/ColorPropsPlugin";

// import * as PIXI from "pixi.js";

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ww: document.body.clientWidth,
            // target: "hair",
            currentHairID: 0,
            currentEyeID: 0,
            currentMouthID: 0
        };
    }

    componentDidMount() {
        TweenMax.set(this.refs.hair, { x: -this.state.currentHairID * 330 });
        TweenMax.set(this.refs.eye, { x: -this.state.currentEyeID * 330 });
        TweenMax.set(this.refs.mouth, { x: -this.state.currentMouthID * 330 });

        TweenMax.set(this.refs.hair.childNodes, { opacity: this.props.target == "hair" ? 0.4 : 0 });
        TweenMax.set(this.refs.eye.childNodes, { opacity: this.props.target == "eye" ? 0.4 : 0 });
        TweenMax.set(this.refs.mouth.childNodes, { opacity: this.props.target == "mouth" ? 0.4 : 0 });

        TweenMax.set(this.refs.hair.childNodes[this.state.currentHairID], { opacity: 1 });
        TweenMax.set(this.refs.eye.childNodes[this.state.currentEyeID], { opacity: 1 });
        TweenMax.set(this.refs.mouth.childNodes[this.state.currentMouthID], { opacity: 1 });

        switch (this.props.target) {
            case "hair":
                TweenMax.set(this.refs.targetZone, { top: "0%", height: "34%" });
                TweenMax.set([this.refs.arrowLeft, this.refs.arrowRight], { top: `${34 / 2}%` });
                break;
            case "eye":
                TweenMax.set(this.refs.targetZone, { top: "32%", height: "22%" });
                TweenMax.set([this.refs.arrowLeft, this.refs.arrowRight], { top: `${32 + 22 / 2}%` });
                break;
            case "mouth":
                TweenMax.set(this.refs.targetZone, { top: "52%", height: "48%" });
                TweenMax.set([this.refs.arrowLeft, this.refs.arrowRight], { top: `${52 + 48 / 2}%` });
                break;
        }
    }

    componentWillUnmount() {}

    _prev = () => {
        this._move(-1);
    };
    _next = () => {
        this._move(1);
    };

    _random = () => {
        this.setState({
            currentHairID: Math.floor(Math.random() * (assets.male.hair.length - 1)),
            currentEyeID: Math.floor(Math.random() * (assets.male.eye.length - 1)),
            currentMouthID: Math.floor(Math.random() * (assets.male.mouth.length - 1))
        });
    };
    _move = value => {
        switch (this.props.target) {
            case "hair":
                this.setState({
                    currentHairID: Math.min(Math.max(this.state.currentHairID + value, 0), assets.male.hair.length - 1)
                });
                break;
            case "eye":
                this.setState({
                    currentEyeID: Math.min(Math.max(this.state.currentEyeID + value, 0), assets.male.eye.length - 1)
                });
                break;
            case "mouth":
                this.setState({
                    currentMouthID: Math.min(Math.max(this.state.currentMouthID + value, 0), assets.male.mouth.length - 1)
                });
                break;
        }
    };
    _getResult = callback => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 300;
        canvas.height = 450;
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();

        var p1 = new Promise(function(resolve, reject) {
            img1.onload = resolve;
        });
        var p2 = new Promise(function(resolve, reject) {
            img2.onload = resolve;
        });
        var p3 = new Promise(function(resolve, reject) {
            img3.onload = resolve;
        });

        Promise.all([p1, p2, p3]).then(() => {
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, 0, 0);
            ctx.drawImage(img3, 0, 0);
            callback(canvas.toDataURL());
        });

        img1.src = assets[this.props.gender].hair[this.state.currentHairID];
        img2.src = assets[this.props.gender].eye[this.state.currentEyeID];
        img3.src = assets[this.props.gender].mouth[this.state.currentMouthID];
    };
    _resizeHandler = () => {};

    updateTargetZone() {
        switch (this.props.target) {
            case "hair":
                TweenMax.to(this.refs.targetZone, 0.5, { top: "0%", height: "34%" });
                TweenMax.to([this.refs.arrowLeft, this.refs.arrowRight], 0.5, { top: `${34 / 2}%` });
                break;
            case "eye":
                TweenMax.to(this.refs.targetZone, 0.5, { top: "32%", height: "22%" });
                TweenMax.to([this.refs.arrowLeft, this.refs.arrowRight], 0.5, { top: `${32 + 22 / 2}%` });
                break;
            case "mouth":
                TweenMax.to(this.refs.targetZone, 0.5, { top: "52%", height: "48%" });
                TweenMax.to([this.refs.arrowLeft, this.refs.arrowRight], 0.5, { top: `${52 + 48 / 2}%` });
                break;
        }
    }
    componentDidUpdate() {
        TweenMax.to(this.refs.hair, 0.5, { x: -this.state.currentHairID * 330 });
        TweenMax.to(this.refs.eye, 0.5, { x: -this.state.currentEyeID * 330 });
        TweenMax.to(this.refs.mouth, 0.5, { x: -this.state.currentMouthID * 330 });

        TweenMax.to(this.refs.hair.childNodes, 0.5, { opacity: this.props.target == "hair" ? 0.4 : 0 });
        TweenMax.to(this.refs.eye.childNodes, 0.5, { opacity: this.props.target == "eye" ? 0.4 : 0 });
        TweenMax.to(this.refs.mouth.childNodes, 0.5, { opacity: this.props.target == "mouth" ? 0.4 : 0 });

        TweenMax.to(this.refs.hair.childNodes[this.state.currentHairID], 0.5, { opacity: 1 });
        TweenMax.to(this.refs.eye.childNodes[this.state.currentEyeID], 0.5, { opacity: 1 });
        TweenMax.to(this.refs.mouth.childNodes[this.state.currentMouthID], 0.5, { opacity: 1 });

        this.updateTargetZone();
    }
    render() {
        // this.currentHairX = this.state.currentHairID * 330;

        return (
            <div className="avatar">
                <div ref="targetZone" className="avatar__targetZone" />
                <div ref="hair" className="avatar__part avatar__part--hair">
                    <img className="avatar__item" src={assets[this.props.gender].hair[0]} />
                    <img className="avatar__item" src={assets[this.props.gender].hair[1]} />
                    <img className="avatar__item" src={assets[this.props.gender].hair[2]} />
                    <img className="avatar__item" src={assets[this.props.gender].hair[3]} />
                    <img className="avatar__item" src={assets[this.props.gender].hair[4]} />
                </div>
                <div ref="eye" className="avatar__part avatar__part--eye">
                    <img className="avatar__item" src={assets[this.props.gender].eye[0]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[1]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[2]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[3]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[4]} />
                </div>
                <div ref="mouth" className="avatar__part avatar__part--mouth">
                    <img className="avatar__item" src={assets[this.props.gender].mouth[0]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[1]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[2]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[3]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[4]} />
                </div>
                <div className="avatar__arrowGroup">
                    <img ref="arrowLeft" className="avatar__arrow avatar__arrow--left" src={assets.arrow} onClick={this._prev} />
                    <img ref="arrowRight" className="avatar__arrow avatar__arrow--right" src={assets.arrow} onClick={this._next} />
                </div>
            </div>
        );
    }
}

export default Avatar;
