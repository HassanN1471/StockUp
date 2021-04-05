import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import axios from 'axios';
import Profile from '../../Components/Profile/Profile';

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
const profileUrl = `${baseUrl}/profile`;

function ProfilePage () {
    const { user, setUser } = useContext(UserContext);

    const [isSignedUp, setIsSignedUp] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            setIsLoginError(false);
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
            <div className="profile">
                <h1>SignUp</h1>
                {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
                <form onSubmit={signup}>
                    <div className="form-group">
                        Username: <input type="text" name="username" />
                    </div>
                    <div className="form-group">
                        Name: <input type="text" name="name" />
                    </div>
                    <div className="form-group">
                        Password: <input type="password" name="password" />
                    </div>
                    <button className="button" type="submit" >
                        Signup
                    </button>
                </form>
            </div>
        );
    }

    //display login screen
    const renderLogin = () => {
        return (
            <div className="profile">
                <h1>Login</h1>
                {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
                <form onSubmit={login}>
                    <div className="form-group">
                        Username: <input type="text" name="username" />
                    </div>
                    <div className="form-group">
                        Password: <input type="password" name="password" />
                    </div>
                    <button className="button" type="submit" >
                        Login
                    </button>
                    <button className="button" onClick={handleSignupButton}>
                        Signup
                    </button>
                </form>
            </div>
        );
    };

    if (!isSignedUp) return renderSignUp();
    if (!isLoggedIn) return renderLogin();

    return (
        <div className="profile">
            <Profile />
        </div>
    );

}

export default ProfilePage;