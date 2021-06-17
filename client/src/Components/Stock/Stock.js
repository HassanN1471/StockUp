import { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../Graph/Graph';
import StockInfo from '../Stock/StockInfo';
import { toTimestamp } from '../../Utils';
import './Stock.scss';
import {detailsUrl} from "../../URL";

function Stock(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData(props.id)
    }, [props.id])

    //get request for graph data
    const getData = (id) => {
        axios.get(`${detailsUrl}/${id}`)
            .then(({ data }) => {
                const dataobj = data.pop()
                dataobj.data = dataobj.data.map(item => ([
                    //convert values to timestamp for graph
                    toTimestamp(`${item.date.split("-").join(" ")} ${item.minute}`) * 1000,
                    item.open,
                    item.high,
                    item.low,
                    item.close,
                    item.volume
                ]));
                setData(dataobj);
                console.log(dataobj);
            })
            .catch(err => {
                console.error(err.response);
            });
    }

    if (!data) return <h1>loading...</h1>;

    return (
        <div className="stock">
            <Graph data={data} />
            <StockInfo id={props.id}/>
        </div>
    );
}

export default Stock;