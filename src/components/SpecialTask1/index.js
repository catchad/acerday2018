import React, { Component } from "react";
import axios from "axios";
import Background from "../Background";
import Radio from "../Radio";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import RoundBtn from "../RoundBtn";
import checkToast from "../../helper/checkToast.js";
import "./index.scss";
class SpecialTask1 extends Component {
    constructor(props) {
        super(props);
        this.ajaxing = false;
        this.answer = [0, 0, 0];
    }
    _send = () => {
        if (this.ajaxing) return;
        if (this.answer[0] == 2 && this.answer[1] == 3 && this.answer[2] == 1) {
            this.ajaxing = true;

            // 限定任務 / 完成限定任務
            axios({
                method: "POST",
                url: "/api/tasks/special",
                responseType: "json",
                data: {
                    TaskName: "VideoChallenge1"
                }
            }).then(response => {
                var resp = response.data;
                if (resp.code == 201) {
                    this.props.appContext.history.push(`/${this.props.appContext.currentCountry}`);
                    checkToast(this.props.appContext);
                } else {
                    alert(resp.code);
                    this.ajaxing = false;
                }
            });
        } else {
            alert("答案錯誤");
        }
    };
    render() {
        return (
            <div className="page page--marginLeft50">
                <section className="page__section">
                    <div className="page__fixedLeft">
                        <div className="ytContainer">
                            <iframe className="ytContainer__iframe" width="560" height="315" src="https://www.youtube.com/embed/CbswdY6DkYU?rel=0&showinfo=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                        </div>
                    </div>
                    <div className="page__heading">
                        <p className="page__title">
                            <FormattedMessage id="intl.specialtask1.title" />
                        </p>
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask1.q1" />
                        </p>
                        <Radio
                            onChange={value => {
                                this.answer[0] = value;
                            }}
                            options={[{ text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q1a1" }), value: 1 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q1a2" }), value: 2 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q1a3" }), value: 3 }]}
                        />
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask1.q2" />
                        </p>
                        <Radio
                            onChange={value => {
                                this.answer[1] = value;
                            }}
                            options={[{ text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q2a1" }), value: 1 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q2a2" }), value: 2 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q2a3" }), value: 3 }]}
                        />
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask1.q3" />
                        </p>
                        <Radio
                            onChange={value => {
                                this.answer[2] = value;
                            }}
                            options={[{ text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q3a1" }), value: 1 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q3a2" }), value: 2 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask1.q3a3" }), value: 3 }]}
                        />
                    </div>
                    <div className="page__row page__row--widthM page__row--center">
                        <RoundBtn onClick={this._send}>
                            <FormattedMessage id="intl.specialtask1.btn" />
                        </RoundBtn>
                    </div>
                </section>
                <Background color1="#FF73FF" color2="#C203FF" />
            </div>
        );
    }
}

export default SpecialTask1;
