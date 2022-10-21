import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, filterCountriesByRegion, orderByName, getActivities, filterCreated, orderByPopulation } from "../actions";
import Card from './Card'
import Paginado from './Paginado';
import SearchBar from './SearchBar';


export default function Home () {
    const dispatch = useDispatch()
    const activities = useSelector((state)=> state.activities)
    const allCountries = useSelector ((state)=> state.countries) // es lo mismo que hacer el MyStateToProps
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState ('');
    const [countriesPrePage] = useState(10)
    const indexOfLastCountries = currentPage * countriesPrePage
    const indexOfFirstCountries = indexOfLastCountries - countriesPrePage
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries)



    const paginado = (pageNumber)=> {
        setCurrentPage(pageNumber)
    }
    

useEffect(()=>{
    dispatch(getCountries());
    dispatch(getActivities());
   },[dispatch]);
     
function handleClick(el){
    el.preventDefault();
    dispatch(getCountries());
    };

function handleSort (el){
    el.preventDefault();
    dispatch(orderByName(el.target.value))
    setOrden(`Ordenado ${el.target.value}`)
    };

function handleSortP (el){
    el.preventDefault();
    dispatch(orderByPopulation(el.target.value))
    setOrden(`Ordenado ${el.target.value}`)
    };    
  

function handleSelec (el){
    el.preventDefault();
    dispatch(filterCreated(el.target.value))    
    };
function handleFilterRegion(el){
    dispatch(filterCountriesByRegion(el.target.value))
    setCurrentPage(1)
    }

return(
<div>
    <div className='encabe'>
 <div>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>
        <div className='container barr'>
            <h1>Countries</h1>
            <div className='actividad'>
                <div className='crear'>
                    <Link to= '/activities' >Crear Actividades</Link>
                </div>
                <div className='filtro-act'>
                    <select onChange={(el)=>handleSelec(el)}>
                    <option value = 'sin filtro'>Sin Filtrar</option>
                        {activities.map((act)=>(
                    <option value={act.name}>{act.name}</option>
                     ))}
                    </select>
                </div>
            </div>  
            <div className='ordenar'>
            <select onClick={el=> {handleSort(el)}}>
                <option value = ''>Ordenar</option>
                <option value = 'asc'>A-Z</option>
                <option value = 'desc'>Z-A</option>
            </select> 
            </div>             
            <div className='ordenar'>
            <select onClick={el=> {handleSortP(el)}}>
                <option value = ''>Población</option>
                <option value = 'asc'>Acendente</option>
                <option value = 'desc'>Descendente</option>
            </select> 
            </div>
            
            <div className='barr2'>
                <button onClick={el=> {handleClick(el)}}>
                Recargar Paises
                </button>
            </div>
           
        </div>
    </div>
    <div className='container app-cont'>
        <div className='barr3'>
            <Paginado
            countriesPerPage={countriesPrePage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            />
        </div>
        <nav className='pag'>
            <div className='pag'>
                <div className='pagination'>          
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}} value='All'/>Todos
                </div>
                <div>        
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Europe'}/> Europe
                </div>
                <div>           
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Asia'}/> Asia
                </div> 
                <div>               
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Africa'}/> Africa
                </div>          
                <div className='suramerica'> 
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'South America'}/> Sur America
                </div>
                <div>    
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'North America'}/> Norte America
                </div>
                <div>
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Oceania'}/> Oceania
                </div>
                <div>
                    <input className='pagination' type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Antarctica'}/> Antartida
                </div>
            </div>

        </nav>
        <div className= "container grid">
            {currentCountries.map((c, i)=>{
            return ( 
                <div className='item' key={i}>
                    <Link to= {`/detail/${c.id}`} >              
                        <Card  key= {c.id} name= {c.name} image= {c.image} continents={c.continents} capital = {c.capital} />
                    </Link> 
                </div>         
                );
            })}          

        </div>
    </div>
</div>
)
}