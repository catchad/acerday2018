import React, { Component, Fragment } from "react";
import "./index.scss";
import assets from "./assets";
import shadow from "./shadow.png";
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
            assetWidth: 330,
            currentHairID: 0,
            currentEyeID: 0,
            currentMouthID: 0
        };
    }

    componentDidMount() {
        this._resizeHandler();
        TweenMax.set(this.refs.hair, { x: -this.state.currentHairID * this.state.assetWidth });
        TweenMax.set(this.refs.eye, { x: -this.state.currentEyeID * this.state.assetWidth });
        TweenMax.set(this.refs.mouth, { x: -this.state.currentMouthID * this.state.assetWidth });

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

        window.addEventListener("resize", this._resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._resizeHandler);
    }

    _prev = () => {
        this._move(-1);
    };
    _next = () => {
        this._move(1);
    };

    _random = () => {
        this.setState({
            currentHairID: Math.floor(Math.random() * (assets[this.props.gender].hair.length - 1)),
            currentEyeID: Math.floor(Math.random() * (assets[this.props.gender].eye.length - 1)),
            currentMouthID: Math.floor(Math.random() * (assets[this.props.gender].mouth.length - 1))
        });
    };
    _move = value => {
        switch (this.props.target) {
            case "hair":
                this.setState({
                    currentHairID: Math.min(Math.max(this.state.currentHairID + value, 0), assets[this.props.gender].hair.length - 1)
                });
                break;
            case "eye":
                this.setState({
                    currentEyeID: Math.min(Math.max(this.state.currentEyeID + value, 0), assets[this.props.gender].eye.length - 1)
                });
                break;
            case "mouth":
                this.setState({
                    currentMouthID: Math.min(Math.max(this.state.currentMouthID + value, 0), assets[this.props.gender].mouth.length - 1)
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
    _resizeHandler = () => {
        this.setState({
            ww: document.body.clientWidth,
            assetWidth: document.body.clientWidth >= 1024 ? 330 : 210
        });
    };

    updateTargetZone() {
        switch (this.props.target) {
            case "hair":
                TweenMax.to(this.refs.targetZone, 0.5, { top: "0%", height: "69%" });
                TweenMax.to([this.refs.arrowLeft, this.refs.arrowRight], 0.5, { top: `${34 / 2}%` });
                break;
            case "eye":
                TweenMax.to(this.refs.targetZone, 0.5, { top: "38%", height: "38%" });
                TweenMax.to([this.refs.arrowLeft, this.refs.arrowRight], 0.5, { top: `${32 + 22 / 2}%` });
                break;
            case "mouth":
                TweenMax.to(this.refs.targetZone, 0.5, { top: "52%", height: "48%" });
                TweenMax.to([this.refs.arrowLeft, this.refs.arrowRight], 0.5, { top: `${52 + 48 / 2}%` });
                break;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.gender == this.props.gender) {
            if (prevState.currentHairID !== this.state.currentHairID) {
                TweenMax.to(this.refs.hair, 0.5, { x: -this.state.currentHairID * this.state.assetWidth });
            }
            if (prevState.currentEyeID !== this.state.currentEyeID) {
                TweenMax.to(this.refs.eye, 0.5, { x: -this.state.currentEyeID * this.state.assetWidth });
            }
            if (prevState.currentMouthID !== this.state.currentMouthID) {
                TweenMax.to(this.refs.mouth, 0.5, { x: -this.state.currentMouthID * this.state.assetWidth });
            }
            TweenMax.to(this.refs.hair.childNodes, 0.5, { opacity: this.props.target == "hair" ? 0.4 : 0 });
            TweenMax.to(this.refs.hair.childNodes[this.state.currentHairID], 0.5, { opacity: 1 });
            TweenMax.to(this.refs.eye.childNodes, 0.5, { opacity: this.props.target == "eye" ? 0.4 : 0 });
            TweenMax.to(this.refs.eye.childNodes[this.state.currentEyeID], 0.5, { opacity: 1 });
            TweenMax.to(this.refs.mouth.childNodes, 0.5, { opacity: this.props.target == "mouth" ? 0.4 : 0 });
            TweenMax.to(this.refs.mouth.childNodes[this.state.currentMouthID], 0.5, { opacity: 1 });
            this.updateTargetZone();
        } else {
            this.setState({
                currentHairID: 0,
                currentEyeID: 0,
                currentMouthID: 0
            });
            TweenMax.set(this.refs.hair, { x: 0 });
            TweenMax.set(this.refs.hair.childNodes, { opacity: this.props.target == "hair" ? 0.4 : 0 });
            TweenMax.set(this.refs.hair.childNodes[0], { opacity: 1 });
            TweenMax.set(this.refs.eye, { x: 0 });
            TweenMax.set(this.refs.eye.childNodes, { opacity: this.props.target == "eye" ? 0.4 : 0 });
            TweenMax.set(this.refs.eye.childNodes[0], { opacity: 1 });
            TweenMax.set(this.refs.mouth, { x: 0 });
            TweenMax.set(this.refs.mouth.childNodes, { opacity: this.props.target == "mouth" ? 0.4 : 0 });
            TweenMax.set(this.refs.mouth.childNodes[0], { opacity: 1 });
        }
        // TweenMax.to(this.refs.hair, 0.5, { x: -this.state.currentHairID * this.state.assetWidth });
        // TweenMax.to(this.refs.eye, 0.5, { x: -this.state.currentEyeID * this.state.assetWidth });
        // TweenMax.to(this.refs.mouth, 0.5, { x: -this.state.currentMouthID * this.state.assetWidth });

        // TweenMax.to(this.refs.hair.childNodes, 0.5, { opacity: this.props.target == "hair" ? 0.4 : 0 });
        // TweenMax.to(this.refs.eye.childNodes, 0.5, { opacity: this.props.target == "eye" ? 0.4 : 0 });
        // TweenMax.to(this.refs.mouth.childNodes, 0.5, { opacity: this.props.target == "mouth" ? 0.4 : 0 });

        // TweenMax.to(this.refs.hair.childNodes[this.state.currentHairID], 0.5, { opacity: 1 });
        // TweenMax.to(this.refs.eye.childNodes[this.state.currentEyeID], 0.5, { opacity: 1 });
        // TweenMax.to(this.refs.mouth.childNodes[this.state.currentMouthID], 0.5, { opacity: 1 });

        // this.updateTargetZone();
    }
    render() {
        // this.currentHairX = this.state.currentHairID * 330;

        return (
            <div className="avatar">
                <div ref="targetZone" className="avatar__targetZone" />
                <img className="avatar__shadow" src={shadow} />
                <div ref="hair" className="avatar__part avatar__part--hair">
                    {assets[this.props.gender].hair.map((el, id) => {
                        return <img key={id} className="avatar__item" src={el} />;
                    })}
                </div>
                <div ref="eye" className="avatar__part avatar__part--eye">
                    {assets[this.props.gender].eye.map((el, id) => {
                        return <img key={id} className="avatar__item" src={el} />;
                    })}
                    {/* <img className="avatar__item" src={assets[this.props.gender].eye[0]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[1]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[2]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[3]} />
                    <img className="avatar__item" src={assets[this.props.gender].eye[4]} /> */}
                </div>
                <div ref="mouth" className="avatar__part avatar__part--mouth">
                    {assets[this.props.gender].mouth.map((el, id) => {
                        return <img key={id} className="avatar__item" src={el} />;
                    })}
                    {/* <img className="avatar__item" src={assets[this.props.gender].mouth[0]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[1]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[2]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[3]} />
                    <img className="avatar__item" src={assets[this.props.gender].mouth[4]} /> */}
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
