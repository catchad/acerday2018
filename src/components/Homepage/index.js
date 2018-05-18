import React, { Component, Fragment } from "react";

import { FormattedMessage, intlShape, IntlProvider } from "react-intl";
import { Link } from "react-router-dom";
import { AppContextConsumer } from "../../AppContext";
import { IntlContextConsumer } from "../../IntlContext";

import Background from "../Background";
import RoundBtn from "../RoundBtn";
import ColorRect from "../ColorRect";
import "./index.scss";

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
        // console.log(this.refs.homepage.childNodes);
        // console.log(this.refs.homepage.childNodes.querySelectorAll(".homepage__slide"));

        // document.querySelectorAll(".homepage__slide").forEach((el, id) => {
        //     this.slides.push(el);
        // });
        this.sliderNum = document.querySelectorAll(".homepage__slide").length - 1;
        // this._loop();
        this.myReq = requestAnimationFrame(this._loop);
    }
    _loop = () => {
        this.checker++;
        if (this.checker > 150) {
            this.setState({
                currentID: this.state.currentID + 1 > this.sliderNum ? 0 : this.state.currentID + 1
            });

            this.checker = 0;
        }
        this.myReq = requestAnimationFrame(this._loop);
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentID !== this.state.currentID) {
            if (this.state.currentID == 0) {
                TweenMax.staggerFromTo(document.querySelectorAll(".homepage__slide--1 .homepage__item"), 0.75, { scale: 0 }, { scale: 1, ease: Back.easeOut }, 0.2);
            }
            if (this.state.currentID == 1) {
                TweenMax.staggerFromTo(document.querySelectorAll(".homepage__slide--2 .homepage__item"), 0.75, { scale: 0 }, { scale: 1, ease: Back.easeOut }, 0.2);
            }
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.myReq);
    }

    render() {
        return (
            <div className="homepage">
                <div className="homepage__slide homepage__slide--1" style={this.state.currentID == 0 ? { opacity: 1 } : { opacity: 0 }}>
                    {/* <div className="homepage__bg" /> */}
                    <div className="homepage__item homepage__item--1">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/500x400/" />
                    </div>
                    <div className="homepage__item homepage__item--2">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/350x350/" />
                    </div>
                    <div className="homepage__item homepage__item--3">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/150x300/" />
                    </div>
                    <div className="homepage__item homepage__item--4">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/500x400/" />
                    </div>
                    <div className="homepage__item homepage__item--5">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/350x350/" />
                    </div>
                    <div className="homepage__item homepage__item--6">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/250x400/" />
                    </div>
                </div>
                <div className="homepage__slide homepage__slide--2" style={this.state.currentID == 1 ? { opacity: 1 } : { opacity: 0 }}>
                    {/* <div className="homepage__bg" /> */}
                    <div className="homepage__item homepage__item--1">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/600x500/" />
                    </div>
                    <div className="homepage__item homepage__item--2">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/300x600/" />
                    </div>
                    <div className="homepage__item homepage__item--3">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/400x100/" />
                    </div>
                    <div className="homepage__item homepage__item--4">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/400x400/" />
                    </div>
                    <div className="homepage__item homepage__item--5">
                        <img className="homepage__itemImg" src="https://fakeimg.pl/150x250/" />
                    </div>
                </div>
                <div className="homepage__content">
                    <img className="homepage__logo" src="https://fakeimg.pl/400x250/" />
                    <p className="homepage__text">
                        每天都好玩！一起玩音樂！玩創作！<br />集點酷！抽大獎！
                    </p>
                    <AppContextConsumer>
                        {context => {
                            return (
                                <Link to={`/${context.currentCountry}/register`}>
                                    <RoundBtn color1="#00D8EF" color2="#0097FF">
                                        <p>登錄</p>
                                    </RoundBtn>
                                </Link>
                            );
                        }}
                    </AppContextConsumer>
                </div>
                <div className="homepage__bg homepage__bg--1" style={this.state.currentID == 0 ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: 5 }} />
                <div className="homepage__bg homepage__bg--2" style={this.state.currentID == 1 ? { opacity: 1, zIndex: 10 } : { opacity: 0, zIndex: 5 }} />
                <Background transparent zIndex="15" />
                {/* <Background color1="#FF0081" color2="#FF0082" /> */}
            </div>
        );
    }
}
export default Homepage;
