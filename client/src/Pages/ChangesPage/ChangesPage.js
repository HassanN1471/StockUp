import { useContext } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import List from '../../Components/List/List';
import './ChangesPage.scss';
import { Redirect } from 'react-router';

function ListPage(props) {
    const { user } = useContext(UserContext);

    if (!sessionStorage.getItem("authToken") && !user) return <Redirect to='/login'/>;

    return (
        
        <main className='list-page'>
            <List symbols={user ? user.symbols : ''} />
        </main>
    );
}

export default ListPage;