import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import "./MakeUser.css";
import { setCookie } from "../utils";

class MakeUser extends React.Component {
    constructor() {
        super();
        this.state = {user: "", pass: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        if (this.state.user === "" || this.state.pass === "") {
            alert("You need a password and username.");
            return 1;
        }
    
        axios.post(API_BASE_URL + "/users", {
            user: this.state.user,
            pass: this.state.pass
        })
        .then(function (res) {
            setCookie(res.data.token);
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error! Please try again later.");
            console.log(err);
        })
        event.preventDefault();
    }

    handleUsernameChange(event) {                                    
        this.setState({user:event.target.value.toString()})
    }

    handlePasswordChange(event) {
        this.setState({pass:event.target.value.toString()})
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
     
    }
}

export default MakeUser;