import { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import { filterData } from '../../Utils';
import './List.scss';
import {listUrl} from "../../URL";

class List extends Component {

    state = {
        data: null,
        filteredData: null,
        change: 2,
        interval: 5,
        prevInterval: 5,
        symbolsEmpty:true
    }

    getListData = (symbols) => {
        if(this.state.symbolsEmpty) return;
        const symbolsString = `${symbols}`.split('[]').join("");
        console.log(symbolsString);
        axios.post(`${listUrl}`, {
            symbols: symbolsString,
            interval: this.state.interval
        }, {
            headers: {
                // here grab token from localStorage
                authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }).then(({ data }) => {
            //filter change values based on change state value
            const filteredData = data.map(item =>
                ({ symbol: item.symbol, data: filterData(item.data, this.state.change) }))
                .filter(item => item.data.length);
            this.setState({
                data: data,
                filteredData: filteredData
            }, () => { console.log(this.state.data); console.log(filteredData); });
        }).catch(err => {
            console.log(err.response);
        });
    }

    //get data for list based on user saved symbols
    componentDidMount() {
        console.log('mount',this.props.symbols);
        if (this.props.symbols) {
            this.setState({symbolsEmpty:false}
                ,()=>this.getListData(this.props.symbols));
        }
        else{
            this.setState({symbolsEmpty:true});
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.symbols !== this.props.symbols && this.state.symbolsEmpty) {
            this.setState({symbolsEmpty:false}
                ,()=>this.getListData(this.props.symbols));
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: Number(value) });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.interval !== this.state.prevInterval) {
            this.getListData(this.props.symbols);
            this.setState({ prevInterval: this.state.interval });
            return;
        }
        //filter change values based on change state value
        const filteredData = this.state.data.map(item =>
            ({ symbol: item.symbol, data: filterData(item.data, this.state.change) }))
            .filter(item => item.data.length);
        console.log(filteredData);
        this.setState({ filteredData: filteredData });
    }

    render() {
        if (this.state.symbolsEmpty) return <h1>No Symbols saved</h1>;
        if (!this.state.filteredData) return <h1>loading...</h1>;

        return (
            <section className='list'>
                <h1 className='list__header'>Changes</h1>
                <div className='list__container'>
                    <form className='list__form' onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='list__input-container'>
                            <label htmlFor='interval' className='list__label'>Interval</label>
                            <select
                                id="interval"
                                name="interval"
                                className='list__input input'
                                value={this.state.interval}
                                onChange={this.handleChange}
                            >
                                <option value="5">5 min</option>
                                <option value="10">10 min</option>
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="60">1 hr</option>
                                <option value="120">2 hr</option>
                                {/* <option value="320">4 hr</option>
                        <option value="480">8 hr</option> */}
                            </select>
                        </div>
                        <div className='list__input-container'>
                            <label htmlFor='change' className='list__label'>min % change</label>
                            <input
                                id="change"
                                name="change"
                                className='list__input input'
                                value={this.state.change}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input className="list__button button" type="submit" value="SUBMIT" />
                    </form>

                    {this.state.filteredData.map((item, i) => {
                        return <ListItem data={item} key={i} />
                    })}
                </div>
            </section>
        );
    }
}

export default List;