import React, { Component, Fragment } from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Background from "../Background";
import RoundBtn from "../RoundBtn";
import ColorRect from "../ColorRect";
import { TweenMax, TimelineMax } from "gsap";
import "./index.scss";

import acerdayLogo from "./acerday-logo.svg";

import img1_1 from "./1-1.png";
import img1_2 from "./1-2.png";
import img1_3 from "./1-3.png";
import img1_4 from "./1-4.png";
import img1_5 from "./1-5.png";

import img2_1 from "./2-1.png";
import img2_2 from "./2-2.png";
import img2_3 from "./2-3.png";
import img2_4 from "./2-4.png";

import img3_1 from "./3-1.png";
import img3_2 from "./3-2.png";
import img3_3 from "./3-3.png";
import img3_4 from "./3-4.png";
import img3_5 from "./3-5.png";

import img4_1 from "./4-1.png";
import img4_2 from "./4-2.png";
import img4_3 from "./4-3.png";
import img4_4 from "./4-4.png";
import img4_5 from "./4-5.png";

import img5_1 from "./5-1.png";
import img5_2 from "./5-2.png";
import img5_3 from "./5-3.png";
import img5_4 from "./5-4.png";

class Homepage extends Component {
    constructor(props) {
        super(props);
        // this._handleChange = this._handleChange.bind(this);
        // console.log(this.props);
        this.state = {
            currentID: 0
        };

        this.checker = 0;
        this.sliderNum = 0;
        this.slides = [];
    }

