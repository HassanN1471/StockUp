import { Redirect } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import axios from 'axios';
import './ProfilePage.scss';

//display sign up screen
function SignupPage(props) {
    const { user } = useContext(UserContext);
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const baseUrl = "http://localhost:8080";
    const signupUrl = `${baseUrl}/signup`;

    const handleBackButton = (e) => {
        e.preventDefault();
        setIsLoginError(false);
        props.history.push('/login')
    }

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
                //if res is 201, redirect back to login page
                console.log(res);
                if (res.status === 201) {
                    setIsLoginError(false);
                    props.history.push('/login')
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    if (sessionStorage.getItem("authToken") && user) return <Redirect to='/profile' />;

    return (
        <main className="profile-page">
            <form className="profile-page__form" onSubmit={signup}>
                <h1 className="profile-page__header">SignUp</h1>
                {isLoginError && <label className="profile-page__error" >{errorMessage}</label>}
                <label htmlFor="username" className='profile-page__label'>Username</label>
                <input
                    type="text"
                    name="username"
                    className='profile-page__input input'
                    placeholder='Enter a username'
                />
                <label htmlFor="name" className='profile-page__label'>Name</label>
                <input
                    type="text"
                    name="name"
                    className='profile-page__input input'
                    placeholder='Enter your name'
                />
                <label htmlFor="password" className='profile-page__label'>Password</label>
                <input
                    type="password"
                    name="password"
                    className='profile-page__input input'
                    placeholder='Enter a password'
                />
                <button className="profile-page__button button" type="submit" >Sign Up</button>
                <button className="profile-page__signup" onClick={handleBackButton}>Back</button>
            </form>
        </main>
    );
}

export default SignupPage;