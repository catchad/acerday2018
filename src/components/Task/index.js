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

        this.state = {};
        // this.taskNames = ["rhythmGame", "acceptInvite", "completeCreation", "shareCreation", "login", "greet", "loginEveryday3", "loginEveryday8", "greetEveryday"];
        // this.specialTaskNames = [{ name: "specialTask1", open: true }, { name: "specialTask2", open: true }, { name: "specialTask3", open: false }];
        setTimeout(() => {
            this.setState({
                data: {
                    specialTask: [true, true, false],
                    normalTask: [
                        {
                            // 玩節奏遊戲
                            name: "rhythmGame",
                            point: 1000,
                            finish: 2,
                            limit: 8
                        },
                        {
                            // 接受邀請
                            name: "acceptInvite",
                            point: 600,
                            finish: 1,
                            limit: 8
                        },
                        {
                            // 完成共同創作
                            name: "completeCreation",
                            point: 1500,
                            finish: 3,
                            limit: 8
                        },
                        {
                            // 分享共同創作
                            name: "shareCreation",
                            point: 500,
                            finish: 2,
                            limit: 16
                        },
                        {
                            // 每天登入網站
                            name: "login",
                            point: 800,
                            finish: 1,
                            limit: 14
                        },
                        {
                            // 打招呼
                            name: "greet",
                            point: 1000,
                            finish: 1,
                            limit: 8
                        },
                        {
                            // 連續登入網站3天
                            name: "loginEveryday3",
                            point: 2000,
                            finish: 0,
                            limit: 1
                        },
                        {
                            // 連續登入網站8天
                            name: "loginEveryday8",
                            point: 4000,
                            finish: 0,
                            limit: 1
                        },
                        {
                            // 限時8天內交友
                            name: "greetEveryday",
                            point: 5000,
                            finish: 0,
                            limit: 1
                        }
                    ]
                }
            });
        }, 1000);
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
                        {this.state.data ? (
                            <div className="task__list">
                                <TaskItemGroup name="限定任務" desc="任務於指定日期開啟，完成即可獲得額外點數">
                                    {this.state.data.specialTask.map((el, id) => {
                                        return <SpecialTask key={id} icon={el ? "https://fakeimg.pl/70x70/" : "https://fakeimg.pl/70x70/282828/eae0d0/"} name={this.props.intlContext.formatMessage({ id: `intl.task.specialTask${id + 1}.name` })} activeText={this.props.intlContext.formatMessage({ id: `intl.task.specialTask${id + 1}.active` })} unactiveText={this.props.intlContext.formatMessage({ id: `intl.task.specialTask${id + 1}.unactive` })} link={`st${id + 1}`} active={el} />;
                                    })}
                                </TaskItemGroup>

                                {this.state.data.normalTask.map((el, id) => {
                                    return (
                                        <div className="task__item" key={id}>
                                            <p className="task__name">
                                                <FormattedMessage id={`intl.task.${el.name}.name`} />
                                            </p>
                                            <p className="task__desc">
                                                <FormattedMessage id={`intl.task.${el.name}.desc`} />
                                            </p>
                                            <TaskProgress molecular={el.point * el.finish} denominator={el.point * el.limit} unit={el.point} />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <CircleBtn
                        className="task__close"
                        onClick={() => {
                            this.props.appContext.task.toggle();
                        }}
                    />
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
            <div className={`task__special ${this.props.active ? "task__special--active" : ""}`}>
                <div className="task__specialLeft">
                    <img className="task__specialLeftIcon" src={this.props.icon} />
                </div>
                <div className="task__specialRight">
                    <div className="task__specialRightTextWrap">
                        <p className="task__name">{this.props.name}</p>
                        {this.props.active ? <p className="task__desc">{this.props.activeText}</p> : <p className="task__desc">{this.props.unactiveText}</p>}
                    </div>
                    <div className="task__specialRightBtnWrap">
                        {this.props.active ? (
                            <AppContextConsumer>
                                {appContext => {
                                    return (
                                        <RoundBtn
                                            onClick={() => {
                                                appContext.task.toggle();
                                            }}
                                            size="S"
                                            routerLink={`/${appContext.currentCountry}/${this.props.link}`}
                                        >
                                            GO
                                        </RoundBtn>
                                    );
                                }}
                            </AppContextConsumer>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;
