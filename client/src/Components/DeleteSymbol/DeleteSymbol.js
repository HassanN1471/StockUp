import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import { ReactComponent as DeleteIcon } from '../../Assets/svg/delete_icon.svg';
import './DeleteSymbol.scss';

function DeleteSymbol(props) {
    const { setUser } = useContext(UserContext);

    const baseUrl = "http://localhost:8080";
    const profileUrl = `${baseUrl}/profile`;
    const DeleteSymbolUrl = `${profileUrl}/deletesymbol`;

    const deleteHandler = () => {
        console.log(props.symbol);
        axios.put(DeleteSymbolUrl, {
            symbol: props.symbol
        },
            {
                headers: {
                    // here grab token from localStorage
                    authorization: `Bearer ${sessionStorage.getItem("authToken")}`
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

    return (
        <button className='delete-btn' onClick={deleteHandler}>
            <DeleteIcon className='delete-btn__icon'/>
        </button>
    );
}

export default DeleteSymbol;