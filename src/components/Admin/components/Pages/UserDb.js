import React, { useState, useEffect, useRef } from 'react';
import * as TI from "react-icons/ti";
import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar, Fab, Grid, SvgIcon } from '@material-ui/core';
import { Delete, Opacity } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';


const Boss = styled.div`
    margin-left: 260px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 550px){
      margin-left: 70px;
      margin-right: 10px;
    }
`;

const Div1 = styled.div`
    margin-top: 0;
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    /* justify-content: center;
    align-items: center; */
    flex-direction: column;

    .SearchBtn{
      margin-right: 70px;
      margin-bottom: 5px;
      float: right;
      z-index: 20000;
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
  '@global': {
    'span': {
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
  nextBtn: {
    minwidth: 700,
    width: '90%',
    margin: '2rem auto',

  },
  root: {
    width: '70%',
    display: 'flex',
    marginLeft: '20%',
    marginRight: '20%',
  },
  linkCell: {
    maxWidth: 200,
    wordBreak: 'break-all'
  },
  size: {
    width: 150
  }
}));



function UserDb() {
  const classes = useStyles();
  const [Navigation, setNavigation] = useState({
    next: false,
    pre: false
  })
  const [AllUser, setAllUser] = useState([]);
  const [Search, setSearch] = useState("")
  const [items, setItems] = useState([]);
  const [Refresh, setRefresh] = useState(false)

  const AllUsersHandler = async (id=0, great=1) => {
    console.log(`http://localhost:5000/users/${sessionStorage.getItem('ADMIN_TOKEN')}/${id}/${great}`)
    await Axios.get(`http://localhost:5000/users/${sessionStorage.getItem('ADMIN_TOKEN')}/${id}/${great}`)
      .then(result => {
        console.log(result);
        if(result.data.length > 0)
        setAllUser(result.data);
      }
      )
  }

  const NavigationHandler = async (preUser, nextUser) => {
    if (preUser) {
      console.log(preUser);
      console.log(nextUser);
      const pre = await Axios.get(`http://localhost:5000/users/is/${preUser.id}/0`)
      const next = await Axios.get(`http://localhost:5000/users/is/${nextUser.id}/1`)
      console.log(pre);
      console.log(next);
      setNavigation({
        pre: pre.data.success,
        next: next.data.success
      });
    }

  }

  useEffect(() => {
    AllUsersHandler()

    return () => setRefresh(false)
  }, [Refresh]);

  useEffect(() => {

    NavigationHandler(AllUser[0], AllUser[AllUser.length - 1])

  }, [AllUser])


  const DeleteUserHandler = async (id, email) => {
    const formdata = new FormData()
    formdata.append('id', id)
    formdata.append('email', email)
    
    await Axios({
      url: `http://localhost:5000/users/${sessionStorage.getItem('ADMIN_TOKEN')}/${AllUser[0].id}/1`,
      data: formdata,
      method: 'DELETE'
    }).then(res => {
      console.log(res);
      const { success } = res.data;
      if (!success)
        return console.log("fail to delete");
      console.log("delete");
      if(AllUser[0].id == id)
      return AllUsersHandler(id, 0);
      return AllUsersHandler(AllUser[0].id,1);

    }
    )
  }

  const NavigateTable = (great) => {
    const top = AllUser[0]
    const bottom = AllUser[AllUser.length - 1]
    console.log(great)
    
    if(great && Navigation.next) return AllUsersHandler(bottom.id+1, 1);
    if(!great && Navigation.pre) return AllUsersHandler(top.id-1, 0);
    return console.log("clicked");
  }

  const SearchHandler = async (e) =>{
    e.preventDefault()
    console.log("Yes",Search)
    const query = await Axios.get("http://127.0.0.1:5000/movie/searchall/"+Search);
    console.log(query);
  }

    useEffect(() => {
      fetch(`http://127.0.0.1:5000/movie/searchall/${Search}`)
       .then(res => res.json())
       .then(
         (result) => {
         console.log(result);
           setItems(result);
         }
       )
    }, [Search])

  const D_User = AllUser.map((data) => {
    return (
      <StyledTableRow key={data.id}>
        <StyledTableCell scope="row" align="center">{data.id}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Avatar
            className="avatar"
            style={{ marginLeft: 'auto', marginRight: 'auto', verticalAlign: 'middle', width: '100px', height: '100px' }}
            src={data.profileImage != null ? `http://127.0.0.1:5000/get-file/users/${data.profileImage}` : ""}
            alt={data.email} >{data.name[0]}</Avatar>
        </StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.name}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.email}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.phone}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.plan}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.start_date}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.expire_date}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.doc}</StyledTableCell>
        <StyledTableCell scope="row" align="center">{data.dou}</StyledTableCell>
        <StyledTableCell scope="row" align="center">
          <Fab onClick={() => DeleteUserHandler(data.id, data.email)} color="secondary" aria-label="edit" size="small" className={classes.margin}>
            <Delete />
          </Fab>
        </StyledTableCell>
      </StyledTableRow>
    )
  })

  return (
    <Boss>
      <Div1>
        <form >
        <Fab type="submit" size="small" className="SearchBtn" color="primary" aria-label="add">
          <SearchIcon/>
        </Fab>
        <SearchBar onChange={(e)=> setSearch(e.target.value)} type="search" name="search" placeholder="Search..." />
        </form>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">

            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: '5%' }} align="center" >ID</StyledTableCell>
                <StyledTableCell style={{ width: '20%' }} align="center">Profile</StyledTableCell>
                <StyledTableCell style={{ width: '8%' }} align="center">Name</StyledTableCell>
                <StyledTableCell style={{ width: '8%' }} align="center">Email</StyledTableCell>
                <StyledTableCell style={{ width: '5%' }} align="center">Phone</StyledTableCell>
                <StyledTableCell style={{ width: '4%' }} align="center">Plan(₹)</StyledTableCell>
                <StyledTableCell style={{ width: '10%' }} align="center" >Start_Date</StyledTableCell>
                <StyledTableCell style={{ width: '10%' }} align="center" >Exp_Date</StyledTableCell>
                <StyledTableCell style={{ width: '10%' }} align="center" >DOC</StyledTableCell>
                <StyledTableCell style={{ width: '10%' }} align="center">Last Update</StyledTableCell>
                <StyledTableCell style={{ width: '10%' }} align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {D_User}
            </TableBody>
          </Table>

        </TableContainer>
        <div style={{ width: '100%' }}>
          
          <Grid container justify='space-between' style={{ overflow: 'none' }} className={classes.nextBtn}>
            <Grid item>
              <img 
              src="/Icons/left_arrow.svg" 
              width={50} height={50} 
              onClick={()=> NavigateTable(0)} 
              style={{ opacity: Navigation.pre? "1": "0.5" }} />
            </Grid>
            <Grid item>
              <img src="/Icons/right_arrow.svg" 
              width={50} height={50} 
              onClick={()=> NavigateTable(1)} 
              style={{ opacity: Navigation.next? "1": "0.5" }} />
            </Grid>
          </Grid>
        </div>
      </Div1>
    </Boss>
  )
}

export default UserDb
