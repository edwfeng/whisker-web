import React from "react";
import axios from "axios";
import API_BASE_URL from "../utils.js";
import "./post.css";

class MakePost extends React.Component {
    constructor() {
        this.state = {title: "", body: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    handleSubmit(event) {
        if (this.state.title == "" || this.state.body == "") {
            alert("You need a title and post body.");
            return 1;
        }

        axios.post(API_BASE_URL + "/posts", {
            title: this.state.title,
            text: this.state.body
        }, {
            headers: {
                "Authentication": 123,
                //TODO: Get JWT from cookie.
            }
        })
        .then(function (res) {
            // TODO: Redirect to newly created post.
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error! Please try again later.");
            console.log(err);
        })
        event.preventDefault();
    }

    handleTitleChange(event) {
        this.state.title = str(event.target.value);
    }

    handleBodyChange(event) {
        this.state.body = str(event.target.value);
    }

    render() {
        return (
            <form className="MakePost" onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" onChange={this.handleTitleChange} />
                </label>
                <label>
                    Text:
                    <input type="text" name="body" />
                </label>
                <input type="submit" value="Submit" onChange={this.handleBodyChange} />
            </form>
        );
    }
}

export default MakePost;