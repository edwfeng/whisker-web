export function setCookie(cvalue) {
    document.cookie = "jwt=" + cvalue + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return true;
        }
    }
    return "";
}

// export function checkCookie() {
//     var user = getCookie("username");
//     if (user !== "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user !== "" && user != null) {
//             setCookie("username", user, 365);
//         }
//     }
// }

export const API_BASE_URL = "http://localhost:5000";
export default API_BASE_URL;
