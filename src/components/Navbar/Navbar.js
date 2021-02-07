import React,{ useEffect, useState } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { Grid, makeStyles, TextField, Button } from "@material-ui/core"
import { SearchOutlined , Menu} from "@material-ui/icons"
import MicIcon from '@material-ui/icons/Mic';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
import Styled from 'styled-components'


const Header = Styled.header`
    z-index:100;
    display: flex;
    position: absolute;
    top: 3rem;
    /* padding-left: 2rem; */
    width: 100%;
    overflow:hidden;
    color:#FFF;
    justify-content: center;
    align-items: center;
    transition: 650ms;
    .mobile{
      display:none;
    }
    .container{
      margin: '0 3rem';
      justify-content:'space-between';
    }
    @media(max-width:500px){
      left: 0;
      top: 0;
      width: 100%;
      padding: 2rem 0;
      background: #000000;
      justify-content: initial; 
       align-items: initial;
      .container{
        margin: 0;
        display: none;

      }
      .mobile{
      display: block;
      margin-left: 1rem;
      position: absolute;
      }
    }
    .parentDiv{
      display: flex;
      /* float: right; */
      position: relative;
      margin-right: 30px;
      justify-content: flex-end;

      .childDiv1{
      
      }
      .childDiv2{
        
      }
   }

    
`;

const NavList = Styled.ul`
    display:flex;
    flex-direction:row;
    float: right;
    margin-right: 2rem;
    li{
      list-style: none;
      display: block;
      position: relative;
      overflow:hidden;
      @media(max-width:425px){
      margin: 0.5rem 0;
    }
    }
    .navLink{
      padding: 0 2rem; 
      /* background: #fff; */
      font-size: 20px;
      text-align:center;
      color: #EEE;
      z-index:-1;
    }
    .navLink:before{
      overflow:hidden;
      content: '';
      position:absolute;
      padding: 1rem 5rem;
      margin-left: -20rem;
      background: #eee;
      transition: 500ms;
      z-index:-1;
    }
    .Link{
      color: #8f0f0f;
      z-index:100;
      font-weight: 800;
      font-family: 'Roboto';
      transition: 500ms;
    }
    .navLink:hover .Link{
      color : #ff3f05;
      

    } 
    .pc{
      display: block;
    }
    @media(min-width:728px){
      .navLink:hover:before{
        margin-left: -2rem;
      }
      justify-content: center;
      align-items: center;
      width:100%;
      margin: 1rem 0;
    }
    
    .active{
      color: #12b0c5;
    }
    @media(max-width:500px){
      flex-direction: column;
      .pc{
        display: 'none'
      }
    }

`




const useStyle = makeStyles((theme) => ({
  
  Search:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    ["@media(max-width: 500px)"]:{
      flexDirection: 'column'
  },
},
  SearchInput:{
    width:'80%',
    padding: '0 2rem',
    marginTop: 0,
    // fontSize: 24
    ["@media(max-width: 500px)"]:{
      // flexDirection: 'column',
      width: '100%',
      
  },
  },
  SearchBtn:{
    '@global': {
      html: {
        WebkitFontSmoothing: 'auto',
      },
      span:{
          color:'#fff'
      }
    },
    padding: '0.3rem 1.5rem',
    marginTop: 10,
    marginLeft: '10px',
    // fontSize: 24
    color: '#FFF',
    // border: "2px solid #00bfb6",
    background: '#00bfb6',
    ["@media(max-width: 500px)"]:{
      flexDirection: 'column',
  },
  '&:hover':{
    background: '#036b66'
    }
  },
  chlidContainer:{
    ["@media(max-width: 500px)"]:{
      margin: '1rem auto',
  },
  },
  NavList:{
    ["@media(max-width: 500px)"]:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  }

}))

function Navbar(props) {
  const history = useHistory()
  const [SearchText, setSearchText] = useState("");
  // const [LoginUser, setLoginUser] = useState(false);
  
  const classes = useStyle();
  
  const mobileMenuHandler = ()=>{
    console.log('clicked');
    let menu = document.getElementById('menu');
    // console.log(document.getElementById('header'));
    if(menu.style.display=== "flex"){
      menu.style.display= 'none';
      // menu.style.margin= '0';
      // document.getElementById('header').style.background= 'none';
    }
    else{
      menu.style.display= 'flex';
      menu.style.margin= '0';
    }
  }

  
  
  const LoginlinkHandler = () =>{
    if(props.LoginUser)
    return(<li><div className="navLink"><NavLink exact to='/user/profile' className='Link'>Profile</NavLink></div></li>)
    return(<li><div className="navLink"><NavLink exact to='/user/signup' className='Link'>Signup</NavLink></div></li>)
  }
  useEffect(() => {
    // window.addEventListener('scroll',()=>{
    //   let scrollTimer = -1;
    //   let scroll = window.scrollY;
    //   if (scrollTimer !== -1)
    //       clearTimeout(scrollTimer);
    //   document.getElementById('header').style.opacity = ""+1/scroll*100;
    //   scrollTimer =  window.setTimeout(()=>{
    //     document.getElementById('header').style.opacity = '1';
    //   }, 1000);
    // })
    console.log(props.LoginUser)
  },[])

  const SearchMovieHandler =()=>{
    if(SearchText.length > 0){
      window.location.href = ('/movie/search/'+SearchText)
    }
  }

// Audio Detection Methods
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function(){
    console.log("You Can Start Talking !!")
} 

recognition.onresult =  function(event){
    const current = event.resultIndex;
    const transcript =event.results[current][0].transcript;
    console.log(transcript)
    setSearchText(transcript)
    readOutLoud("Please Click Search button ")

    // Automation of Audio
    // searchHandler()

}


function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;


  window.speechSynthesis.speak(speech)
}



    return (
      <Header id='header'>
        <span className='mobile' onClick={mobileMenuHandler}><Menu /></span>
        <Grid container id='menu' className='container'>
          <Grid item md={3} sm={4} xs={12} className={classes.chlidContainer}>
          <div className="wrapper"><a href="/"><h3>Motion Pictures</h3></a></div>
          </Grid>
          <Grid item xs={12} sm={8} md={5} className={classes.Search}>
          <div className={classes.SearchInput}>
          <TextField id="filled-search" 
          fullWidth
          value={SearchText}
          onChange={(e)=> setSearchText(e.target.value)}
          inputProps={{style:{color: '#fff', borderBottom: '1px solid #fff'}}}
          InputLabelProps={{style: {color: '#fff'}}}
          label="Search field" type="search" />
          </div>
          <div className="parentDiv">
            {/* <div className="childDiv1"> */}
            
              <Button onClick={SearchMovieHandler} className={classes.SearchBtn} variant="contained">
                <span><SearchOutlined /></span>
              
              </Button>
            
            {/* </div> */}
            {/* <div className="childDiv2"> */}
              <Button  className={classes.SearchBtn} onClick={()=>recognition.start()} variant="contained">
              <span><MicIcon /></span>
              </Button>
            {/* </div> */}
          </div>
          </Grid>

          <Grid item xs={12} sm={12} md={4} className={classes.NavList}>
            <NavList>
              <li><div className="navLink"><NavLink exact to='/' className='Link' activeClassName='active'>Home</NavLink></div></li>
              <li><div className="navLink"><NavLink exact to='/category' className='Link'>Category</NavLink></div></li>
              <li><div className="navLink"><NavLink exact to='/plan' className='Link'>Plan</NavLink></div></li>
              {LoginlinkHandler()}
            </NavList>
          </Grid>
          
        </Grid>
      </Header>
    )
}

export default Navbar
