import React, { Component } from "react";
import Background from "../Background";
import Radio from "../Radio";
import { FormattedMessage } from "react-intl";
import { IntlContextConsumer } from "../../IntlContext";
import "./index.scss";
class SpecialTask3 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page page--marginLeft50">
                <section className="page__section">
                    <div className="page__fixedLeft">
                        <div className="ytContainer">
                            <iframe className="ytContainer__iframe" width="560" height="315" src="https://www.youtube.com/embed/9RLD7Ds629Y?rel=0&showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
                        </div>
                    </div>
                    <div className="page__heading">
                        <p className="page__title">
                            <FormattedMessage id="intl.specialtask1.title" />
                        </p>
                    </div>
                    <div className="page__row page__row--widthM page__row--marginBottomBig">
                        <p className="page__qTitle">
                            <FormattedMessage id="intl.specialtask1.q3" />
                        </p>
                        <IntlContextConsumer>
                            {context => {
                                return <Radio options={[{ text: context.intl.formatMessage({ id: "intl.specialtask3.q1a1" }), value: 1 }, { text: context.intl.formatMessage({ id: "intl.specialtask3.q1a2" }), value: 2 }, { text: context.intl.formatMessage({ id: "intl.specialtask3.q1a3" }), value: 3 }, { text: context.intl.formatMessage({ id: "intl.specialtask3.q1a4" }), value: 4 }, { text: context.intl.formatMessage({ id: "intl.specialtask3.q1a5" }), value: 5 }]} />;
                            }}
                        </IntlContextConsumer>
                    </div>

                    <div className="page__row page__row--widthM page__row--center">
                        <a className="gradientBtn">
                            <p>
                                <FormattedMessage id="intl.specialtask3.btn" />
                            </p>
                        </a>
                    </div>
                </section>
                <Background color1="#FF73FF" color2="#C203FF" />
            </div>
        );
    }
}

export default SpecialTask3;
