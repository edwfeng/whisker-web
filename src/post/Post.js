import React from "react";
import axios from "axios";
import { API_BASE_URL, NUM_POSTS_PER_PAGE, postDateFormat } from "../utils.js";
import { Link } from "react-router-dom";
import "./Post.css";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            author: "",
            id: "",
            date: new Date(),
            edit: new Date(),
            replies: [],
            tReplies: 0,
            curPage: 0,
            tPages: 0
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
        thing.setState({id: postId});
        axios.get(API_BASE_URL + "/posts/" + postId)
        .then(function (res) {
            thing.setState({
                title: res.data.title,
                body: res.data.text,
                id: res.data._id,
                author:res.data.user,
                date: new Date(res.data.created_at),
                edit: new Date(res.data.updated_at)
            });
            thing.getReplies();
        })
        .catch(function (err) {
            alert("Sorry, we experienced an error fetching post data! Please try again later.");
            console.log(err);
        })
    }

    async getReplies() {
        try {
            const res = await axios.get(API_BASE_URL + "/posts/" + this.state.id + "/replies/" + this.state.curPage);
            let posts = [];
            res.data.posts.forEach(post => {
                posts.push({
                    _id: post._id,
                    title: post.title,
                    user: post.user,
                    date: new Date(post.created_at),
                    edit: new Date(post.updated_at)
                });
            })
            let tReplies = res.data.length;
            let tPages = res.data.pages;
            this.setState({replies: posts, tReplies: tReplies, tPages: tPages});
            this.forceUpdate();
        } catch (err) {
            alert("Something did something bad!");
            console.log(err);
        }
    }

    renderReplies() {
        if (!this.state.replies.length) {
            return (
                <h4>There are no replies to this post.</h4>
            )
        }

        let sPost = this.state.curPage * NUM_POSTS_PER_PAGE + 1;
        let ePost = (this.state.curPage + 1) * NUM_POSTS_PER_PAGE > this.state.tReplies ?
            this.state.tReplies :
            (this.state.curPage + 1) * NUM_POSTS_PER_PAGE;
        let viewString = ePost <= NUM_POSTS_PER_PAGE ?
            "Viewing all replies":
            "Viewing replies " + sPost + "→" + ePost;

        return (
            <div className="replies" >
                <h5>{viewString}</h5>
                <h6 onClick={() => this.getReplies()}>Refresh replies</h6>
                {this.renderRepliesList()}
            </div>
        )
    }

    renderRepliesList() {
        return (
            this.state.replies.map((reply) => 
                <div className="reply" key={reply._id}>
                    <h4><Link to={"/post/" + reply._id} onClick={this.forceUpdate}>{reply.title}</Link></h4>
                    <h5>By: {reply.user} on {postDateFormat(reply.date, reply.edit)}</h5>
                </div>
            )
        )
    }

    render() {
        return (
            <div className="postContainer">
                <div className="post">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <hr />
                    <h3>By: {this.state.author} on {postDateFormat(this.state.date, this.state.edit)}</h3>
                </div>
                <hr />
                {this.renderReplies()}
            </div>
            
        );
    }
}

export default Post;