import React, { Component } from "react";
import axios from "axios";
import Block from "../Block";
import RoundBtn from "../RoundBtn";
import VinylRecord from "../VinylRecord";
import { Scrollbars } from "react-custom-scrollbars";
import { FormattedMessage } from "react-intl";
import checkToast from "../../helper/checkToast.js";
import greets from "../../locale/greets";

import "./index.scss";
class Freestyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            openConfrim: false,
            loading: true
        };
        this.props.appContext.toggleBgmForceMuted(false);
    }
    _start = () => {
        this.setState({
            start: true
        });
        this.props.appContext.toggleBgmForceMuted(true);
        this.refs.vinylRecord.startGame();
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
        axios({
            method: "POST",
            url: `/api/tasks/rythmgames/${this.props.cid ? this.props.cid : this.cid}/shares`,
            responseType: "json",
            data: {
                SharePostId: this.props.cid ? this.props.cid : this.cid
            }
        }).then(response => {
            var resp = response.data;
        });
    };
    _loadComplete = () => {
        this.setState({
            loading: false
        });
    };
    _freestyleComplete = result => {
        console.log("result");
        console.log(result);
        console.log(JSON.stringify(result));
        var data;
        // 送出結果
        if (this.props.cid) {
            // 雙人創作
            data = {
                GameId: this.props.cid,
                GameLevel: 1,
                GameData: JSON.stringify(result),
                GameScore: this.props.score
            };
            this.cdPlayerData2 = result;
        } else {
            // 單人創作
            data = {
                InvitationId: this.props.invite.userTaskId,
                GameLevel: 1,
                GameData: JSON.stringify(result),
                GameScore: this.props.score
            };
            this.cdPlayerData1 = result;
        }

        // this.setState({
        //     openConfrim: true
        // });
        // this.props.appContext.toggleBgmForceMuted(false);
        // this.cid = "99999";

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
                this.cid = resp.data.Game.Id;
                checkToast();
            } else {
                alert(resp.code);
            }
        });
    };
    render() {
        return (
            <div className="freestyle">
                <div className="freestyle__vinylRecordContainer">
                    <VinylRecord
                        ref="vinylRecord"
                        defaultMode="freestyle"
                        player={this.props.cid ? 2 : 1}
                        loadComplete={this._loadComplete}
                        cdPlayerData1={this.cdPlayerData1}
                        cdPlayerData2={this.cdPlayerData2}
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
                                        <RoundBtn onClick={this._start} disabled={this.state.loading}>
                                            {this.state.loading ? <p>Loading</p> : <FormattedMessage id="intl.rhythmgame.confrim.btn" />}
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
