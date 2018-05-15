import React, { Component, Fragment } from "react";
import classNames from "classnames";
import "./index.scss";
import arrow from "./arrow.svg";

class TaskItemGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            height: 0
        };
    }

    _toggle() {
        this.setState({
            active: !this.state.active
        });
    }

    _open() {
        this.setState({
            active: true
        });
    }

    _close() {
        this.setState({
            active: false
        });
    }

    componentDidMount() {
        this.setState({
            height: this.refs.group.scrollHeight
        });
    }

    render() {
        return (
            <Fragment>
                <div
                    className="task__itemGroupToggler"
                    onClick={() => {
                        this._toggle();
                    }}
                >
                    <div className="task__itemGroupTogglerLeft">
                        <p className="task__name">{this.props.name}</p>
                        <p className="task__desc">{this.props.desc}</p>
                    </div>
                    <div className="task__itemGroupTogglerRight">
                        <img className={`task__arrow ${classNames({ "task__arrow--active": this.state.active })}`} src={arrow} width="32" />
                    </div>
                </div>
                <div ref="group" className="task__itemGroup" style={this.state.active ? { height: `${this.state.height}px` } : null}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default TaskItemGroup;
