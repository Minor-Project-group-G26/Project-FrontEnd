import React from 'react';
import styled  from "styled-components";

export const Gourav = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
width: 30%;
margin:50px;
padding-left:50px;
`
const Gimage =styled.img`
height:50%;
width:50%;
align-content:center;
padding-left:20px;
`
const Gcontent = styled.div`
background:grey;
height:60px;
width:300px;
padding-left:20px;
`
const Farm = styled.form`
height:50vh;
width:100%;
`
const Minput = styled.input.attrs(props => ({
    // we can define static props
    type: "text",
  
    // or we can define dynamic ones
    size: props.size || "10px",
  }))`
    color: tomato;
    font-size: 1em;
    border: 2px solid tomato;
    border-radius: 3px;
  
    /* here we use the dynamically computed prop */
    margin: ${props => props.size};
    padding: ${props => props.size};
  `;

function Ankur() {
    return (
        <div>
           <Gourav>
               {/* <Gimage src={require('./image.jpeg')}/> */}
               <Farm />
                <Minput placeholder="A small text input" />
            </Gourav> 
            <Gcontent>This is Business</Gcontent>
        </div>
    )
}

export default Ankur;
