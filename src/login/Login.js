import React from 'react';
import axios from "axios";
import { setJWT, API_BASE_URL } from "../utils.js";

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
            setJWT(res.data.token);    
            alert("Login successful");
        })
        .catch(function (err) {
            console.log(err);
            if (err.response) {
                alert(err.response.data.error);
            } else if (err.request) {
                alert("Couldn't connect to server.");
            } else {
                alert("Generic error, check console for details.");
            }
        });
        event.preventDefault();
    }

    handleUsernameChange(event) {
        this.setState({user: event.target.value.toString()})
    }

    handlePasswordChange(event) {
        this.setState({pass: event.target.value.toString()})
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