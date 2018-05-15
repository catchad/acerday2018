import React, { Component } from "react";
// import { UserContext } from "./UserContext";
import { IntlProvider } from "react-intl";
import { withRouter } from "react-router";
// export const UserContext = React.createContext({});

const { Provider, Consumer } = React.createContext({});

class AppContext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Hank",
            point: 1000,
            registCountry: "tw",
            // currentCountry: this.props.currentCountry,
            task: {
                status: false,
                toggle: () => {
                    this.setState({
                        ...this.state,
                        task: {
                            ...this.state.task,
                            status: !this.state.task.status
                        }
                    });
                }
            },
            notification: {
                status: false,
                toggle: () => {
                    this.setState({
                        ...this.state,
                        notification: {
                            ...this.state.notification,
                            status: !this.state.notification.status
                        }
                    });
                }
            },
            greets: {
                tw: [""]
            }
        };

        // console.log(this);
    }
    // componentWillReceiveProps(nextProps) {
    //     // this.setState({
    //     //     currentCountry: this.props.currentCountry
    //     // });
    // }

    render() {
        return <Provider value={{ ...this.state, currentCountry: this.props.currentCountry, history: this.props.history }}>{this.props.children}</Provider>;
    }
}

const AppContextProvider = withRouter(AppContext);
export { Consumer as AppContextConsumer };
export { AppContextProvider };
