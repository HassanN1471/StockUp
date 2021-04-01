import { Component } from 'react';
//import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './reset.css';
import './App.scss';
import List from './Components/List/List';
class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={(routerProps) =>
                        <List {...routerProps}
                        />}
                    />
                    <Redirect path='/home' to='/' />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;