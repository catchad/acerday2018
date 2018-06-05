import React, { Fragment } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import { Scrollbars } from "react-custom-scrollbars";
// react component
import Header from "../Header";
import Task from "../Task";
import Notification from "../Notification";
import Homepage from "../Homepage";
import NoMatch from "../NoMatch";
import Login from "../Login";
import Rule from "../Rule";
import Register from "../Register";
import Game from "../Game";
import Product from "../Product";
import Exchange from "../Exchange";
import Record from "../Record";
import Creation from "../Creation";
import SpecialTask1 from "../SpecialTask1";
import SpecialTask2 from "../SpecialTask2";
import SpecialTask3 from "../SpecialTask3";
import Bgm from "../Bgm";
import Wave from "../Wave";
// redux
// import { connect } from "react-redux";

// react-router
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import { withRouter } from "react-router";

import { AppContextProvider, AppContextConsumer } from "../../AppContext";
import { IntlContextProvider, IntlContextConsumer } from "../../IntlContext";
// lib
// import fetch from "isomorphic-fetch";

// import _ from 'lodash'
// style
import "./index.scss";
// image

import { ToastContainer, toast } from "react-toastify";
import "./ReactToastify.css";

import { IntlProvider, addLocaleData } from "react-intl";

import zh from "react-intl/locale-data/zh";
import en from "react-intl/locale-data/en";

import tw from "../../locale/messages/tw.js";
import sg from "../../locale/messages/sg.js";

addLocaleData([...en, ...zh]);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wh: window.innerHeight
        };
        window.addEventListener("resize", this._resize);

        this.scrollbar = React.createRef();
    }
    _resize = () => {
        this.setState({
            wh: window.innerHeight
        });
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.location.pathname == nextProps.location.pathname) {
            return false;
        } else {
            return true;
        }
    }
    scrollToTop = () => {
        // console.log(this.scrollbar.current.scrollToTop());
        console.log(this.scrollbar);
        if (this.scrollbar.current) {
            setTimeout(() => {
                this.scrollbar.current.scrollToTop();
            }, 1);
        }
    };
    render() {
        // const { intl } = this.props;
        // let tmp = intl.formatMessage({ id: "intl.name" }, { name: this.props.userData.name });

        switch (this.props.match.params.country) {
            case "tw":
                this.locale = "zh";
                this.messages = tw;
                break;
            case "sg":
                this.locale = "en";
                this.messages = sg;
                break;
            default:
                this.locale = "zh";
                this.messages = tw;
                break;
        }

        this.productQuery = this.messages.config.products.reduce((accumulator, currentValue, currentIndex) => {
            if (currentIndex == this.messages.config.products.length - 1) {
                accumulator += `${currentValue})`;
            } else {
                accumulator += `${currentValue}|`;
            }
            return accumulator;
        }, "(");

        return (
            <IntlProvider textComponent="span" locale={this.locale} messages={this.messages}>
                <IntlContextProvider locale={this.locale} messages={this.messages}>
                    <AppContextProvider currentCountry={this.props.match.params.country} history={this.props.history} scrollToTop={this.scrollToTop}>
                        <Header />
                        <AppContextConsumer>
                            {appContext => {
                                return (
                                    <IntlContextConsumer>
                                        {intlContext => {
                                            return (
                                                <main className="main">
                                                    <Scrollbars ref={this.scrollbar} style={{ width: "100%" }}>
                                                        <Switch>
                                                            <Route
                                                                path="/:country/"
                                                                exact
                                                                render={props => {
                                                                    return <Homepage appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/login"
                                                                render={props => {
                                                                    return <Login appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/register"
                                                                render={props => {
                                                                    return <Register appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/creation/:cid/:complete?"
                                                                render={props => {
                                                                    return <Creation {...props} appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/st1"
                                                                render={props => {
                                                                    return <SpecialTask1 appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/st2"
                                                                render={props => {
                                                                    return <SpecialTask2 appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/st3"
                                                                render={props => {
                                                                    return <SpecialTask3 appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/rule"
                                                                render={props => {
                                                                    return <Rule appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path={`/:country/product/:pname${this.productQuery}`}
                                                                render={props => {
                                                                    return <Product {...props} appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/exchange"
                                                                render={props => {
                                                                    return <Exchange appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/record"
                                                                render={props => {
                                                                    return <Record appContext={appContext} intlContext={intlContext.intl} />;
                                                                }}
                                                            />
                                                            <Route
                                                                path="/:country/game/:cid?"
                                                                render={props => {
                                                                    return <Game {...props} appContext={appContext} intlContext={intlContext.intl} scrollToTop={Scrollbars.scrollToTop} />;
                                                                }}
                                                            />
                                                            <Route component={NoMatch} />
                                                        </Switch>
                                                        <ReactTransitionGroup component="div">{appContext.task.status ? <Task appContext={appContext} intlContext={intlContext.intl} /> : ""}</ReactTransitionGroup>
                                                        <ReactTransitionGroup component="div">{appContext.notification.status ? <Notification appContext={appContext} intlContext={intlContext.intl} /> : ""}</ReactTransitionGroup>
                                                        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar closeOnClick draggable newestOnTop pauseOnHover />
                                                        <Bgm play={appContext.bgm} forceMuted={appContext.bgmForceMuted} />
                                                        <Wave />
                                                    </Scrollbars>
                                                </main>
                                            );
                                        }}
                                    </IntlContextConsumer>
                                );
                            }}
                        </AppContextConsumer>
                    </AppContextProvider>
                </IntlContextProvider>
            </IntlProvider>
        );
    }
}

export default App;
