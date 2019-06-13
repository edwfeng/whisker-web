import React from "react";
import axios from "axios";
import { API_BASE_URL, getCookie, postDateFormat, getUserId } from "../utils.js";

class DeletePost extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            date: new Date(),
            edit: new Date(),
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
        }
    }

    handleSubmit() {
        let thing = this;

        let jwt = "Bearer " + getCookie("jwt");

        axios.delete(API_BASE_URL + "/posts/" + this.state.id, {
            headers: {
                "Authorization": jwt
            }
        })
        .then(function () {
            alert("Post deleted.");
            thing.props.history.push("/useri/" + getUserId());
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
                <h1>Are you sure you want to delete the following post?</h1>
                <div className="post">
                    <hr />
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <h4>Posted {postDateFormat(this.state.date, this.state.edit)}</h4>
                    <hr />
                </div>
                <input type="button" value="Yes" className="bDanger" onClick={() => this.handleSubmit()} />
                <input type="button" value="No" onClick={() => this.goBack()} />
            </form>
        </div>
        );
    }
}

export default DeletePost;