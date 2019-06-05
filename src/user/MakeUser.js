import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import "./post.css";
import createCookie from "../utils";

// TODO

class User extends React.Component {
    constructor() {
        this.state = {user: "", pass: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        if (this.state.user == "" || this.state.pass == "") {
            alert("You need a password and username.");
            return 1;
        }
        else if(this.state.username in API_BASE_URL + "/users"){
            alert("Username already taken. Please choose another one")
        }

        axios.post(API_BASE_URL + "/users", {
            username: this.state.user,
            password: this.state.pass
        })
        .then(function (res) {
            setCookie(this.state.user, this.state.pass);
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error! Please try again later.");
            console.log(err);
        })
        event.preventDefault();
    }

    handleUsernameChange(event) {                                    //IDK if this and password are nessecary?
        this.state.user = str(event.target.value);
    }

    handlePasswordChange(event) {
        this.state.pass = str(event.target.value);
    }
    //render done
    render() {
        return (
            <form className="Users" onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="user" onChange={this.handleUsernameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="pass" onChange={this.handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
        //done
    }
}

export default MakePost;