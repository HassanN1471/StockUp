import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { ReactComponent as AddIcon } from '../../Assets/svg/add_icon.svg';
import './AddSymbol.scss';
import {AddSymbolUrl} from "../../URL";

function AddSymbol(props) {
    const { user, setUser } = useContext(UserContext);

    const addHandler = () => {
        axios.put(AddSymbolUrl, {
            symbol: props.symbol
        },
            {
                headers: {
                    // here grab token from localStorage
                    authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }).then(res => {
                console.log(res);
                setUser(res.data)
            }).catch(err => {
                console.log(err.response);
                // sessionStorage.removeItem("authToken");
                // setUser(null);
            });
    }
    if (user && user.symbols.find(symbol => symbol === props.symbol)) return <p className='add__added'>ADDED</p>;
    return (
        <div className='add'>
            <button className='add__btn' onClick={addHandler}>
                <AddIcon className='add__icon' />
            </button>
            <p className='add__text'>ADD</p>
        </div>
    );
}

export default AddSymbol;