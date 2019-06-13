import React from "react";
import axios from "axios";
import { API_BASE_URL, getCookie, delJWT } from "../utils.js";

class DeletePost extends React.Component {
    constructor() {
        super();
        this.state = {user: ""};
    }

    componentDidMount() {
        if (this.props.match.params.username) {
            this.setState({user: this.props.match.params.username});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            if (this.props.match.params.username) {
                this.setState({id: this.props.match.params.username});
            }
        }
    }
    handleSubmit() {
        let thing = this;

        let jwt = "Bearer " + getCookie("jwt");

        axios.delete(API_BASE_URL + "/users", {
            headers: {
                "Authorization": jwt
            }
        })
        .then(function () {
            delJWT();
            alert("User deleted.");
            thing.props.history.push("/");
            window.location.reload();
        })
        .catch(function (err) {
            console.log(err);
            if (err.response) {
                switch (err.response.data.error) {
                    case "Invalid authorization header.":
                    case "Token not provided":
                    case "Invalid token.":
                        alert("Invalid local credentials, please sign in again.");
                        thing.props.history.push("/login");
                        break;
                    default:
                        alert(err.response.data.error);
                }
            } else if (err.request) {
                alert("Couldn't connect to server.");
            } else {
                alert("Generic error, check console for details.");
            }
        });
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return (
        <div className="container">
            <form>
                <h1>Are you sure you want to delete user {this.state.user}?</h1>
                <input type="button" value="Yes" className="bDanger" onClick={() => this.handleSubmit()} />
                <input type="button" value="No" onClick={() => this.goBack()} />
            </form>
        </div>
        );
    }
}

export default DeletePost;