import React, { Component } from "react";
import "./index.scss";

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="alert">
                <div className="alert__wrapper">{this.props.children}</div>
            </div>
        );
    }
}

export default Alert;
