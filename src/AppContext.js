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
            // name: "Hank",
            // point: 1000,
            // registCountry: "tw",

            // id: 1234567890,
            // name: 'Hank',
            // country: 'tw',
            // greet: 0,
            // character: 'https://acer-day.com/upload/iughah982fd4.jpg',
            // point: 14000,

            // currentCountry: this.props.currentCountry,

            id: 0,
            name: "",
            country: "tw",
            countryFullName: "Taiwan",
            greet: 0,
            character: "",
            point: 0,

            bgm: false,
            bgmForceMuted: false,
            toggleBgm: status => {
                if (status) {
                    this.setState({
                        bgm: status
                    });
                } else {
                    this.setState({
                        bgm: !this.state.bgm
                    });
                }
            },
            toggleBgmForceMuted: status => {
                if (status) {
                    this.setState({
                        bgmForceMuted: status
                    });
                } else {
                    this.setState({
                        bgmForceMuted: !this.state.bgmForceMuted
                    });
                }
            },
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
            }
        };

        setTimeout(() => {
            this.setState({
                id: 1234567890,
                name: "Hank",
                country: "tw",
                countryFullName: "Taiwan",
                greet: 0,
                character: "https://fakeimg.pl/300x450/282828/eae0d0",
                point: 14000
            });
        }, 1000);
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.setState({
    //     //     currentCountry: this.props.currentCountry
    //     // });
    // }

    // toggleBgm = status => {
    //     if (status) {
    //         this.setState({
    //             bgm: status
    //         });
    //     } else {
    //         this.setState({
    //             bgm: !this.state.bgm
    //         });
    //     }
    // };
    render() {
        return <Provider value={{ ...this.state, currentCountry: this.props.currentCountry, history: this.props.history }}>{this.props.children}</Provider>;
    }
}

const AppContextProvider = withRouter(AppContext);
export { Consumer as AppContextConsumer };
export { AppContextProvider };
