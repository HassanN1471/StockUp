import { Component } from 'react';
import axios from 'axios';
import Graph from '../../Components/Graph/Graph';
import {toTimestamp} from '../../Utils';

class Details extends Component {
    state={
        data:null
    }

    componentDidMount(){
        //console.log(this.props.match.params.id);
        axios.get(`http://localhost:8080/details/${this.props.match.params.id}`)
            .then(({ data }) => {
                const dataobj = data.pop()
                dataobj.data = dataobj.data.map(item=>([
                    toTimestamp(`${item.date.split("-").join(" ")} ${item.minute}`)*1000,
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
            .catch(err=>{
                console.error(err);
            });
    }

    render() {
        if (!this.state.data) return <h1>loading...</h1>;

        return (
            <div>
                <Graph data={this.state.data}/>
            </div>
        );
    }
}

export default Details;