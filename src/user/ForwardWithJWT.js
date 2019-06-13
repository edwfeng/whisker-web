import React from "react";
import { getUserId } from "../utils.js";

class ForwardWithJWT extends React.Component {
    render() {
        this.props.history.push("/useri/" + getUserId());
        return (
        <div className="container">
            <h1>Please wait while we redirect you.</h1>
        </div>
        );
    }
}

export default ForwardWithJWT;