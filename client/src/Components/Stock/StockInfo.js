import { useState, useEffect } from 'react';
import axios from 'axios';
import AddSymbol from '../AddSymbol/AddSymbol';

function StockInfo(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData(props.id)
    }, [props.id])

    //get request for stock stats info
    const getData = (id) => {
        axios.get(`http://localhost:8080/details/stats/${id}`)
            .then(({ data }) => {
                setData(data);
                console.log(data);
            })
            .catch(err => {
                console.error(err.response);
            });
    }

    if (!data) return <h1>loading...</h1>;

    return (
        <section className='stock__info-container'>
            <div className='stock__box'>
                <h1 className='stock__name'>{data.companyName}</h1>
                <h1 className='stock__symbol'>({props.id})</h1>
                <div className='stock__add'>
                    <AddSymbol  symbol={props.id} />
                </div>
            </div>
            <ul className='stock__list'>
                <li className='stock__item'>
                    <p className='stock__text'>Average 10 DAY VOLUME</p>
                    <p className='stock__data'>{data.avg10Volume}</p>
                </li>
                <li className='stock__item'>
                    <p className='stock__text'>Average 30 DAY VOLUME</p>
                    <p className='stock__data'>{data.avg30Volume}</p>
                </li>
                <li className='stock__item'>
                    <p className='stock__text'>52 WEEK RANGE</p>
                    <p className='stock__data'>{data.week52range}</p>
                </li>
                <li className='stock__item'>
                    <p className='stock__text'>52 WEEK CHANGE</p>
                    <p className='stock__data'>{data.week52change.toFixed(2)}</p>
                </li>
                <li className='stock__item'>
                    <p className='stock__text'>BETA</p>
                    <p className='stock__data'>{data.beta.toFixed(2)}</p>
                </li>
                <li className='stock__item'>
                    <p className='stock__text'>P/E RATIO</p>
                    <p className='stock__data'>{data.peRatio.toFixed(2)}</p>
                </li>
            </ul>
        </section>
    );
}

export default StockInfo;