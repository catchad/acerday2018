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
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Isaac Chuang" singleLink="abcdefg" />
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Rachel Wang" singleLink="abcdefg" multipleLink="ggggggg" />
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Ray Su" singleLink="abcdefg" multipleLink="ggggggg" />
                        <RecordItem appContext={this.props.appContext} name1="Rachel Wang" name2="Ray Su" singleLink="abcdefg" multipleLink="ggggggg" />
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Rachel Wang" singleLink="abcdefg" />
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Rachel Wang" singleLink="abcdefg" multipleLink="ggggggg" />
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Rachel Wang" singleLink="abcdefg" multipleLink="ggggggg" />
                        <RecordItem appContext={this.props.appContext} name1="Ray Su" name2="Rachel Wang" singleLink="abcdefg" multipleLink="ggggggg" />
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
                        <RoundBtn routerLink={`/${this.props.appContext.currentCountry}/creation/${this.props.singleLink}`} target="_blank" size="M" fixedSize="S" disabled={this.props.singleLink ? false : true}>
                            {this.props.singleLink ? "PLAY" : "等待完成"}
                        </RoundBtn>
                    </div>
                    <div className="record__multiple">
                        <p className="record__multipleText">雙軌</p>
                        <RoundBtn routerLink={`/${this.props.appContext.currentCountry}/creation/${this.props.multipleLink}`} target="_blank" size="M" fixedSize="S" disabled={this.props.multipleLink ? false : true}>
                            {this.props.multipleLink ? "PLAY" : "等待完成"}
                        </RoundBtn>
                    </div>
                </div>
            </div>
        );
    }
}

export default Record;
