import axios from "axios";
import { useEffect, useContext } from "react";
import { UserContext } from '../UserContext/UserContext';
import ProfileItem from './ProfileItems';
import './Profile.scss';

const baseUrl = "http://localhost:8080";
const profileUrl = `${baseUrl}/profile`;

const Profile = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) return;
        axios.get(profileUrl, {
            headers: {
                // here grab token from localStorage
                authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        }).then(res => {
            console.log(res);
            setUser(res.data)
        }).catch(err => {
            console.log(err.response);
        });
    }, [user, setUser]);

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem("authToken");
    };

    if (!user) return <h1>Loading...</h1>;
    return (
        <div className='profile'>
            <h1 className='profile__header'>Welcome {user.name}!</h1>
            <ul className='profile__list'>
                {user.symbols.map((symbol, i) => {
                    return <ProfileItem symbol={symbol} key={symbol}/>
                })}
            </ul>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
}

export default Profile;
