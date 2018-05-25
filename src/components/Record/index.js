import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import Background from "../Background";
import RoundBtn from "../RoundBtn";
import arrow from "./arrow.svg";
import "./index.scss";

class Record extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        setTimeout(() => {
            this.setState({
                data: [
                    {
                        from: "Ray Su",
                        to: "Isaac Chuang",
                        id: "qwerasdzxc",
                        complete: false
                    },
                    {
                        from: "Rachel Wang",
                        to: "Ray Su",
                        id: "rtyfghvbn",
                        complete: true
                    },
                    {
                        from: "Ray Su",
                        to: "Isaac Chuang",
                        id: "yukfghwef",
                        complete: true
                    }
                ]
            });
        }, 100);
    }

    render() {
        return (
            <div className="page">
                <div className="page__section">
                    <div className="page__heading">
                        <p className="page__title">
                            <FormattedMessage id="intl.record.title" />
                        </p>
                    </div>
                    {this.state.data ? (
                        <div className="record">
                            {this.state.data.map((el, id) => {
                                return <RecordItem key={id} appContext={this.props.appContext} from={el.from} to={el.to} cid={el.id} complete={el.complete} />;
                            })}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <Background />
            </div>
        );
    }
}

class RecordItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="record__item">
                <div className="record__left">
                    <p className="record__name1">{this.props.from}</p>
                    <img className="record__arrow" src={arrow} />
                    <p className="record__name2">{this.props.to}</p>
                </div>
                <div className="record__right">
                    <div className="record__single">
                        <p className="record__singleText">
                            <FormattedMessage id="intl.record.single" />
                        </p>
                        <RoundBtn routerLink={`/${this.props.appContext.currentCountry}/creation/${this.props.cid}`} size="M" fixedSize="S">
                            {this.props.cid ? <FormattedMessage id="intl.record.play" /> : <FormattedMessage id="intl.record.waiting" />}
                        </RoundBtn>
                    </div>
                    <div className="record__multiple">
                        <p className="record__multipleText">
                            <FormattedMessage id="intl.record.multiple" />
                        </p>
                        <RoundBtn routerLink={this.props.complete ? `/${this.props.appContext.currentCountry}/creation/${this.props.cid}/complete` : ""} size="M" fixedSize="S" disabled={this.props.complete ? false : true}>
                            {this.props.complete ? <FormattedMessage id="intl.record.play" /> : <FormattedMessage id="intl.record.waiting" />}
                        </RoundBtn>
                    </div>
                </div>
            </div>
        );
    }
}

export default Record;
