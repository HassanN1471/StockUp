import { Link } from 'react-router-dom';
import { ReactComponent as UpIcon } from '../../Assets/svg/arrow_up.svg';
import { ReactComponent as DownIcon } from '../../Assets/svg/arrow_down.svg';

function ListItem(props) {
    const { symbol, data } = props.data;
    return (
        <div className="list-item">
            <h2 className="list-item__symbol">
                <Link to={`/details/${symbol}`}>{symbol}</Link>
            </h2>
            <div className="list-item__container">
                <div className="list-item__box">
                    <p className='list-item__change label'>Change %</p>
                    <p className="list-item__interval label">Interval</p>
                </div>
                {data.map((item, i) => {
                    let changeClass = (item.change > 0) ? "list-item__change--pos" : "list-item__change--neg"
                    let listClass = (i % 2) ? '' : 'list-item__even';
                    return (
                        <div className={`list-item__box ${listClass}`} key={`${symbol}${item.change}${item.interval}`}>
                            <div className='list-item__left'>
                                {(item.change > 0) ? <UpIcon className='list-item__icon--pos'/> : <DownIcon className='list-item__icon--neg'/>}
                                <p className={`list-item__change ${changeClass}`}>{item.change}%</p>
                            </div>
                            <p className="list-item__interval">{item.interval}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListItem;