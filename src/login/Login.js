import React from 'react';
import axios from "axios";
import { setCookie, API_BASE_URL } from "../utils.js";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {user: "", pass: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        if (this.state.user === "" || this.state.pass === "") {
            alert("Please type in your username and password.");
            return 1;
        }

        axios.post(API_BASE_URL + "/login", {
            user: this.state.user,
            pass: this.state.pass
        })
            .then(function (res) {
                setCookie(res.data.token);
                console.log(res);
            })
            .catch(function (err) {
                alert("Sorry, we experienced an error! Please try again later.");
                console.log(err);
            });
        event.preventDefault();
    }

    handleUsernameChange(event) {
        this.setState({user: event.target.value.toString()})
        console.log(this.state)
    }

    handlePasswordChange(event) {
        this.setState({pass: event.target.value.toString()})
        console.log(this.state)
    }

    render() {
        return (
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" name="user" onChange={this.handleUsernameChange} />
                    <br/>
                    <input type="password" placeholder="Password" name="pass" onChange={this.handlePasswordChange} />
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Login;