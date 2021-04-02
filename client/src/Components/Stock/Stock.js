import { Component } from 'react';
import axios from 'axios';
import Graph from '../Graph/Graph';
import { toTimestamp } from '../../Utils';
import './Stock.scss';

class Stock extends Component {
    state = {
        data: null,
    }

    //get request for graph data
    getData = (id) => {
        axios.get(`http://localhost:8080/details/${id}`)
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
                this.setState({
                    data: dataobj
                }, () => console.log(this.state.data));
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.getData(this.props.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.getData(this.props.id);
        };
    };

    render() {
        if (!this.state.data) return <h1>loading...</h1>;

        return (
            <div className="stock">
                <Graph data={this.state.data} />
            </div>
        );
    }
}

export default Stock;