import React, {useState} from "react";
import { Link, Redirect } from 'react-router-dom';
import logoImg from "../img/logo.svg";
import {Card, Logo, Form, Input, Button, Error} from '../components/AuthForms';
import axios from "axios";
import {useAuth} from "../context/auth";

function Signup(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location.state.referer || '/';
    function postSignup() {
        console.log('postSignup called.');
        // const something = axios.post('http://127.0.0.1:8000/rest-auth/login/', {userName, password} ).then(
        // This was the only line I needed to change to make Denny's post:
        // https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
        // again big thanks to Denny!
        // ALSO A BIG WARNING!!!
        // password is being passed unencrypted and in the clear.
        // Things to note:
        // 1) http://127.0.0.1/rest-auth/login is a default endpoint defined on django server running django-rest-auth.
        // 2) The payload is what the above endpoint expects.
        // Request URL: http://127.0.0.1:8000/accounts/signup/
        // csrfmiddlewaretoken: KnmOI3zcydWbANj9Is0DGb8gXVGdSnMK6ghN6F6etRuQJEMZr8Rv6CljEyLUsvLV
        // username: sucker
        // email: suck@it.com
        // password1: asdfqwer
        // password2: asdfqwer
        const something = axios.post('http://127.0.0.1:8000/rest-auth/signup/', {"username" : userName, "password1": password, "password2": password2} ).then(
            result => {
                console.log('postSignup called. username is ' + userName);
                if( result.status === 200 ) {
                    setAuthTokens(result.data);
                    setLoggedIn(true);
                } else {
                    setIsError(true);
                }
            }).catch(e=>{setIsError(true);}
        );
        console.log('postSignup end. something is :');
        console.log(something);
    } // end postSignup

    if (isLoggedIn) {
        console.log('postLogin isLoggedIn is true and referer is ' + referer);
        return <Redirect to={referer} />;
    }

    /*
    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input type="email" placeholder="email" />
                <Input type="password" placeholder="password" />
                <Input type="password" placeholder="password again" />
                <Button>Sign Up</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </Card>
    );
    */
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
                <Input
                    type="password2"
                    value={password2}
                    onChange={e=>{
                        setPassword2(e.target.value);
                    }}
                    placeholder="password again"
                />
                <Button onClick={postSignup}>Sign In</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
            { isError&& <Error>The username or password provider were incorrect.</Error>}
        </Card>
    );
}

export default Signup;