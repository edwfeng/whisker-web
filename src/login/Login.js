import React from 'react';
import axios from "axios";
import { setJWT, API_BASE_URL } from "../utils.js";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {user: "", pass: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (this.state.user === "" || this.state.pass === "") {
            alert("Please type in your username and password.");
            return 1;
        }
        let thing = this;

        axios.post(API_BASE_URL + "/login", {
            user: this.state.user,
            pass: this.state.pass
        })
        .then(function (res) {
            setJWT(res.data.token);
            alert("Login successful");
            thing.props.history.push("/user/" + res.data._id);
            window.location.reload();
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

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" name="user" onChange={(event) => this.setState({user: event.target.value})} />
                    <br/>
                    <input type="password" placeholder="Password" name="pass" onChange={(event) => this.setState({pass: event.target.value})} />
                    <br/>
                    <input type="submit" value="Submit" />
                    <input type="button" value="Cancel" className="bDanger" onClick={this.props.history.goBack} />
                </form>
            </div>
        );
    }
}

export default Login;