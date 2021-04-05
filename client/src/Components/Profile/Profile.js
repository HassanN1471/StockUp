import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {UserContext} from '../UserContext/UserContext';

const baseUrl = "http://localhost:8080";
const profileUrl = `${baseUrl}/profile`;

const Profile = () => {
    const {user, setUser} = useContext(UserContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user) return setLoading(false);
        axios.get(profileUrl, {
            headers: {
                // here grab token from localStorage
                authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        }).then(res => {
            console.log(res);
            setLoading(false);
            setUser(res.data)
        }).catch(err => {
            console.log(err.response);
        });
    }, []);

    const handleLogout = () => {
        setUser(null);
        setLoading(true)
        sessionStorage.removeItem("authToken");
      };

    if (loading ) return <h1>Loading...</h1>;
    return (
        <>'
        <h1>Welcome {user?user.name:''}!</h1>
        <button onClick={handleLogout}>logout</button>
        </>
        );
}

export default Profile;
