import { useContext, useState } from 'react';
import {UserContext} from '../../Components/UserContext/UserContext';
import Stock from '../../Components/Stock/Stock';
import './DetailsPage.scss';

function DetailsPage (props) {
    console.log(props.match.params.id);
    return (
        <main className='details'>
            <Stock id={props.match.params.id}/>
        </main>
    );
}

export default DetailsPage;