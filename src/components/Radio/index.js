import React, { Component, Fragment } from "react";
import "./index.scss";

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }
    _getValue() {
        return this.state.value;
    }
    _onChange = e => {
        this.setState({ value: e.target.value });
        if (this.props.onChange) this.props.onChange(e.target.value);
    };
    render() {
        return (
            <Fragment>
                {this.props.options.map((el, id) => {
                    return (
                        <div className="radio" key={id}>
                            <label className="radio__text">
                                <input className="radio__radio" type="radio" value={el.value} checked={this.state.value == el.value} onChange={this._onChange} />
                                <div className="radio__fakeRadio">
                                    <div className="radio__circle" />
                                </div>
                                {el.text}
                            </label>
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}

export default Radio;
