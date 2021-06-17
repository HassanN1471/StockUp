import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { ReactComponent as DeleteIcon } from '../../Assets/svg/delete_icon.svg';
import './DeleteSymbol.scss';
import {DeleteSymbolUrl} from "../../URL";
function DeleteSymbol(props) {
    const { user, setUser } = useContext(UserContext);

    useEffect(()=>{
        console.log(user);
    },[user]);

    const deleteHandler = () => {
        console.log(props.symbol);
        axios.put(DeleteSymbolUrl, {
            symbol: props.symbol
        },
            {
                headers: {
                    // here grab token from localStorage
                    authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }).then(({data}) => {
                console.log(data);
                setUser(data);
            }).catch(err => {
                console.log(err.response);
                // sessionStorage.removeItem("authToken");
                // setUser(null);
            });
    }

    return (
        <button className='delete-btn' onClick={deleteHandler}>
            <DeleteIcon className='delete-btn__icon'/>
        </button>
    );
}

export default DeleteSymbol;