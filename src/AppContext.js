import React, { Component } from "react";
// import { UserContext } from "./UserContext";
import axios from "axios";
import { IntlProvider } from "react-intl";
import getCountryFullName from "./helper/getCountryFullName.js";
import { withRouter } from "react-router";
import keyBy from "lodash/keyBy";
// export const UserContext = React.createContext({});

const { Provider, Consumer } = React.createContext({});

class AppContext extends Component {
    constructor(props) {
        super(props);
        this.debug = false;
        this.state = {
            isLogin: null,
            id: 0,
            userCode: "",
            name: "",
            country: "",
            countryFullName: "",
            greet: 0,
            character: "",
            point: 0,
            sns: "",
            maxGameLevel: 0,

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
                data: {
                    special: [false, false, false],
                    normal: [
                        {
                            // 玩節奏遊戲
                            name: "RythmGame",
                            point: 1000,
                            finish: 0,
                            limit: 8
                        },
                        {
                            // 接受邀請
                            name: "AcceptInvitation",
                            point: 600,
                            finish: 0,
                            limit: 8
                        },
                        {
                            // 完成共同創作
                            name: "RythmGameComplete",
                            point: 1500,
                            finish: 0,
                            limit: 8
                        },
                        {
                            // 分享共同創作
                            name: "RythmGameShare",
                            point: 500,
                            finish: 0,
                            limit: 16
                        },
                        {
                            // 每天登入網站
                            name: "Login",
                            point: 800,
                            finish: 0,
                            limit: 14
                        },
                        {
                            // 打招呼
                            name: "MakeInvitation",
                            point: 1000,
                            finish: 0,
                            limit: 8
                        },
                        {
                            // 連續登入網站3天
                            name: "Login3Days",
                            point: 2000,
                            finish: 0,
                            limit: 1
                        },
                        {
                            // 連續登入網站8天
                            name: "Login8Days",
                            point: 4000,
                            finish: 0,
                            limit: 1
                        },
                        {
                            // 限時8天內交友
                            name: "MakeInvitation8Days",
                            point: 5000,
                            finish: 0,
                            limit: 1
                        }
                    ]
                },
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
            setSpecialTaskStatus: data => {
                this.setState({
                    ...this.state,
                    task: {
                        ...this.state.task,
                        data: {
                            ...this.state.task.data,
                            special: [data.VideoChallenge1, data.VideoChallenge2, data.VideoChallenge3]
                        }
                    }
                });
            },
            setUserData: data => {
                data.Tasks = keyBy(data.Tasks, "TaskName");
                if (data.Tasks == null) data.Tasks = {};

                this.setState({
                    ...this.state,
                    isLogin: true,
                    id: data.Id,
                    userCode: data.UserCode,
                    name: data.DisplayName,
                    country: data.Country,
                    countryFullName: getCountryFullName(data.Country),
                    greet: data.GreetingTextKey,
                    character: data.ProfileImageUrl,
                    point: data.Points,
                    sns: data.Sns,
                    maxGameLevel: data.MaxGameLevel,
                    task: {
                        ...this.state.task,
                        data: {
                            // special: [true, false, false],
                            ...this.state.task.data,
                            normal: [
                                {
                                    // 玩節奏遊戲
                                    name: "RythmGame",
                                    point: 1000,
                                    finish: data.Tasks.RythmGame ? data.Tasks.RythmGame.Finished : 0,
                                    limit: 8
                                },
                                {
                                    // 接受邀請
                                    name: "AcceptInvitation",
                                    point: 600,
                                    finish: data.Tasks.AcceptInvitation ? data.Tasks.AcceptInvitation.Finished : 0,
                                    limit: 8
                                },
                                {
                                    // 完成共同創作
                                    name: "RythmGameComplete",
                                    point: 1500,
                                    finish: data.Tasks.RythmGameComplete ? data.Tasks.RythmGameComplete.Finished : 0,
                                    limit: 8
                                },
                                {
                                    // 分享共同創作
                                    name: "RythmGameShare",
                                    point: 500,
                                    finish: data.Tasks.RythmGameShare ? data.Tasks.RythmGameShare.Finished : 0,
                                    limit: 16
                                },
                                {
                                    // 每天登入網站
                                    name: "Login",
                                    point: 800,
                                    finish: data.Tasks.Login ? data.Tasks.Login.Finished : 0,
                                    limit: 14
                                },
                                {
                                    // 打招呼
                                    name: "MakeInvitation",
                                    point: 1000,
                                    finish: data.Tasks.MakeInvitation ? data.Tasks.MakeInvitation.Finished : 0,
                                    limit: 8
                                },
                                {
                                    // 連續登入網站3天
                                    name: "Login3Days",
                                    point: 2000,
                                    finish: data.Tasks.Login3Days ? data.Tasks.Login3Days.Finished : 0,
                                    limit: 1
                                },
                                {
                                    // 連續登入網站8天
                                    name: "Login8Days",
                                    point: 4000,
                                    finish: data.Tasks.Login8Days ? data.Tasks.Login8Days.Finished : 0,
                                    limit: 1
                                },
                                {
                                    // 限時8天內交友
                                    name: "MakeInvitation8Days",
                                    point: 5000,
                                    finish: data.Tasks.MakeInvitation8Days ? data.Tasks.MakeInvitation8Days.Finished : 0,
                                    limit: 1
                                }
                            ]
                        }
                    }
                });
            }
        };

        if (this.debug) {
            setTimeout(() => {
                var response = {
                    code: 200,
                    message: "OK",
                    data: {
                        VideoChallenge1: true,
                        VideoChallenge2: false,
                        VideoChallenge3: false
                    }
                };
                this.state.setSpecialTaskStatus(response.data);
            }, 1000);

            // 使用者資料 / 取得目前登入使用者資料
            setTimeout(() => {
                var response = {
                    code: 200,
                    message: "OK",
                    data: {
                        Id: "1234567",
                        InvitationCode: "ABCDE12345",
                        Country: "tw",
                        GreetingTextKey: "1",
                        DisplayName: "張大山",
                        ProfileImageUrl: "https://www.acer-day.com/_upload/profile/xxxxxxxxx.jpg",
                        Points: 8000,
                        Sns: "Facebook",
                        SnsId: "10083922392228383",
                        MaxGameLevel: 1,
                        Tasks: [
                            {
                                TaskName: "RythmGame",
                                Points: 1000,
                                Finished: 7,
                                Limit: 8
                            },
                            {
                                // 接受邀請
                                TaskName: "AcceptInvitation",
                                Points: 600,
                                Finished: 6,
                                Limit: 8
                            },
                            {
                                // 完成共同創作
                                TaskName: "RythmGameComplete",
                                Points: 1500,
                                Finished: 4,
                                Limit: 8
                            },
                            {
                                // 分享共同創作
                                TaskName: "RythmGameShare",
                                Points: 500,
                                Finished: 2,
                                Limit: 16
                            }
                        ]
                    }
                };
                // response.data.Tasks = keyBy(response.data.Tasks, "TaskName");
                this.state.setUserData(response.data);
            }, 1000);
        } else {
            axios({
                method: "GET",
                url: "/api/users/me?tasks=1",
                responseType: "json"
            }).then(response => {
                console.log(response);
                var resp = response.data;
                if (resp.code == 200) {
                    this.state.setUserData(resp.data);
                } else {
                    this.setState({
                        isLogin: false
                    });
                }
            });

            axios({
                method: "GET",
                url: "/api/tasks/special",
                responseType: "json"
            }).then(response => {
                console.log(response);
                var resp = response.data;
                if (resp.code == 200) {
                    this.state.setSpecialTaskStatus(resp.data);
                }
            });
        }
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
