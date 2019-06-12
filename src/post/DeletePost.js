import React from "react";
import axios from "axios";
import { API_BASE_URL, getCookie, postDateFormat } from "../utils.js";
import { Redirect } from "react-router-dom";
import "./DeletePost.scss";

class DeletePost extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            date: new Date(),
            edit: new Date(),
            redirectTo: "",
            id: "",
            gotData: false};
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
                    date: new Date(res.data.created_at),
                    edit: new Date(res.data.updated_at),
                    gotData: true
                })
            });
        }
    }

    handleSubmit() {
        let thing = this;

        let jwt = "Bearer " + getCookie("jwt");

        console.log(API_BASE_URL + "/posts/" + this.state.id)

        axios.delete(API_BASE_URL + "/posts/" + this.state.id, {
            headers: {
                "Authorization": jwt
            }
        })
        .then(function () {
            thing.setState({redirectTo: "/"});
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error! Please try again later.");
            console.log(err);
        })
    }

    goBack() {
        console.log(this.state)
        this.setState({redirectTo: "/post/" + this.state.id})
        console.log(this.state)
    }

    renderRedirect() {
        if (this.state.redirectTo !== "") {
            return <Redirect to={this.state.redirectTo} />
        }
    }

    render() {
        return (
        <div className="container">
            <form>
                <h1>Are you sure you want to delete the following post?</h1>
                <div className="post">
                    <hr />
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <h4>Posted {postDateFormat(this.state.date, this.state.edit)}</h4>
                    <hr />
                </div>
                <input type="button" value="Yes" id="delConfirm" onClick={() => this.handleSubmit()} />
                <input type="button" value="No" onClick={() => this.goBack()} />
                {this.renderRedirect()}
            </form>
        </div>
        );
    }
}

export default DeletePost;