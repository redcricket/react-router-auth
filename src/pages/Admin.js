import React, {useState, useEffect} from "react";
import {Button} from "../components/AuthForms"
import {useAuth} from "../context/auth";
import axios from 'axios';

function Admin(props) {
    const {authTokens, setAuthTokens} = useAuth();

    function logOut() {
        const url = 'http://localhost:8000/rest-auth/logout/';
        const withCredentials = true;
        const method = 'post';
        axios.request({method, url, withCredentials}).then(response => {
            console.log('Admin() logout response is ', response);
            setUsername(null);
        }).catch((reason) => {
            console.log(reason);
        });
        setAuthTokens(undefined);
    }

    const [username, setUsername] = useState(null);
    const [appUser, setAppUser] = useState({pk:-1, username: '', email: '', first_name: '', last_name:''});
    const key = !authTokens ? "Logged out" : authTokens.key;
    // const s = JSON.stringify(authTokens);


    useEffect(()=>{

        if (!!authTokens) {
            const url = 'http://localhost:8000/rest-auth/user/';
            const withCredentials = true;
            const method = 'get';
            axios.request({method, url, withCredentials}).then(response => {
                console.log('Admin() response is ', response);
                // setUsername(response.data.username);
                setAppUser({...appUser, ...response.data});
                // setAppUser(response.data);
                // setAppUser({...appUser}, response.data);

            });
        }
    }, [authTokens]);


    return (
        <div>
            <div>XXXX Admin Page</div>
            <div>Key: {key}</div>
            <div>Username: {username}</div>
            <div>App User pk: {appUser.pk} username: {appUser.username}</div>
            <Button onClick={logOut}>Log out</Button>
        </div>);
}

export default Admin;