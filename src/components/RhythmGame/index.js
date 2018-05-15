import React, { Component } from "react";
import Block from "../Block";
import Select from "../Select";
import Background from "../Background";
import RoundBtn from "../RoundBtn";
import "./index.scss";
import user from "./user.png";
import { FormattedMessage } from "react-intl";
import { TweenMax } from "gsap";
import ReactTransitionGroup from "react-addons-transition-group";
class RhythmGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    _nextStep = () => {
        this.setState({
            step: this.state.step + 1
        });
    };

    render() {
        return (
            <div className="page">
                <ReactTransitionGroup component="div">
                    {this.state.step == 1 ? <Step1 nextStep={this._nextStep} /> : null}
                    {this.state.step == 2 ? <Step2 nextStep={this._nextStep} /> : null}
                    {this.state.step == 3 ? <Step3 nextStep={this._nextStep} /> : null}
                    {this.state.step == 4 ? <Step4 nextStep={this._nextStep} /> : null}
                </ReactTransitionGroup>
                <Background color1="#01C700" color2="#01B3EF" />
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
                        <FormattedMessage id="intl.rhythmgame.step1.title" />
                    </p>
                    <p className="page__description">
                        <FormattedMessage id="intl.rhythmgame.step1.desc" />
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
                        onClick={this.props.nextStep}
                        data={[
                            {
                                id: "",
                                name: "Ray Su",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Kanokporn Sopontaweesab",
                                img: user,
                                country: "Taiwan",
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Anis Aiz Sllu Tersenyum",
                                img: user,
                                country: "Taiwan",
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Isaac chuang",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Rachel Wang",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "莊育銘",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Ray Su",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Kanokporn Sopontaweesab",
                                img: user,
                                country: "Taiwan",
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Anis Aiz Sllu Tersenyum",
                                img: user,
                                country: "Taiwan",
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Isaac chuang",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "Rachel Wang",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
                            },
                            {
                                id: "",
                                name: "莊育銘",
                                country: "Taiwan",
                                img: user,
                                greet: "讓我們用音樂 Cool together"
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
        TweenMax.to(this.refs.btn.refs.btn, 0.25, { opacity: 0 });
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
                        <FormattedMessage id="intl.rhythmgame.step2.title" />
                    </p>
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn ref="btn" onClick={this._showBubble} size="L" zIndexUp>
                        <FormattedMessage id="intl.rhythmgame.step2.btn" />
                    </RoundBtn>
                </div>

                <div className="page__row page__row--widthM page__row--flex" style={{ marginTop: "-5%" }}>
                    <div className="page__column">
                        <div ref="bubble1" className="bubble">
                            <p className="bubble__text">讓我們用音樂 Cool together</p>
                        </div>
                        <Block
                            data={{
                                id: "",
                                name: "Ray Su",
                                country: "Taiwan",
                                img: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: "讓我們用音樂 Cool together"
                            }}
                        />
                    </div>
                    <div className="page__column">
                        <div ref="bubble2" className="bubble">
                            <p className="bubble__text">跟我一起創作出最 Cool 的 free style</p>
                        </div>
                        <Block
                            data={{
                                id: "",
                                name: "Ray Su",
                                country: "Taiwan",
                                img: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: "讓我們用音樂 Cool together"
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
                        <FormattedMessage id="intl.rhythmgame.step3.title" />
                    </p>
                    <p className="page__description">
                        <FormattedMessage id="intl.rhythmgame.step3.desc" />
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
                                name: "Ray Su",
                                country: "Taiwan",
                                img: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: "讓我們用音樂 Cool together"
                            }}
                        />
                    </div>
                    <div className="page__column">
                        <Block
                            data={{
                                id: "",
                                name: "Ray Su",
                                country: "Taiwan",
                                img: "https://fakeimg.pl/300x450/282828/eae0d0",
                                greet: "讓我們用音樂 Cool together"
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
                    <p className="page__title">遊戲</p>
                    <p className="page__description">遊戲遊戲遊戲遊戲遊戲</p>
                </div>
            </div>
        );
    }
}

export default RhythmGame;
