import React, { Component } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import { createPortal } from "react-dom";
import Background from "../Background";
import CircleBtn from "../CircleBtn";
import RoundBtn from "../RoundBtn";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import "./index.scss";

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
        console.log(this.state.name, this.state.phone, this.state.email, this.state.address);
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
                                    <img className="prize__photo" src="https://fakeimg.pl/300x200/" />
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
                                            this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize1.name" }), "10000");
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src="https://fakeimg.pl/300x500/" />
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
                                            this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize2.name" }), "10000");
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src="https://fakeimg.pl/500x300/" />
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
                                            this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize3.name" }), "10000");
                                        }}
                                        noMargin
                                    >
                                        <FormattedMessage id="intl.exchange.btn" />
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src="https://fakeimg.pl/300x200/" />
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
                                            this._showConfirm(this.props.intlContext.formatMessage({ id: "intl.exchange.prize4.name" }), "10000");
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
                            <FormattedHTMLMessage id="intl.exchange.confirm.text" values={{ prize: this.props.prize, point: this.props.point }} />
                        </p>

                        <RoundBtn onClick={this.props.hideConfirm} size="L" secondary>
                            <FormattedMessage id="intl.exchange.confirm.btn.cancel" />
                        </RoundBtn>

                        <RoundBtn onClick={this.props.nextStep} size="L">
                            <FormattedMessage id="intl.exchange.confirm.btn.send" />
                        </RoundBtn>
                    </div>
                    <CircleBtn className="confirm__close" onClick={this.props.hideConfirm} />
                </div>
            </div>,
            document.getElementById("portal")
        );
    }
}

export default Exchange;
