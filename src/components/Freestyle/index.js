import React, { Component } from "react";
import Block from "../Block";
import RoundBtn from "../RoundBtn";
import VinylRecord from "../VinylRecord";
import { FormattedMessage } from "react-intl";
import greets from "../../locale/greets";

import "./index.scss";
class Freestyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConfrim: false
        };
    }
    preview = () => {
        this.refs.vinylRecord.setMode("cdplayer");
        this.refs.vinylRecord.play();
        this.setState({
            openConfrim: false
        });
        this.props.appContext.toggleBgmForceMuted(true);
    };
    _freestyleComplete = melody => {
        this.setState({
            openConfrim: true
        });
        this.props.appContext.toggleBgmForceMuted(false);
        console.log("freestyle complete");
        console.log("freestyle data:");
        console.log(melody);
        console.log("合作模式: " + this.props.cid);
        console.log("分數: " + this.props.score);
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
                                <RoundBtn fixedSize="M">
                                    <FormattedMessage id="intl.freestyle.confrim.share" />
                                </RoundBtn>
                            </div>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M" secondary onClick={this.preview}>
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
