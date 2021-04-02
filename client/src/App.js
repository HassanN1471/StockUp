import { Component } from 'react';
//import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './reset.css';
import './App.scss';
import List from './Components/List/List';
// import Graph from './Components/Graph/Graph'
// import Details from './Components/Details/Details';
import HomePage from './Pages/HomePage/HomePage';
import DetailsPage from './Pages/DetailsPage/DetailsPage';
import Nav from './Components/Header/header';
class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Nav/>
                    <Switch>
                        <Route path="/" exact
                            render={(routerProps) => <HomePage {...routerProps} />}
                        />
                        <Redirect path='/home' to='/' />
                        <Route path="/list"
                            render={(routerProps) => <List {...routerProps} />}
                        />
                        <Route path="/details/:id"
                            render={(routerProps) => <DetailsPage {...routerProps} />}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;