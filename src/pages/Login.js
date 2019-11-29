import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import logoImg from "../img/logo.svg";
import {Button, Card, Error, Form, Input, Logo} from '../components/AuthForms';
import {useAuth} from "../context/auth";

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthTokens} = useAuth();
    const referer = props.location.state.referer || '/';

    const url = 'http://localhost:8000/rest-auth/login/';
    const withCredentials = true;
    const method = 'post';
    const data = {"username": userName, "password": password};

    function postLogin() {
        // BIG WARNING!!!
        // password is being passed unencrypted and in the clear.
        axios.request({url, withCredentials, data, method}).then(
            result => {
                if (result.status === 200) {
                    setAuthTokens(result.data);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            }).catch(e => {
                setIsError(true);
            }
        );
    } // end postLogin

    if (isLoggedIn) {
        return <Redirect to={referer}/>;
    }

    return (
        <Card>
            <Logo src={logoImg}/>
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="username"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            {isError && <Error>The username or password provider were incorrect.</Error>}
        </Card>
    );
}

export default Login;