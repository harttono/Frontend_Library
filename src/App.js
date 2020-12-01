import React from 'react';
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import Admin from './Components/AdminScreen';
import PrivateRoute from './Components/Route/PrivateRoutes';
import {useAuth} from './Components/Provider/authProvider';
import Home from './Components/HomeScreen';
import Profile from './Components/ProfileScreen';
import Navbar from './Components/NavbarScreen';
import MyLibrary from './Components/Pages/MyLibrary/MyLibrary';
import AddBookUser from './Components/AddBookScreen';
import DetailBook from './Components/DetailBookScreen';
import SideBar from './Components/SideBarScreen';
import Reader from './Components/readerScreen';
import Categories from './Components/CategoryScreen';
import NoPage from './Components/NoPage'


const userRoute = [
  {
    path:'/home',
    component:Home
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/mylibrary',
    component:MyLibrary
  },
  {
    path:'/addbook',
    component:AddBookUser
  },
  {
    path:'/detail/:id',
    component:DetailBook
  },
  {
    path:'/read/:id',
    component:Reader
  },
  {
    path:'/admin',
    component:Admin
  },
  {
    path:'/category',
    component:Categories,
  }

]



function App() {
  const {state:authState} = useAuth();
  const {userInfo} = authState;

 
  return (
            <Router>
              <Switch>
                  <Route exact path='/' component={LandingPage}/>  
                  <Route path={['/home','/profile','/mylibrary','/addbook','/detail/:id','/read/:id','/admin','/category']}>
                    <div  className={userInfo && !userInfo.isAdmin ? "container-fluid" : null}>
                          <div className={userInfo && userInfo.isAdmin ? null : 'row pages-container'}>
                              {userInfo && userInfo.isAdmin ?
                                <div>
                                    <Navbar/>
                                </div>
                                :
                                <div className='col-2 sidebar'>
                                    <SideBar/>
                                </div>
                              }
                              <div className={userInfo && !userInfo.isAdmin ? 'col-10 pages-right' : ''}>
                                <Switch>
                                        {userRoute.map ( ({path,component},key) =>{
                                            return(
                                              <PrivateRoute exact path={path} component={component} key={key}/>
                                            )
                                        })}  
                                </Switch>        
                              </div>
                          </div>   
                    </div>
                  </Route>
                  <Route path="*" component={NoPage}/>
              </Switch>
            </Router>
    );
}

export default App;
