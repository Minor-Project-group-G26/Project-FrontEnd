import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Axios from 'axios';
import CustomModal from '../../../Module/Modal/CustomModal';

const MyForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 650px;
    padding: 20px 40px 30px 40px;
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -60%);
    font-family: 'Anton', sans-serif;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    transition: 0.5s ease;

    h1{
        margin: 0 auto;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        font-family: 'Fugaz One', cursive;
        color: #000;
        text-transform: uppercase;
    }
    @media (max-width: 768px){
        width: 68%;
        margin-left: -48px;
    }

    @media (max-width: 500px){
        width: 78%;
        margin-left: -2px;
        h1{
            font-size: 20px;
        }
    }

`;

const Myinput = styled.input`
    display:block;
    font-family: 'Heebo', sans-serif;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    background-color: #eee;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin:20px 0;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.25s;
    &:focus{
        color: #444444;
    }
    @media (max-width: 320px){

    }

`
const MyButton = styled.input`
    font-family: 'Heebo', sans-serif;
    width: 100%;
    display:block;
    background-color: #020024;
    font-size: 1rem;
    border-radius: 5px;
    height: 35px;
    padding: 0 20px;
    cursor: pointer;
    box-sizing:border-box;

    color: ${props => (props.primary ? 'violet' : '#00bfb6')};
    border: ${props =>
    props.primary ? '2px solid #040447' : '2px solid #00bfb6'};

&:hover {
    color: white;
    background-color: ${props =>
      props.primary ? '#040447' : '#00bfb6'};
  }

`;

function AddCast() {

    const [Modal, setModal] = useState(false)
    const [Cast, SetCast] = useState({
        cast:""
    });

    const LoginCheck =()=>{

        if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
        return true;
        
    }

    const CastSubmitHandler = async(e) =>{
        e.preventDefault();
        console.log(Cast)
        
        const newCast = new FormData();
        newCast.append('Name', Cast.cast);
        const res = await Axios({
            url: `http://127.0.0.1:5000/casts`, 
            data: newCast,
            method:'POST',
            headers: {'Content-Type': 'multipart/form-data'}
        });
        console.log(res);
        setModal(true);
    }

    useEffect(() => {
        LoginCheck();
    },[Cast])

    const page = (
        <MyForm onSubmit={CastSubmitHandler}>
            <h1>Add New Cast</h1>
            <Myinput required type="text" placeholder="Enter Cast Name" onChange={(e) => SetCast({...Cast, cast: e.target.value})} />
            <MyButton type="submit" value="Insert"></MyButton>
        </MyForm>
    )

    return (
       <>
       {Modal?
        (<CustomModal 
            open={Modal}
            text="Successfully Inserted"
            icon="success"
            onClose={() => setModal(false)}
        />)
        :
        page
        }
       </>
    )
}

export default AddCast