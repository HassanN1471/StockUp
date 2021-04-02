import './nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="nav">
            <Link to='/home' className="nav__home" >Home</Link>
            <Link to='/list' className="nav__list">List</Link>
        </nav>
    );
}

export default Nav;
