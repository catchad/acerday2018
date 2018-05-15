import React, { Component, Fragment } from "react";
import "./index.scss";

import laptop from "./laptop.png";
import chunk from "lodash/chunk";
class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ww: window.innerWidth
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this._onResize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
    }

    _onResize = () => {
        this.setState({
            ww: window.innerWidth
        });
    };

    _blockClick = (event, id) => {
        // alert(id);
        this.props.onClick();
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

        if (Array.isArray(this.props.data)) {
            return (
                <div className="block">
                    <div className="block__group" style={{ marginTop: `${m}%` }}>
                        {(() => {
                            var result = [];
                            for (var i = 0; i < number + 1; i++) {
                                result.push(
                                    <div className="block__item" key={i}>
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
                                    <div className="block__item">
                                        <div className="block__wrapper">
                                            <div className="block__surface block__surface--a" />
                                            <div className="block__surface block__surface--b" />
                                            <div className="block__surface block__surface--c" />
                                        </div>
                                    </div>
                                    {el.map((el, id) => {
                                        if (el == null) {
                                            return (
                                                <div className="block__item" key={id}>
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
                                                    className="block__item block__item--user"
                                                    key={id}
                                                    onClick={e => {
                                                        this._blockClick(e, el.name);
                                                    }}
                                                >
                                                    <div className="block__wrapper">
                                                        <div className="block__surface block__surface--a" />
                                                        <div className="block__surface block__surface--b">
                                                            <p className="block__name">{el.name}</p>
                                                            <p className="block__country">{el.country}</p>
                                                        </div>
                                                        <div className="block__surface block__surface--c">
                                                            <p className="block__greet">{el.greet}</p>
                                                        </div>
                                                        <img className="block__userPhoto" src={el.img} />
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}

                                    <div className="block__item">
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
                                            result.push(
                                                <div className="block__item" key={i}>
                                                    <div className="block__wrapper">
                                                        <div className="block__surface block__surface--a" />
                                                        <div className="block__surface block__surface--b" />
                                                        <div className="block__surface block__surface--c" />
                                                        <img className="block__laptop" src={laptop} />
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
                    <div className="block__group" style={{ marginTop: "98%" }}>
                        <div className="block__item block__item--noHover">
                            <div className="block__wrapper">
                                <div className="block__surface block__surface--a" />
                                <div className="block__surface block__surface--b">
                                    <p className="block__name">{this.props.data.name}</p>
                                    <p className="block__country">{this.props.data.country}</p>
                                </div>
                                <div className="block__surface block__surface--c">
                                    <p className="block__greet">{this.props.data.greet}</p>
                                </div>
                                <img className="block__userPhoto" src={this.props.data.img} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Block;
