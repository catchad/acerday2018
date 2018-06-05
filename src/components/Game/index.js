import React, { Component } from "react";
import axios from "axios";
import Block from "../Block";
import Select from "../Select";
import Background from "../Background";
import RoundBtn from "../RoundBtn";
import RhythmGame from "../RhythmGame";
import Freestyle from "../Freestyle";
import "./index.scss";
import user from "./testuser.png";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { TweenMax } from "gsap";
import shuffle from "lodash/shuffle";
import ReactTransitionGroup from "react-addons-transition-group";
import getCountryFullName from "../../helper/getCountryFullName.js";
import checkToast from "../../helper/checkToast.js";
import greets from "../../locale/greets";
import flagSG from "./flag-sg.svg";
import flagTW from "./flag-tw.svg";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: props.match.params.cid ? 4 : 1,
            invite: props.match.params.cid
                ? {
                      id: "99999",
                      name: "Test",
                      country: "tw",
                      countryFullName: "Taiwan",
                      greet: 0,
                      character: "https://fakeimg.pl/300x450/282828/eae0d0"
                  }
                : {
                      id: "",
                      name: "",
                      country: "",
                      countryFullName: "",
                      greet: 0,
                      character: ""
                  },
            score: 0,
            gameLevel: 1
        };

        if (props.match.params.cid) {
            axios({
                method: "GET",
                url: `/api/tasks/rythmgames/${props.match.params.cid}`,
                responseType: "json"
            }).then(response => {
                var resp = response.data;
                this.setState({
                    ...this.state,
                    invite: {
                        id: resp.data.Players[0].User.Id,
                        name: resp.data.Players[0].User.DisplayName,
                        country: resp.data.Players[0].User.Country,
                        countryFullName: getCountryFullName(resp.data.Players[0].User.Country),
                        greet: resp.data.Players[0].User.GreetingTextKey,
                        character: resp.data.Players[0].User.ProfileImageUrl
                    }
                });
            });
        }
    }
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate");

        if (this.props.match.params.cid !== nextProps.match.params.cid && nextProps.match.params.cid) {
            this.setState({
                ...this.state,
                step: 4
            });
            axios({
                method: "GET",
                url: `/api/tasks/rythmgames/${nextProps.match.params.cid}`,
                responseType: "json"
            }).then(response => {
                var resp = response.data;
                this.setState({
                    ...this.state,
                    invite: {
                        id: resp.data.Players[0].User.Id,
                        name: resp.data.Players[0].User.DisplayName,
                        country: resp.data.Players[0].User.Country,
                        countryFullName: getCountryFullName(resp.data.Players[0].User.Country),
                        greet: resp.data.Players[0].User.GreetingTextKey,
                        character: resp.data.Players[0].User.ProfileImageUrl
                    }
                });
            });
        }
    }

    _setInvite = values => {
        this.setState({
            invite: {
                ...this.state.invite,
                ...values
            }
        });
    };
    _nextStep = () => {
        this.setState({
            step: this.state.step + 1
        });
    };
    _updateScore = value => {
        this.setState({ step: this.state.step + 1, score: value });
    };
    _selectLevel = level => {
        this.setState({
            ...this.state,
            gameLevel: level,
            step: this.state.step + 1
        });
    };
    _restart = () => {
        this.setState({
            step: 1
        });
    };

    render() {
        return (
            <div className="page">
                <ReactTransitionGroup component="div">
                    {this.state.step == 1 ? <Step1 intl={this.props.intlContext} appContext={this.props.appContext} nextStep={this._nextStep} setInvite={this._setInvite} /> : ""}
                    {this.state.step == 2 ? <Step2 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} setInvite={this._setInvite} nextStep={this._nextStep} /> : ""}
                    {this.state.step == 3 ? <Step3 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} selectLevel={this._selectLevel} nextStep={this._nextStep} /> : ""}
                    {this.state.step == 4 ? <Step4 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} level={this.state.gameLevel} nextStep={this._nextStep} updateScore={this._updateScore} /> : ""}
                    {this.state.step == 5 ? <Step5 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} nextStep={this._nextStep} restart={this._restart} cid={this.props.match.params.cid} score={this.state.score} /> : ""}
                </ReactTransitionGroup>
                <Background color1={this.state.step == 4 || this.state.step == 5 ? "#505CFF" : "#9AEF00"} color2={this.state.step == 4 || this.state.step == 5 ? "#62008B" : "#6F9F0F"} />
            </div>
        );
    }
}

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: "",
            searchCountry: ""
        };

        this._updateList();
        // this.searchId = "";
        // this.searchCountry = "";
    }

    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
            },
            {
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                display: "block",
                delay: 0.25,
                ease: Back.easeOut.config(2),
                onComplete: callback
            }
        );
    }

    componentWillLeave(callback) {
        TweenMax.to(this.refs.section, 0.25, {
            autoAlpha: 0,
            onComplete: () => {
                window.scrollTo(0, 0);
                callback();
            }
        });
    }
    _updateList = () => {
        // console.log(this.state);
        if (this.state.searchId == "" && this.state.searchCountry == "") {
            axios({
                method: "GET",
                url: "/api/users?page=1&pagesize=24&random=1",
                responseType: "json"
            }).then(this._updateData);
            return;
        }
        if (this.state.searchId == "" && this.state.searchCountry !== "") {
            // alert(this.state.searchCountry);
            axios({
                method: "GET",
                url: `/api/users?page=1&pagesize=24&random=1&country=${this.state.searchCountry}`,
                responseType: "json"
            }).then(this._updateData);
            return;
        }
        if (this.state.searchId !== "") {
            // alert(this.state.searchId);
            axios({
                method: "GET",
                url: `/api/users?page=1&pagesize=24&random=1&id=${this.state.searchId}`,
                responseType: "json"
            }).then(this._updateData);
            return;
        }
    };
    _updateData = response => {
        var resp = response.data;
        var data = [];
        resp.data.List.forEach((el, id) => {
            if (el.Id !== this.props.appContext.id) {
                data.push({
                    id: el.Id,
                    userCode: el.UserCode,
                    name: el.DisplayName,
                    country: el.Country,
                    countryFullName: getCountryFullName(el.Country),
                    character: el.ProfileImageUrl,
                    greet: el.GreetingTextKey
                });
            }
        });
        data = shuffle(data);
        this.setState({
            data: data
        });
    };

    render() {
        return (
            <div className="page__section gameStep1" ref="section">
                <div className="page__heading">
                    <p className="page__title">
                        <FormattedMessage id="intl.game.step1.title" />
                    </p>
                    <p className="page__description">
                        <FormattedMessage id="intl.game.step1.desc" />
                    </p>
                </div>
                <div className="gameStep1__ui">
                    <input
                        className="page__inputtext gameStep1__input"
                        type="text"
                        placeholder="Acer ID"
                        value={this.state.searchId}
                        onChange={e => {
                            this.setState({ searchId: e.target.value });
                        }}
                    />
                    <p className="gameStep1__or">or</p>
                    <Select
                        className="gameStep1__select"
                        defaultName={this.props.intl.formatMessage({ id: "intl.game.step1.country" })}
                        onChange={value => {
                            this.setState({
                                searchCountry: value
                            });
                        }}
                        options={[
                            {
                                name: "Taiwan",
                                icon: flagTW,
                                value: "tw"
                            },
                            {
                                name: "Singapore",
                                icon: flagSG,
                                value: "sg"
                            }
                        ]}
                    />
                    <RoundBtn className="gameStep1__btn" size="M" onClick={this._updateList}>
                        <FormattedMessage id="intl.game.step1.btn.search" />
                    </RoundBtn>
                </div>

                <div className="page__row page__row--fullWidth">
                    {this.state.data && this.state.data.length > 0 ? (
                        <Block
                            type="list"
                            onClick={values => {
                                this.props.setInvite(values);
                                this.props.nextStep();
                            }}
                            randomColor
                            data={this.state.data}
                        />
                    ) : (
                        ""
                    )}
                    {this.state.data && this.state.data.length == 0 ? <p>沒有符合條件的玩家</p> : ""}
                </div>
            </div>
        );
    }
}

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.bubbleActive = false;
        // this.state = {
        //     bubbleActive: false
        // };
        this.ajaxing = false;
    }
    componentDidMount() {
        this._hideBubble();
    }

    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
            },
            {
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                display: "block",
                delay: 0.25,
                ease: Back.easeOut.config(2),
                onComplete: callback
            }
        );
    }

    componentWillLeave(callback) {
        TweenMax.to(this.refs.section, 0.25, {
            autoAlpha: 0,
            onComplete: () => {
                window.scrollTo(0, 0);
                callback();
            }
        });
    }

    _hideBubble = () => {
        TweenMax.set([this.refs.bubble1, this.refs.bubble2], { opacity: 0 });
        // this.setState()
    };
    _showBubble = () => {
        // 送出邀請
        if (this.ajaxing) return;
        this.ajaxing = true;

        axios({
            method: "POST",
            url: "/api/tasks/invitations",
            responseType: "json",
            data: {
                ToUserID: this.props.invite.userCode
            }
        }).then(response => {
            var resp = response.data;
            this.props.setInvite({ userTaskId: resp.data.UserTaskId });

            TweenMax.to("#step2Btn", 0.25, { opacity: 0 });
            TweenMax.set([this.refs.bubble1, this.refs.bubble2], { opacity: 1 });
            TweenMax.fromTo(this.refs.bubble1, 0.5, { y: 150, scale: 0 }, { y: 0, scale: 1, ease: Back.easeOut });
            TweenMax.fromTo(
                this.refs.bubble2,
                0.5,
                { y: 150, scale: 0 },
                {
                    y: 0,
                    scale: 1,
                    ease: Back.easeOut,
                    delay: 1,
                    onComplete: () => {
                        checkToast(this.props.appContext);
                        setTimeout(() => {
                            this.props.nextStep();
                        }, 1000);
                    }
                }
            );
        });
    };

    render() {
        return (
            <div className="page__section" ref="section">
                <div className="page__heading">
                    <p className="page__title">
                        <FormattedMessage id="intl.game.step2.title" />
                    </p>
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn id="step2Btn" onClick={this._showBubble} size="L" zIndexUp>
                        <FormattedMessage id="intl.game.step2.btn" />
                    </RoundBtn>
                </div>

                <div className="page__row page__row--widthM page__row--flex" style={{ marginTop: "-5%" }}>
                    <div className="page__column">
                        <div ref="bubble1" className="bubble">
                            <p className="bubble__text">{greets[this.props.appContext.country][this.props.appContext.greet]}</p>
                        </div>
                        <Block
                            data={{
                                id: this.props.appContext.id,
                                name: this.props.appContext.name,
                                country: this.props.appContext.country,
                                countryFullName: this.props.appContext.countryFullName,
                                character: this.props.appContext.character,
                                greet: this.props.appContext.greet
                            }}
                        />
                    </div>
                    <div className="page__column">
                        <div ref="bubble2" className="bubble">
                            <p className="bubble__text">{greets[this.props.invite.country][this.props.invite.greet]}</p>
                        </div>
                        <Block
                            data={{
                                id: this.props.invite.id,
                                name: this.props.invite.name,
                                country: this.props.invite.country,
                                countryFullName: this.props.invite.countryFullName,
                                character: this.props.invite.character,
                                greet: this.props.invite.greet
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class Step3 extends Component {
    constructor(props) {
        super(props);
    }

    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
            },
            {
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                display: "block",
                delay: 0.25,
                ease: Back.easeOut.config(2),
                onComplete: callback
            }
        );
    }

    componentWillLeave(callback) {
        TweenMax.to(this.refs.section, 0.25, {
            autoAlpha: 0,
            onComplete: () => {
                window.scrollTo(0, 0);
                callback();
            }
        });
    }

    render() {
        return (
            <div className="page__section" ref="section">
                <div className="page__heading">
                    <p className="page__title">
                        <FormattedMessage id="intl.game.step3.title" />
                    </p>
                    <p className="page__description">
                        <FormattedMessage id="intl.game.step3.desc" />
                    </p>
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn
                        onClick={() => {
                            this.props.selectLevel(1);
                        }}
                        fixedSize="S"
                    >
                        ★
                    </RoundBtn>
                    <RoundBtn
                        onClick={() => {
                            this.props.selectLevel(2);
                        }}
                        fixedSize="S"
                    >
                        ★★
                    </RoundBtn>
                    <RoundBtn
                        onClick={() => {
                            this.props.selectLevel(3);
                        }}
                        fixedSize="S"
                    >
                        ★★★
                    </RoundBtn>
                </div>
                <div className="page__row page__row--widthM page__row--flex">
                    <div className="page__column">
                        <Block
                            data={{
                                id: "",
                                name: this.props.appContext.name,
                                country: this.props.appContext.country,
                                countryFullName: this.props.appContext.countryFullName,
                                character: this.props.appContext.character,
                                greet: this.props.appContext.greet
                            }}
                        />
                    </div>
                    <div className="page__column">
                        <Block
                            data={{
                                id: this.props.invite.id,
                                name: this.props.invite.name,
                                country: this.props.invite.country,
                                countryFullName: this.props.invite.countryFullName,
                                character: this.props.invite.character,
                                greet: this.props.invite.greet
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class Step4 extends Component {
    constructor(props) {
        super(props);
        // props.appContext.toggleBgmForceMuted(true);
    }

    render() {
        return <RhythmGame level={this.props.level} appContext={this.props.appContext} onGameOver={this.props.updateScore} />;
    }
}

class Step5 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Freestyle score={this.props.score} restart={this.props.restart} appContext={this.props.appContext} invite={this.props.invite} cid={this.props.cid} />;
    }
}

export default Game;
