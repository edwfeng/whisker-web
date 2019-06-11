import React from "react";
import axios from "axios";
import { API_BASE_URL, NUM_POSTS_PER_PAGE, postDateFormat, getCookie } from "../utils.js";
import { Link } from "react-router-dom";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            author: "",
            id: "",
            parent_id: "",
            parentContent: <div></div>,
            editContent: <div></div>,
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
                author: res.data.user,
                date: new Date(res.data.created_at),
                edit: new Date(res.data.updated_at),
                parent_id: res.data.parent_id
            });

            console.log(res.data.user_id);
            console.log(getCookie("uid"));

            if (res.data.user_id === getCookie("uid")) {
                thing.setState({
                    editContent:
                    <div>
                        <br />
                        <div style={{display: "flex"}}>
                            <h5><Link to={"/post/" + res.data._id + "/edit"} className="link" onClick={thing.forceUpdate}>Edit post</Link></h5>
                            <h5>|</h5>
                            <h5><Link to={"/post/" + res.data._id + "/delete"} className="link" onClick={thing.forceUpdate}>Delete post</Link></h5>
                        </div>
                    </div>
                })
            }
            thing.getParent();
            thing.getReplies();
            thing.forceUpdate();
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

        return (
            <div className="replies" >
                {this.renderRepliesHelper()}
                <hr />
                {this.renderRepliesList()}
                <hr />
                {this.renderRepliesHelper()}
            </div>
        )
    }

    renderRepliesHelper() {
        let sPost = this.state.curPage * NUM_POSTS_PER_PAGE + 1;
        let ePost = (this.state.curPage + 1) * NUM_POSTS_PER_PAGE > this.state.tReplies ?
            this.state.tReplies :
            (this.state.curPage + 1) * NUM_POSTS_PER_PAGE;
        let viewString = this.state.tPages === 1 ?
            "Viewing all replies":
            "Viewing repl" + (sPost === ePost ?
                "y " + sPost :
                "ies " + sPost + "→" + ePost);

        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h6 className="link" onClick={() => this.getReplies()}>Refresh replies</h6>
                <h4 style={{display: "flex"}}>{this.renderReplyPages()}</h4>
                <h5>{viewString}</h5>
            </div>
        )
    }

    renderRepliesList() {
        return (
            this.state.replies.map((reply) => 
                <div className="reply" key={reply._id}>
                    <h4><Link to={"/post/" + reply._id} className="link" onClick={this.forceUpdate}>{reply.title}&nbsp;</Link></h4>
                    <h5>By: {reply.user} on {postDateFormat(reply.date, reply.edit)}</h5>
                </div>
            )
        )
    }

    renderReplyPages() {
        if (this.state.tPages === 1) {
            return (<div id="Empty div"></div>);
        }

        let numbers = Array.from(Array(this.state.tPages).keys());
        return(
            numbers.map((page) => {
                if (page === this.state.curPage) {
                    return (<div key={page}>{page + 1}&nbsp;</div>)
                }

                return (
                    <div className="link" key={page}
                        onClick={() => {
                            console.log(this.state);
                            // eslint-disable-next-line
                            this.state.curPage = page;
                            // I tried this.setState() but it didn't work, so...
                            console.log(this.state);
                            console.log(page+1)
                            this.getReplies();
                        }} >
                        {page + 1}&nbsp;
                    </div>
                )
            })
        )
    }

    getParent() {
        console.log(this.state);
        if (!this.state.parent_id) {
            return (<div></div>);
        }

        let thing = this;

        axios.get(API_BASE_URL + "/posts/" + this.state.parent_id)
        .then(function (res) {
            if (!res.data.title) {
                return (<div></div>)
            }

            thing.setState({
                parentContent:
                <h5><Link to={"/post/" + res.data._id} className="link" onClick={thing.forceUpdate}>View parent: "{res.data.title}"</Link></h5>
            })
        })
        .catch(function (err) {
            alert("We experienced an error.");
            console.log(err);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="post">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <h4>By: {this.state.author} on {postDateFormat(this.state.date, this.state.edit)}</h4>
                    {this.state.parentContent}
                    {this.state.editContent}
                </div>
                <hr />
                {this.renderReplies()}
            </div>
        );
    }
}

export default Post;