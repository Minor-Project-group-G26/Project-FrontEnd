import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AdminRoute from './AdminRoute'
import Card from './components/Module/test/Card';
import UserRoute from './UserRoute'


function App() {

  return (
    <Router>
      
        <Switch>
        <Route exact path='/card'>
           
            <Card />
            
        </Route>
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
