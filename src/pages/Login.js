import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../img/logo.svg";
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForms';
import { useAuth } from "../context/auth";

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location.state.referer || '/';
    // const referer = '/';

    function postLogin() {
       console.log('postLogin called.');
       const something = axios.post('127.0.0.1:8000/rest-auth/login/', {userName, password} ).then(
           result => {
               console.log('postLogin called. username is ' + userName);
               if( result.status === 200 ) {
                   setAuthTokens(result.data);
                   setLoggedIn(true);
               } else {
                   setIsError(true);
               }
           }).catch(e=>{setIsError(true);}
       );
       console.log('postLogin end. something is :');
       console.log(something);
    } // end postLogin

    if (isLoggedIn) {
        console.log('postLogin isLoggedIn is true and referer is ' + referer);
        return <Redirect to={referer} />;
    }

    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e=>{
                        setUserName(e.target.value);
                    }}
                    placeholder="username"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e=>{
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            { isError&& <Error>The username or password provider were incorrect.</Error>}
        </Card>
    );
}

export default Login;