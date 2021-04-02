function ListItem(props) {
    const { symbol, data } = props.data;
    return (
        <div className="list-item">
            <h2 className="list-item__symbol">{symbol}</h2>
            <div className="list-item__container">
                {data.map(item => {
                    let changeClass = item.change > 0 ? "list-item__change--pos" : "list-item__change--neg"
                    return (
                        <div className="list-item__box" key={`${symbol}${item.change}${item.interval}`}>
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