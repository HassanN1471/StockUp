import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './reset.css';
import './App.scss';
import List from './Components/List/List';
// import Graph from './Components/Graph/Graph'
// import Details from './Components/Details/Details';
import Nav from './Components/Header/header';
import HomePage from './Pages/HomePage/HomePage';
import ListPage from './Pages/ListPage/ListPage';
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import DetailsPage from './Pages/DetailsPage/DetailsPage';

import { UserContext } from './Components/UserContext/UserContext';


// const loginUrl = `${baseUrl}/login`;
// const signupUrl = `${baseUrl}/signup`;


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
    }, []);

    return (

        <div className="App">
            <BrowserRouter>
                <Nav />
                <Switch>
                    <UserContext.Provider value={value}>
                        <Route path="/" exact
                            render={(routerProps) => <HomePage {...routerProps} />}
                        />
                        <Route path="/list"
                            render={(routerProps) => <ListPage {...routerProps} />}
                        />
                        <Route path="/profile"
                            render={(routerProps) => <ProfilePage {...routerProps} />}
                        />
                        <Route path="/details/:id"
                            render={(routerProps) => <DetailsPage {...routerProps} />}
                        />
                    </UserContext.Provider>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;