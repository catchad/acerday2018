import React from "react";
import Nav from "../Nav";
import { AppContextConsumer } from "../../AppContext";
import "./index.scss";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {}

    render() {
        return (
            <header className="header">
                <div className="header__left">
                    <AppContextConsumer>
                        {context => {
                            return (
                                <Link to={`/${context.currentCountry}`}>
                                    <img className="header__logo" src={logo} />
                                </Link>
                            );
                        }}
                    </AppContextConsumer>
                </div>
                <Nav />
            </header>
        );
    }
}

export default Header;
