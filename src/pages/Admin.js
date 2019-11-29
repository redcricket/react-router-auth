import React, {useState} from "react";
import {Button} from "../components/AuthForms"
import {useAuth} from "../context/auth";
import axios from 'axios';

function Admin(props) {
    const {authTokens, setAuthTokens} = useAuth();

    function logOut() {
        setAuthTokens(undefined);
    }

    const [username, setUsername] = useState(null);

    const key = !authTokens ? "Logged out" : authTokens.key;
    // const s = JSON.stringify(authTokens);


    if (!!authTokens) {
        const url = 'http://localhost:8000/rest-auth/user/';
        const withCredentials = true;
        const method = 'get';
        axios.request({method, url, withCredentials}).then(response => {
            console.log('Admin() response is ', response);
            setUsername(response.data.username);
        });
    } else {
        console.log("Logged out");
    }


    return (
        <div>
            <div>Admin Page</div>
            ;
            <div>Key: {key}</div>
            <div>Username: {username}</div>
            <Button onClick={logOut}>Log out</Button>
        </div>);
}

export default Admin;