import { Link } from 'react-router-dom';

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
                    let changeClass = item.change > 0 ? "list-item__change--pos" : "list-item__change--neg"
                    let listClass = (i % 2) ? '' : 'list-item__even';
                    return (
                        <div className={`list-item__box ${listClass}`} key={`${symbol}${item.change}${item.interval}`}>
                            <p className={`list-item__change ${changeClass}`}>{item.change}%</p>
                            <p className="list-item__interval">{item.interval}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListItem;