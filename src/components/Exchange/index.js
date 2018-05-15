import React, { Component } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import { FormattedMessage } from "react-intl";
import { createPortal } from "react-dom";
import Background from "../Background";
import CircleBtn from "../CircleBtn";
import RoundBtn from "../RoundBtn";
import "./index.scss";

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            step: 1
        };
    }
    _showConfirm = () => {
        this.setState({
            showConfirm: true
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

    _confirmOK = () => {};

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
                                    <p className="prize__name">旅遊大獎</p>
                                    <p className="prize__point">點數: 10,000</p>
                                    <p className="prize__desc">補充說明文字可以放這裡。</p>
                                    <RoundBtn size="S" onClick={this._showConfirm} noMargin>
                                        我要兌換
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src="https://fakeimg.pl/300x500/" />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">Spotify 一年份</p>
                                    <p className="prize__point">點數: 10,000</p>
                                    <p className="prize__desc">補充說明文字可以放這裡。補充說明文字可以放這裡。補充說明文字可以放這裡。</p>
                                    <RoundBtn size="S" onClick={this._showConfirm} noMargin>
                                        我要兌換
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src="https://fakeimg.pl/500x300/" />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">Acer 筆電</p>
                                    <p className="prize__point">點數: 10,000</p>
                                    <p className="prize__desc">補充說明文字可以放這裡。補充說明文字可以放這裡。補充說明文字可以放這裡。補充說明文字可以放這裡。補充說明文字可以放這裡。補充說明文字可以放這裡。</p>
                                    <RoundBtn size="S" onClick={this._showConfirm} noMargin>
                                        我要兌換
                                    </RoundBtn>
                                </div>
                            </div>
                            <div className="prize">
                                <div className="prize__left">
                                    <img className="prize__photo" src="https://fakeimg.pl/300x200/" />
                                </div>
                                <div className="prize__right">
                                    <p className="prize__name">Acer 一年保固</p>
                                    <p className="prize__point">點數: 10,000</p>
                                    <p className="prize__desc">補充說明文字可以放這裡。</p>
                                    <RoundBtn size="S" onClick={this._showConfirm} noMargin>
                                        我要兌換
                                    </RoundBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {this.state.step == 2 ? (
                    <div className="page__section">
                        <div className="page__heading">
                            <p className="page__title">兌獎資料填寫</p>
                            <p className="page__description">請審慎填寫下列資料，資料送出後即不可修改。</p>
                        </div>
                        <div className="page__row page__row--widthM">
                            <input className="page__inputtext" placeholder="姓名" type="text" />
                            <input className="page__inputtext" placeholder="電話" type="text" />
                            <input className="page__inputtext" placeholder="信箱" type="text" />
                            <input className="page__inputtext" placeholder="地址" type="text" />
                        </div>
                        <div className="page__row page__row--center">
                            <RoundBtn size="L">我要兌換</RoundBtn>
                        </div>
                    </div>
                ) : null}

                <ReactTransitionGroup component="div">{this.state.showConfirm ? <Confirm nextStep={this._nextStep} hideConfirm={this._hideConfirm} /> : null}</ReactTransitionGroup>
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
                        <p className="confirm__point">你目前點數：83,000點</p>
                        <p className="confirm__title">旅遊大獎抽獎機會</p>
                        <p className="confirm__desc">
                            確定要扣除 10,000 點<br />兌換旅遊大獎的抽獎機會嗎？
                        </p>

                        <RoundBtn onClick={this.props.hideConfirm} size="L" secondary>
                            取消
                        </RoundBtn>

                        <RoundBtn onClick={this.props.nextStep} size="L">
                            確認送出
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
