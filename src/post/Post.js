import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import "./Post.css";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            author: ""
        }
    }

    componentDidMount() {
        this.getData(this.props.match.params.postId, this);
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.getData(this.props.match.params.postId, this);
        }
    }
    
    getData(postId, thing) {
        axios.get(API_BASE_URL + "/posts/" + postId)
        .then(function (res) {
            thing.setState({title: res.data.title, body: res.data.text});
            axios.get(API_BASE_URL + "/userid/" + res.data.user_id)
            .then(function (user_res) {
                thing.setState({author: user_res.data.user});
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
                <hr />
                <h2>By: {this.state.author}</h2>
            </div>
    );
    }
}

export default Post;