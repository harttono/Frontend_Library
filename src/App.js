import React from 'react';
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Dasboard from './Components/Home';
import Admin from './Components/Pages/AdminPage/AdminPage';

import Home from './Components/Home';


function App() {
  return (
    <Router>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/admin' component={Admin}/>
      
    </Switch>
  </Router>
  );
}

export default App;
