import React, { Component } from "react";
import Draggable from "gsap/Draggable";
import ThrowPropsPlugin from "./ThrowPropsPlugin.min.js";
import * as PIXI from "pixi.js";
import noteImg1 from "./note1.png";
import noteImg2 from "./note2.png";
import cd from "./cd.png";
import logo from "./logo.png";
import { TweenMax } from "gsap";
import "./index.scss";
class VinylRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.currentPosition = 0;
        this.melody = [0, 0];
        // [
        //             [0, 0, 0],
        //             [0, 0, 0],
        //             [0, 0, 0],
        //             [0, 0, 0]
        //         ];

        // this.mode = 1; // 1 = freestyle, 2 = cdplayer, 3 = none
        this.checker = 0;

        this.playing = false;
        this.tester = 0;
        this.tester2 = 0;
    }
    componentDidMount() {
        this.d = Draggable.create(this.refs.cd, {
            type: "rotation",
            throwProps: true,
            onDrag: this.degreeUpdate,
            onThrowUpdate: this.degreeUpdate
        });

        this.app = new PIXI.Application(980, 980, { transparent: true, view: this.refs.canvas });

        this.noteTextures = [PIXI.Texture.fromImage(noteImg1), PIXI.Texture.fromImage(noteImg2)];
        // this.texture = PIXI.Texture.fromImage(noteImg1);
        this.noteColors = [0xfe4603, 0x00ff01, 0xff26fd, 0x008cff, 0xff7903, 0xe2fd01, 0x00ffac];
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.app.ticker.add(this.ticker);

        switch (this.props.defaultMode) {
            case "freestyle":
                this.d[0].enable();
                this.mode = 1;
                break;
            case "cdplayer":
                this.d[0].disable();
                this.mode = 2;
                break;
            case "disable":
                this.d[0].disable();
                this.mode = 3;
                break;
        }
    }
    componentWillUnmount() {
        this.app.destroy();
        this.d[0].kill();
    }
    play = () => {
        this.playing = true;
    };
    stop = () => {
        this.playing = false;
    };
    ticker = delta => {
        this.container.children.forEach((el, id) => {
            if (el.r >= 450) {
                this.container.removeChild(el);
            } else {
                el.x = this.app.screen.width / 2 + el.r * Math.cos(el.theta);
                el.y = this.app.screen.width / 2 + el.r * Math.sin(el.theta);

                el.theta += el.thetaStep;
                el.r += el.rStep;

                if (el.r + el.rStep * 15 >= 450) {
                    el.alpha -= 1 / 15;
                }
            }
        });

        if (this.mode == 2 && this.playing) {
            this.checker++;
            TweenMax.set(this.refs.cd, { rotation: "+=1.5" });

            if (this.checker > 5) {
                this.checker = 0;
                this.emitNote();
            }
            this.tester2++;
            if (this.tester2 > 180) {
                this.playing = false;
                this.tester2 = 0;
                TweenMax.to(this.refs.cd, 2, { rotation: "+=30", ease: Power3.easeOut });
                this.props.onPlayerEnd();
            }
        }
    };
    emitNote = () => {
        var note = new PIXI.Sprite(this.noteTextures[Math.floor(Math.random() * this.noteTextures.length)]);
        note.anchor.set(0.5);
        note.tint = this.noteColors[Math.floor(Math.random() * this.noteColors.length)];
        note.x = this.app.screen.width / 2;
        note.y = this.app.screen.height / 2;
        note.theta = Math.random() * (Math.PI * 2); //自己增加的屬性, 非pixi設定
        note.r = 0; //自己增加的屬性, 非pixi設定
        note.scale.x = note.scale.y = Math.random() * 0.7 + 0.3;
        note.thetaStep = Math.PI / (150 + Math.floor(Math.random() * 400));
        note.rStep = Math.random() * 3 + 2;
        note.rotation = (Math.floor(Math.random() * 2) - 1) / 2;

        TweenMax.from(note.scale, 0.5, { x: 0, y: 0, ease: Back.easeOut });
        // theta = DegreesToRadians(Math.random()*360);

        this.container.addChild(note);
        // console.log(this.container.children);
    };
    degreeUpdate = () => {
        if (this.currentPosition !== Math.floor(this.d[0].rotation / 90)) {
            this.currentPosition = Math.floor(this.d[0].rotation / 90);
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
        this.emitNote();

        this.tester++;
        console.log(this.tester);
        if (this.tester > 30 && this.mode == 1) {
            this.gameOver();
        }
        // console.log(this.melody);
    };
    gameOver = () => {
        this.setMode("disable");
        console.log(this.melody);
        this.props.onGameover(this.melody);
    };
    setMode = modeName => {
        switch (modeName) {
            case "freestyle":
                this.d[0].enable();
                this.mode = 1;
                break;
            case "cdplayer":
                this.d[0].disable();
                this.mode = 2;
                break;
            case "disable":
                this.d[0].disable();
                this.mode = 3;
                break;
        }
    };

    render() {
        return (
            <div className="vinylRecord">
                <img ref="cd" className="vinylRecord__cd" src={cd} />
                <img className="vinylRecord__logo" src={logo} />
                <canvas ref="canvas" className="vinylRecord__canvas" />
            </div>
        );
    }
}

export default VinylRecord;
