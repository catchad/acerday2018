import React, { Component } from "react";
import axios from "axios";
import Block from "../Block";
import RoundBtn from "../RoundBtn";
import VinylRecord from "../VinylRecord";
import { Scrollbars } from "react-custom-scrollbars";
import { FormattedMessage } from "react-intl";
import greets from "../../locale/greets";

import "./index.scss";
class Freestyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            openConfrim: false
        };
        this.props.appContext.toggleBgmForceMuted(false);
    }
    _start = () => {
        this.setState({
            start: true
        });
        this.props.appContext.toggleBgmForceMuted(true);
    };
    _preview = () => {
        this.refs.vinylRecord.setMode("cdplayer");
        this.refs.vinylRecord.play();
        this.setState({
            openConfrim: false
        });
        this.props.appContext.toggleBgmForceMuted(true);
    };
    _share = () => {
        console.log("share");
        axios({
            method: "POST",
            url: `/api/tasks/rythmgames/${this.props.cid}/shares`,
            responseType: "json",
            data: data
        }).then(response => {
            console.log(response);
            var resp = response.data;
        });
    };
    _freestyleComplete = melody => {
        console.log(this.props.invite);
        var data;
        // 送出結果
        if (this.props.cid) {
            // 雙人創作
            data = {
                GameId: this.props.cid,
                GameLevel: 1,
                GameData: JSON.stringify(melody),
                GameScore: this.props.score
            };
        } else {
            // 單人創作
            data = {
                InvitationId: this.props.invite.userTaskId,
                GameLevel: 1,
                GameData: JSON.stringify(melody),
                GameScore: this.props.score
            };
        }
        axios({
            method: "POST",
            url: "/api/tasks/rythmgames",
            responseType: "json",
            data: data
        }).then(response => {
            console.log(response);
            var resp = response.data;

            if (resp.code == 201) {
                this.setState({
                    openConfrim: true
                });
                this.props.appContext.toggleBgmForceMuted(false);
            } else {
                alert(resp.code);
            }
        });

        // console.log({
        //     InvitationId: this.props.invite.userTaskId,
        //     GameLevel: 1,
        //     GameData: melody,
        //     GameScore: this.props.score
        // });

        // setTimeout(() => {
        //     var response = {
        //         code: 201,
        //         message: "Created",
        //         data: {
        //             Points: 2000,
        //             Game: {
        //                 Id: "1234567",
        //                 Players: [
        //                     {
        //                         User: {
        //                             Id: "1234567",
        //                             UserCode: "ABCDE12345",
        //                             Country: "tw",
        //                             GreetingTextKey: "1",
        //                             DisplayName: "張大山",
        //                             ProfileImageUrl: "https://www.acer-day.com/_upload/profile/xxxxxxxxx.jpg"
        //                         },
        //                         InvitationId: "xxxx-xxxx-xxxx",
        //                         GameLevel: 1,
        //                         GameScore: 2000,
        //                         GameData: "xxxxxx",
        //                         CreateTime: "2018-06-01T12:34:56.789Z"
        //                     }
        //                 ]
        //             }
        //         }
        //     };

        //     this.setState({
        //         openConfrim: true
        //     });
        //     this.props.appContext.toggleBgmForceMuted(false);
        // }, 500);

        // console.log("freestyle complete");
        // console.log("freestyle data:");
        // console.log(melody);
        // console.log("合作模式: " + this.props.cid);
        // console.log("分數: " + this.props.score);
    };
    render() {
        return (
            <div className="freestyle">
                <div className="freestyle__vinylRecordContainer">
                    <VinylRecord
                        ref="vinylRecord"
                        defaultMode="freestyle"
                        cdplayerData={[]}
                        onPlayerEnd={() => {
                            this.setState({
                                openConfrim: true
                            });
                            this.props.appContext.toggleBgmForceMuted(false);
                        }}
                        onGameover={this._freestyleComplete}
                    />
                </div>

                <p className="freestyle__score" onClick={this.gameOver}>
                    {this.props.score}
                </p>
                <div className="freestyle__p1">
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
                <div className="freestyle__p2">
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
                {!this.state.start ? (
                    <div className="freestyleReady">
                        <div className="freestyleReady__wrapper">
                            <Scrollbars>
                                <div className="freestyleReady__contentWrapper">
                                    <p className="freestyleReady__title">
                                        <FormattedMessage id="intl.freestyle.ready.title" />
                                    </p>
                                    <p className="freestyleReady__text">
                                        <FormattedMessage id="intl.freestyle.ready.desc" />
                                    </p>
                                    <img className="freestyleReady__gif" src="http://via.placeholder.com/400x400" />
                                    <div>
                                        <RoundBtn onClick={this._start}>
                                            <FormattedMessage id="intl.rhythmgame.confrim.btn" />
                                        </RoundBtn>
                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                {this.state.openConfrim ? (
                    <div className="gameComplete">
                        <div className="gameComplete__wrapper">
                            <p className="gameComplete__title">
                                <FormattedMessage id="intl.freestyle.confrim.title" />
                            </p>
                            <p className="gameComplete__text">
                                <FormattedMessage id="intl.freestyle.confrim.text" />
                            </p>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M" onClick={this._share}>
                                    <FormattedMessage id="intl.freestyle.confrim.share" />
                                </RoundBtn>
                            </div>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M" secondary onClick={this._preview}>
                                    <FormattedMessage id="intl.freestyle.confrim.preview" />
                                </RoundBtn>
                            </div>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M" secondary onClick={this.props.restart}>
                                    <FormattedMessage id="intl.freestyle.confrim.restart" />
                                </RoundBtn>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Freestyle;