    componentDidMount() {
        this.sliderNum = document.querySelectorAll(".homepage__slide").length - 1;
        this.sliderAnimate = [
            new TimelineMax({ repeat: 0, paused: true })
                .fromTo(".homepage__slide--1 .homepage__item--1 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--1 .homepage__item--2 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")
                .fromTo(".homepage__slide--1 .homepage__item--3 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")

                .fromTo(".homepage__slide--1 .homepage__item--4 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--1 .homepage__item--5 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3"),

            new TimelineMax({ repeat: 0, paused: true })
                .fromTo(".homepage__slide--2 .homepage__item--1 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--2 .homepage__item--2 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")

                .fromTo(".homepage__slide--2 .homepage__item--3 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--2 .homepage__item--4 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3"),
            new TimelineMax({ repeat: 0, paused: true })
                .fromTo(".homepage__slide--3 .homepage__item--1 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--3 .homepage__item--2 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")
                .fromTo(".homepage__slide--3 .homepage__item--3 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")

                .fromTo(".homepage__slide--3 .homepage__item--4 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--3 .homepage__item--5 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3"),
            new TimelineMax({ repeat: 0, paused: true })
                .fromTo(".homepage__slide--4 .homepage__item--1 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--4 .homepage__item--2 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")
                .fromTo(".homepage__slide--4 .homepage__item--3 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")

                .fromTo(".homepage__slide--4 .homepage__item--4 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--4 .homepage__item--5 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3"),
            new TimelineMax({ repeat: 0, paused: true })
                .fromTo(".homepage__slide--5 .homepage__item--1 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--5 .homepage__item--2 .homepage__itemImg", 0.5, { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")

                .fromTo(".homepage__slide--5 .homepage__item--3 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "0")
                .fromTo(".homepage__slide--5 .homepage__item--4 .homepage__itemImg", 0.5, { opacity: 0, x: 100 }, { opacity: 1, x: 0, ease: Power2.easeOut }, "-=0.3")
        ];
        this.sliderAnimate[this.state.currentID].play();
        this.myReq = requestAnimationFrame(this._loop);

        toast(
            <Fragment>
                <p className="Toastify__title">
                    <FormattedHTMLMessage id="intl.toast.specialTaskOpen.title" />
                </p>
                <p className="Toastify__text">
                    <FormattedHTMLMessage id="intl.toast.specialTaskOpen.desc" />
                </p>
            </Fragment>
        );
        toast("歡迎回到AcerDay，獲得800點");
        toast("你連續登錄網站3天，獲得2000點");
        // toast("你連續登錄網站8天，獲得4000點");
    }

    _loop = () => {
        this.checker++;
        if (this.checker > 210) {
            this.setState({
                currentID: this.state.currentID + 1 > this.sliderNum ? 0 : this.state.currentID + 1
            });

            this.checker = 0;
        }
        this.myReq = requestAnimationFrame(this._loop);
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentID !== this.state.currentID) {
            // if (this.state.currentID == 0) {
            //     TweenMax.staggerFromTo(document.querySelectorAll(".homepage__slide--1 .homepage__item"), 0.75, { scale: 0 }, { scale: 1, ease: Back.easeOut }, 0.2);
            // }
            // if (this.state.currentID == 1) {
            //     TweenMax.staggerFromTo(document.querySelectorAll(".homepage__slide--2 .homepage__item"), 0.75, { scale: 0 }, { scale: 1, ease: Back.easeOut }, 0.2);
            // }
            this.sliderAnimate[this.state.currentID].play(0);
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.myReq);
        console.log("componentWillUnmount");

        this.sliderAnimate.forEach((el, id) => {
            el.kill();
        });
        console.log(this.sliderAnimate);
    }

    render() {
        return (
            <div>
                <div className="homepage">
                    <div className="homepage__slides">
                        <div className="homepage__slide homepage__slide--1" style={this.state.currentID == 0 ? { opacity: 1 } : { opacity: 0 }}>
                            <div className="homepage__item homepage__item--1">
                                <img className="homepage__itemImg" src={img1_1} />
                            </div>
                            <div className="homepage__item homepage__item--2">
                                <img className="homepage__itemImg" src={img1_2} />
                            </div>
                            <div className="homepage__item homepage__item--3">
                                <img className="homepage__itemImg" src={img1_3} />
                            </div>
                            <div className="homepage__item homepage__item--4">
                                <img className="homepage__itemImg" src={img1_4} />
                            </div>
                            <div className="homepage__item homepage__item--5">
                                <img className="homepage__itemImg" src={img1_5} />
                            </div>
                        </div>
                        <div className="homepage__slide homepage__slide--2" style={this.state.currentID == 1 ? { opacity: 1 } : { opacity: 0 }}>
                            <div className="homepage__item homepage__item--1">
                                <img className="homepage__itemImg" src={img2_1} />
                            </div>
                            <div className="homepage__item homepage__item--2">
                                <img className="homepage__itemImg" src={img2_2} />
                            </div>
                            <div className="homepage__item homepage__item--3">
                                <img className="homepage__itemImg" src={img2_3} />
                            </div>
                            <div className="homepage__item homepage__item--4">
                                <img className="homepage__itemImg" src={img2_4} />
                            </div>
                        </div>
                        <div className="homepage__slide homepage__slide--3" style={this.state.currentID == 2 ? { opacity: 1 } : { opacity: 0 }}>
                            <div className="homepage__item homepage__item--1">
                                <img className="homepage__itemImg" src={img3_1} />
                            </div>
                            <div className="homepage__item homepage__item--2">
                                <img className="homepage__itemImg" src={img3_2} />
                            </div>
                            <div className="homepage__item homepage__item--3">
                                <img className="homepage__itemImg" src={img3_3} />
                            </div>
                            <div className="homepage__item homepage__item--4">
                                <img className="homepage__itemImg" src={img3_4} />
                            </div>
                            <div className="homepage__item homepage__item--5">
                                <img className="homepage__itemImg" src={img3_5} />
                            </div>
                        </div>
                        <div className="homepage__slide homepage__slide--4" style={this.state.currentID == 3 ? { opacity: 1 } : { opacity: 0 }}>
                            <div className="homepage__item homepage__item--1">
                                <img className="homepage__itemImg" src={img4_1} />
                            </div>
                            <div className="homepage__item homepage__item--2">
                                <img className="homepage__itemImg" src={img4_2} />
                            </div>
                            <div className="homepage__item homepage__item--3">
                                <img className="homepage__itemImg" src={img4_3} />
                            </div>
                            <div className="homepage__item homepage__item--4">
                                <img className="homepage__itemImg" src={img4_4} />
                            </div>
                            <div className="homepage__item homepage__item--5">
                                <img className="homepage__itemImg" src={img4_5} />
                            </div>
                        </div>
                        <div className="homepage__slide homepage__slide--5" style={this.state.currentID == 4 ? { opacity: 1 } : { opacity: 0 }}>
                            <div className="homepage__item homepage__item--1">
                                <img className="homepage__itemImg" src={img5_1} />
                            </div>
                            <div className="homepage__item homepage__item--2">
                                <img className="homepage__itemImg" src={img5_2} />
                            </div>
                            <div className="homepage__item homepage__item--3">
                                <img className="homepage__itemImg" src={img5_3} />
                            </div>
                            <div className="homepage__item homepage__item--4">
                                <img className="homepage__itemImg" src={img5_4} />
                            </div>
                        </div>
                    </div>

                    <div className="homepage__content">
                        <img className="homepage__logo" src={acerdayLogo} />
                        <p className="homepage__text">
                            <FormattedHTMLMessage id="intl.homepage.text" />
                        </p>
                        <RoundBtn color1="#00D8EF" color2="#0097FF" routerLink={`/${this.props.appContext.currentCountry}/login`}>
                            <p>
                                <FormattedMessage id="intl.homepage.btn" />
                            </p>
                        </RoundBtn>
                    </div>
                    {/* <div className="homepage__bg homepage__bg--1" style={this.state.currentID == 0 ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: 5 }} /> */}
                    {/* <div className="homepage__bg homepage__bg--2" style={this.state.currentID == 1 ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: 5 }} /> */}
                    <div className="homepage__bg homepage__bg--1" style={this.state.currentID == 0 ? { opacity: 1, zIndex: -950 } : { opacity: 0, zIndex: -1000 }} />
                    <div className="homepage__bg homepage__bg--2" style={this.state.currentID == 1 ? { opacity: 1, zIndex: -950 } : { opacity: 0, zIndex: -1000 }} />
                    <div className="homepage__bg homepage__bg--3" style={this.state.currentID == 2 ? { opacity: 1, zIndex: -950 } : { opacity: 0, zIndex: -1000 }} />
                    <div className="homepage__bg homepage__bg--4" style={this.state.currentID == 3 ? { opacity: 1, zIndex: -950 } : { opacity: 0, zIndex: -1000 }} />
                    <div className="homepage__bg homepage__bg--5" style={this.state.currentID == 4 ? { opacity: 1, zIndex: -950 } : { opacity: 0, zIndex: -1000 }} />
                    {/* <Background /> */}
                    {/* <Background color1="#FF0081" color2="#FF0082" /> */}
                </div>
                <footer className="footer">
                    <div className="footer__left">
                        <p className="footer__text">Intel Inside®. Extraordinary Performance Outside.</p>
                        <p className="footer__text">Intel® Core™ i7 Processor1</p>
                        <p className="footer__text">Intel, the Intel Logo, Intel Inside, and Core Inside are trademarks</p>
                    </div>
                    <div className="footer__right">
                        <img className="footer__logo" src="http://via.placeholder.com/50x50" />
                    </div>
                </footer>
            </div>
        );
    }
}
export default Homepage;
