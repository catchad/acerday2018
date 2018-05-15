import React, { Component } from "react";
import "./index.scss";
import Background from "../Background";
import SquareBtnGroup from "../SquareBtnGroup";
import RoundBtn from "../RoundBtn";
import { IntlContextConsumer } from "../../IntlContext";
import { FormattedMessage } from "react-intl";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <div className="page__bg" />
                <section className="page__section">
                    <div className="page__heading">
                        <p className="page__title">
                            <FormattedMessage id="intl.login.title" />
                        </p>
                    </div>
                    <div className="page__row page__row--flex page__row--widthM">
                        <IntlContextConsumer>
                            {context => {
                                return <SquareBtnGroup data={[{ text: context.intl.formatMessage({ id: "intl.login.facebook" }), icon: "https://fakeimg.pl/500x500", value: "facebook" }, { text: context.intl.formatMessage({ id: "intl.login.twitter" }), icon: "https://fakeimg.pl/500x500", value: "twitter" }]} />;
                            }}
                        </IntlContextConsumer>
                    </div>
                    <div className="page__row page__row--center">
                        <RoundBtn size="L">
                            <FormattedMessage id="intl.login.btn" />
                        </RoundBtn>
                    </div>
                </section>
                <Background />
            </div>
        );
    }
}

export default Login;
