import { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import { filterData } from '../../Utils';
import './List.scss';


class List extends Component {

    state = {
        data: null,
        filteredData: null,
        change: 2
    }


    componentDidMount() {
        axios.get(`http://localhost:8080/`)
            .then(({ data }) => {
                this.setState({
                    data: data
                }, () => console.log(this.state.data));
                return data;
            })
            .then(data => {
                console.log('here');
                console.log(data);
                const filteredData = data.map(item =>
                    ({ symbol: item.symbol, data: filterData(item.data, this.state.change) })
                ).filter(item => item.data.length);
                console.log(filteredData);
                this.setState({ filteredData: filteredData });
            });
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ change: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target.change;
        console.log(value);
        const filteredData = this.state.data.map(item =>
            ({ symbol: item.symbol, data: filterData(item.data, value) })
        ).filter(item => item.data.length);
        console.log(filteredData);
        this.setState({ filteredData: filteredData });
    }




    render() {
        if (!this.state.filteredData) return <h1>loading...</h1>;

        return (
            <div className='list__form'>
                <label htmlFor='change' className='list__label'>change</label>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        id="change"
                        name="change"
                        className='list__input'
                        value={this.state.change}
                        onChange={this.handleChange}
                    />
                    <input className="list__button button" type="submit" value="SUBMIT" />
                </form>

                {this.state.filteredData.map(item => {
                    return <ListItem data={item} />
                })}
            </div>
        );
    }
}

export default List;