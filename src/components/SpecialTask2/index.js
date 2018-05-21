import React, { Component } from "react";
import Background from "../Background";
import Radio from "../Radio";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import RoundBtn from "../RoundBtn";
import "./index.scss";
class SpecialTask2 extends Component {
    constructor(props) {
        super(props);
    }
    _send = () => {
        toast(this.props.intlContext.formatMessage({ id: "intl.notification.sentence13" }));
        this.props.appContext.history.push(`/${this.props.appContext.currentCountry}`);
    };
    render() {
        return (
            <div className="page page--marginLeft50">
                <section className="page__section">
                    <div className="page__fixedLeft">
                        <div className="ytContainer">
                            <iframe className="ytContainer__iframe" width="560" height="315" src="https://www.youtube.com/embed/9RLD7Ds629Y?rel=0&showinfo=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                        </div>
                    </div>
                    <div className="page__heading">
                        <p className="page__title">
                            <FormattedMessage id="intl.specialtask2.title" />
                        </p>
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask2.q1" />
                        </p>
                        <Radio options={[{ text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q1a1" }), value: 1 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q1a2" }), value: 2 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q1a3" }), value: 3 }]} />
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask2.q2" />
                        </p>

                        <Radio options={[{ text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q2a1" }), value: 1 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q2a2" }), value: 2 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q2a3" }), value: 3 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q2a4" }), value: 4 }]} />
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask2.q3" />
                        </p>
                        <Radio options={[{ text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q3a1" }), value: 1 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q3a2" }), value: 2 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q3a3" }), value: 3 }, { text: this.props.intlContext.formatMessage({ id: "intl.specialtask2.q3a4" }), value: 4 }]} />
                    </div>
                    <div className="page__row page__row--widthM page__row--center">
                        <RoundBtn onClick={this._send}>
                            <FormattedMessage id="intl.specialtask2.btn" />
                        </RoundBtn>
                    </div>
                </section>
                <Background color1="#FF73FF" color2="#C203FF" />
            </div>
        );
    }
}

export default SpecialTask2;
