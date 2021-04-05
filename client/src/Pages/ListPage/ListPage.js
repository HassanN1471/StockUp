import { useContext, useState } from 'react';
import {UserContext} from '../../Components/UserContext/UserContext';
import List from '../../Components/List/List';

function ListPage(props) {
    const {user,setUser} = useContext(UserContext);

    return (
        <main className='listpage'>
            <List symbols={user?user.symbols:''}/>
        </main>
    );
}

export default ListPage;