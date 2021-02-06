import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomModal from '../../../Module/Modal/CustomModal';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import { Fab } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

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
    position: relative;
    width: 98%;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

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
    z-index: 3;
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

function CategoryDb() {

  const classes = useStyles();
  const [Popup, setPopup] = useState(false)

    const page = (
        <Boss >
            
          <Div1 style={{overflowX:'auto'}}>
           
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
    
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{width:'10%'}} align="center">ID</StyledTableCell>
                    <StyledTableCell align="center">Genres</StyledTableCell>
                    <StyledTableCell className={classes.size} align="center">ACTION</StyledTableCell>
                  </TableRow>
                </TableHead>
    
                <TableBody>

                <StyledTableRow>
          <StyledTableCell  scope="row" align="center">1</StyledTableCell>
          <StyledTableCell  scope="row" align="center">Action</StyledTableCell>
          <StyledTableCell className={classes.size} scope="row" align="center">
            <Link to="#">
              <Fab color="secondary" aria-label="edit" size="small" className={classes.margin}>
                <Edit />
              </Fab> 
            </Link>
    
            <Fab color="secondary" aria-label="edit" size="small" className={classes.margin}>
              <Delete />
            </Fab>
            
          </StyledTableCell>

        </StyledTableRow>

                </TableBody>
              </Table>
            </TableContainer>
                 
          </Div1>
    
          <Div2>
            <Link to="/admin/dashboard/add/category"><span className="mobile">+</span></Link>
            <Link to="/admin/dashboard/add/category"><span className="laptop">ADD GENRES</span></Link>
              
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

export default CategoryDb
