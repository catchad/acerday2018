import React, { Component } from "react";
import Cookies from "js-cookie";
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
        this.state = {
            sns: ""
        };
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
                        <SquareBtnGroup
                            onChange={value => {
                                this.setState({
                                    sns: value
                                });
                            }}
                            data={[{ text: this.props.intlContext.formatMessage({ id: "intl.login.facebook" }), icon: icon_facebook, value: "facebook" }, { text: this.props.intlContext.formatMessage({ id: "intl.login.twitter" }), icon: icon_twitter, value: "twitter" }]}
                        />
                    </div>
                    <div className="page__row page__row--center">
                        {/* routerLink={`/${this.props.appContext.currentCountry}/register`} */}
                        <RoundBtn
                            size="L"
                            onClick={() => {
                                Cookies.set("country", this.props.appContext.currentCountry);
                                if (this.state.sns == "") {
                                    alert("請選擇社群平台");
                                    return;
                                }
                                switch (this.state.sns) {
                                    case "facebook":
                                        this.refs.facebook.click();
                                        break;
                                    case "twitter":
                                        this.refs.twitter.click();
                                        break;
                                }
                            }}
                        >
                            <FormattedMessage id="intl.login.btn" />
                        </RoundBtn>
                    </div>

                    <form action="/Account/ExternalLogin" id="external-login-form" method="post" style={{ display: "none" }}>
                        <button ref="facebook" type="submit" id="Facebook" name="provider" value="Facebook">
                            Facebook
                        </button>
                        <button ref="twitter" type="submit" id="Twitter" name="provider" value="Twitter">
                            Twitter
                        </button>
                    </form>
                </section>
                <Background />
            </div>
        );
    }
}

export default Login;
