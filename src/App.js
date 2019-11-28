// react-router-auth
import React, {useState} from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthContext } from "./context/auth";

function App(props) {
    const [authTokens, setAuthTokens] = useState(undefined);  //type: AuthTokens | undefined (see auth.js)

    console.log("App.state.authTokens: ", authTokens);

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/admin">Admin Page</Link>
                        </li>
                        <li>
                            <Link to="/login">Login Page</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/signup", state:{referer: props.location}}}>Sign Up Page</Link>
                        </li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/admin" component={Admin} />

                </div>
            </Router>
        </AuthContext.Provider>);
}

export default App;