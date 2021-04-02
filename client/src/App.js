import { Component } from 'react';
//import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './reset.css';
import './App.scss';
import List from './Components/List/List';
import Graph from './Components/Graph/Graph'
import Details from './Pages/Details/Details';
class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact
                            render={(routerProps) => <Details {...routerProps} />}
                        />
                        <Route path="/list"
                            render={(routerProps) => <List {...routerProps} />}
                        />
                        <Route path="/details/:id"
                            render={(routerProps) => <Details {...routerProps} />}
                        />
                        <Redirect path='/home' to='/' />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;