import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
import CircleBtn from "../CircleBtn";
import RoundBtn from "../RoundBtn";
import { setScrollbar, toggleTask } from "../../action";
import TaskProgress from "../TaskProgress";
import TaskItemGroup from "../TaskItemGroup";
import { AppContextConsumer } from "../../AppContext";

import "./index.scss";

class Task extends Component {
    constructor(props) {
        super(props);

        const doc = window.document;
        this.node = doc.getElementById("portal");
        // doc.body.appendChild(this.node);
    }
    componentWillEnter(callback) {
        TweenMax.fromTo(this.refs.task, 0.25, { autoAlpha: 0 }, { autoAlpha: 1 });
        TweenMax.fromTo(this.refs.taskWrap, 0.5, { scale: 0.7 }, { scale: 1, ease: Back.easeOut, onComplete: callback });
    }

    componentWillLeave(callback) {
        TweenMax.to(this.refs.taskWrap, 0.5, { scale: 0.5, ease: Back.easeIn, onComplete: callback });
        TweenMax.to(this.refs.task, 0.25, { autoAlpha: 0, delay: 0.25 });
    }
    componentDidMount() {
        document.body.classList.add("body--hideScrollbar");
    }
    componentWillUnmount() {
        document.body.classList.remove("body--hideScrollbar");
    }

    render() {
        return createPortal(
            <div className="task" ref="task">
                <div className="task__outerWrapper" ref="taskWrap">
                    <div className="task__innerWrapper">
                        <p className="task__title">
                            <FormattedMessage id="intl.task.title" />
                        </p>
                        {/* <hr className="task__hr" /> */}
                        <div className="task__list">
                            <TaskItemGroup name="限定任務" desc="任務於指定日期開啟，完成即可獲得額外點數">
                                {/* <div className="task__item">
                                    <p className="task__name">看影片回答問題1，2,000</p>
                                    <p className="task__desc">回答問題就可獲得2,000點，1月25日開啟任務</p>
                                </div> */}
                                <SpecialTask name="完成任務1獲得2000點" desc="看影片找答案即可獲得點數" comingsoontext="7/21開啟任務" link="st1" />
                                <SpecialTask name="完成任務2獲得4000點" desc="看影片找答案即可獲得點數" comingsoontext="7/27開啟任務" link="st2" />
                                <SpecialTask name="完成任務3獲得2000點" desc="看影片找答案即可獲得點數" comingsoontext="7/31開啟任務" link="st3" commingsoon />
                            </TaskItemGroup>

                            <div className="task__item">
                                <p className="task__name">玩節奏遊戲，1,000/天</p>
                                <p className="task__desc">每日可獲得1,000點，最高8天可獲得8,000點</p>
                                <TaskProgress molecular="5000" denominator="8000" unit="1000" />
                            </div>
                            <div className="task__item">
                                <p className="task__name">接受創作邀請，600/天</p>
                                <p className="task__desc">每日可獲得600點，最高8天可獲得4,800點</p>
                                <TaskProgress molecular="3600" denominator="4800" unit="600" />
                            </div>
                            <div className="task__item">
                                <p className="task__name">完成共同創作，1,500/天</p>
                                <p className="task__desc">每日可獲得1,500點，最高可獲得12,000點</p>
                                <TaskProgress molecular="3000" denominator="12000" unit="1500" />
                            </div>
                        </div>
                    </div>
                    <AppContextConsumer>
                        {context => {
                            return (
                                <CircleBtn
                                    className="task__close"
                                    onClick={() => {
                                        context.task.toggle();
                                    }}
                                />
                            );
                        }}
                    </AppContextConsumer>
                </div>
            </div>,
            this.node
        );
    }
}

class SpecialTask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`task__special ${this.props.commingsoon ? "task__special--comingsoon" : ""}`}>
                <div className="task__specialLeft">
                    <img className="task__specialLeftIcon" src="https://fakeimg.pl/70x70/" />
                </div>
                <div className="task__specialRight">
                    <div className="task__specialRightTextWrap">
                        <p className="task__name">{this.props.name}</p>
                        {this.props.commingsoon ? <p className="task__desc">{this.props.comingsoontext}</p> : <p className="task__desc">{this.props.desc}</p>}
                    </div>
                    <div className="task__specialRightBtnWrap">
                        <AppContextConsumer>
                            {appContext => {
                                return (
                                    <Link
                                        onClick={() => {
                                            appContext.task.toggle();
                                        }}
                                        to={`/${appContext.currentCountry}/${this.props.link}`}
                                    >
                                        <RoundBtn size="S">GO</RoundBtn>
                                    </Link>
                                );
                            }}
                        </AppContextConsumer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;
