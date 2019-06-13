import React from "react";
import axios from "axios";
import { API_BASE_URL, getCookie } from "../utils.js";

class MakePost extends React.Component {
    constructor() {
        super();
        this.state = {title: "", body: "", reply_to: "", parent_title: "", id: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.postId) {
            this.setState({reply_to: this.props.match.params.postId});
        }

        if (this.state.reply_to) {
            this.getParentName();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id && this.props.match.params.postId) {
            this.setState({reply_to: this.props.match.params.postId});
        }

        if (this.state.reply_to) {
            this.getParentName();
        }
    }

    async getParentName() {
        try {
            let parent = await axios.get(API_BASE_URL + "/posts/" + this.state.reply_to);
            this.setState({parent_title: parent.data.title});
        } catch (err) {
            console.log(err);
            if (err.response) {
                alert(err.response.data.error);
                if (err.response.status === 404 || err.response.status === 500) {
                    this.props.history.push("/");                    
                }
            } else if (err.request) {
                alert("Couldn't connect to server.");
            } else {
                alert("Generic error, check console for details.");
            }
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
            apiURL += "/" + this.state.reply_to;
        }

        axios.post(apiURL, {
            title: this.state.title,
            text: this.state.body
        }, {
            headers: {
                "x-auth-token": "Bearer " + getCookie("jwt")
            }
        })
        .then(function (res) {
            thing.props.history.push("/post/" + res.data.id);
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
        let viewString = this.state.reply_to ?
            "Reply to \"" + this.state.parent_title + '"':
            "New post";

        return (
        <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h1>{viewString}</h1>
                <input type="text" placeholder="Title" name="title" onChange={(event) => this.setState({title: event.target.value})} />
                <br/>
                <textarea placeholder="Text" name="body" onChange={(event) => this.setState({body: event.target.value})} />
                <br/>
                <input type="submit" value="Submit" />
                <input type="button" value="Cancel" className="bDanger" onClick={this.props.history.goBack} />
            </form>
        </div>
        );
    }
}

export default MakePost;