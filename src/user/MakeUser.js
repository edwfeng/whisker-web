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
            
            <div class="signup">
                <form className="Users" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <label>
                        <input type="text" id="" placeholder= "Username "name="user" onChange={this.handleUsernameChange} />
                    </label>
                    <br/>
                    <label>
                        <input type="password" placeholder="Password" name="pass" onChange={this.handlePasswordChange} />
                    </label>
                    <br/>
                        <input type="submit" value="Submit" />
                        
                </form>
            </div>
            
        );
     
    }
}

export default MakeUser;