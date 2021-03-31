import { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './reset.css'
import List from './Components/List/List';
class App extends Component {

    state = {
        multi: null,
        single: null,
        list: null
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/`)
            .then(({ data }) => {
                this.setState({
                    multi: data
                }, () => console.log(this.state.multi));
                return data[0].data;
            })
            .then(data => {
                console.log('here');
                console.log(data);
                const list = [];
                for (let i = 0; i < data.length - 1; i++) {
                    list.push({
                        change: ((data[i + 1].close - data[i].close) / data[i].close * 100).toFixed(2),
                        interval: `${data[i].label} - ${data[i + 1].label}`
                    })
                }
                console.log(list);
            });
    }

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