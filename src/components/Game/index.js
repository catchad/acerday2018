import React, { Component } from "react";
import Block from "../Block";
import Select from "../Select";
import Background from "../Background";
import RoundBtn from "../RoundBtn";
import RhythmGame from "../RhythmGame";
import Freestyle from "../Freestyle";
import "./index.scss";
import user from "./user.png";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { TweenMax } from "gsap";
import ReactTransitionGroup from "react-addons-transition-group";
import greets from "../../locale/greets";

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
            score: 0
        };
        console.log(props);
        console.log(props.match.params.cid ? 4 : 1);
        // console.log(this.props.appContext);
    }

    _setInvite = values => {
        this.setState({
            step: this.state.step + 1,
            invite: {
                id: values.id,
                name: values.name,
                country: values.country,
                countryFullName: values.countryFullName,
                greet: values.greet,
                character: values.character
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
                    {this.state.step == 2 ? <Step2 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} nextStep={this._nextStep} /> : ""}
                    {this.state.step == 3 ? <Step3 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} nextStep={this._nextStep} /> : ""}
                    {this.state.step == 4 ? <Step4 intl={this.props.intlContext} invite={this.state.invite} appContext={this.props.appContext} nextStep={this._nextStep} updateScore={this._updateScore} /> : ""}
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
                        <FormattedMessage id="intl.game.step1.title" />
                    </p>
                    <p className="page__description">
                        <FormattedMessage id="intl.game.step1.desc" />
                    </p>
                </div>
                <div className="page__row page__row--flex page__row--widthM">
                    <input className="textInput" type="text" />
                    <Select
                        options={[
                            {
                                name: "Taiwan",
                                icon: "https://restcountries.eu/data/twn.svg",
                                value: "tw"
                            },
                            {
                                name: "USA",
                                icon: "https://restcountries.eu/data/usa.svg",
                                value: "us"
                            },
                            {
                                name: "USA",
                                icon: "https://restcountries.eu/data/usa.svg",
                                value: "us"
                            },
                            {
                                name: "USA",
                                icon: "https://restcountries.eu/data/usa.svg",
                                value: "us"
                            },
                            {
                                name: "USA",
                                icon: "https://restcountries.eu/data/usa.svg",
                                value: "us"
                            },
                            {
                                name: "USA",
                                icon: "https://restcountries.eu/data/usa.svg",
                                value: "us"
                            },
                            {
                                name: "USA",
                                icon: "https://restcountries.eu/data/usa.svg",
                                value: "us"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            },
                            {
                                name: "Japan",
                                icon: "https://restcountries.eu/data/jpn.svg",
                                value: "jp"
                            }
                        ]}
                    />
                </div>
                <div className="page__row page__row--fullWidth">
                    <Block
                        type="list"
                        onClick={this.props.setInvite}
                        randomColor
                        data={[
                            {
                                id: "",
                                name: "Ray Su",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 0
                            },
                            {
                                id: "",
                                name: "Kanokporn Sopontaweesab",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                country: "tw",
                                countryFullName: "Taiwan",
                                greet: 0
                            },
                            {
                                id: "",
                                name: "Anis Aiz Sllu Tersenyum",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                country: "us",
                                countryFullName: "United States",
                                greet: 1
                            },
                            {
                                id: "",
                                name: "Isaac chuang",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 0
                            },
                            {
                                id: "",
                                name: "Rachel Wang",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 1
                            },
                            {
                                id: "",
                                name: "莊育銘",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 1
                            },
                            {
                                id: "",
                                name: "Ray Su",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 0
                            },
                            {
                                id: "",
                                name: "Kanokporn Sopontaweesab",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                country: "tw",
                                countryFullName: "Taiwan",
                                greet: 1
                            },
                            {
                                id: "",
                                name: "Anis Aiz Sllu Tersenyum",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                country: "tw",
                                countryFullName: "Taiwan",
                                greet: 0
                            },
                            {
                                id: "",
                                name: "Isaac chuang",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 1
                            },
                            {
                                id: "",
                                name: "Rachel Wang",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 0
                            },
                            {
                                id: "",
                                name: "莊育銘",
                                country: "tw",
                                countryFullName: "Taiwan",
                                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: 1
                            }
                        ]}
                    />
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
        // if (!this.bubbleActive) {
        // this.bubbleActive = true;
        // this.setState({
        //     bubbleActive: true
        // });
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
                    toast(this.props.intl.formatMessage({ id: "intl.notification.sentence6" }, { name: "Rachel Wang" }));
                    toast(this.props.intl.formatMessage({ id: "intl.notification.sentence7" }));
                    setTimeout(() => {
                        this.props.nextStep();
                    }, 1000);
                }
            }
        );
        // }
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
                    <RoundBtn onClick={this.props.nextStep} fixedSize="S">
                        ★
                    </RoundBtn>
                    <RoundBtn onClick={this.props.nextStep} fixedSize="S">
                        ★★
                    </RoundBtn>
                    <RoundBtn onClick={this.props.nextStep} fixedSize="S">
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
        props.appContext.toggleBgmForceMuted(true);
    }

    render() {
        return <RhythmGame level="1" onGameOver={this.props.updateScore} />;
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
