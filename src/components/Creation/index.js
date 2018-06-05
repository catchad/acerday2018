import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { Link } from "react-router-dom";
import VinylRecord from "../VinylRecord";
import Background from "../Background";
import checkToast from "../../helper/checkToast.js";
import "./index.scss";
import iconPlay from "./icon_play_play.svg";
import iconStop from "./icon_play_stop.svg";
import iconShare from "./icon_play_share.svg";
import iconBack from "./icon_play_back.svg";

class Creation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            loading: true
        };
        // console.log(this.props);
        console.log("作品ID:" + this.props.match.params.cid);
        console.log(this.props.match.params.complete == "complete" ? "雙人" : "單人");

        axios({
            method: "GET",
            url: `/api/tasks/rythmgames/${this.props.match.params.cid}`,
            responseType: "json"
        }).then(response => {
            console.log(response);
            var resp = response.data;
            if (resp.code == 200) {
                if (this.props.match.params.complete == "complete") {
                    console.log("雙人");
                    this.shareUrl = resp.data.ShareUrlComplete;
                    this.setState({
                        cdPlayerData1: JSON.parse(resp.data.Players[0].GameData),
                        cdPlayerData2: JSON.parse(resp.data.Players[1].GameData)
                    });
                } else {
                    console.log("單人");
                    this.shareUrl = resp.data.ShareUrl;
                    this.setState({
                        cdPlayerData1: JSON.parse(resp.data.Players[0].GameData)
                    });
                }
            }
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.playing !== this.state.playing) this.props.appContext.toggleBgmForceMuted(this.state.playing);
    }
    playerClick = () => {
        if (this.state.loading) return;
        this.setState(
            {
                playing: !this.state.playing
            },
            () => {
                if (this.state.playing) {
                    this.refs.vinylRecord.play();
                } else {
                    this.refs.vinylRecord.stop();
                }
            }
        );
    };
    shareClick = () => {
        if (this.props.appContext.sns == "Facebook" || this.props.appContext.sns == "") {
            FB.ui(
                {
                    method: "share",
                    href: this.shareUrl
                },
                response => {
                    axios({
                        method: "POST",
                        url: `/api/tasks/rythmgames/${this.props.match.params.cid}/shares`,
                        responseType: "json"
                    }).then(response => {
                        checkToast(this.props.appContext);
                    });
                }
            );
        }
        if (this.props.appContext.sns == "Twitter") {
            window.open(`http://twitter.com/share?url=${this.shareUrl}`, "_blank");
            axios({
                method: "POST",
                url: `/api/tasks/rythmgames/${this.props.match.params.cid}/shares`,
                responseType: "json"
            }).then(response => {
                checkToast(this.props.appContext);
            });
        }
    };
    render() {
        return (
            <div className="creation">
                <div className="creation__vinylRecordContainer">
                    <VinylRecord
                        ref="vinylRecord"
                        defaultMode="cdplayer"
                        cdPlayerData1={this.state.cdPlayerData1}
                        cdPlayerData2={this.state.cdPlayerData2}
                        loadComplete={() => {
                            this.setState({
                                loading: false
                            });
                        }}
                        onPlayerEnd={() => {
                            this.setState({
                                playing: false
                            });
                        }}
                    />
                </div>
                <div className="creation__ui">
                    <Link className="creation__btn" to={`/${this.props.appContext.currentCountry}/record`}>
                        <img className="creation__icon" src={iconBack} />
                        <p>
                            <FormattedMessage id="intl.creation.back" />
                        </p>
                    </Link>

                    <a className="creation__btn" onClick={this.playerClick} style={this.state.loading ? { opacity: 0.6 } : {}}>
                        {this.state.playing ? (
                            <Fragment>
                                <img className="creation__icon" src={iconStop} />
                                <p>
                                    <FormattedMessage id="intl.creation.pause" />
                                </p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <img className="creation__icon" src={iconPlay} />
                                <p>
                                    <FormattedMessage id="intl.creation.play" />
                                </p>
                            </Fragment>
                        )}
                    </a>
                    <a className="creation__btn">
                        <img className="creation__icon" src={iconShare} onClick={this.shareClick} />
                        <p>
                            <FormattedMessage id="intl.creation.share" />
                        </p>
                    </a>
                </div>
                <Background />
            </div>
        );
    }
}

export default Creation;
