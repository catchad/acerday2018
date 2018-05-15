import React, { Component, Fragment } from "react";
import Background from "../Background";
import SquareBtnGroup from "../SquareBtnGroup";
import RoundBtn from "../RoundBtn";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Link } from "react-router-dom";
import { AppContextConsumer } from "../../AppContext";
import { IntlContextConsumer } from "../../IntlContext";
import ReactTransitionGroup from "react-addons-transition-group";
import { TweenMax } from "gsap";
import laptop from "./laptop.png";
import "./index.scss";

class Product extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
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
                <div className="page__row page__row--widthM">{/* <SquareBtnGroup data={[{ text: "Nitro 5", value: "nitro5" }, { text: "Spin 5", value: "spin5" }, { text: "Helios 300", value: "helios300" }, { text: "Switch 7", value: "swtich7" }, { text: "Swift 5", value: "swift5" }]} /> */}</div>
                {/* <AppContextConsumer>
                    {context => {
                        return (
                            <IntlContextConsumer>
                                {intlContext => {
                                    return (
                                        <div className="page__row page__row--widthM page__row--center">
                                            {intlContext.intl.messages.config.products.map((el, id) => {
                                                return (
                                                    <Link key={id} className="nav__link" to={`/${context.currentCountry}/product/${el}`}>
                                                        {el}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    );
                                }}
                            </IntlContextConsumer>
                        );
                    }}
                </AppContextConsumer> */}

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

class Rect extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.animate) {
            TweenMax.from(this.refs.rect, 0.5, { x: `+=${this.props.animate.x}`, y: `+=${this.props.animate.y}`, delay: this.props.animate.delay });
        }
    }

    render() {
        return (
            <div className="rect" style={{ transform: `translate(${this.props.x}%, ${this.props.y}%)`, width: `${this.props.width}%` }}>
                <div className="rect__ratioHolder" style={{ paddingTop: `${this.props.ratio * 100}%` }} />
                <div ref="rect" className="rect__color" style={{ "background-color": `${this.props.bgColor}` }} />
            </div>
        );
    }
}

class Nitro5 extends Component {
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}

    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Nitro 5</p>
                    <p className="page__description page__description--alignLeft">改變遊戲規則的曠世巨作</p>
                </div>
                <div className="laptop">
                    <Rect x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" animate={{ x: 200, y: 0, delay: 0 }} />
                    <Rect x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" animate={{ x: 0, y: 200, delay: 0 }} />
                    <Rect x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" animate={{ x: -200, y: 0, delay: 0 }} />
                    <img className="laptop__photo" src={laptop} />
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
                    <RoundBtn size="L">了解更多</RoundBtn>
                </div>
            </div>
        );
    }
}

class Spin5 extends Component {
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}

    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Spin 5</p>
                    <p className="page__description page__description--alignLeft">輕鬆變形</p>
                </div>
                <div className="laptop">
                    <Rect x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" animate={{ x: 200, y: 0, delay: 0 }} />
                    <Rect x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" animate={{ x: 0, y: 200, delay: 0 }} />
                    <Rect x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" animate={{ x: -200, y: 0, delay: 0 }} />
                    <img className="laptop__photo" src={laptop} />
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
                    <RoundBtn size="L">了解更多</RoundBtn>
                </div>
            </div>
        );
    }
}

class Helios300 extends Component {
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}

    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Helios 300</p>
                    <p className="page__description page__description--alignLeft">火力全開依舊冷靜鎮定</p>
                </div>
                <div className="laptop">
                    <Rect x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" animate={{ x: 200, y: 0, delay: 0 }} />
                    <Rect x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" animate={{ x: 0, y: 200, delay: 0 }} />
                    <Rect x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" animate={{ x: -200, y: 0, delay: 0 }} />
                    <img className="laptop__photo" src={laptop} />
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
                    <RoundBtn size="L">了解更多</RoundBtn>
                </div>
            </div>
        );
    }
}

class Switch7 extends Component {
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}

    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Switch 7 Black Edition</p>
                    <p className="page__description page__description--alignLeft">世界首款無風扇獨立顯卡二合一筆電</p>
                </div>
                <div className="laptop">
                    <Rect x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" animate={{ x: 200, y: 0, delay: 0 }} />
                    <Rect x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" animate={{ x: 0, y: 200, delay: 0 }} />
                    <Rect x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" animate={{ x: -200, y: 0, delay: 0 }} />
                    <img className="laptop__photo" src={laptop} />
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
                    <RoundBtn size="L">了解更多</RoundBtn>
                </div>
            </div>
        );
    }
}

class Swift5 extends Component {
    componentWillEnter(callback) {}

    componentWillLeave(callback) {}

    render() {
        return (
            <div className="page__section">
                <div className="page__heading page__heading--w800">
                    <p className="page__title page__title--alignLeft">Swift 5</p>
                    <p className="page__description page__description--alignLeft">保持優雅易如反掌</p>
                </div>
                <div className="laptop">
                    <Rect x="117" y="-183" width="23" ratio="0.55" bgColor="#2842D7" animate={{ x: 200, y: 0, delay: 0 }} />
                    <Rect x="-12" y="-32" width="53" ratio="0.87" bgColor="#FF2C8D" animate={{ x: 0, y: 200, delay: 0 }} />
                    <Rect x="-92" y="-63" width="55" ratio="0.95" bgColor="#E271C1" animate={{ x: -200, y: 0, delay: 0 }} />
                    <img className="laptop__photo" src={laptop} />
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
                    <RoundBtn size="L">了解更多</RoundBtn>
                </div>
            </div>
        );
    }
}

export default Product;