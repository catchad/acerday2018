import React, { Component, Fragment } from "react";
import "./index.scss";
class TaskProgress extends Component {
    constructor(props) {
        super(props);
    }

    _formatThousands = (n, dp) => {
        var s = "" + Math.floor(n),
            d = n % 1,
            i = s.length,
            r = "";
        while ((i -= 3) > 0) {
            r = "," + s.substr(i, 3) + r;
        }
        return s.substr(0, i + 3) + r + (d ? "." + Math.round(d * Math.pow(10, dp || 2)) : "");
    };
    render() {
        return (
            <Fragment>
                <div className="taskProgress">
                    <div className="taskProgress__current" style={{ width: `${this.props.molecular / this.props.denominator * 100}%` }} />
                    {(() => {
                        var arr = [];
                        for (var i = 0; i < this.props.denominator / this.props.unit; i++) {
                            arr.push(<div className="taskProgress__part" key={i} />);
                        }
                        return arr;
                    })()}
                </div>
                <p className="taskDivision">
                    <span className="taskDivision__point">{this._formatThousands(this.props.molecular)}</span>
                    / {this._formatThousands(this.props.denominator)}
                </p>
            </Fragment>
        );
    }
}

export default TaskProgress;
