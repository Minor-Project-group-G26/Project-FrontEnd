import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Signup from './components/Signin/Signup'
import Homepage from './components/Homepage/Homepage'
import BgPoster from './login_bg.jpg'
import Signin from './components/Signin/Signin'
import Category from './components/Homepage/Category'
import Plan from './components/Plan/Plan'
import Profile from './components/Profile/Profile'
// import Admin from './components/Admin/Admin'
// import Login from './components/Admin/Login'
import { makeStyles } from '@material-ui/core'
import CustomModal from './components/Module/Modal/CustomModal'
import MovieCard from './components/MovieCard/MovieCard'
import MainMovie from './components/MovieCard/MainMovie'
import Search from './components/Search/Search'
import ForgetPassword from './components/Signin/ForgetPassword'
import ResetPassword from './components/Signin/ResetPassword'
import Card from './components/Module/test/Card'
import About from './components/Extras/About'


const useStyles = makeStyles(theme=>({
  '@global': {
    html: {
      WebkitFontSmoothing: 'auto',
    },
  }
}))

function UserRoute() {

  const [LoginUser, setLoginUser] = useState(false);
  // const classes = useStyles()

  useEffect(() => {
    const token = localStorage.getItem('USER_TOKEN');
    const email = localStorage.getItem('USER_NAME');
    console.log(LoginUser);
    if(token && email){
      setLoginUser(true);
    }
    return ()=> {setLoginUser(false);}
  },[])

  return (
    <Router>
      <div>
        <img className="background" src={BgPoster} alt="background" />
      </div>
        {/* <Login /> */}
        <Navbar LoginUser={LoginUser} />

        <Switch>
          <Route path='/' exact  component={Homepage} />
          <Route exact path='/category' component={Category} />
          <Route exact path='/plan' >
            <Plan LoginUser={LoginUser} />
          </Route>
          <Route exact path='/user/signup' component={Signup} />
          <Route exact path='/user/signin' >
            <Signin LoginUser={LoginUser} />
          </Route>
          <Route exact path='/user/profile' component={Profile} />
          
          <Route exact path='/modal' >
            <main><CustomModal /></main>
          </Route>
          <Route exact path='/movie'>
            <main><MovieCard /></main>
          </Route>
          <Route  exact path='/movie/:id'>
            <MainMovie LoginUser={LoginUser} />
          </Route>
          <Route exact path='/movie/search/:query'>
            <Search />
          </Route>
          <Route exact path='/user/forget'>
            <ForgetPassword />
          </Route>
          <Route exact path='/user/reset/:tokenId'>
            <ResetPassword />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
         
          <Route exact path='/:404'>
            <main>
            <CustomModal text="404 PAGE NOT FOUND"  icon="fail" open={true} onClose={()=>window.location.href="/"}/>
            </main>
          </Route>
          
        </Switch>
     
       
      
        
      <Footer />
      
    </Router>
  );
}

export default UserRoute;
