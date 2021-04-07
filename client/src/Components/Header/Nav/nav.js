import './nav.scss';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../UserContext/UserContext';


const Nav = () => {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/details/${e.target.symbol.value}`);
        e.target.reset();
    }

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem("authToken");
    };

    return (
        <nav className="nav">
            <Link to='/' className="nav__logo nav__link" >StockUp</Link>
            <Link to='/changes' className="nav__link">Changes</Link>
            <form className='nav__form' onSubmit={(e) => handleSubmit(e)}>
                <input
                    id="symbol"
                    name="symbol"
                    className='nav__search input'
                    placeholder='Search (Enter Symbol)'
                />
                <input className="nav__search-btn" type="submit" value="GO" />
            </form>
            <div className='nav__right-box'>
                <Link to='/profile' className="nav__button button">{user ? 'My Stocks' : 'Log In'}</Link>
                {user ? <button className='nav__button button' onClick={handleLogout}>logout</button> : ''}
            </div>
        </nav>
    );
}

export default Nav;
