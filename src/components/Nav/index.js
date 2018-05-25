import "./index.scss";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { AppContextConsumer } from "../../AppContext";
import { IntlContextConsumer } from "../../IntlContext";
import Background from "../Background";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navOpen: false
        };
    }
    _openNav = () => {
        this.setState({
            navOpen: true
        });
        document.body.classList.add("body--hideScrollbar");
    };
    _closeNav = () => {
        this.setState({
            navOpen: false
        });
        document.body.classList.remove("body--hideScrollbar");
    };
    _toggleNav = () => {
        this.setState(
            {
                navOpen: !this.state.navOpen
            },
            () => {
                if (this.state.navOpen) {
                    document.body.classList.add("body--hideScrollbar");
                } else {
                    document.body.classList.remove("body--hideScrollbar");
                }
            }
        );
    };
    render() {
        return (
            <IntlContextConsumer>
                {intlContext => {
                    return (
                        <AppContextConsumer>
                            {appContext => {
                                return (
                                    <Fragment>
                                        <nav className={`nav ${classNames({ "nav--active": this.state.navOpen })}`}>
                                            {appContext.id ? (
                                                <div className="userInfo">
                                                    <p className="userInfo__name">{appContext.name}</p>
                                                    <p className="userInfo__acerID">Acer ID: {appContext.id}</p>
                                                    <p className="userInfo__point">{appContext.point} 點</p>
                                                </div>
                                            ) : (
                                                ""
                                            )}

                                            <Link onClick={this._closeNav} className="nav__link" to={`/${appContext.currentCountry}`}>
                                                <FormattedMessage id="intl.nav.homepage" />
                                            </Link>
                                            {appContext.id ? (
                                                <Link onClick={this._closeNav} className="nav__link" to={`/${appContext.currentCountry}/game`}>
                                                    <FormattedMessage id="intl.nav.game" />
                                                </Link>
                                            ) : (
                                                ""
                                            )}

                                            <Link onClick={this._closeNav} className="nav__link" to={`/${appContext.currentCountry}/rule`}>
                                                <FormattedMessage id="intl.nav.rule" />
                                            </Link>

                                            {appContext.id ? (
                                                <Link onClick={this._closeNav} className="nav__link" to={`/${appContext.currentCountry}/record`}>
                                                    <FormattedMessage id="intl.nav.record" />
                                                </Link>
                                            ) : (
                                                ""
                                            )}

                                            <div className="nav__group">
                                                <p className="nav__link">
                                                    <FormattedMessage id="intl.nav.product" />
                                                </p>
                                                <nav className="nav__subNav">
                                                    <Fragment>
                                                        {intlContext.intl.messages.config.products.map((el, id) => {
                                                            return (
                                                                <Link key={id} onClick={this._closeNav} className="nav__subLink" to={`/${appContext.currentCountry}/product/${el}`}>
                                                                    {el}
                                                                </Link>
                                                            );
                                                        })}
                                                    </Fragment>
                                                </nav>
                                            </div>

                                            {appContext.id ? (
                                                <Link onClick={this._closeNav} className="nav__link" to={`/${appContext.currentCountry}/exchange`}>
                                                    <FormattedMessage id="intl.nav.exchange" />
                                                </Link>
                                            ) : (
                                                ""
                                            )}

                                            <a className="nav__link" href={intlContext.intl.formatMessage({ id: "intl.nav.promote.link" })} target="_blank">
                                                <FormattedMessage id="intl.nav.promote" />
                                            </a>
                                        </nav>
                                        <div className="headerIcon">
                                            <a
                                                className="headerIcon__link"
                                                onClick={() => {
                                                    appContext.toggleBgm();
                                                }}
                                                style={{ opacity: appContext.bgm ? 1 : 0.6 }}
                                            >
                                                <img className="headerIcon__img" src="https://fakeimg.pl/30x30/" />
                                            </a>

                                            {appContext.id ? (
                                                <a
                                                    className="headerIcon__link"
                                                    onClick={() => {
                                                        appContext.task.toggle();
                                                        this._closeNav();
                                                    }}
                                                >
                                                    <img className="headerIcon__img" src="https://fakeimg.pl/30x30/" />
                                                </a>
                                            ) : (
                                                ""
                                            )}

                                            {appContext.id ? (
                                                <a
                                                    className="headerIcon__link"
                                                    onClick={() => {
                                                        appContext.notification.toggle();
                                                        this._closeNav();
                                                    }}
                                                >
                                                    <img className="headerIcon__img" src="https://fakeimg.pl/30x30/" />
                                                </a>
                                            ) : (
                                                ""
                                            )}

                                            <div className="headerIcon__line" />
                                            <svg className={`navSwitch ${classNames({ "navSwitch--close": this.state.navOpen })}`} onClick={this._toggleNav} x="0px" y="0px" width="175px" height="175px" viewBox="0 0 175 175" enableBackground="new 0 0 175 175">
                                                <g>
                                                    <path fill="#FFFFFF" d="M175,38c0,5.523-4.477,10-10,10H10C4.477,48,0,43.523,0,38l0,0c0-5.523,4.477-10,10-10h155 C170.523,28,175,32.477,175,38L175,38z" />
                                                    <path fill="#FFFFFF" d="M175,87.5c0,5.523-4.477,10-10,10H10c-5.523,0-10-4.477-10-10l0,0c0-5.523,4.477-10,10-10h155 C170.523,77.5,175,81.977,175,87.5L175,87.5z" />
                                                    <path fill="#FFFFFF" d="M175,137c0,5.523-4.477,10-10,10H10c-5.523,0-10-4.477-10-10l0,0c0-5.523,4.477-10,10-10h155 C170.523,127,175,131.477,175,137L175,137z" />
                                                </g>
                                            </svg>
                                        </div>
                                    </Fragment>
                                );
                            }}
                        </AppContextConsumer>
                    );
                }}
            </IntlContextConsumer>
        );
    }
}

export default Nav;
