import React, { Component } from "react";
import music from "./bgm.m4a";

class Bgm extends Component {
    constructor(props) {
        super(props);
        this.audio = new Audio();
        this.audio.addEventListener("canplaythrough", this._ready);
        this.audio.src = music;
        this.audio.loop = true;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.forceMuted) {
            this.audio.pause();
            this.audio.currentTime = 0;
        } else {
            if (nextProps.play !== !this.audio.paused) {
                if (nextProps.play) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                    this.audio.currentTime = 0;
                }
            }
        }
    }
    _ready = () => {
        if (!this.props.forceMuted && this.props.play) this.audio.play();
        this.audio.removeEventListener("canplaythrough", this._ready);
    };

    render() {
        return null;
    }
}

export default Bgm;
