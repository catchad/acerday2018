import React, { Fragment } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
// react component
import Header from "../Header";
import Page1 from "../Page1";
import Task from "../Task";
import Notification from "../Notification";
import Homepage from "../Homepage";
import NoMatch from "../NoMatch";
import Login from "../Login";
import Rule from "../Rule";
import Register from "../Register";
import RhythmGame from "../RhythmGame";
import Product from "../Product";
import Exchange from "../Exchange";
import Record from "../Record";
import SpecialTask1 from "../SpecialTask1";
import SpecialTask2 from "../SpecialTask2";
import SpecialTask3 from "../SpecialTask3";
// redux
import { connect } from "react-redux";

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
import us from "../../locale/messages/us.js";

addLocaleData([...en, ...zh]);

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.location.pathname == nextProps.location.pathname) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        // const { intl } = this.props;
        // let tmp = intl.formatMessage({ id: "intl.name" }, { name: this.props.userData.name });

        switch (this.props.match.params.country) {
            case "tw":
                this.locale = "zh";
                this.messages = tw;
                break;
            case "us":
                this.locale = "en";
                this.messages = us;
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
                    <AppContextProvider currentCountry={this.props.match.params.country} history={this.props.history}>
                        <Header />
                        <main className="main">
                            <Switch>
                                <Route path="/:country/" component={Homepage} exact />
                                <Route path="/:country/login" component={Login} />
                                <Route path="/:country/register" component={Register} />
                                <Route path="/:country/st1" component={SpecialTask1} />
                                <Route path="/:country/st2" component={SpecialTask2} />
                                <Route path="/:country/st3" component={SpecialTask3} />
                                <Route path="/:country/rule" component={Rule} />
                                <Route path={`/:country/product/:pname${this.productQuery}`} component={Product} />
                                <Route path="/:country/exchange" component={Exchange} />
                                <Route path="/:country/record" component={Record} />
                                {/* <Route path="/:country/task" component={Task} /> */}
                                <Route path="/:country/rhythmGame" component={RhythmGame} />
                                <Route component={NoMatch} />
                            </Switch>
                            <AppContextConsumer>
                                {context => {
                                    return <ReactTransitionGroup component="div">{context.task.status ? <Task /> : ""}</ReactTransitionGroup>;
                                }}
                            </AppContextConsumer>
                            {/* <AppContextConsumer>
                                {context => {
                                    return context.task.status ? <Task /> : "";
                                }}
                            </AppContextConsumer> */}
                            <AppContextConsumer>
                                {context => {
                                    return <ReactTransitionGroup component="div">{context.notification.status ? <Notification /> : ""}</ReactTransitionGroup>;
                                }}
                            </AppContextConsumer>

                            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar closeOnClick draggable newestOnTop pauseOnHover />
                        </main>
                    </AppContextProvider>
                </IntlContextProvider>
            </IntlProvider>
        );
    }
}

export default App;
