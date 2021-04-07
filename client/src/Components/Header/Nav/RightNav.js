import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import { Link } from 'react-router-dom';

const RightNav = ({ open, setOpen }) => {
    const { user, setUser } = useContext(UserContext);
    const handleLogout = () => {
        handleOpen();
        setUser(null);
        sessionStorage.removeItem("authToken");
    };
    const handleOpen = () => {
        setOpen(!open);
    }

    const openClass = (open) ? 'right-nav--open' : ''
    return (
        <ul className={`right-nav ${openClass}`}>
            <li className='right-nav__item'>
                {user
                    ? <button className='nav__button button' onClick={handleLogout}>logout</button>
                    : <Link className='nav__button button' onClick={handleOpen} to='/profile' >Log In</Link>}
            </li>
            {user
                ? <li className='right-nav__item'>
                    <Link className="nav__link" onClick={handleOpen} to='/profile' >{user ? 'My Stocks' : 'Log In'}</Link>
                </li>
                : ''
            }
            <li className='right-nav__item'>
                <Link onClick={handleOpen} to='/changes' className="nav__link">Changes</Link>
            </li>
        </ul>
    )
}

export default RightNav