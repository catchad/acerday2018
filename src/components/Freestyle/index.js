import React, { Component } from "react";
import Block from "../Block";
import { TweenMax } from "gsap";
import Draggable from "gsap/Draggable";
import ThrowPropsPlugin from "./ThrowPropsPlugin.min.js";
import cd from "./cd.png";
import note from "./note.png";
import "./index.scss";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
class Freestyle extends Component {
    constructor(props) {
        super(props);
        this.currentPosition = 0;
        this.melody = [0, 0];
    }
    componentDidMount() {
        this.d = Draggable.create(this.refs.cd, {
            type: "rotation",
            throwProps: true,
            onDrag: this.degreeUpdate,
            onThrowUpdate: this.degreeUpdate
        });
    }
    degreeUpdate = () => {
        if (this.currentPosition !== Math.floor(this.d[0].rotation / 60)) {
            this.currentPosition = Math.floor(this.d[0].rotation / 60);
            this.melodyChange();
            // console.log(this.currentPosition);
        }
        // console.log(Math.floor(this.d[0].rotation / 90));
    };
    melodyChange = () => {
        // this.melody = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
        var mid = Math.floor(Math.random() * this.melody.length);
        var newMelody = Math.floor(Math.random() * 4);

        do {
            newMelody = Math.floor(Math.random() * 4);
        } while (this.melody[mid] == newMelody);

        this.melody[mid] = newMelody;
        console.log(this.melody);
    };
    render() {
        return (
            <div className="freestyle">
                <div className="freestyle__cdContainer">
                    <img ref="cd" className="freestyle__cd" src={cd} />
                    <img className="freestyle__note" src={note} />
                </div>
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
            </div>
        );
    }
}

export default Freestyle;
