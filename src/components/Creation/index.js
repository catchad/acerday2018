import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { Link } from "react-router-dom";
import VinylRecord from "../VinylRecord";
import Background from "../Background";
import "./index.scss";
class Creation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
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
                console.log(resp);
            }
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.playing !== this.state.playing) this.props.appContext.toggleBgmForceMuted(this.state.playing);
    }
    playerClick = () => {
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

    render() {
        return (
            <div className="creation">
                <div className="creation__vinylRecordContainer">
                    <VinylRecord
                        ref="vinylRecord"
                        defaultMode="cdplayer"
                        onPlayerEnd={() => {
                            this.setState({
                                playing: false
                            });
                        }}
                    />
                </div>
                <div className="creation__ui">
                    <Link className="creation__btn" to={`/${this.props.appContext.currentCountry}/record`}>
                        <img className="creation__icon" src="https://fakeimg.pl/50x50/" />
                        <p>
                            <FormattedMessage id="intl.creation.back" />
                        </p>
                    </Link>

                    <a className="creation__btn" onClick={this.playerClick}>
                        {this.state.playing ? (
                            <Fragment>
                                <img className="creation__icon" src="https://fakeimg.pl/50x50/" />
                                <p>
                                    <FormattedMessage id="intl.creation.pause" />
                                </p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <img className="creation__icon" src="https://fakeimg.pl/50x50/" />
                                <p>
                                    <FormattedMessage id="intl.creation.play" />
                                </p>
                            </Fragment>
                        )}
                    </a>
                    <a className="creation__btn">
                        <img className="creation__icon" src="https://fakeimg.pl/50x50/" />
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
