import React, { Component, Fragment } from "react";
import Select from "../Select";
import Avatar from "../Avatar";
import Block from "../Block";
import Radio from "../Radio";
import SquareBtnGroup from "../SquareBtnGroup";
import Alert from "../Alert";
import Background from "../Background";
import CircleBtn from "../CircleBtn";
import RoundBtn from "../RoundBtn";
import user from "./user.png";
import ReactTransitionGroup from "react-addons-transition-group";
import { FormattedMessage } from "react-intl";
import { AppContextConsumer } from "../../AppContext";
import { IntlContextConsumer } from "../../IntlContext";
import { toast } from "react-toastify";
import "./index.scss";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            avatarTarget: "hair",
            avatarResult: "",
            avatarGender: "male",
            test: 1
        };
        this.userData = {
            country: "tw",
            avatar: "",
            greet: ""
        };
        // console.log(this.props);
        // console.log(this.props.intl.formatMessage({ id: "intl.name" }, { name: "Hank" }));
        // console.log(this.props.intl.formatMessage({ id: "intl.select.default" } ));

        // alert(formatMessage("intl.select.default"));
    }

    _nextStep = () => {
        this.setState({
            currentStep: (this.state.currentStep += 1)
        });
    };

    _avatarGenderChange = value => {
        this.setState({
            avatarGender: value
        });
    };
    _avatarResultChange = value => {
        this.setState({
            avatarResult: value
        });
    };
    _avatarTargetChange = value => {
        this.setState({
            avatarTarget: value
        });
    };

    render() {
        return (
            <div className="page register">
                {/* <button
                    onClick={() => {
                        toast("恭喜你完成註冊，獲得4000點");
                    }}
                >
                    Notify !
                </button> */}

                <ReactTransitionGroup component="div">
                    {this.state.currentStep == 1 ? <Step1 intl={this.props.intlContext} nextStep={this._nextStep} userData={this.userData} /> : null}
                    {this.state.currentStep == 2 ? <Step2 intl={this.props.intlContext} nextStep={this._nextStep} avatarGenderChange={this._avatarGenderChange} /> : null}
                    {this.state.currentStep == 3 ? <Step3 intl={this.props.intlContext} nextStep={this._nextStep} avatarGenderChange={this._avatarGenderChange} userData={this.userData} avatarTargetChange={this._avatarTargetChange} avatarResultChange={this._avatarResultChange} avatarTarget={this.state.avatarTarget} avatarGender={this.state.avatarGender} /> : null}
                    {this.state.currentStep == 4 ? <Step4 intl={this.props.intlContext} nextStep={this._nextStep} userData={this.userData} avatarResult={this.state.avatarResult} /> : null}
                    {this.state.currentStep == 5 ? <Step5 intl={this.props.intlContext} nextStep={this._nextStep} avatarResult={this.state.avatarResult} /> : null}
                </ReactTransitionGroup>

                {/* <Alert>
                    <p className="alert__text">Alert</p>
                    <div className="alert__btnRow">
                        <a className="gradientBtn gradientBtn--small">
                            <p>確定</p>
                        </a>
                        <a className="gradientBtn gradientBtn--small">
                            <p>確定</p>
                        </a>
                    </div>
                </Alert> */}

                {/* <div className="page__bg" /> */}
                <Background />
            </div>
        );
    }
}

class Step1 extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
    }

    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
                // rotation: -15
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
            <section className="page__section" ref="section">
                <div className="page__heading">
                    <p className="page__title">
                        {/* 選擇國家 */}
                        <FormattedMessage id="intl.register.step1.title" />
                    </p>
                    <p className="page__description">
                        <FormattedMessage id="intl.register.step1.desc" />
                    </p>
                </div>
                <div className="page__row page__row--widthM">
                    <Select
                        onChange={value => {
                            this.props.userData.country = value;
                        }}
                        options={[{ name: "Taiwan", icon: "https://restcountries.eu/data/twn.svg", value: "tw" }, { name: "USA", icon: "https://restcountries.eu/data/usa.svg", value: "us" }, { name: "USA", icon: "https://restcountries.eu/data/usa.svg", value: "us" }, { name: "USA", icon: "https://restcountries.eu/data/usa.svg", value: "us" }, { name: "USA", icon: "https://restcountries.eu/data/usa.svg", value: "us" }, { name: "USA", icon: "https://restcountries.eu/data/usa.svg", value: "us" }, { name: "USA", icon: "https://restcountries.eu/data/usa.svg", value: "us" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }, { name: "Japan", icon: "https://restcountries.eu/data/jpn.svg", value: "jp" }]}
                    />
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn onClick={this.props.nextStep} size="L">
                        <FormattedMessage id="intl.register.step1.confirm" />
                    </RoundBtn>
                </div>
            </section>
        );
    }
}

class Step2 extends Component {
    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
                // rotation: -15
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
            <section className="page__section" ref="section">
                <div className="page__heading">
                    <p className="page__description">
                        <FormattedMessage id="intl.register.step2.desc" />
                    </p>
                    <p className="page__title">
                        <FormattedMessage id="intl.register.step2.title" />
                    </p>
                </div>
                <div className="page__row page__row--flex page__row--widthM">
                    <SquareBtnGroup onChange={this.props.avatarGenderChange} data={[{ text: this.props.intl.formatMessage({ id: "intl.register.step2.male" }), icon: "https://fakeimg.pl/500x500", value: "male" }, { text: this.props.intl.formatMessage({ id: "intl.register.step2.female" }), icon: "https://fakeimg.pl/500x500", value: "female" }]} />;
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn onClick={this.props.nextStep} size="L">
                        <FormattedMessage id="intl.register.step2.confirm" />
                    </RoundBtn>
                </div>
            </section>
        );
    }
}

