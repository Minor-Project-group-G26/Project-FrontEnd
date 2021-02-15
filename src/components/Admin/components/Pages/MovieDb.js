import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../ModalDashboard/Modal';
import {Avatar, Fab, Grid} from '@material-ui/core';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import CustomModal from '../../../Module/Modal/CustomModal';
import { Link } from 'react-router-dom';
import { Delete, Edit, SearchRounded} from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';



const Boss = styled.div`
    
    margin-left: 260px;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1200px){
      margin-left: 160px;
    }

    @media screen and (max-width: 1000px){
      margin-left: 100px;
    }

    @media screen and (max-width: 580px){
      margin-left: 100px;
    }

    @media screen and (max-width: 550px){
      margin-left: 70px;
    }
`;

const Div1 = styled.div`

    margin-top: 0;
    z-index: 0;
    position: relative;
    width: 98%;
    height: 90%;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

    .SearchBtn{
      margin-right: 70px;
      margin-bottom: 5px;
      float: right;
    }
    .BeginBtn{
      margin-left: 70px;
    }

    @media (max-width: 768px){
      .SearchBtn{
        margin-right: 0px;
      }
      .BeginBtn{
        margin-left: 0px;
      }
    }
`;

const SearchBar = styled.input`
  float: right;
  position: relative;
  height: 40px;
  padding:5px 0 5px 10px; 
  border-radius: 18px;
  border: 2px solid beige;
  color: black;
  font-size: 16px;
  font-family: 'Thasadith', sans-serif;

  &:focus {
        outline: none;
        box-shadow: 0px 0px 2px black;
    }
  
  @media (max-width: 570px){
    width: 40%;
  } 

`;

const Div2 = styled.div`
  a{
    text-decoration:none;
  }

  .mobile{
    display: none;
  }
  position:fixed;
  right: 2rem;
  background: #b6b6b6;
  bottom: 2rem;
  width:220px;
  height:45px;
  text-align: center;
  padding-top: 8px;
  cursor: pointer;
  margin: 450px 20px 0 800px;
  border: 3px solid #00bfb6; // Neon Color
  overflow: hidden;
  border-radius: 40px;
  box-shadow: 0 0 20px rgba(0,0,0,0.8);

  .laptop{
    position: relative;
    font-weight: 900;
    text-align: center;
    text-decoration: none;
    color: #000;
    z-index: 1;
    transition: all 0.5s ease;
  }
  &:before{
    content: "";
    position: absolute;
    width: 100%;
    height:100%;
    top:0;
    left:0;
    background:#2F4050;

  }
  &:before{
    left: -225px;
  }
  &:hover{
    .laptop{
      color: #00bfb6;
      transition: all 0.5s ease;
    }
  }
  &:hover:before{
    left:0;
    transition: all 0.5s ease;
  }

   @media (max-width: 1000px) {
    flex-direction: row;
    transition: 0.3s ease-in-out;
    margin-left: 780px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    .laptop{
      display: none;
    }
    .mobile{
      position: relative;
      display: block;
      font-weight: 900;
      font-size: 24px;
      margin-top: -5px;
      color: #fff;
    }
    &:hover{
      .mobile{
      color: #00bfb6;
      transition: all 0.5s ease-in-out;
      }
    }
  }


`;


const StyledTableCell = withStyles((theme) => ({
  head: {
      backgroundColor: '#2F4050',
      color: theme.palette.common.white,
  },
  body: {
      fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
      },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  '@global':{
    'span':{
      color: '#fff'
    }
  },
  margin: {
    margin: theme.spacing(1),
    
  },
  table: {
      minwidth: 700,
      width: '90%',
      margin: '2rem auto',
      overflowX: 'scroll'
  },
  root: {
      width: '70%',
      display: 'flex',
      marginLeft:'20%',
      marginRight:'20%',
  },
  linkCell:{
    maxWidth: 200,
    wordBreak: 'break-all'
  },
  size:{
    width: 150
  }
}));


