import React, { Component } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import { createPortal } from "react-dom";
import Background from "../Background";
import CircleBtn from "../CircleBtn";
import RoundBtn from "../RoundBtn";
import NumberInput from "../NumberInput";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import "./index.scss";

import iconClose from "./icon_close.svg";
import prize1Img from "./prize1.png";
import prize2Img from "./prize2.png";
import prize3Img from "./prize3.png";
import prize4Img from "./prize4.png";

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            step: 1,
            confirmPrize: "",
            confirmPoint: "",
            name: "",
            phone: "",
            email: "",
            address: ""
        };
    }
    _showConfirm = (prize, point) => {
        this.setState({
            showConfirm: true,
            confirmPrize: prize,
            confirmPoint: point
        });
    };

    _hideConfirm = () => {
        this.setState({
            showConfirm: false
        });
    };
    _nextStep = () => {
        this.setState({
            step: this.state.step + 1,
            showConfirm: false
        });
    };

    _send = () => {
        if (this.state.name == "") {
            alert(this.props.intlContext.formatMessage({ id: "intl.exchange.form.error.name" }));
            return;
        }
        if (this.state.phone == "") {
            alert(this.props.intlContext.formatMessage({ id: "intl.exchange.form.error.phone" }));
            return;
        }
        if (!this._isEmail(this.state.email)) {
            alert(this.props.intlContext.formatMessage({ id: "intl.exchange.form.error.email" }));
            return;
        }
        if (this.state.address == "") {
            alert(this.props.intlContext.formatMessage({ id: "intl.exchange.form.error.address" }));
            return;
        }
        console.log(this.state.name, this.state.phone, this.state.email, this.state.address);
        alert(this.props.intlContext.formatMessage({ id: "intl.exchange.form.success" }));
        this.setState({
            step: 1
        });
    };

    _isEmail = str => {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(str);
    };
    _inputChange = (field, value) => {
        this.setState({ [field]: value });
    };

    render() {
        return (
            <div className="page">
                {this.state.step == 1 ? (
                    <div className="page__section">
                        <div className="page__heading">
                            <p className="page__title">
                                <FormattedMessage id="intl.exchange.title" />
                            </p>
                            <p className="page__description">
                                <FormattedMessage id="intl.exchange.desc" />
                            </p>
                        </div>
                        <div className="prizeContainer">
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src={prize1Img} />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">
                                        <FormattedMessage id="intl.exchange.prize1.name" />
                                    </p>
                                    <p className="prize__point">
                                        <FormattedMessage id="intl.exchange.prize1.point" />
                                    </p>
                                    <p className="prize__desc">
                                        <FormattedMessage id="intl.exchange.prize1.desc" />
                                    </p>
                                    <RoundBtn
                                        size="S"
                                        onClick={() => {
                                            if (this.props.appContext.point >= 35000) {
                                                this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize1.name" }), "35000");
                                            } else {
                                                alert(this.props.intlContext.formatMessage({ id: "intl.exchange.alert.point" }));
                                            }
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src={prize2Img} />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">
                                        <FormattedMessage id="intl.exchange.prize2.name" />
                                    </p>
                                    <p className="prize__point">
                                        <FormattedMessage id="intl.exchange.prize2.point" />
                                    </p>
                                    <p className="prize__desc">
                                        <FormattedMessage id="intl.exchange.prize2.desc" />
                                    </p>
                                    <RoundBtn
                                        size="S"
                                        onClick={() => {
                                            if (this.props.appContext.point >= 10000) {
                                                this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize2.name" }), "10000");
                                            } else {
                                                alert(this.props.intlContext.formatMessage({ id: "intl.exchange.alert.point" }));
                                            }
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src={prize3Img} />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">
                                        <FormattedMessage id="intl.exchange.prize3.name" />
                                    </p>
                                    <p className="prize__point">
                                        <FormattedMessage id="intl.exchange.prize3.point" />
                                    </p>
                                    <p className="prize__desc">
                                        <FormattedMessage id="intl.exchange.prize3.desc" />
                                    </p>
                                    <RoundBtn
                                        size="S"
                                        onClick={() => {
                                            if (this.props.appContext.point >= 23000) {
                                                this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize3.name" }), "23000");
                                            } else {
                                                alert(this.props.intlContext.formatMessage({ id: "intl.exchange.alert.point" }));
                                            }
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src={prize4Img} />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">
                                        <FormattedMessage id="intl.exchange.prize4.name" />
                                    </p>
                                    <p className="prize__point">
                                        <FormattedMessage id="intl.exchange.prize4.point" />
                                    </p>
                                    <p className="prize__desc">
                                        <FormattedMessage id="intl.exchange.prize4.desc" />
                                    </p>
                                    <RoundBtn
                                        size="S"
                                        onClick={() => {
                                            // if (this.props.appContext.point >= 15000) {
                                            this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize4.name" }), "15000");
                                            // } else {
                                            // alert(this.props.intlContext.formatMessage({ id: "intl.exchange.alert.point" }));
                                            // }
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {this.state.step == 2 ? (
                    <div className="page__section">
                        <div className="page__heading">
                            <p className="page__title">
                                <FormattedMessage id="intl.exchange.form.title" />
                            </p>
                            <p className="page__description">
                                <FormattedMessage id="intl.exchange.form.desc" />
                            </p>
                        </div>
                        <div className="page__row page__row--widthM">
                            <input
                                className="page__inputtext"
                                placeholder={this.props.intlContext.formatMessage({ id: "intl.exchange.form.name" })}
                                type="text"
                                value={this.state.name}
                                onChange={e => {
                                    this._inputChange("name", e.target.value);
                                }}
                            />
                            <input
                                className="page__inputtext"
                                placeholder={this.props.intlContext.formatMessage({ id: "intl.exchange.form.phone" })}
                                type="text"
                                value={this.state.phone}
                                onChange={e => {
                                    this._inputChange("phone", e.target.value);
                                }}
                            />
                            <input
                                className="page__inputtext"
                                placeholder={this.props.intlContext.formatMessage({ id: "intl.exchange.form.email" })}
                                type="text"
                                value={this.state.email}
                                onChange={e => {
                                    this._inputChange("email", e.target.value);
                                }}
                            />
                            <input
                                className="page__inputtext"
                                placeholder={this.props.intlContext.formatMessage({ id: "intl.exchange.form.address" })}
                                type="text"
                                value={this.state.address}
                                onChange={e => {
                                    this._inputChange("address", e.target.value);
                                }}
                            />
                        </div>
                        <div className="page__row page__row--center">
                            <RoundBtn size="L" onClick={this._send}>
                                <FormattedMessage id="intl.exchange.form.btn.send" />
                            </RoundBtn>
                        </div>
                    </div>
                ) : null}

                <ReactTransitionGroup component="div">{this.state.showConfirm ? <Confirm appContext={this.props.appContext} nextStep={this._nextStep} hideConfirm={this._hideConfirm} prize={this.state.confirmPrize} point={this.state.confirmPoint} /> : null}</ReactTransitionGroup>
                <Background />
            </div>
        );
    }
}

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeNumber: 1
        };
    }
    componentWillEnter(callback) {
        TweenMax.fromTo(this.refs.lightbox, 0.25, { autoAlpha: 0 }, { autoAlpha: 1 });
        TweenMax.fromTo(this.refs.wrap, 0.5, { scale: 0.7 }, { scale: 1, ease: Back.easeOut, onComplete: callback });
    }

    componentWillLeave(callback) {
        TweenMax.to(this.refs.wrap, 0.5, { scale: 0.5, ease: Back.easeIn, onComplete: callback });
        TweenMax.to(this.refs.lightbox, 0.25, { autoAlpha: 0, delay: 0.25 });
    }
    componentDidMount() {
        document.body.classList.add("body--hideScrollbar");
    }
    componentWillUnmount() {
        document.body.classList.remove("body--hideScrollbar");
    }
    numberChange = value => {
        this.setState({
            exchangeNumber: value
        });
    };
    render() {
        return createPortal(
            <div className="confirm" ref="lightbox">
                <div className="confirm__outerWrapper" ref="wrap">
                    <div className="confirm__innerWrapper">
                        <p className="confirm__point">
                            <FormattedMessage id="intl.exchange.confirm.userpoint" values={{ point: this.props.appContext.point }} />
                        </p>
                        <p className="confirm__title">
                            <FormattedMessage id="intl.exchange.confirm.title" values={{ prize: this.props.prize }} />
                        </p>
                        <p className="confirm__desc">
                            <FormattedHTMLMessage id="intl.exchange.confirm.text" values={{ prize: this.props.prize, point: this.props.point * this.state.exchangeNumber }} />
                        </p>
                        <NumberInput className="confirm__numberInput" min="1" max={Math.floor(this.props.appContext.point / this.props.point)} onChange={this.numberChange} />
                        <RoundBtn onClick={this.props.hideConfirm} size="L" secondary>
                            <FormattedMessage id="intl.exchange.confirm.btn.cancel" />
                        </RoundBtn>

                        <RoundBtn onClick={this.props.nextStep} size="L">
                            <FormattedMessage id="intl.exchange.confirm.btn.send" />
                        </RoundBtn>
                    </div>
                    <CircleBtn className="confirm__close" icon={iconClose} onClick={this.props.hideConfirm} />
                </div>
            </div>,
            document.getElementById("portal")
        );
    }
}

export default Exchange;
