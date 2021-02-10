import { Avatar, Button, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Axios from 'axios';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CustomModal from '../../../Module/Modal/CustomModal';

const Boss = styled.div`
    background-color: rgba(0,0,0, 0.8);
    border-radius: 8px;
    position: absolute;
    left: 65%;
    top: 50%;
    transform: translate(-65%, -50%);
    width: 60%;
    height: 80%;
    transition: all 0.3s ease;
    .avatar{
        margin-top: 20px;
        width: 150px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
        vertical-align: middle;
    }
    .dota{
        width: 350px;
        background-color: rgb(200,200,200);
        height: 40px;
        border-radius: 5px;
        border: 1px solid #ddd;
        margin:10px 0;
        padding: 5px 15px; 
        box-sizing: border-box;
        font-size: 18px;
        font-weight: 500;
        font-family: 'Heebo', sans-serif;
    }
    .parent1{
        margin-top: 20px;
        position: relative;
        width: 100%;
    }
    .div1{
        position: relative;
        margin-left:30px;
        margin-right:30px;
        float:left;
    }
    .div2{
        position: relative;
        margin-right:30px;
        float:right;
    }
    label{
        color: #fff;
        font-size: 20px;
        font-family: 'Fraunces', serif;
    }

    .header{
        position: relative;
    }

    .file{
        position: absolute;
        opacity: 0;
        height: 150px;
        width: 150px;
        border-radius: 50%;
        outline: none;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 1;
    }

    @media (max-width: 1317px){
        .div2{
            width: 90%;
            float: left;
            margin-left:30px;
        }
        .div1{
            width: 90%;
        }
        .dota{
            width: 100%;
        }
        .avatar{
            width: 120px;
            height: 120px;
        }
        .file{
            width: 120px;
            height: 120px;
        }
    }
    @media (max-width: 990px){
        .dota{
            width: 90%;
        }
        .parent1{
            margin-left: 30px;
        }
        .avatar{
            width: 120px;
            height: 120px;
        }
        .file{
            width: 120px;
            height: 120px;
        }
    }
    @media (max-width: 830px){
        height: 100%;
        .parent1{
            margin-left:15px;
        }
        .avatar{
            width: 100px;
            height: 100px;
        }
        .file{
            width: 100px;
            height: 100px;
        }
    }
    @media (max-width: 625px){
        .parent1{
            margin-top: 30px;
            margin-left: 8px;
        }
        .avatar{
            width: 100px;
            height: 100px;
        }
        .file{
            width: 100px;
            height: 100px;
        }
    }
    @media (max-width: 540px){
        /* background-color: yellow; */
        left: 82%;
        top: 48%;
        transform: translate(-80%, -48%);
        width: 74%;
        height: 80%;
        .avatar{
            margin-top: 10px;
            width: 80px;
            height: 80px;
        }
        .file{
            margin-top: 10px;
            width: 80px;
            height: 100px;
        }
        .parent1{
            margin-top: 10px;
        }
        label{
            font-size: 14px
        }
        .div1{
            margin-left: 5px;
            /* background-color: green; */
        }
        .div2{
            /* background-color: pink; */
            margin-left: 5px;
        }
        .dota{
            height: 30px;
            margin: 5px 0;
            width: 100%;
            padding-left: 10px;
            font-size: 15px;
        }
    }
    /* @media (max-width: 360) */
`;


const useStyles = makeStyles((theme) => ({
    cancel:{
        float:'right',
        backgroundColor:'white',
        position: 'relative',
        width: '165px',
        height: '40px',
        marginTop: '180px',
        marginRight: '-165px',
    },
    save:{
        float: 'right',
        backgroundColor: 'green',
        position: 'relative',
        width: '165px',
        height: '40px',
        marginTop: '180px',
        marginRight: '-350px',
    },
    update:{
        // display: 'none',
        float: 'right',
        backgroundColor: 'red',
        color: '#fff',
        position: 'relative',
        width: '350px',
        height: '40px',
        marginTop: '180px',
        marginRight: '30px', 
    },
    button: {
        color: '#fff',
        margin: '10px 0',
        width: '350px',
        height: '40px',
    },
    ['@media (max-width:1317px)']: {
        button: {
            width: '100%',
            height: '40px',
        },
        update:{
            width: '37%',
            marginTop: '27px',
            marginRight: '32px',    
        },
        save:{
            width: '23%',
            marginTop: '27px',
            marginRight: '50px',
        },
        cancel:{
            width: '23%',
            marginTop: '27px',
            marginRight: '10px'
        }
    },
    ['@media (max-width:990px)']: {
        button: {
            width: '90%',
            height: '40px',
        },
        update:{
            transition: 'all 0.3s ease',
            marginTop: '30px',
            marginRight: '35px',    
        }
    },
    ['@media (max-width:768px)']: {
        button: {
            width: '90%',
            height: '40px',
        },
        update:{
            transition: 'all 0.3s ease',
            marginTop: '17px',
            marginRight: '45px',    
        }
    },
    ['@media (max-width:540px)']: {
        button: {
            fontSize: '10px',
            width: '100%',
            height: '30px',
        },
        update:{
            fontSize: '12px',
            marginTop: '30px',
            marginRight: '15px',
            height: '30px',    
        }
    },
  }));

function AdminProfile() {

    const classes = useStyles();
    

    const LoginCheck =()=>{
        if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
        return true;
    }

    useEffect(() => {
        LoginCheck();
        FetchData();
      }, []);

    const [ProfileImage, setProfileImage] = useState(null)
    const [Modal, setModal] = useState(false) 
    const [error, setError] = useState("") 

    const [Profile, setProfile] = useState({
        username: "",
        phone: "",
        email: "",
        image: ""
    })

    const PreviewHandler = async(e) =>{
        
        const reader = new FileReader();
        // console.log(imageRef.current.files[0])
        setProfileImage(e.target.files[0]);
        reader.onload = () =>{
            if(reader.readyState === 2)
            setProfile({...Profile, image: reader.result})
        }
        reader.readAsDataURL(e.target.files[0])
    }
    
    const FetchData = async()=>{

        await fetch("http://localhost:5000/admin/profile/"+sessionStorage.getItem("ADMIN_TOKEN"))
        .then(res => res.json())
        .then(
        res => {
            setProfile({
                username: res.name,
                image: res.profileImage!=null?`http://127.0.0.1:5000/get-file/admin/${res.profileImage}`: "",
                phone: res.phone,
                email: res.email
            });
            console.log("Admin Detail",res);
        }
     
    )
 
    }

    const UpdateHandler = async() =>{
        console.log('changed');
        const formdata = new FormData();
        formdata.append('name', Profile.username);
        formdata.append('email', Profile.email);
        formdata.append('phone', Profile.phone);
        formdata.append('profileImage', ProfileImage);
        console.log(ProfileImage)
        console.log(formdata.get('name'), formdata.get('email'), formdata.get('phone'), formdata.get("profileImage"))
        const res = await Axios({ 
            method  : 'PUT', 
            url : `http://127.0.0.1:5000/admin/profile/${sessionStorage.getItem("ADMIN_TOKEN")}`, 
            data : formdata, 
            headers : {'Content-Type': "multipart/form-data"}
          })
        console.log(res);
        
        setModal(true)
      }

      const ResetHandler = (e) =>{
        e.preventDefault()
        console.log(Profile)
        const formdata = new FormData()
        formdata.append("email", Profile.email)
        formdata.append("phone", Profile.phone)
        Axios.put("http://127.0.0.1:5000/admin/forget", formdata)
        .then(res => (res.data))
        .then(data => {
            console.log(data);
            const {errors, success} = data;

            if(errors){
                
                setError(errors)
                return false;
            }
            // localStorage.setItem('USER_TOKEN', success.token);
            // localStorage.setItem('USER_NAME', success.name);
            sessionStorage.setItem('tokenId', success);
            return window.location.replace("../reset/"+success);
        })
    }

    const page = (
        <Boss>
            <div className="header">
                <input type="file" onChange={PreviewHandler} className="file"/>
                <Avatar className="avatar" src={Profile.image} > {Profile.username[0]} </Avatar>
            </div>
            <div className="parent1">
                <div className="div1">
                    <label>Username</label>
                    <div><input onChange={(e)=> setProfile({...Profile, username: e.target.value})} className="dota" type="text" value={Profile.username} /></div>
                </div>
                <div className="div2">
                    <label>Email</label>
                    <div><input onChange={(e)=> setProfile({...Profile, email: e.target.value})} className="dota" type="email" value={Profile.email} /></div>
                </div>
                
            </div>
            <div className="parent1">
                <div className="div1">
                    <label>Phone</label>
                    <div><input onChange={(e)=> setProfile({...Profile, phone: e.target.value})} className="dota" type="text" value={Profile.phone} /></div>
                </div>
                <div className="div2">
                    <label>Reset Password</label>
                    <div>
                        <Button
                            onClick={ResetHandler}
                            className={classes.button} 
                            variant="outlined"
                            color="primary"
                            startIcon={<CachedRoundedIcon />}
                        >
                        Click Here
                        </Button>
                    </div>
                </div>
            </div>
                <Button
                    onClick={UpdateHandler}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.update}
                    startIcon={<CreateRoundedIcon />}
                >
                Update
                </Button> 

   
        </Boss>
    )  
    

    return (
        <>
            {Modal?
            (<CustomModal 
                open={Modal}
                text="Successfully Updated"
                icon="update"
                onClose={() => setModal(false)}
            />)
            :
            page
            }
        </>
    )
}

export default AdminProfile
