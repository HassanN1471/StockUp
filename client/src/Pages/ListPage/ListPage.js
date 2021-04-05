import { useContext } from 'react';
import { UserContext } from '../../Components/UserContext/UserContext';
import List from '../../Components/List/List';
import './ListPage.scss';

function ListPage(props) {
    const { user } = useContext(UserContext);

    return (
        <main className='list-page'>
            <List symbols={user ? user.symbols : ''} />
        </main>
    );
}

export default ListPage;