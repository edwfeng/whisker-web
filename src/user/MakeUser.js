import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import { setJWT } from "../utils";

class MakeUser extends React.Component {
    constructor() {
        super();
        this.state = {user: "", pass: "", bio: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        if (this.state.user === "" || this.state.pass === "") {
            alert("You need a password and username.");
            return 1;
        }

        let thing = this;

        let params = {
            user: this.state.user,
            pass: this.state.pass
        }

        if (this.state.bio !== "") {
            params.bio = this.state.bio;
        }
    
        axios.post(API_BASE_URL + "/users", params)
        .then(function (res) {
            setJWT(res.data.token);
            alert("Created new user " + thing.state.user);
            thing.props.history.push("/useri/" + res.data._id);
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
                    <h1>Register</h1>
                    <input type="text" id="" placeholder= "Username "name="user" onChange={(event) => this.setState({user: event.target.value})} />
                    <br/>
                    <input type="password" placeholder="Password" name="pass" onChange={(event) => this.setState({pass: event.target.value})} />
                    <br/>
                    <textarea placeholder="Bio" name="bio" onChange={(event) => this.setState({bio: event.target.value})} />
                    <br/>
                    <input type="submit" value="Submit" />
                    <input type="button" value="Cancel" className="bDanger" onClick={this.props.history.goBack} />
                </form>
            </div>
        );
     
    }
}

export default MakeUser;