import React from "react";

export default function CardActivities({name, dificultad , duracion, temporada }) {
    return(

<div className="body1">
    <div className='card-g1'>
        <div className='face front1'>
            <h2>Actividad: {name}.</h2>
            <h4>Dificultad: {dificultad}</h4>
            <h6>Duracion: {duracion}</h6>
            <h6>Temporada: {temporada}</h6>             
        </div>
    </div>
        
</div>



    );
}