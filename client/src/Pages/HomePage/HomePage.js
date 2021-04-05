import { useContext, useState } from 'react';
import {UserContext} from '../../Components/UserContext/UserContext';
import Stock from '../../Components/Stock/Stock';
import { Route } from 'react-router-dom';
import './HomePage.scss';

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
// }

function HomePage() {
    const [symbol, setSymbol] = useState(null);
    const {user,setUser} = useContext(UserContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSymbol(e.target.symbol.value);
        e.target.reset();
    }
    return (
        <main className="home">
            <div>{user?user.name:''}</div>
            <div>{user?JSON.stringify(user.symbols):''}</div>
            <form className='home__form' onSubmit={(e) => handleSubmit(e)}>
                <input
                    id="symbol"
                    name="symbol"
                    className='home__input'
                    placeholder='Search'
                />
                <input className="home__button button" type="submit" value="Search" />
            </form>
            {symbol
                ? <Route render={() => <Stock id={symbol} />} />
                : ""
            }
        </main>
    );
}

export default HomePage;