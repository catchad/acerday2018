import React, { Component, Fragment } from "react";
import Background from "../Background";
import SquareBtnGroup from "../SquareBtnGroup";
import RoundBtn from "../RoundBtn";
import ColorRect from "../ColorRect";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Link } from "react-router-dom";
import ReactTransitionGroup from "react-addons-transition-group";
import { TweenMax } from "gsap";
import laptop from "./laptop.png";
import "./index.scss";

import nitro5Photo from "./nitro5_photo.png";
import nitro5Rect1 from "./nitro5_rect1.png";
import nitro5Rect2 from "./nitro5_rect2.png";
import nitro5Rect3 from "./nitro5_rect3.png";
import spin5Photo from "./spin5_photo.png";
import spin5Rect1 from "./spin5_rect1.png";
import spin5Rect2 from "./spin5_rect2.png";
import spin5Rect3 from "./spin5_rect3.png";
import helios300Photo from "./helios300_photo.png";
import helios300Rect1 from "./helios300_rect1.png";
import helios300Rect2 from "./helios300_rect2.png";
import helios300Rect3 from "./helios300_rect3.png";
import switch7Photo from "./switch7_photo.png";
import switch7Rect1 from "./switch7_rect1.png";
import switch7Rect2 from "./switch7_rect2.png";
import swift5Photo from "./swift5_photo.png";
import swift5Rect1 from "./swift5_rect1.png";
import swift5Rect2 from "./swift5_rect2.png";
import swift5Rect3 from "./swift5_rect3.png";
class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var c1;
        var c2;
        switch (this.props.match.params.pname) {
            case "nitro5":
                c1 = "#8FBA28";
                c2 = "#A4CA48";
                break;
            case "spin5":
                c1 = "#DC2080";
                c2 = "#FD4FA8";
                break;
            case "helios300":
                c1 = "#18A3CA";
                c2 = "#1CCDFF";
                break;
            case "switch7":
                c1 = "#F32132";
                c2 = "#FF5360";
                break;
            case "swift5":
                c1 = "#FCCC31";
                c2 = "#FADE37";
                break;
        }

        return (
            <div className="page page--marginLeft50">
                {this.props.match.params.pname == "nitro5" ? <Nitro5 intl={this.props.intlContext} /> : ""}

                {this.props.match.params.pname == "spin5" ? <Spin5 intl={this.props.intlContext} /> : ""}

                {this.props.match.params.pname == "helios300" ? <Helios300 intl={this.props.intlContext} /> : ""}

                {this.props.match.params.pname == "switch7" ? <Switch7 intl={this.props.intlContext} /> : ""}

                {this.props.match.params.pname == "swift5" ? <Swift5 intl={this.props.intlContext} /> : ""}

                <Background color1={c1} color2={c2} />
            </div>
        );
    }
}

class Nitro5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    componentWillEnter(callback) {}

    componentWillLeave(callback) {}

    _loadComplete = () => {
        setTimeout(() => {
            this.setState({ ready: true });
            TweenMax.fromTo(this.refs.r1, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section nitro5">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Nitro 5</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.nitro5.desc" />
                    </p>
                </div>
                {/* {this.state.ready ? "" : ""} */}
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <div className="laptop__rectContainer laptop__rectContainer--1">
                        <img ref="r1" className="laptop__rect" src={nitro5Rect1} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--2">
                        <img ref="r2" className="laptop__rect" src={nitro5Rect2} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--3">
                        <img ref="r3" className="laptop__rect" src={nitro5Rect3} />
                    </div>
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={nitro5Photo} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--m">
                        <FormattedHTMLMessage id="intl.product.nitro5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L" href={this.props.intl.formatMessage({ id: "intl.product.nitro5.link" })} target="_blank">
                        <FormattedMessage id="intl.product.more" />
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

class Spin5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}
    _loadComplete = () => {
        setTimeout(() => {
            this.setState({ ready: true });
            TweenMax.fromTo(this.refs.r1, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section spin5">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Spin 5</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.spin5.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <div className="laptop__rectContainer laptop__rectContainer--1">
                        <img ref="r1" className="laptop__rect" src={spin5Rect1} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--2">
                        <img ref="r2" className="laptop__rect" src={spin5Rect2} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--3">
                        <img ref="r3" className="laptop__rect" src={spin5Rect3} />
                    </div>
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={spin5Photo} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--m">
                        <FormattedHTMLMessage id="intl.product.spin5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L" href={this.props.intl.formatMessage({ id: "intl.product.spin5.link" })} target="_blank">
                        <FormattedMessage id="intl.product.more" />
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

class Helios300 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}
    _loadComplete = () => {
        setTimeout(() => {
            this.setState({ ready: true });
            TweenMax.fromTo(this.refs.r1, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section helios300">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Helios 300</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.helios300.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <div className="laptop__rectContainer laptop__rectContainer--1">
                        <img ref="r1" className="laptop__rect" src={helios300Rect1} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--2">
                        <img ref="r2" className="laptop__rect" src={helios300Rect2} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--3">
                        <img ref="r3" className="laptop__rect" src={helios300Rect3} />
                    </div>
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={helios300Photo} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--m">
                        <FormattedHTMLMessage id="intl.product.helios300.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L" href={this.props.intl.formatMessage({ id: "intl.product.helios300.link" })} target="_blank">
                        <FormattedMessage id="intl.product.more" />
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

class Switch7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}
    _loadComplete = () => {
        setTimeout(() => {
            this.setState({ ready: true });
            TweenMax.fromTo(this.refs.r1, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section switch7">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Switch 7 Black Edition</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.swtich7.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <div className="laptop__rectContainer laptop__rectContainer--1">
                        <img ref="r1" className="laptop__rect" src={switch7Rect1} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--2">
                        <img ref="r2" className="laptop__rect" src={switch7Rect2} />
                    </div>
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={switch7Photo} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--m">
                        <FormattedHTMLMessage id="intl.product.swtich7.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L" href={this.props.intl.formatMessage({ id: "intl.product.swtich7.link" })} target="_blank">
                        <FormattedMessage id="intl.product.more" />
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

class Swift5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}
    _loadComplete = () => {
        setTimeout(() => {
            this.setState({ ready: true });
            TweenMax.fromTo(this.refs.r1, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section swift5">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Swift 5</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.swift5.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <div className="laptop__rectContainer laptop__rectContainer--1">
                        <img ref="r1" className="laptop__rect" src={swift5Rect1} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--2">
                        <img ref="r2" className="laptop__rect" src={swift5Rect2} />
                    </div>
                    <div className="laptop__rectContainer laptop__rectContainer--3">
                        <img ref="r3" className="laptop__rect" src={swift5Rect3} />
                    </div>
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={swift5Photo} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--m">
                        <FormattedHTMLMessage id="intl.product.swift5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L" href={this.props.intl.formatMessage({ id: "intl.product.swift5.link" })} target="_blank">
                        <FormattedMessage id="intl.product.more" />
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

export default Product;
