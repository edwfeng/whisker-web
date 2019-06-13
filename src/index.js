import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.scss';
import App from './App';
import Post from "./post/Post";
import MakePost from "./post/MakePost";
import EditPost from "./post/EditPost";
import DeletePost from "./post/DeletePost";
import Login from "./login/Login";
import Logout from "./login/Logout";
import MakeUser from "./user/MakeUser";
import EditUser from "./user/EditUser";
import ForwardUser from "./user/ForwardUser";
import User from "./user/User";
import DeleteUser from "./user/DeleteUser";
import * as serviceWorker from './serviceWorker';
import logo from './logo.png';

import { getCookie } from "./utils.js";
import ForwardWithJWT from './user/ForwardWithJWT';

let login = <div></div>
if (getCookie("jwt") === "") {
    login = <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Link to="/login">Login</Link>
                <p>&nbsp;|&nbsp;</p>
                <Link to="/signup">Register</Link>
            </li>
} else {
    login = <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Link to="/newpost">New Post</Link>
                <p>&nbsp;|&nbsp;</p>
                <Link to="/user">Your Profile</Link>
                <p>&nbsp;|&nbsp;</p>
                <Link to="/settings">Settings</Link>
                <p>&nbsp;|&nbsp;</p>
                <Link to="/logout">Logout</Link>
            </li>
}

const routing = (
    <Router>
        <div>
            <ul style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <li style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <img src={logo} alt="logo" style={{width: 50}} />
                    <Link to="/">Home</Link>
                </li>
                {login}
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/signup"component={MakeUser}/>
            <Route path="/settings"component={EditUser}/>
            <Route exact path="/user/:username" component={ForwardUser} />
            <Route exact path="/user" component={ForwardWithJWT} />
            <Route path="/user/:username/delete" component={DeleteUser} />
            <Route path="/useri/:userId" component={User} />
            <Route exact path="/post/:postId" component={Post} />
            <Route path="/post/:postId/reply" component={MakePost} />
            <Route path="/post/:postId/edit" component={EditPost} />
            <Route path="/post/:postId/delete" component={DeletePost} />
            <Route path="/newpost" component={MakePost} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
