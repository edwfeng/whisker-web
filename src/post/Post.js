import React from "react";
import "./Post.css";

function Post() {
    return (
        <div className="post">
            <h1>{this.props.title}</h1>
            <p>{this.props.body}</p>
            <br />>
            <h2>{this.prop.author}</h2>
        </div>
    );
}