class Step3 extends Component {
    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
                // rotation: -15
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
            <section className="page__section" ref="section">
                <div className="page__heading">
                    <p className="page__description">
                        <FormattedMessage id="intl.register.step3.desc" />
                    </p>
                    <p className="page__title">
                        <FormattedMessage id="intl.register.step3.title" />
                    </p>
                </div>
                <div className="page__row page__row--fullWidth">
                    <Avatar ref="avatar" gender={this.props.avatarGender} target={this.props.avatarTarget} />
                </div>

                <div className="page__row page__row--flex avatarUI">
                    <div className="avatarUI__left">
                        <SquareBtnGroup defaultValue="hair" size="s" onChange={this.props.avatarTargetChange} data={[{ text: this.props.intl.formatMessage({ id: "intl.register.step3.hair" }), value: "hair", icon: "https://fakeimg.pl/64x64/" }, { text: this.props.intl.formatMessage({ id: "intl.register.step3.eye" }), value: "eye", icon: "https://fakeimg.pl/64x64/" }, { text: this.props.intl.formatMessage({ id: "intl.register.step3.mouth" }), value: "mouth", icon: "https://fakeimg.pl/64x64/" }]} />;
                    </div>
                    <div className="avatarUI__right">
                        <CircleBtn
                            secondary
                            icon="https://fakeimg.pl/64x64/"
                            onClick={() => {
                                switch (this.props.avatarGender) {
                                    case "male":
                                        this.props.avatarGenderChange("female");
                                        break;
                                    case "female":
                                        this.props.avatarGenderChange("male");
                                        break;
                                }
                            }}
                        />
                        <CircleBtn
                            secondary
                            icon="https://fakeimg.pl/64x64/"
                            onClick={() => {
                                this.refs.avatar._random();
                            }}
                        />
                        <RoundBtn
                            className="avatarUI__nextStep"
                            onClick={() => {
                                this.refs.avatar._getResult(result => {
                                    this.props.userData.avatar = result;
                                    this.props.avatarResultChange(result);
                                    this.props.nextStep();
                                });
                            }}
                            size="L"
                        >
                            <FormattedMessage id="intl.register.step3.confirm" />
                        </RoundBtn>
                    </div>
                </div>
            </section>
        );
    }
}

class Step4 extends Component {
    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
                // rotation: -15
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
            <section className="page__section" ref="section" ref="section">
                <div className="page__heading">
                    <p className="page__description">
                        <FormattedMessage id="intl.register.step4.desc" />
                    </p>
                    <p className="page__title">
                        <FormattedMessage id="intl.register.step4.title" />
                    </p>
                </div>
                <div className="page__row page__row--widthM page__row--center">
                    <img className="register__result" src={this.props.avatarResult} />
                </div>
                <div className="page__row page__row--widthM">
                    <Radio
                        onChange={value => {
                            this.props.userData.greet = value;
                        }}
                        options={[{ text: this.props.intl.formatMessage({ id: "intl.greet1" }), value: 1 }, { text: this.props.intl.formatMessage({ id: "intl.greet2" }), value: 2 }]}
                    />
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn
                        onClick={() => {
                            console.log(this.props.userData);
                            toast(this.props.intl.formatMessage({ id: "intl.notification.sentence1" }));
                            toast(this.props.intl.formatMessage({ id: "intl.notification.sentence2" }));
                            this.props.nextStep();
                        }}
                        size="L"
                    >
                        <FormattedMessage id="intl.register.step4.confirm" />
                    </RoundBtn>
                </div>
            </section>
        );
    }
}

class Step5 extends Component {
    componentWillEnter(callback) {
        TweenMax.fromTo(
            this.refs.section,
            0.5,
            {
                autoAlpha: 0,
                display: "none",
                scale: 0.8
                // rotation: -15
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
    componentDidMount() {
        // toast("恭喜你完成註冊，獲得4000點");
        // toast("舊友回娘家，獲得10000點");
        // toast(
        //     <Fragment>
        //         <p className="Toastify__text">恭喜你完成註冊，獲得4000點</p>
        //     </Fragment>
        // );
    }
    render() {
        return (
            <section className="page__section" ref="section">
                <div className="page__heading">
                    <p className="page__description">
                        <FormattedMessage id="intl.register.step5.desc" />
                    </p>
                    <p className="page__title">
                        <FormattedMessage id="intl.register.step5.title" />
                    </p>
                </div>
                <div className="page__row page__row--widthS">
                    <Block
                        data={{
                            id: "9999999",
                            name: "Melody",
                            country: "tw",
                            countryFullName: "Taiwan",
                            character: this.props.avatarResult,
                            greet: 0
                        }}
                    />
                </div>
                <div className="page__row page__row--center">
                    <AppContextConsumer>
                        {context => {
                            return (
                                <RoundBtn routerLink={`/${context.currentCountry}/game`}>
                                    <FormattedMessage id="intl.register.step5.startgame" />
                                </RoundBtn>
                            );
                        }}
                    </AppContextConsumer>
                </div>
            </section>
        );
    }
}

export default Register;
