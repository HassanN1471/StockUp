import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import axios from 'axios';
import Profile from '../../Components/Profile/Profile';
import './ProfilePage.scss';

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

function ProfilePage() {
    const { user } = useContext(UserContext);

    const [isSignedUp, setIsSignedUp] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState((user)?true:false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            setIsSignedUp(true);
        }
        if (!user) {
            setIsLoggedIn(false);
            setIsSignedUp(true);
        }
    }, [user])

    const handleSignupButton = (e) => {
        e.preventDefault();
        setIsLoginError(false);
        setIsSignedUp(false);
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
                setIsLoggedIn(true);
                setIsLoginError(false);
            })
            .catch(err => {
                // unsuccessful login
                console.log(err.response.data.message);
                setIsLoginError(true);
                setErrorMessage(err.response.data.message);
                return;
            })
        //handle invalid login by setting state, show error msg if errors
    };

    const signup = (e) => {
        e.preventDefault();
        const { username, name, password } = e.target;
        //check if fields are empty
        if (name.value === "" || username.value === "" || password.value === "") {
            setIsLoginError(true);
            setErrorMessage("You must provide a name, username and password");
            return;
        }

        axios.post(signupUrl, {
            username: username.value,
            name: name.value,
            password: password.value
        })
            .then(res => {
                //if res is 201, set signup state to true
                console.log(res);
                if (res.status === 201) {
                    setIsSignedUp(true);
                    setIsLoginError(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    //display sign up screen
    const renderSignUp = () => {
        return (
            <main className="profile-page">
                <form className="profile-page__form" onSubmit={signup}>
                    <h1 className="profile-page__header">SignUp</h1>
                    {isLoginError && <label className="profile-page__error" >{errorMessage}</label>}
                    <input
                        type="text"
                        name="username"
                        className='profile-page__input input'
                        placeholder='Enter a username'
                    />
                    <input
                        type="text"
                        name="name"
                        className='profile-page__input input'
                        placeholder='Enter your name'
                    />
                    <input
                        type="password"
                        name="password"
                        className='profile-page__input input'
                        placeholder='Enter a password'
                    />
                    <button className="profile-page__button button" type="submit" >Sign Up</button>
                </form>
            </main>
        );
    }

    //display login screen
    const renderLogin = () => {
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

    if (!isSignedUp) return renderSignUp();
    if (!isLoggedIn) return renderLogin();

    return (
        <main className="profile-page">
            <Profile />
        </main>
    );

}

export default ProfilePage;