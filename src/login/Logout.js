import React from "react";
import { delJWT } from "../utils.js";
import "./Logout.scss";

class Logout extends React.Component {
    constructor() {
        super();
        this.goBack = this.goBack.bind(this);
    }

    handleSubmit() {
        delJWT();
        alert("Logged out!");
        this.props.history.push("/")
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return (
        <div className="container">
            <form>
                <h1>Are you sure you want to logout?</h1>
                <input type="button" value="Yes" id="logoutConfirm" onClick={() => this.handleSubmit()} />
                <input type="button" value="No" onClick={() => this.goBack()} />
            </form>
        </div>
        );
    }
}

export default Logout;