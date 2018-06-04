import React, { Component, Fragment } from "react";
import "./index.scss";
import laptop from "./laptop.png";
import shadow from "./shadow.png";
import chunk from "lodash/chunk";
import greets from "../../locale/greets";

import nitro5Photo from "./nitro5_photo.png";
import spin5Photo from "./spin5_photo.png";
import helios300Photo from "./helios300_photo.png";
import swift5Photo from "./swift5_photo.png";
import switch7Photo from "./switch7_photo.png";

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ww: window.innerWidth
        };
        this.laptops = [nitro5Photo, spin5Photo, helios300Photo, swift5Photo, switch7Photo];
    }

    componentDidMount() {
        window.addEventListener("resize", this._onResize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 怪招
        if (Array.isArray(this.props.data)) {
            if (nextProps.data[0].id == this.props.data[0].id) {
                return false;
            } else {
                return true;
            }
        }
    }

    _onResize = () => {
        this.setState({
            ww: window.innerWidth
        });
    };

    _blockClick = values => {
        // alert(id);
        this.props.onClick(values);
    };

    render() {
        var number;

        switch (true) {
            case this.state.ww > 1366:
                number = 4;
                break;
            case this.state.ww <= 1366 && this.state.ww > 768:
                number = 3;
                break;
            case this.state.ww <= 768 && this.state.ww > 425:
                number = 2;
                break;
            case this.state.ww <= 425:
                number = 1;
                break;
        }
        var data = chunk(this.props.data, number);
        for (var i = 0; i < data.length; i++) {
            var l = data[i].length;
            if (l < number) {
                for (var j = 0; j < number - l; j++) {
                    data[i].push(null);
                }
            }
        }
        var m = 0;

        switch (number) {
            case 1:
                m = 11;
                break;
            case 2:
                m = 7.5;
                break;
            case 3:
                m = 5.6;
                break;
            case 4:
                m = 4.5;
                break;
            case 5:
                m = 3.8;
                break;
            case 6:
                m = 3.3;
                break;
            case 7:
                m = 2.9;
                break;
        }

        if (this.props.data) {
            if (Array.isArray(this.props.data)) {
                return (
                    <div className="block">
                        <div className="block__group" style={{ marginTop: `${m}%` }}>
                            {(() => {
                                var result = [];
                                for (var i = 0; i < number + 1; i++) {
                                    result.push(
                                        <div className={`block__item block__item--colorset${Math.floor(Math.random() * 7) + 1}`} key={i}>
                                            <div className="block__wrapper">
                                                <div className="block__surface block__surface--a" />
                                                <div className="block__surface block__surface--b" />
                                                <div className="block__surface block__surface--c" />
                                            </div>
                                        </div>
                                    );
                                }
                                return result;
                            })()}
                        </div>
                        {data.map((el, id) => {
                            return (
                                <Fragment key={id}>
                                    <div className="block__group" style={{ width: `${Math.floor((number + 2) / (number + 1) * 1000000) / 10000}%`, marginLeft: `-${this.state.ww / (number + 1) / 2}px` }}>
                                        <div className={`block__item block__item--colorset${Math.floor(Math.random() * 7) + 1}`}>
                                            <div className="block__wrapper">
                                                <div className="block__surface block__surface--a" />
                                                <div className="block__surface block__surface--b" />
                                                <div className="block__surface block__surface--c" />
                                            </div>
                                        </div>
                                        {el.map((el, id) => {
                                            if (el == null) {
                                                return (
                                                    <div className={`block__item block__item--colorset${Math.floor(Math.random() * 7) + 1}`} key={id}>
                                                        <div className="block__wrapper">
                                                            <div className="block__surface block__surface--a" />
                                                            <div className="block__surface block__surface--b" />
                                                            <div className="block__surface block__surface--c" />
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div
                                                        className={`block__item block__item--user block__item--colorset${Math.floor(Math.random() * 7) + 1}`}
                                                        key={id}
                                                        onClick={e => {
                                                            this._blockClick(el);
                                                        }}
                                                    >
                                                        <div className="block__wrapper">
                                                            <div className="block__surface block__surface--a" />
                                                            <div className="block__surface block__surface--b">
                                                                <p className="block__name">{el.name}</p>
                                                                <p className="block__country">{el.countryFullName}</p>
                                                            </div>
                                                            <div className="block__surface block__surface--c">
                                                                <p className="block__greet">{greets[el.country][el.greet]}</p>
                                                            </div>
                                                            <div className="block__userPhoto">
                                                                <img className="block__userPhotoShadow" src={shadow} />
                                                                <img className="block__userPhotoImg" src={el.character} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}

                                        <div className={`block__item block__item--colorset${Math.floor(Math.random() * 7) + 1}`}>
                                            <div className="block__wrapper">
                                                <div className="block__surface block__surface--a" />
                                                <div className="block__surface block__surface--b" />
                                                <div className="block__surface block__surface--c" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block__group">
                                        {(() => {
                                            var result = [];
                                            for (var i = 0; i < number + 1; i++) {
                                                var laptopID = Math.floor(Math.random() * this.laptops.length);

                                                result.push(
                                                    <div className={`block__item block__item--colorset${Math.floor(Math.random() * 7) + 1}`} key={i}>
                                                        <div className="block__wrapper">
                                                            <div className="block__surface block__surface--a" />
                                                            <div className="block__surface block__surface--b" />
                                                            <div className="block__surface block__surface--c" />
                                                            <img className={`block__laptop block__laptop--${laptopID + 1}`} src={this.laptops[laptopID]} />
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return result;
                                        })()}
                                    </div>
                                </Fragment>
                            );
                        })}
                    </div>
                );
            }

            if (!Array.isArray(this.props.data)) {
                return (
                    <div className="block">
                        <div className="block__group" style={{ marginTop: "72%" }}>
                            <div className={`block__item block__item--noHover block__item--colorset${Math.floor(Math.random() * 7) + 1}`}>
                                <div className="block__wrapper">
                                    <div className="block__surface block__surface--a" />
                                    <div className="block__surface block__surface--b">
                                        <p className="block__name">{this.props.data.name}</p>
                                        <p className="block__country">{this.props.data.countryFullName}</p>
                                    </div>
                                    <div className="block__surface block__surface--c">
                                        <p className="block__greet">{this.props.data.country ? greets[this.props.data.country][this.props.data.greet] : ""}</p>
                                    </div>
                                    <div className="block__userPhoto">
                                        <img className="block__userPhotoShadow" src={shadow} />
                                        <img className="block__userPhotoImg" src={this.props.data.character} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}

export default Block;
