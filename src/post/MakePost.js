import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import { Redirect } from "react-router-dom";

class MakePost extends React.Component {
    constructor() {
        super();
        this.state = {title: "", body: "", reply_to: "", redirect: false, id: "", this: this};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.postId) {
            this.setState({reply_to: this.props.match.params.postId});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id && this.props.match.params.postId) {
            this.setState({reply_to: this.props.match.params.postId});
        }
    }

    handleSubmit(event) {
        if (this.state.title === "" || this.state.body === "") {
            alert("You need a title and post body.");
            return 1;
        }
        let thing = this;

        let apiURL = API_BASE_URL + "/posts";
        if (this.state.reply_to) {
            apiURL +="/" + this.state.reply_to;
        }

        axios.post(apiURL, {
            title: this.state.title,
            text: this.state.body
        }, {
            headers: {
                "x-auth-token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZWRiZDk1ZjMwNjY4Njk5YzcyZTk4MiIsImlhdCI6MTU1OTgyOTk0NiwiZXhwIjoxNTU5ODM3MTQ2fQ.0l9-iX_gBnhDOwhYnVRMtJ0lbGuoyRO1OqMkTEFAd2U",
                //TODO: Get JWT from cookie.
            }
        })
        .then(function (res) {
            thing.setState({redirect: true, id: res.data.id});
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error! Please try again later.");
            console.log(err);
        })
        event.preventDefault();
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value.toString()});
    }

    handleBodyChange(event) {
        this.setState({body: event.target.value.toString()});
    }

    renderRedirect() {
        if (this.state.redirect) {
            let post = "/post/" + this.state.id;
            return <Redirect to={post} />
        }
    }

    render() {
        return (
        <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h1>New Post</h1>
                <input type="text" placeholder="Title" name="title" onChange={this.handleTitleChange} />
                <br />
                <input type="text" placeholder="Text" name="body" onChange={this.handleBodyChange} />
                <br/>
                <input type="submit" value="Submit" />
                {this.renderRedirect()}
            </form>
        </div>
        );
    }
}

export default MakePost;