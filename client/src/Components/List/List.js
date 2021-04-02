import { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import { filterData } from '../../Utils';
import './List.scss';


class List extends Component {

    state = {
        data: null,
        filteredData: null,
        change: 2,
        interval: 5,
        prevInterval: 5
    }

    //get data for list based on user saved symbols
    componentDidMount() {
        axios.post(`http://localhost:8080/list`, {
            symbols: `FB','AAPL','AMZN','NFLX','GOOG'`,
            interval: this.state.interval
        })
            .then(({ data }) => {

                //filter change values based on change state value
                const filteredData = data.map(item =>
                    ({ symbol: item.symbol, data: filterData(item.data, this.state.change) }))
                    .filter(item => item.data.length);

                console.log(filteredData);

                this.setState({
                    data: data,
                    filteredData: filteredData
                }, () => console.log(this.state.data));
            })
            .catch(err => {
                console.log('over here');
                console.log(err);
            });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: Number(value) });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.interval !== this.state.prevInterval) {
            axios.post(`http://localhost:8080/list`, {
                symbols: ['FB', 'AAPL', 'AMZN', 'NFLX', 'GOOG'],
                interval: this.state.interval
            })
                .then(({ data }) => {

                    //filter change values based on change state value
                    const filteredData = data.map(item =>
                        ({ symbol: item.symbol, data: filterData(item.data, this.state.change) }))
                        .filter(item => item.data.length);

                    console.log(filteredData);

                    this.setState({
                        data: data,
                        filteredData: filteredData
                    }, () => console.log(this.state.data));
                })
                .catch(err => {
                    console.log('over here');
                    console.log(err);
                });
            this.setState({ prevInterval: this.state.interval });
            return;
        }
        console.log('im here');
        //filter change values based on change state value
        const filteredData = this.state.data.map(item =>
            ({ symbol: item.symbol, data: filterData(item.data, this.state.change) }))
            .filter(item => item.data.length);
        console.log(filteredData);
        this.setState({ filteredData: filteredData });
    }



    render() {
        if (!this.state.filteredData) return <h1>loading...</h1>;

        return (
            <section className='list'>
                <h1 className='list__header'>List</h1>
                <form className='list__form' onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor='interval' className='list__label'>Category</label>
                    <select
                        id="interval"
                        name="interval"
                        className='list__interval'
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
                    <label htmlFor='change' className='list__label'>set min % change</label>
                    <input
                        id="change"
                        name="change"
                        className='list__input'
                        value={this.state.change}
                        onChange={this.handleChange}
                    />
                    <input className="list__button button" type="submit" value="SUBMIT" />
                </form>

                {this.state.filteredData.map((item,i) => {
                    return <ListItem data={item} key={i}/>
                })}
            </section>
        );
    }
}

export default List;