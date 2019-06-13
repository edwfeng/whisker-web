import React from "react";
import axios from "axios";
import { API_BASE_URL, NUM_POSTS_PER_PAGE, postDateFormat } from "../utils.js";
import { Link } from "react-router-dom";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            id: "",
            bio: "",
            type: "all",
            posts: [],
            tPosts: 0,
            curPage: 0,
            tPages: 0
        }
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    componentDidMount() {
        this.getData(this.props.match.params.userId, this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.getData(this.props.match.params.userId, this);
        }
    }
    
    getData(userId, thing) {
        thing.setState({id: userId});
        axios.get(API_BASE_URL + "/userid/" + userId)
        .then(function (res) {
            thing.setState({
                user: res.data.user,
                bio: res.data.bio
            });

            thing.getPosts();
            thing.forceUpdate();
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
        });
    }

    async getPosts() {
        try {
            const res = await axios.get(API_BASE_URL + "/userid/" + this.state.id + "/" + this.state.type + "/" + this.state.curPage);
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
            let tPosts = res.data.length;
            let tPages = res.data.pages;
            this.setState({posts: posts, tPosts: tPosts, tPages: tPages});
        } catch (err) {
            console.log(err);
            if (err.response) {
                alert(err.response.data.error);
            } else if (err.request) {
                alert("Couldn't connect to server.");
            } else {
                alert("Generic error, check console for details.");
            }
        }
    }

    renderPosts() {
        if (!this.state.posts.length) {
            return (
                <div className="posts" style={{display: "flex", justifyContent: "space-between"}}>
                    <h4>This user has no posts.</h4>
                    <h6 className="link" onClick={() => this.getPosts()}>Refresh posts</h6>
                </div>
            )
        }

        return (
            <div className="posts" >
                {this.renderPostsHelper()}
                <hr />
                {this.renderPostsList()}
                <hr />
                {this.renderPostsHelper()}
            </div>
        )
    }

    renderPostsHelper() {
        let sPost = this.state.curPage * NUM_POSTS_PER_PAGE + 1;
        let ePost = (this.state.curPage + 1) * NUM_POSTS_PER_PAGE > this.state.tPosts ?
            this.state.tPosts :
            (this.state.curPage + 1) * NUM_POSTS_PER_PAGE;
        let viewString;
        if (this.state.type !== "replies") {
            viewString = this.state.tPages === 1 ?
            "Viewing all " + this.state.tPosts + " posts":
            "Viewing post" + ((sPost === ePost ?
                " " + sPost :
                "s " + sPost + "→" + ePost) + " of " + this.state.tPosts);
        } else {
            viewString = this.state.tPages === 1 ?
            "Viewing all " + this.state.tPosts + " replies":
            "Viewing repl" + ((sPost === ePost ?
                "y " + sPost :
                "ies " + sPost + "→" + ePost) + " of " + this.state.tPosts);
        }

        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h6 className="link" onClick={() => this.getPosts()}>Refresh {this.state.type === "replies" ? "replies" : "posts"}</h6>
                <h4 style={{display: "flex"}}>{this.renderPostPages()}</h4>
                <h5>{viewString}</h5>
            </div>
        )
    }

    renderPostsList() {
        return (
            this.state.posts.map((post) => 
                <div className="post" key={post._id}>
                    <h4><Link to={"/post/" + post._id} className="link" onClick={this.forceUpdate}>{post.title}&nbsp;</Link></h4>
                    <h5>Posted {postDateFormat(post.date, post.edit)}</h5>
                </div>
            )
        )
    }

    renderPostPages() {
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
                            // eslint-disable-next-line
                            this.state.curPage = page;
                            // I tried this.setState() but it didn't work, so...
                            this.getPosts();
                        }} >
                        {page + 1}&nbsp;
                    </div>
                )
            })
        )
    }

    async handleRadioChange(event) {
        await this.setState({type: event.target.value});
        this.getPosts();
    }

    render() {
        return (
            <div className="container">
                <h1>User {this.state.user}'s profile</h1>
                <p>{this.state.bio}</p>
                <hr />
                <h5>
                    <form style={{display: "flex", alignItems: "center"}} className="ex">
                        View:&nbsp;
                        <label>
                            <input type="radio" value="all"
                                checked={this.state.type === "all"}
                                onChange={this.handleRadioChange} />
                            &nbsp;All&nbsp;
                        </label>
                        <label>
                            <input type="radio" value="posts"
                                checked={this.state.type === "posts"}
                                onChange={this.handleRadioChange} />
                            &nbsp;Posts&nbsp;
                        </label>
                        <label>
                            <input type="radio" value="replies"
                                checked={this.state.type === "replies"}
                                onChange={this.handleRadioChange} />
                            &nbsp;Replies&nbsp;
                        </label>
                    </form>
                </h5>
                <hr />
                {this.renderPosts()}
            </div>
        );
    }
}

export default Post;