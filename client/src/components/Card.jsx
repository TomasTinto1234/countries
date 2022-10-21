import React from "react";



export default function Card({name, image, continents, capital }) {
    return(

<div className="body">
    <div className='card-g'>
        <div className='face front'>
            <img src={image} alt="img no found"  width="200px"
              height="250px" />
            <h2>{name}</h2>
        </div>
        <div className='face back'>
            <h4>{name}</h4>
            <img src={image} alt="img no found"  width="200px"
              height="250px"  />  
            <h6>{capital}</h6>
            <h3>{continents}</h3>
           
        </div>
    </div>
        
</div>



    );
}