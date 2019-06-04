import React from 'react';
import axios from "axios";
import './Login.css';
import setCookie from "../utils.js";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {user: "", pass: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        if (this.state.user == "" || this.state.pass == "") {
            alert("Please type in your username and password.");
            return 1;
        }

        axios.post(API_BASE_URL + "/login", {
            user: this.state.user,
            pass: this.state.pass
        })
            .then(function (res) {
                setCookie(this.state.user, this.state.pass)
            })
            .catch(function (err) {
                alert("Sorry, we experienced an error! Please try again later.");
                console.log(err);
            });
        event.preventDefault();
    }

    handleUsernameChange(event) {
        this.state.user = str(event.target.value);
    }

    handlePasswordChange(event) {
        this.state.pass = str(event.target.value);
    }

    render() {
        return (
            <form className="Login" onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="username" onChange={this.handleUsernameChange} />
                </label>
                <label>
                    Text:
                    <input type="text" name="password" onChange={this.handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}