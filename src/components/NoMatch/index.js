import React, { Component } from "react";
import "./index.scss";
import Background from "../Background";
import { FormattedMessage } from "react-intl";

class NoMatch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nomatch">
                <p className="nomatch__text">
                    <FormattedMessage id="intl.nomatch.text" />
                </p>
                <Background />
            </div>
        );
    }
}

export default NoMatch;
