import React, { Component } from "react";
import Draggable from "gsap/Draggable";
import ThrowPropsPlugin from "./ThrowPropsPlugin.min.js";
import * as PIXI from "pixi.js";
import noteImg1 from "./note1.png";
import noteImg2 from "./note2.png";
import cd from "./cd.png";
import logo from "./logo.png";
import { TweenMax } from "gsap";
import Tone from "tone";
import bgm from "./tracks/melody5.m4a";
import assets from "./assets.js";

import "./index.scss";
class VinylRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.currentPosition = 0;
        this.currentSchedule = 0;
        if (this.props.player == 1) {
            this.activeTracks = [0, 2, 3];
        } else {
            this.activeTracks = [1, 4, 5];
        }

        // this.p2Tracks = [1, 4, 5];
        this.melody = [0, 0, 0];
        this.result = [];

        // this.mode = 1; // 1 = freestyle, 2 = cdplayer, 3 = none
        this.checker = 0;
        this.playing = false;

        this.loadingCount = 0;

        // Tonejs init
        Tone.Transport.bpm.value = 116;
        Tone.Transport.loop = true;
        Tone.Transport.loopStart = "0";
        Tone.Transport.loopEnd = "16m";
        Tone.Master.volume.value = 0;
        this.tracks = [];
        // Tone.Master
        assets.forEach((assetsTrack, assetsTrackID) => {
            var track = [];
            assetsTrack.forEach((assetsSound, assetsSoundID) => {
                var player = new Tone.Player({
                    loop: true
                });
                player.toMaster();
                player.sync();
                player.start(0);
                player.mute = true;
                player.load(assetsSound, () => {
                    this.loadingCount++;
                    // console.log(this.loadingCount);
                    if (this.loadingCount >= 30) {
                        this.props.loadComplete();
                    }
                });

                track.push(player);
            });
            this.tracks.push(track);
        });

        var bgmPlayer = new Tone.Player({
            loop: true
        });
        bgmPlayer.toMaster();
        bgmPlayer.sync();
        bgmPlayer.start(0);
        bgmPlayer.load(bgm, () => {
            bgmPlayer.volume.value = -1;
            this.loadingCount++;
            // console.log(this.loadingCount);
            if (this.loadingCount >= 30) {
                this.props.loadComplete();
            }
        });

        this.activeTracks.forEach((el, id) => {
            this.tracks[el][this.melody[id]].mute = false;
        });

        this.melody = this.melody.map((el, id) => {
            return Math.floor(Math.random() * this.tracks[this.activeTracks[id]].length);
        });

        Tone.Transport.scheduleRepeat(this.setTracks, "1m");
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
        Tone.Transport.pause();
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Transport.clear();
    }
    play = () => {
        if (this.mode !== 2) return;
        Tone.Master.volume.value = 0;
        this.currentSchedule = 0;
        this.playing = true;
        Tone.context.resume();
        Tone.Transport.position = "0:0:0";
        Tone.Transport.start("+0.1");
    };
    stop = () => {
        if (this.mode !== 2) return;
        this.playing = false;
        Tone.Transport.pause();
    };
    startGame = () => {
        Tone.context.resume();
        Tone.Transport.position = "0:0:0";
        Tone.Transport.start("+0.1");
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
        }
    };
    setTracks = () => {
        if (this.mode == 1) {
            if (this.result.length == 8) {
                this.gameOver();
            }
            this.activeTracks.forEach((el, id) => {
                this.tracks[el].forEach((el2, id2) => {
                    if (id2 == this.melody[id]) {
                        el2.mute = false;
                    } else {
                        el2.mute = true;
                    }
                });
            });
            if (this.result.length == 7) {
                TweenMax.to(Tone.Master.volume, Tone.Time("1m").toSeconds(), { ease: Expo.easeIn, value: -60 });
            }
            if (this.result.length < 8) this.result.push(this.melody);
        }

        if (this.mode == 2) {
            if (this.currentSchedule == 8) {
                this.playing = false;
                this.stop();
                TweenMax.to(this.refs.cd, 2, { rotation: "+=30", ease: Power3.easeOut });
                this.props.onPlayerEnd();
                return;
            }

            this.tracks.forEach((el, id) => {
                el.forEach((el2, id2) => {
                    el2.mute = true;
                });
            });

            if (this.props.cdPlayerData1) {
                [0, 2, 3].forEach((el, id) => {
                    this.tracks[el][this.props.cdPlayerData1[this.currentSchedule][id]].mute = false;
                });
            }
            if (this.props.cdPlayerData2) {
                [1, 4, 5].forEach((el, id) => {
                    this.tracks[el][this.props.cdPlayerData2[this.currentSchedule][id]].mute = false;
                });
            }

            if (this.currentSchedule == 7) {
                TweenMax.to(Tone.Master.volume, Tone.Time("1m").toSeconds(), { ease: Expo.easeIn, value: -60 });
            }
            this.currentSchedule++;
        }

        // console.log(this.result);
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
        }
    };
    melodyChange = () => {
        // var mid = Math.floor(Math.random() * this.melody.length);
        // var newMelody = Math.floor(Math.random() * this.tracks[mid].length);
        // do {
        //     newMelody = Math.floor(Math.random() * this.tracks[mid].length);
        // } while (this.melody[mid] == newMelody);
        // this.melody[mid] = newMelody;

        this.melody = this.melody.map((el, id) => {
            return Math.floor(Math.random() * this.tracks[this.activeTracks[id]].length);
        });

        this.emitNote();

        // this.tester++;
        // console.log(this.tester);
        // if (this.tester > 30 && this.mode == 1) {
        //     this.gameOver();
        // }
        // console.log(this.melody);
    };
    gameOver = () => {
        this.setMode("disable");
        this.props.onGameover(this.result);
        Tone.Transport.pause();
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
                {/* <img className="vinylRecord__logo" src={logo} /> */}
                <canvas ref="canvas" className="vinylRecord__canvas" />
            </div>
        );
    }
}

export default VinylRecord;
