import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import styled from 'styled-components';
import "./Admin.css";
// import AddMovie from './components/Pages/AddMovie';
import AddMovie2 from './components/Admin/components/Pages/AddMovie2';
import EditMovie from './components/Admin/components/Pages/EditMovie';
import Login from './components/Admin/components/LoginPage/Login';
import LeftBar from './components/Admin/LeftMenu/LeftBar';
import BarGraph from './components/Admin/BarGraphTesting/BarGraph';
import MovieDb from './components/Admin/components/Pages/MovieDb';
import UserDb from './components/Admin/components/Pages/UserDb';
import AddCategory from './components/Admin/components/Pages/AddCategory';
import AddDirector from './components/Admin/components/Pages/AddDirector';
import AddCast from './components/Admin/components/Pages/AddCast';
import CommentList from './components/Admin/components/Pages/CommentList';
import ForgetPass from './components/Admin/components/LoginPage/ForgetPass';
import ResetPass from './components/Admin/components/LoginPage/ResetPass';
import AdminProfile from './components/Admin/components/Pages/AdminProfile';
import CategoryDb from './components/Admin/components/Pages/CategoryDb';


function AdminRoute() {

  const [LoginAdmin, setLoginAdmin] = useState(false);
  // const classes = useStyles()

  useEffect(() => {
    const token = localStorage.getItem('ADMIN_TOKEN');
    const email = localStorage.getItem('ADMIN_NAME');
    console.log(LoginAdmin);
    if(token && email){
      setLoginAdmin(true);
    }
    return ()=> {setLoginAdmin(false);}
  },[LoginAdmin])

  return (
    <>   
      <Router>
      
        <Switch>
                <Route path='/admin' exact> 
                  <Login   />
                </Route>
                <Route path='/admin/forget' exact> 
                  <ForgetPass />
                </Route>
                <Route path='/admin/reset/:tokenId' exact> 
                  <ResetPass />
                </Route>
                <Route path='/admin/dashboard' exact>
                  <LeftBar />
                </Route>
                <Route path='/admin/dashboard/profile' exact>
                  <LeftBar />
                  <AdminProfile />
                </Route>
                <Route path='/admin/dashboard/graph' exact>
                  <LeftBar />
                  <BarGraph />
                </Route>
                <Route path='/admin/dashboard/movie/add' exact>
                  <LeftBar/> 
                  <AddMovie2/>
                </Route>
                <Route path='/admin/dashboard/movie/edit/:id' exact>
                  <LeftBar/> 
                  <EditMovie/>
                </Route>
                {/* <Route path='/admin/:id' exact>
                  <Testing />
                </Route> */}
                <Route path='/admin/dashboard/user/db' exact>
                  <LeftBar/>
                  <UserDb/>   
                </Route>   
                <Route path='/admin/dashboard/movie/db' exact> 
                  <LeftBar/> 
                  <MovieDb/>
                </Route>   
                <Route path='/admin/dashboard/category/db' exact> 
                  <LeftBar/> 
                  <CategoryDb/>
                </Route>   
                <Route path='/admin/dashboard/add/category' exact>
                  <LeftBar/>
                  <AddCategory/>   
                </Route>   
                <Route path='/admin/dashboard/movie/director' exact>
                  <LeftBar/>
                  <AddDirector/>   
                </Route>     
                <Route path='/admin/dashboard/movie/cast' exact>
                  <LeftBar />
                  <AddCast />   
                </Route>   
                <Route path='/admin/dashboard/movie/commentslist' exact>
                  <LeftBar   />
                  <CommentList   />   
                </Route>   
            </Switch>      
        </Router>     
    </> 
  );
}

export default AdminRoute;
