import React from "react";
import ReactDOM from "react-dom";

import reducer from "./reducer";
import { createStore } from "redux";
import devToolsEnhancer from "remote-redux-devtools";

import App from "./components/App";
import Global from "./components/Global";
// import IntlProviderContainer from "./IntlProviderContainer";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// import Root from "./Root";

// let store = createStore(reducer, devToolsEnhancer());
// let store = createStore(reducer);

ReactDOM.render(
    <Router>
        <Switch>
            {/* <Route path="/:country(tw|us)" render={props => <IntlProviderContainer {...props} />} /> */}
            <Route path="/:country(tw|sg)" component={App} />
            <Route path="/" component={Global} />
        </Switch>
    </Router>,
    document.getElementById("root")
);
