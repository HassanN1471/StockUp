import { Link } from 'react-router-dom';
import DeleteSymbol from '../DeleteSymbol/DeleteSymbol';

function ProfileItems(props) {

    return (
        <div className='profile__item'>
            <Link to={`/details/${props.symbol}`} className='profile__link'>{props.symbol} </Link>
            <DeleteSymbol symbol={props.symbol} />
        </div>

    );
}

export default ProfileItems;