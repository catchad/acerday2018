import React, { Component } from "react";
import { createPortal } from "react-dom";
import CircleBtn from "../CircleBtn/";
import RoundBtn from "../RoundBtn";
import TaskItemGroup from "../TaskItemGroup";
import { FormattedMessage } from "react-intl";
import { AppContextConsumer } from "../../AppContext";
import "./index.scss";

class Notification extends Component {
    constructor(props) {
        super(props);
        const doc = window.document;
        this.node = doc.getElementById("portal");
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
            <div className="notification" ref="task">
                <div className="notification__outerWrapper" ref="taskWrap">
                    <div className="notification__innerWrapper">
                        <p className="notification__title">
                            <FormattedMessage id="intl.notification.title" />
                        </p>
                        <TaskItemGroup name="共同創作邀請" desc="展開看誰邀請你完成創作">
                            <div className="notification__invite">
                                <div className="notification__inviteLeft">
                                    <img className="notification__icon" src="https://fakeimg.pl/50x50/" />
                                    <p className="notification__name">Rachel Wang 邀請你</p>
                                </div>
                                <div className="notification__inviteRight">
                                    <RoundBtn size="S">GO</RoundBtn>
                                </div>
                            </div>
                            <div className="notification__invite">
                                <div className="notification__inviteLeft">
                                    <img className="notification__icon" src="https://fakeimg.pl/50x50/" />
                                    <p className="notification__name">Rachel Wang 邀請你</p>
                                </div>
                                <div className="notification__inviteRight">
                                    <RoundBtn size="S">GO</RoundBtn>
                                </div>
                            </div>
                            <div className="notification__invite">
                                <div className="notification__inviteLeft">
                                    <img className="notification__icon" src="https://fakeimg.pl/50x50/" />
                                    <p className="notification__name">Rachel Wang 邀請你</p>
                                </div>
                                <div className="notification__inviteRight">
                                    <RoundBtn size="S">GO</RoundBtn>
                                </div>
                            </div>
                        </TaskItemGroup>
                        <div className="notification__list">
                            <div className="notification__item">
                                <p className="notification__date">2018/07/23</p>
                                <ul className="notification__msgList">
                                    <li className="notification__msg">你從註冊日起連續登錄網站第三天，獲得 2000 點。</li>
                                </ul>
                            </div>
                            <div className="notification__item">
                                <p className="notification__date">2018/07/22</p>
                                <ul className="notification__msgList">
                                    <li className="notification__msg">分享了與 Issac Chuang 的共同創作，獲得 500 點。</li>
                                    <li className="notification__msg">Issac Chuang 完成與你的共同創作，獲得 1500 點。</li>
                                    <li className="notification__msg">你今天第一次打招呼的對象是 Issac Chuang，獲得 1000 點。</li>
                                </ul>
                            </div>
                            <div className="notification__item">
                                <p className="notification__date">2018/07/21</p>
                                <ul className="notification__msgList">
                                    <li className="notification__msg">舊友回娘家，獲得 10000 點。</li>
                                    <li className="notification__msg">恭喜你完成註冊，獲得 4000 點。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <AppContextConsumer>
                        {context => {
                            return (
                                <CircleBtn
                                    className="notification__close"
                                    onClick={() => {
                                        context.notification.toggle();
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

export default Notification;
