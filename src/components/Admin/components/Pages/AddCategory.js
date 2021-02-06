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

    @media screen and (max-width: 890px){
        width: 600px;
    }
    @media screen and (max-width: 800px){
        width: 550px;
    }
    @media screen and (max-width: 780px){
        width: 520px;
    }
    @media screen and (max-width: 750px){
        width: 500px;
    }
    @media screen and (max-width: 600px){
        width: 350px;
    }

`;

const Myinput = styled.input`
    display:block;
    font-family: 'Heebo', sans-serif;
    font-size: 18px;
    font-weight: 500;
    width: 100%;
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

function AddCategory() {

    const [Modal, setModal] = useState(false)
    const [Cat, SetCat] = useState({
        cat:""
    });

    const LoginCheck =()=>{
        if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
        return true;
    }

    const CatSubmitHandler = async(e) =>{
        e.preventDefault();
        console.log(Cat)
        
        const newCat = new FormData();
        newCat.append('Category', Cat.cat);
        const res = await Axios({
            url: `http://127.0.0.1:5000/categories`, 
            data: newCat,
            method:'POST',
            headers: {'Content-Type': 'multipart/form-data'}
        });
        console.log(res);
        setModal(true);
    }

    useEffect(() => {
        LoginCheck()
    },[Cat])

    const page = (
        <MyForm onSubmit={CatSubmitHandler}>
            <h1>Add Genres</h1>
            <Myinput required type="text" placeholder="Enter New Genres" onChange={(e) => SetCat({...Cat, cat: e.target.value})} />
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

export default AddCategory
