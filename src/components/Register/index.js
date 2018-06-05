import React, { Component, Fragment } from "react";
import axios from "axios";
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
import icon_male from "./icon-male.svg";
import icon_female from "./icon-female.svg";
import ReactTransitionGroup from "react-addons-transition-group";
import { FormattedMessage } from "react-intl";
import { AppContextConsumer } from "../../AppContext";
import { IntlContextConsumer } from "../../IntlContext";
import { toast } from "react-toastify";
import keyBy from "lodash/keyBy";
import flagSG from "./flag-sg.svg";
import flagTW from "./flag-tw.svg";

import iconFemaleEye from "./icon_female_eye.svg";
import iconFemaleHair from "./icon_female_hair.svg";
import iconFemaleMouth from "./icon_female_mouth.svg";
import iconMaleEye from "./icon_male_eye.svg";
import iconMaleHair from "./icon_male_hair.svg";
import iconMaleMouth from "./icon_male_mouth.svg";
import iconRandom from "./icon_random.svg";

import checkToast from "../../helper/checkToast.js";

import "./index.scss";
class Register extends Component {
    constructor(props) {
        super(props);
        console.log("register");
        this.state = {
            currentStep: 1,
            avatarTarget: "hair",
            avatarResult: "",
            avatarGender: "male",
            test: 1
        };
        this.userData = {
            Country: "",
            ProfileImageData: "",
            GreetingTextKey: 0
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
                    {this.state.currentStep == 1 ? <Step1 intl={this.props.intlContext} appContext={this.props.appContext} nextStep={this._nextStep} userData={this.userData} /> : null}
                    {this.state.currentStep == 2 ? <Step2 intl={this.props.intlContext} appContext={this.props.appContext} nextStep={this._nextStep} avatarGenderChange={this._avatarGenderChange} /> : null}
                    {this.state.currentStep == 3 ? <Step3 intl={this.props.intlContext} appContext={this.props.appContext} nextStep={this._nextStep} avatarGenderChange={this._avatarGenderChange} userData={this.userData} avatarTargetChange={this._avatarTargetChange} avatarResultChange={this._avatarResultChange} avatarTarget={this.state.avatarTarget} avatarGender={this.state.avatarGender} /> : null}
                    {this.state.currentStep == 4 ? <Step4 intl={this.props.intlContext} appContext={this.props.appContext} nextStep={this._nextStep} userData={this.userData} avatarResult={this.state.avatarResult} /> : null}
                    {this.state.currentStep == 5 ? <Step5 intl={this.props.intlContext} appContext={this.props.appContext} nextStep={this._nextStep} avatarResult={this.state.avatarResult} /> : null}
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
                this.props.appContext.scrollToTop();
                this.props.appContext.history.push(`/${this.props.userData.Country}/register`);
                callback();
            }
        });
    }
    _finish = () => {
        if (this.props.userData.Country == "") {
            alert(this.props.intl.formatMessage({ id: "intl.register.step1.alert.pleaseSelectCountry" }));
            return;
        }
        // this.props.appContext.history.push(`/${this.props.userData.Country}/`);
        this.props.nextStep();
    };
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
                        defaultName={this.props.intl.formatMessage({ id: "intl.register.step1.pleaseSelect" })}
                        onChange={value => {
                            this.props.userData.Country = value;
                        }}
                        options={[{ name: "Taiwan", icon: flagTW, value: "tw" }, { name: "Singapore", icon: flagSG, value: "sg" }]}
                    />
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn onClick={this._finish} size="L">
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
                this.props.appContext.scrollToTop();
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
                    <SquareBtnGroup onChange={this.props.avatarGenderChange} data={[{ text: this.props.intl.formatMessage({ id: "intl.register.step2.male" }), icon: icon_male, value: "male" }, { text: this.props.intl.formatMessage({ id: "intl.register.step2.female" }), icon: icon_female, value: "female" }]} />;
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
                this.props.appContext.scrollToTop();
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
                        <SquareBtnGroup defaultValue="hair" size="s" onChange={this.props.avatarTargetChange} data={[{ text: this.props.intl.formatMessage({ id: "intl.register.step3.hair" }), value: "hair", icon: this.props.avatarGender == "male" ? iconMaleHair : iconFemaleHair }, { text: this.props.intl.formatMessage({ id: "intl.register.step3.eye" }), value: "eye", icon: this.props.avatarGender == "male" ? iconMaleEye : iconFemaleEye }, { text: this.props.intl.formatMessage({ id: "intl.register.step3.mouth" }), value: "mouth", icon: this.props.avatarGender == "male" ? iconMaleMouth : iconFemaleMouth }]} />
                    </div>
                    <div className="avatarUI__right">
                        <CircleBtn
                            secondary
                            icon={this.props.avatarGender == "male" ? icon_female : icon_male}
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
                            icon={iconRandom}
                            onClick={() => {
                                this.refs.avatar._random();
                            }}
                        />
                        <RoundBtn
                            className="avatarUI__nextStep"
                            onClick={() => {
                                this.refs.avatar._getResult(result => {
                                    this.props.userData.ProfileImageData = result.split(",")[1];
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
    constructor(props) {
        super(props);
        this.state = {};
        this.ajaxing = false;
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
                this.props.appContext.scrollToTop();
                callback();
            }
        });
    }
    _regist(data) {
        if (this.ajaxing) return;
        this.ajaxing = true;

        console.log("_regist");
        console.log(data);
        axios({
            method: "POST",
            url: "/api/users",
            responseType: "json",
            data: data
        }).then(response => {
            console.log("finish");
            console.log(response);
            var resp = response.data;

            this.ajaxing = false;
            resp.data.Tasks = keyBy(resp.data.Tasks, "TaskName");
            console.log(resp.data.User);
            this.props.appContext.setUserData(resp.data.User);
            // toast(this.props.intl.formatMessage({ id: "intl.notification.sentence1" }));
            // toast(this.props.intl.formatMessage({ id: "intl.notification.sentence2" }));
            this.props.nextStep();

            checkToast(this.props.appContext);
        });

        // setTimeout(() => {
        //     var response = {
        //         code: 200,
        //         message: "OK",
        //         data: {
        //             Id: "1234567",
        //             InvitationCode: "ABCDE12345",
        //             Country: "tw",
        //             GreetingTextKey: "1",
        //             DisplayName: "張大山",
        //             ProfileImageUrl: "https://www.acer-day.com/_upload/profile/xxxxxxxxx.jpg",
        //             Points: 8000,
        //             Sns: "Facebook",
        //             SnsId: "10083922392228383",
        //             MaxGameLevel: 1,
        //             Tasks: [
        //                 {
        //                     TaskName: "RythmGame",
        //                     Points: 1000,
        //                     Finished: 7,
        //                     Limit: 8
        //                 },
        //                 {
        //                     // 接受邀請
        //                     TaskName: "AcceptInvitation",
        //                     Points: 600,
        //                     Finished: 6,
        //                     Limit: 8
        //                 },
        //                 {
        //                     // 完成共同創作
        //                     TaskName: "RythmGameComplete",
        //                     Points: 1500,
        //                     Finished: 4,
        //                     Limit: 8
        //                 },
        //                 {
        //                     // 分享共同創作
        //                     TaskName: "RythmGameShare",
        //                     Points: 500,
        //                     Finished: 2,
        //                     Limit: 16
        //                 }
        //             ]
        //         }
        //     };
        //     this.ajaxing = false;
        //     response.data.Tasks = keyBy(response.data.Tasks, "TaskName");
        //     this.props.appContext.setUserData(response);
        //     toast(this.props.intl.formatMessage({ id: "intl.notification.sentence1" }));
        //     toast(this.props.intl.formatMessage({ id: "intl.notification.sentence2" }));
        //     this.props.nextStep();
        // }, 1000);
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
                            console.log(value);
                            this.props.userData.GreetingTextKey = value;
                            // this.props.userData.GreetingTextKey = "greeting_1";
                        }}
                        options={[{ text: this.props.intl.formatMessage({ id: "intl.register.step4.greet1" }), value: 0 }, { text: this.props.intl.formatMessage({ id: "intl.register.step4.greet2" }), value: 1 }]}
                    />
                </div>
                <div className="page__row page__row--center">
                    <RoundBtn
                        onClick={() => {
                            this._regist(this.props.userData);
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
                this.props.appContext.scrollToTop();
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

        console.log({
            id: this.props.appContext.id,
            name: this.props.appContext.name,
            country: this.props.appContext.country,
            countryFullName: this.props.appContext.countryFullName,
            character: this.props.appContext.character,
            greet: this.props.appContext.greet
        });
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
                            name: this.props.appContext.name,
                            country: this.props.appContext.country,
                            countryFullName: this.props.appContext.countryFullName,
                            character: this.props.appContext.character,
                            greet: this.props.appContext.greet
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
