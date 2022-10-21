import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import CardActivities from './CardAvtivities'


export default function Detail (){
    let {id}= useParams();
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch]);

    
    const myCountry = useSelector ((state)=> state.detail)
    
    


    return (
        myCountry && myCountry.id 
        ? ( 
            
            <div>
            <div className="container detalle" key = {myCountry.id}>
                <div className="detalle2">
                    <div className="pais">
                        <img src={myCountry.img} alt = {myCountry.name} width= "500px" height= "320px" ></img>
                    </div>
                        <div className="detail">
                            <h1>{myCountry.name}</h1>
                        <h2>Continente: {myCountry.continents}</h2>
                        <h2>Capital: {myCountry.capital}</h2>
                        <h2>Subregion: {myCountry.subregion}</h2>
                        <h2>Area: {(myCountry.area)} km²</h2>
                        <h2>Poblacion: {(myCountry.population)} hab </h2>
                        </div>
                </div>

                <div className="bar">
                    <Link to= {'/home'}>
                        <button className="btn">Volver</button>
                    </Link>
                </div>
            </div>
                <div className="card-atv">

                {myCountry.activities.map(el=> {
                    return(
                        <div >
                            <CardActivities key= {el.id} name= {el.name} temporada={el.temporada} duracion = {el.duracion} dificultad = {el.dificultad} borders = {el.borders} />   
                        </div>
                        )
                })}
                </div>       
            </div>
        )
            : <div className="gif">
                <img src="data:image/jpeg;base64,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" width= "500px" height= "500px" alt="travelling the world" />
                <p>Loading...</p>
            </div>
    )

}