import { useContext } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import Profile from '../../Components/Profile/Profile';
import './ProfilePage.scss';
import {Redirect} from 'react-router-dom';

function ProfilePage() {
    const { user } = useContext(UserContext);

    if (!sessionStorage.getItem("authToken") && !user) return <Redirect to='/login'/>;

    return (
        <main className="profile-page">
            <Profile />
        </main>
    );

}

export default ProfilePage;