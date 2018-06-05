import React, { Component } from "react";
import CircleBtn from "../CircleBtn";

import plus from "./plus.svg";
import minus from "./minus.svg";
import "./index.scss";

class NumberInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1
        };
    }

    numberUpdate = value => {
        if (this.state.number + value > this.props.max || this.state.number + value < this.props.min) return;

        this.setState({ number: this.state.number + value }, () => {
            this.props.onChange(this.state.number);
        });
    };
    render() {
        return (
            <div className={`NumberInput ${this.props.className}`}>
                <CircleBtn
                    size="s"
                    icon={minus}
                    onClick={() => {
                        this.numberUpdate(-1);
                    }}
                />
                <p className="NumberInput__number">{this.state.number}</p>
                <CircleBtn
                    size="s"
                    icon={plus}
                    onClick={() => {
                        this.numberUpdate(1);
                    }}
                />
            </div>
        );
    }
}

export default NumberInput;
