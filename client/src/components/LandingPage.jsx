import React from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return(
        <header>
        <div>
            <h1>Countries</h1>
            <p>Proyecto Individual</p>
            <Link to ='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
        </header>
    )
}