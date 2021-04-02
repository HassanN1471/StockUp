import { Component } from 'react';
import Stock from '../../Components/Stock/Stock';
import { Route } from 'react-router-dom';
import './HomePage.scss';

class HomePage extends Component {
    state = {
        symbol: null,
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ symbol: e.target.symbol.value });
        e.target.reset();
    }

    render() {
        return (
            <main className="home">
                <form className='home__form' onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        id="symbol"
                        name="symbol"
                        className='home__input'
                        placeholder='Search'
                    />
                    <input className="home__button button" type="submit" value="Search" />
                </form>
                {this.state.symbol
                    ? <Route render={() => <Stock id={this.state.symbol} />} />
                    : ""
                }
            </main>
        );
    }
}

export default HomePage;