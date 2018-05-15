import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";

class Page1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <p>PAGE1</p>
                <p className="test1">
                    <FormattedMessage id="intl.page1.text" />
                </p>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Page1));