function MovieDb() {

  const LoginCheck =()=>{
    if(!sessionStorage.getItem("ADMIN_TOKEN") && !sessionStorage.getItem("ADMIN_NAME"))return(window.location.replace("http://localhost:3000/admin"))
    return true;
  }

  useEffect(() => {
    LoginCheck();
  },[])

    const [count, setcount] = useState({
      a:1
    })
    const [Search, setSearch] = useState("")
    const [SearchBtn, setSearchBtn] = useState(false)
    const classes = useStyles();
    const [Popup, setPopup] = useState(false)
    const [items, setItems] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:5000/getcount/${count.a}`)
         .then(res => res.json())
         .then(
           (result) => {
           console.log(result);
             setItems(result);
           }
         )
      }, [count]);


    const next = async () =>{
      
      setcount({a:count.a+1})
      console.log(count.a+1)
      
    }

    const prev = async () => {
      if(count.a-1==0){
        return "Stop"
      }
      setcount({a:count.a-1})
      console.log(count.a-1)
    }

     function sleep(ms) {
      return new Promise(
        resolve => setTimeout(resolve, ms)
      );
    }
    
    
    const handelDeleteId = async (id) =>{
      console.log(id)
      // const getId = new FormData();
      // getId.append('Id',id);
      const res = await Axios.get("http://127.0.0.1:5000/remove/"+id);
      console.log(res);
      setPopup(true);
      await sleep(5000);
      window.location.reload()
    }
    const SearchData = async(e)=>{
      setSearch(e.target.value)
      setSearchBtn(false)
    }
    const SearchHandler = async (e) =>{
      e.preventDefault()
      console.log("Yes",Search)
      // const query = await Axios.get("http://127.0.0.1:5000/movie/searchall/"+Search);
      // console.log(query);
      setSearchBtn(true)
    }

      useEffect(() => {
        if(!SearchBtn)
        return ;
        fetch(`http://127.0.0.1:5000/movie/searchall/${Search}`)
         .then(res => res.json())
         .then(
           (result) => {
           console.log(result);
             setItems(result);
           }
         )
      }, [SearchBtn])




  const Film = items.map((data) => {
      return (
        <StyledTableRow key={data.Id}>
          <StyledTableCell  scope="row" align="center">{data.Id}</StyledTableCell>
          <StyledTableCell component="th" scope="row">
            <Avatar 
              className="avatar" 
                style={{marginLeft:'auto',marginRight:'auto' ,verticalAlign: 'middle', width:'100px', height:'100px'}} 
                src={data.Poster!= null? `http://127.0.0.1:5000/get-file/MoviePoster/${data.Poster}`: ""} 
                alt={data.Title} />
          </StyledTableCell>
          <StyledTableCell  scope="row" align="center">{data.Title}</StyledTableCell>
          <StyledTableCell scope="row" align="center">{data.Category}</StyledTableCell>
          <StyledTableCell className={classes.size} scope="row" align="center">
            <Link to={"edit/"+data.Id}>
              <Fab color="secondary" aria-label="edit" size="small" className={classes.margin}>
                <Edit />
              </Fab> 
            </Link>
    
            <Fab onClick={()=> {handelDeleteId(data.Id)}} color="secondary" aria-label="edit" size="small" className={classes.margin}>
              <Delete />
            </Fab>
            
          </StyledTableCell>
          <StyledTableCell className={classes.size} scope="row" align="center"><Modal showModalData={data} /></StyledTableCell>
        </StyledTableRow>
                        
        );
      })

  const page = (
    <Boss >
        
      <Div1 style={{overflowX:'auto'}}>
          <form onSubmit={SearchHandler}>
            <Fab type="submit" onClick={()=>window.location.reload()} size="small" className="BeginBtn" color="primary" aria-label="add">
              <RefreshIcon />
            </Fab>
            <Fab type="submit" onSubmit={SearchHandler} size="small" className="SearchBtn" color="primary" aria-label="add">
              <SearchIcon/>
            </Fab>
            <SearchBar onChange={SearchData} type="search" name="search" placeholder="Search..." />
          </form>       
        
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">

            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">POSTER</StyledTableCell>
                <StyledTableCell align="center">TITLE</StyledTableCell>
                <StyledTableCell align="center">CATEGORIES</StyledTableCell>
                <StyledTableCell className={classes.size} align="center">ACTION</StyledTableCell>
                <StyledTableCell className={classes.size} align="center">SEE MORE</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Film}
            </TableBody>
          </Table>
        </TableContainer>
             
        <div style={{width: '100%', margin:'4rem 0rem'}}>
        <Grid container justify='space-between' style={{overflow: 'none'}} className={classes.nextBtn}>
          <Grid item>
            <img src="/Icons/left_arrow.svg"
            width={50} 
            height={50}
            onClick={prev}
            
            />
          </Grid>
          <Grid item>
            <img src="/Icons/right_arrow.svg" 
            width={50} 
            height={50}
            onClick={next}
            />
          </Grid>
        </Grid>  
        </div>

      </Div1>
      
      <Div2>
        <Link to="/admin/dashboard/movie/add"><span className="mobile">+</span></Link>
        <Link to="/admin/dashboard/movie/add"><span className="laptop">ADD MOVIE</span></Link>
          
      </Div2>
      
    </Boss>
  )


  return (
        <>
            {Popup?
            (<CustomModal 
                open={Popup}
                text="Successfully Deleted"
                icon="delete"
                onClose={() => setPopup(false) }
            />)
            :
            page
            }
        </>
    )
}

export default MovieDb
