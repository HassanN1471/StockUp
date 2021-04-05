import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';

function AddSymbol(props) {
    const { user, setUser } = useContext(UserContext);

    const baseUrl = "http://localhost:8080";
    const profileUrl = `${baseUrl}/profile`;
    const AddSymbolUrl = `${profileUrl}/addsymbol`;

    const addHandler = () => {
        axios.put(AddSymbolUrl, {
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
    if(user && user.symbols.find(symbol=>symbol===props.symbol)) return null;
    return (
        <button onClick={addHandler}>
            Add
        </button>
    );
}

export default AddSymbol;