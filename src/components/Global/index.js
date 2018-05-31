import React, { Component } from "react";
import { Link } from "react-router-dom";

class Global extends Component {
    constructor(props) {
        super(props);
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
