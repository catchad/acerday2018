import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Global extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);

        axios({
            method: "GET",
            url: "/api/users/me?tasks=0",
            responseType: "json"
        }).then(response => {
            var resp = response.data;
            if (resp.code == 200) {
                this.props.history.replace(`/${resp.data.Country}`);
            }
        });
    }

    render() {
        return (
            <div>
                <p>Global</p>
                <Link to="/tw">tw</Link>
                <br />
                <Link to="/sg">sg</Link>
            </div>
        );
    }
}

export default Global;
