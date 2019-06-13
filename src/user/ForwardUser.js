import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils.js";

class EditPost extends React.Component {
    componentDidMount() {
        if (this.props.match.params.username) {
            this.forward(this.props.match.params.username);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.forward(this.props.match.params.username);
        }
    }

    async forward(username) {
        try {
            let user = await axios.get(API_BASE_URL + "/users/" + username);
            this.props.history.push("/useri/" + user.data._id);
        } catch (err) {
            console.log(err);
            if (err.response) {
                alert(err.response.data.error);
            } else if (err.request) {
                alert("Couldn't connect to server.");
            } else {
                alert("Generic error, check console for details.");
            }
        }
    }

    render() {
        return (
        <div className="container">
            <h1>Please wait while we redirect you.</h1>
        </div>
        );
    }
}

export default EditPost;