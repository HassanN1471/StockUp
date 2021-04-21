import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './reset.css';
import './App.scss';
import Nav from './Components/Header/header';
import HomePage from './Pages/HomePage/HomePage';
import ChangesPage from './Pages/ChangesPage/ChangesPage';
import LoginPage from "./Pages/ProfilePage/LoginPage";
import SignupPage from "./Pages/ProfilePage/SignupPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import DetailsPage from './Pages/DetailsPage/DetailsPage';

import { UserContext } from './Components/UserContext/UserContext';

function App() {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser])

    const baseUrl = "http://localhost:8080";
    const profileUrl = `${baseUrl}/profile`;

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("authToken");
        console.log(loggedInUser);
        if (loggedInUser) {
            axios.get(profileUrl, {
                headers: {
                    // here grab token from localStorage
                    authorization: `Bearer ${sessionStorage.getItem("authToken")}`
                }
            }).then(res => {
                console.log(res);
                setUser(res.data)
            }).catch(err => {
                console.log(err.response);
                sessionStorage.removeItem("authToken");
                setUser(null);
            });
        }
    }, [profileUrl]);

    return (

        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={value}>
                    <Nav />
                    <Switch>
                        <Route path="/" exact
                            render={(routerProps) => <HomePage {...routerProps} />}
                        />
                        <Route path="/changes"
                            render={(routerProps) => <ChangesPage {...routerProps} />}
                        />
                        <Route path="/login"
                            render={(routerProps) => <LoginPage {...routerProps} />}
                        />
                        <Route path="/signup"
                            render={(routerProps) => <SignupPage {...routerProps} />}
                        />
                        <Route path="/profile"
                            render={(routerProps) => <ProfilePage {...routerProps} />}
                        />
                        <Route path="/details/:id"
                            render={(routerProps) => <DetailsPage {...routerProps} />}
                        />
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;