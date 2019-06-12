import React from "react";
import axios from "axios";
import { API_BASE_URL, getCookie } from "../utils.js";
import { Redirect } from "react-router-dom";

class EditPost extends React.Component {
    constructor() {
        super();
        this.state = {title: "", body: "", redirect: false, id: "", gotData: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.postId) {
            this.setState({id: this.props.match.params.postId});
            this.getPostData();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            if (this.props.match.params.postId) {
                this.setState({id: this.props.match.params.postId});
            }
            this.getPostData();
        }

        if (!this.state.gotData) {
            this.getPostData();
        }
    }

    getPostData() {
        let thing = this;
        if (this.state.id !== "") {
            axios.get(API_BASE_URL + "/posts/" + this.state.id)
            .then(function (res) {
                thing.setState({
                    title: res.data.title,
                    body: res.data.text,
                    gotData: true
                })
            });
        }
    }

    handleSubmit(event) {
        if (this.state.title === "" || this.state.body === "") {
            alert("You need a title and post body.");
            return 1;
        }
        let thing = this;

        let jwt = "Bearer " + getCookie("jwt");

        axios.patch(API_BASE_URL + "/posts/" + this.state.id, {
            title: this.state.title,
            text: this.state.body
        }, {
            headers: {
                "Authorization": jwt
            }
        })
        .then(function () {
            thing.setState({redirect: true});
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
                <h1>Edit post</h1>
                <input type="text"
                    placeholder="Title"
                    name="title"
                    onChange={this.handleTitleChange}
                    value={this.state.title} />
                <br />
                <input type="text"
                    placeholder="Text"
                    name="body"
                    onChange={this.handleBodyChange}
                    value={this.state.body} />
                <br/>
                <input type="submit" value="Submit" />
                {this.renderRedirect()}
            </form>
        </div>
        );
    }
}

export default EditPost;