import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AdminRoute from './AdminRoute'
import UserRoute from './UserRoute'


function App() {

  // const [LoginUser, setLoginUser] = useState(false);
  // // const classes = useStyles()

  // useEffect(() => {
  //   const token = localStorage.getItem('USER_TOKEN');
  //   const email = localStorage.getItem('USER_NAME');
  //   console.log(LoginUser);
  //   if(token && email){
  //     setLoginUser(true);
  //   }
  //   return ()=> {setLoginUser(false);}
  // },[LoginUser])

  return (
    <Router>
      
        <Switch>
        <Route path='/admin'>
          {/* <p>Admin</p> */}
          <AdminRoute/>
        </Route>
        <Route path='/'>
          <UserRoute />
        </Route>

        </Switch>
      
    </Router>
  );
}

export default App;
