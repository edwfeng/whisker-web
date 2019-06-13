import React from "react";
import axios from "axios";
import { API_BASE_URL, getCookie } from "../utils.js";

class EditPost extends React.Component {
    constructor() {
        super();
        this.state = {title: "", body: "", id: "", gotData: false};
        this.handleSubmit = this.handleSubmit.bind(this);
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
            })
            .catch(function (err) {
                console.log(err);
                if (err.response) {
                    alert(err.response.data.error);
                    if (err.response.status === 404 || err.response.status === 500) {
                        thing.props.history.push("/");                    
                    }
                } else if (err.request) {
                    alert("Couldn't connect to server.");
                } else {
                    alert("Generic error, check console for details.");
                }
            });;
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
            thing.props.history.push("/post/" + thing.state.id);
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
        event.preventDefault();
    }

    render() {
        return (
        <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h1>Edit post</h1>
                <input type="text"
                    placeholder="Title"
                    name="title"
                    onChange={(event) => this.setState({title: event.target.value})}
                    value={this.state.title} />
                <br />
                <textarea
                    placeholder="Text"
                    name="body"
                    onChange={(event) => this.setState({body: event.target.value})}
                    value={this.state.body} />
                <br/>
                <input type="submit" value="Submit" />
                <input type="button" value="Cancel" className="bDanger" onClick={() => this.props.history.push("/post/" + this.state.id)} />
            </form>
        </div>
        );
    }
}

export default EditPost;