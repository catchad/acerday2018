import React, { Component, Fragment } from "react";

import { FormattedMessage, intlShape, IntlProvider } from "react-intl";
import { Link } from "react-router-dom";
import { AppContextConsumer } from "../../AppContext";
import { IntlContextConsumer } from "../../IntlContext";

// import { IntlContextConsumer } from "../../IntlContext";
class Homepage extends Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        // console.log(this.props);
    }
    _handleChange(event) {
        console.log(event.target.value);
        this.props.history.push(`/${event.target.value}`);
    }

    render() {
        return (
            <Fragment>
                <p>Homepage</p>
                <IntlContextConsumer>
                    {context => {
                        console.log(context.intl.formatMessage({ id: "intl.register.step2.male" }));
                        // return <p>{context.name}</p>;
                    }}
                </IntlContextConsumer>
                <AppContextConsumer>
                    {context => {
                        return <Link to={`/${context.currentCountry}/register`}>register</Link>;
                    }}
                </AppContextConsumer>
                {/* this.props.intl.formatMessage({ id: "intl.register.step2.male" }) */}
                <div className="test1">
                    <FormattedMessage id="intl.name" values={{ name: <b>HHHH</b> }} />
                    {/* <IntlContextConsumer>
                        {context => {
                            // console.log(context.intl.formatMessage({ id: "intl.register.step2.male" }));
                            return <FormattedMessage id="intl.name" values={{ name: <b>HHHH</b> }} />;
                        }}
                    </IntlContextConsumer> */}
                </div>
                {/* <select value={this.props.match.params.country} onChange={this._handleChange}>
                    <option value="us">us</option>
                    <option value="tw">tw</option>
                </select> */}
                {/* <button onClick={this._test}>test</button> */}
                {/* {this.props.intl.messages.config.comingsoon ? <p>ComingSoon</p> : null} */}
            </Fragment>
        );
    }
}

// export default Homepage;
export default Homepage;
