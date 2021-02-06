import React from 'react';
import {Multiselect} from 'multiselect-react-dropdown';

function countries() {

    const data = [
        {Country :'India',id:1},
        {Country :'Pakistan',id:2},
        {Country :'Sri lanka',id:3},
        {Country :'Bangladesh',id:4},
        {Country :'Afganistan',id:5}
    ];


    return (
          <div style={{width: "90%",justifyContent:"center"}}>
            <div>
                <h3 style={{color:"red"}}>Multiselect DropDown</h3>
                <Multiselect options={data} displayValue="Country"/>
            </div>
          </div>  
    )
}

export default countries;
