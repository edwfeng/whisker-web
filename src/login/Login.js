import React from 'react';
import './Login.css';

function Login() {
    return (
        <button login="rectangle" onClick={props.onclick}>
            {props.key}
            {props.value()}
        </button>
    )
}

function setCookie(cname, cpassword) {
    document.cookie = cname + "=" + cpassword;
}
