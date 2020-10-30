import React from 'react';
import Navbar from '../../NavbarScreen';
import Admin from '../../AdminScreen';
import AddPage from './AddPage';
import Profile from './AdminProfile';
import './index.css';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';

function AdminPage(props) {
    return (
        <Router>
            <>
              <Navbar/>
              <div className="route-admin">
              <Switch>
                  <Route path="/admin" exact component={Admin}/>
                  <Route path="/admin/profile" exact component={Profile}/>
                  <Route path="/admin/add-book" exact component={AddPage}/>
              </Switch>
              </div>
            </>
        </Router>
    )
}

export default AdminPage;
