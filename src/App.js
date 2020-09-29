import React from 'react';
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './Components/Home';
import Dasboard from './Components/Dashboard';


function App() {
  return (
    <Router>
    <Switch>
      <Route path='/' exact component={Dasboard}/>
    </Switch>
  </Router>
  );
}

export default App;
