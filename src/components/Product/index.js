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

class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var c1;
        var c2;
        switch (this.props.match.params.pname) {
            case "nitro5":
                c1 = "#B8EF22";
                c2 = "#7F9D2B";
                break;
            case "spin5":
                c1 = "#FF3AC5";
                c2 = "#FD026B";
                break;
            case "helios300":
                c1 = "#00fbe8";
                c2 = "#016ecd";
                break;
            case "switch7":
                c1 = "#ff0f44";
                c2 = "#fe0000";
                break;
            case "swift5":
                c1 = "#FFC500";
                c2 = "#FFA600";
                break;
        }

        return (
            <div className="page page--marginLeft50">
                {this.props.match.params.pname == "nitro5" ? <Nitro5 /> : ""}

                {this.props.match.params.pname == "spin5" ? <Spin5 /> : ""}

                {this.props.match.params.pname == "helios300" ? <Helios300 /> : ""}

                {this.props.match.params.pname == "switch7" ? <Switch7 /> : ""}

                {this.props.match.params.pname == "swift5" ? <Swift5 /> : ""}

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
            TweenMax.fromTo(this.refs.r1.refs.rect, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2.refs.rect, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3.refs.rect, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Nitro 5</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.nitro5.desc" />
                    </p>
                </div>
                {/* {this.state.ready ? "" : ""} */}
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <ColorRect ref="r1" x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" />
                    <ColorRect ref="r2" x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" />
                    <ColorRect ref="r3" x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" />
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={laptop} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text">
                        <FormattedHTMLMessage id="intl.product.nitro5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text">
                        <FormattedHTMLMessage id="intl.product.nitro5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L">
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
            TweenMax.fromTo(this.refs.r1.refs.rect, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2.refs.rect, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3.refs.rect, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Spin 5</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.spin5.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <ColorRect ref="r1" x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" />
                    <ColorRect ref="r2" x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" />
                    <ColorRect ref="r3" x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" />
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={laptop} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text">
                        <FormattedHTMLMessage id="intl.product.spin5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L">
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
            TweenMax.fromTo(this.refs.r1.refs.rect, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2.refs.rect, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3.refs.rect, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Helios 300</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.helios300.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <ColorRect ref="r1" x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" />
                    <ColorRect ref="r2" x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" />
                    <ColorRect ref="r3" x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" />
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={laptop} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text">
                        <FormattedHTMLMessage id="intl.product.helios300.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L">
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
            TweenMax.fromTo(this.refs.r1.refs.rect, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2.refs.rect, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3.refs.rect, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Switch 7 Black Edition</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.swtich7.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <ColorRect ref="r1" x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" />
                    <ColorRect ref="r2" x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" />
                    <ColorRect ref="r3" x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" />
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={laptop} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text">
                        <FormattedHTMLMessage id="intl.product.swtich7.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L">
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
            TweenMax.fromTo(this.refs.r1.refs.rect, 1.5, { x: 200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r2.refs.rect, 1.5, { y: 300, opacity: 0 }, { y: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.r3.refs.rect, 1.5, { x: -200, opacity: 0 }, { x: 0, opacity: 1, ease: Power4.easeOut });
            TweenMax.fromTo(this.refs.laptop, 1.5, { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(0.5, 0.3), delay: 0.5 });
        }, 100);
    };
    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Swift 5</p>
                    <p className="page__description page__description--alignLeft">
                        <FormattedHTMLMessage id="intl.product.swift5.desc" />
                    </p>
                </div>
                <div className="laptop" style={this.state.ready ? { opacity: "1" } : { opacity: "0" }}>
                    <ColorRect ref="r1" x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" />
                    <ColorRect ref="r2" x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" />
                    <ColorRect ref="r3" x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" />
                    <div className="laptop__photoContainer">
                        <img ref="laptop" onLoad={this._loadComplete} className="laptop__photo" src={laptop} />
                    </div>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text">
                        <FormattedHTMLMessage id="intl.product.swift5.content" />
                    </p>
                </div>
                <div className="page__row page__row--w800">
                    <p className="page__text page__text--s">
                        <FormattedMessage id="intl.product.safetext" />
                    </p>
                </div>
                <div className="page__row page__row--w800 page__row--center">
                    <RoundBtn size="L">
                        <FormattedMessage id="intl.product.more" />
                    </RoundBtn>
                </div>
            </div>
        );
    }
}

export default Product;
