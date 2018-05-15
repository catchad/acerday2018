import React, { Component } from "react";
import { IntlProvider } from "react-intl";

const { Provider, Consumer } = React.createContext({});

class IntlContextProvider extends Component {
    constructor(props) {
        super(props);
        this.intl = new IntlProvider({ locale: this.props.locale, messages: this.props.messages }, {}).getChildContext().intl;
    }
    render() {
        if (this.props.locale !== this.intl.locale) {
            this.intl = new IntlProvider({ locale: this.props.locale, messages: this.props.messages }, {}).getChildContext().intl;
        }

        return <Provider value={{ intl: this.intl }}>{this.props.children}</Provider>;
    }
}

export { Consumer as IntlContextConsumer };
export { IntlContextProvider };
