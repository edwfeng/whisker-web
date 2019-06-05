import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import "./Post.css";

class Post extends React.Component {
    constructor() {
        state = {
            title: "",
            body: "",
            author: ""
        }
    }

    componentDidMount() {
        const { postId } = this.props.match.params;
        axios.get(API_BASE_URL + "/posts/" + postId)
        .then(function (res) {
            this.state.title = res.title || "";
            this.state.body = res.text || "";
            axios.get(API_BASE_URL + "/users/" + res._id)
            .then(function (user_res) {
                this.state.author = user_res.user || "";
            })
            .catch(function (err) {
                alert("Sorry, we experienced an error! Please try again later.");
                console.log(err);
            })
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error! Please try again later.");
            console.log(err);
        })
    }

    render() {
        return (
            <div className="post">
                <h1>{this.state.title}</h1>
                <p>{this.state.body}</p>
                <br />>
                <h2>{this.state.author}</h2>
            </div>
    );
    }
}

export default MakePost;