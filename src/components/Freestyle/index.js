import React, { Component } from "react";
import Block from "../Block";
import RoundBtn from "../RoundBtn";
// import { TweenMax } from "gsap";
// import Draggable from "gsap/Draggable";
// import ThrowPropsPlugin from "./ThrowPropsPlugin.min.js";
// import cd from "./cd.png";
// import noteImg from "./note.png";
// import noteImg1 from "./note1.png";
// import noteImg2 from "./note2.png";
// import logo from "./logo.png";
// import * as PIXI from "pixi.js";
import VinylRecord from "../VinylRecord";

import "./index.scss";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
class Freestyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConfrim: false
        };
    }
    preview = () => {
        console.log(this.refs.vinylRecord);
        this.refs.vinylRecord.setMode("cdplayer");
        this.refs.vinylRecord.play();
        this.setState({
            openConfrim: false
        });
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
                        }}
                        onGameover={() => {
                            this.setState({
                                openConfrim: true
                            });
                        }}
                    />
                </div>

                <p className="freestyle__score" onClick={this.gameOver}>
                    {this.props.score}
                </p>
                <div className="freestyle__p1">
                    <Block
                        data={{
                            id: "",
                            name: "Ray Su",
                            country: "Taiwan",
                            img: "https://fakeimg.pl/300x450/282828/eae0d0",
                            greet: "讓我們用音樂 Cool together"
                        }}
                    />
                </div>
                <div className="freestyle__p2">
                    <Block
                        data={{
                            id: "",
                            name: "Ray Su",
                            country: "Taiwan",
                            img: "https://fakeimg.pl/300x450/282828/eae0d0",
                            greet: "讓我們用音樂 Cool together"
                        }}
                    />
                </div>
                {this.state.openConfrim ? (
                    <div className="gameComplete">
                        <div className="gameComplete__wrapper">
                            <p className="gameComplete__title">遊戲完成</p>
                            <p className="gameComplete__text">請等待朋友完成共同創作</p>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M">分享音樂</RoundBtn>
                            </div>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M" secondary onClick={this.preview}>
                                    再聽一次
                                </RoundBtn>
                            </div>
                            <div className="gameComplete__row">
                                <RoundBtn fixedSize="M" secondary onClick={this.props.restart}>
                                    繼續其他創作
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
