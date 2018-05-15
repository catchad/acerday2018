import React, { Component } from "react";
import Background from "../Background";
import RoundBtn from "../RoundBtn";
import arrow from "./arrow.svg";
import "./index.scss";

class Record extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <div className="page__section">
                    <div className="page__heading">
                        <p className="page__title">創作記錄</p>
                    </div>
                    <div className="record">
                        <RecordItem name1="Ray Su" name2="Isaac Chuang" singleLink="http://www.google.com.tw" />
                        <RecordItem name1="Ray Su" name2="Rachel Wang" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                        <RecordItem name1="Ray Su" name2="Ray Su" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                        <RecordItem name1="Rachel Wang" name2="Ray Su" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                        <RecordItem name1="Ray Su" name2="Rachel Wang" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                        <RecordItem name1="Ray Su" name2="Rachel Wang" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                        <RecordItem name1="Ray Su" name2="Rachel Wang" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                        <RecordItem name1="Ray Su" name2="Rachel Wang" singleLink="http://www.google.com.tw" multipleLink="http://www.google.com.tw" />
                    </div>
                </div>
                <Background />
            </div>
        );
    }
}

class RecordItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="record__item">
                <div className="record__left">
                    <p className="record__name1">{this.props.name1}</p>
                    <img className="record__arrow" src={arrow} />
                    <p className="record__name2">{this.props.name2}</p>
                </div>
                <div className="record__right">
                    <div className="record__single">
                        <p className="record__singleText">單軌</p>
                        <RoundBtn href={this.props.singleLink} target="_blank" size="M" fixedSize="S" disabled={this.props.singleLink ? false : true}>
                            {this.props.singleLink ? "PLAY" : "等待完成"}
                        </RoundBtn>
                    </div>
                    <div className="record__multiple">
                        <p className="record__multipleText">雙軌</p>
                        <RoundBtn href={this.props.multipleLink} target="_blank" size="M" fixedSize="S" disabled={this.props.multipleLink ? false : true}>
                            {this.props.multipleLink ? "PLAY" : "等待完成"}
                        </RoundBtn>
                    </div>
                </div>
            </div>
        );
    }
}

export default Record;
