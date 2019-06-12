import React from "react";
import { delJWT } from "../utils.js";
import { Redirect } from "react-router-dom";
import "./Logout.scss";

class Logout extends React.Component {
    constructor() {
        super();
        this.state = {redirect: false}
        this.goBack = this.goBack.bind(this);
    }

    handleSubmit() {
        delJWT();
        this.setState({redirect: true});
    }

    goBack() {
        this.props.history.goBack();
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    }

    render() {
        return (
        <div className="container">
            <form>
                <h1>Are you sure you want to logout?</h1>
                <input type="button" value="Yes" id="logoutConfirm" onClick={() => this.handleSubmit()} />
                <input type="button" value="No" onClick={() => this.goBack()} />
                {this.renderRedirect()}
            </form>
        </div>
        );
    }
}

export default Logout;