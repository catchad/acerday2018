import React, { Component } from "react";
import "./index.scss";
import Background from "../Background";
import SquareBtnGroup from "../SquareBtnGroup";
import RoundBtn from "../RoundBtn";
import { FormattedMessage } from "react-intl";
import icon_facebook from "./icon-facebook.svg";
import icon_twitter from "./icon-twitter.svg";

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
                        <SquareBtnGroup data={[{ text: this.props.intlContext.formatMessage({ id: "intl.login.facebook" }), icon: icon_facebook, value: "facebook" }, { text: this.props.intlContext.formatMessage({ id: "intl.login.twitter" }), icon: icon_twitter, value: "twitter" }]} />;
                    </div>
                    <div className="page__row page__row--center">
                        <RoundBtn size="L" routerLink={`/${this.props.appContext.currentCountry}/register`}>
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
