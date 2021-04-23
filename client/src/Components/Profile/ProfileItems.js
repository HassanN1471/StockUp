import { Link } from 'react-router-dom';
import DeleteSymbol from '../DeleteSymbol/DeleteSymbol';
import { ReactComponent as UpIcon } from '../../Assets/svg/arrow_up.svg';
import { ReactComponent as DownIcon } from '../../Assets/svg/arrow_down.svg';

function ProfileItems(props) {
    const { symbol, change } = props;

    return (
        <div className='profile__item'>
            <div className='profile__top'>
                <Link
                    to={`/details/${symbol}`}
                    className='profile__link'>{symbol}
                </Link>
                <DeleteSymbol symbol={symbol} />
            </div>
            {(change)
                ? <div className='profile__bottom'>
                    {(change > 0) ? <UpIcon className='profile__icon--pos' /> : <DownIcon className='profile__icon--neg' />}
                    <p className={`profile__change ${(change > 0) ? 'profile__change--pos' : 'profile__change--neg'}`}>{change}%</p>
                </div>
                : ''
            }
        </div>
    );
}

export default ProfileItems;