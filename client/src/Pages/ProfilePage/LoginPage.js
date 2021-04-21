import { Redirect } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import axios from 'axios';
import './ProfilePage.scss';

//display login screen
function LoginPage(props) {
    const { user } = useContext(UserContext);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const baseUrl = "http://localhost:8080";
    const loginUrl = `${baseUrl}/login`;

    const handleSignupButton = (e) => {
        e.preventDefault();
        setIsLoginError(false);
        props.history.push('/signup')
    }

    const login = (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        //check if fields are empty
        if (username.value === "" || password.value === "") {
            setIsLoginError(true);
            setErrorMessage("You must provide a username and password");
            return;
        }
        //send username and password to loginUrl via axios
        axios.post(loginUrl, {
            username: username.value,
            password: password.value
        })
            .then(res => {
                //successful login = res.data.token is populated
                console.log(res);
                sessionStorage.setItem('authToken', res.data.token);
                setIsLoginError(false);
                props.history.push('/profile')
            })
            .catch(err => {
                // unsuccessful login
                console.log(err.response.data.message);
                setIsLoginError(true);
                setErrorMessage(err.response.data.message);
                return;
            })
    };

    if (sessionStorage.getItem("authToken") && user) return <Redirect to='/profile' />;

    return (
        <main className="profile-page">
            <form className="profile-page__form" onSubmit={login}>
                <h1 className="profile-page__header">Login</h1>
                {isLoginError && <label className="profile-page__error">{errorMessage}</label>}
                <input
                    type="text"
                    name="username"
                    className='profile-page__input input'
                    placeholder='Username'
                />
                <input
                    type="password"
                    name="password"
                    className='profile-page__input input'
                    placeholder='Password'
                />
                <button className="profile-page__button button" type="submit" >Log In</button>
                <button className="profile-page__signup" onClick={handleSignupButton}>Sign Up</button>
            </form>
        </main>
    );
};

export default LoginPage;