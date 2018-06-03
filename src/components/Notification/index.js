import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";
import { Scrollbars } from "react-custom-scrollbars";
import axios from "axios";
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

        this.state = {
            data: {}
        };

        axios({
            method: "GET",
            url: "/api/tasks/rythmgames",
            responseType: "json"
        }).then(response => {
            console.log(response);
            var resp = response.data;

            if (resp.code == 200) {
                var inviteData = [];

                resp.data.List.forEach((el, id) => {
                    if (el.Players.length == 2) {
                        if (el.Players[1].User.Id == this.props.appContext.id && el.Players[1].GameData == null) {
                            inviteData.push({
                                id: el.Id,
                                name: el.Players[0].User.DisplayName
                            });
                        }
                    }
                });
                console.log(inviteData);

                this.setState({
                    data: {
                        ...this.state.data,
                        invite: inviteData
                    }
                });
            } else {
                alert(resp.code);
            }
        });

        // setTimeout(() => {
        //     this.setState({
        //         data: {
        //             // 邀請
        //             // invite: [
        //             //     {
        //             //         id: "wehewhaweh",
        //             //         name: "Rachel Wang"
        //             //     },
        //             //     {
        //             //         id: "wehewhaweh",
        //             //         name: "Rachel Wang"
        //             //     },
        //             //     {
        //             //         id: "wehewhaweh",
        //             //         name: "Rachel Wang"
        //             //     },
        //             //     {
        //             //         id: "wehewhaweh",
        //             //         name: "Rachel Wang"
        //             //     }
        //             // ],
        //             ...this.state.data,
        //             // 通知
        //             notification: [
        //                 {
        //                     date: "2018/7/25",
        //                     sentence: [
        //                         {
        //                             id: 10,
        //                             values: {
        //                                 name: "Melody"
        //                             }
        //                         },
        //                         {
        //                             id: 11,
        //                             values: {
        //                                 name: "Melody"
        //                             }
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     date: "2018/7/24",
        //                     sentence: [
        //                         {
        //                             id: 6,
        //                             values: {
        //                                 name: "Melody"
        //                             }
        //                         },
        //                         {
        //                             id: 7
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     date: "2018/7/23",
        //                     sentence: [
        //                         {
        //                             id: 1
        //                         },
        //                         {
        //                             id: 2
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     });
        // }, 1000);
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
                    <Scrollbars>
                        <div className="notification__innerWrapper">
                            <p className="notification__title">
                                <FormattedMessage id="intl.notification.title" />
                            </p>

                            {this.state.data.invite && this.state.data.invite.length > 0 ? (
                                <TaskItemGroup name={this.props.intlContext.formatMessage({ id: "intl.notification.invite.title" })} desc={this.props.intlContext.formatMessage({ id: "intl.notification.invite.desc" })}>
                                    {this.state.data.invite.map((el, id) => {
                                        return (
                                            <div className="notification__invite" key={id}>
                                                <div className="notification__inviteLeft">
                                                    <img className="notification__icon" src="https://fakeimg.pl/50x50/" />
                                                    <p className="notification__name">
                                                        <FormattedMessage id="intl.notification.invite.action" values={{ name: el.name }} />{" "}
                                                    </p>
                                                </div>
                                                <div className="notification__inviteRight">
                                                    <RoundBtn
                                                        size="S"
                                                        routerLink={`/${this.props.appContext.currentCountry}/game/${el.id}`}
                                                        onClick={() => {
                                                            this.props.appContext.notification.toggle();
                                                        }}
                                                    >
                                                        GO
                                                    </RoundBtn>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </TaskItemGroup>
                            ) : (
                                ""
                            )}

                            {this.props.appContext.notification.data && this.props.appContext.notification.data.length > 0 ? (
                                <div className="notification__list">
                                    {this.props.appContext.notification.data.map((el, id) => {
                                        return (
                                            <div className="notification__item" key={id}>
                                                <p className="notification__date">{el.date}</p>
                                                <ul className="notification__msgList">
                                                    {el.sentence.map((el2, id2) => {
                                                        return (
                                                            <li className="notification__msg" key={id2}>
                                                                <FormattedMessage id={`intl.notification.sentence${el2.id}`} values={el2.values} />
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </Scrollbars>

                    <CircleBtn
                        className="notification__close"
                        onClick={() => {
                            this.props.appContext.notification.toggle();
                        }}
                    />
                </div>
            </div>,
            this.node
        );
    }
}

export default Notification;
