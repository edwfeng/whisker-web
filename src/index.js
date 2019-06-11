import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.scss';
import App from './App';
import Post from "./post/Post";
import MakePost from "./post/MakePost";
import EditPost from "./post/EditPost";
import Login from "./login/Login";
import MakeUser from "./user/MakeUser";
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/newpost">Post</Link>
                </li>
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/signup"component={MakeUser}/>
            <Route exact path="/post/:postId" component={Post} />
            <Route path="/post/:postId/reply" component={MakePost} />
            <Route path="/post/:postId/edit" component={EditPost} />
            <Route path="/newpost" component={MakePost} />
            <Route path="/login" component={Login} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
