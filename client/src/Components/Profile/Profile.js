import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../UserContext/UserContext';
import ProfileItem from './ProfileItems';
import './Profile.scss';
import {profileUrl, profileChangesUrl} from "../../URL";

const Profile = () => {
    const [symbols, setSymbols] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) return;
        axios.get(profileUrl, {
            headers: {
                // here grab token from localStorage
                authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }).then(({ data }) => {
            console.log(data);
            setUser(data)
        }).catch(err => {
            console.log(err.response);
        });
    }, [setUser, user]);

    useEffect(() => {
        if (user) {
            console.log(user.symbols);
            axios.put(profileChangesUrl, {
                symbols: user.symbols
            }).then(({ data }) => {
                console.log(data);
                setSymbols(data)
            }).catch(err => {
                console.log(err.response);
            });
        }
    }, [user]);

    if (!user) return <h1>Loading...</h1>;

    return (
        <section className='profile'>
            <h1 className='profile__header'>My Stocks</h1>
            {(!user.symbols.length)
                ? <p className='profile__subheader'>No saved stocks</p>
                : <h1 className='profile__subheader'>{user.name}'s stocks</h1>
            }
            <div className='profile__container'>
                <ul className='profile__list'>
                    {(!symbols) ? console.log('herey') : console.log('symbols', symbols)}
                    {(!symbols) ? '' : symbols.map(el => {
                        return <ProfileItem symbol={el.symbol} change={el.change} key={el.symbol} />
                    })}
                </ul>
            </div>
        </section>
    );
}

export default Profile;
