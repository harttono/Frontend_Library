import React from 'react'
import './Home.css';
import {Link,Route,BrowserRouter as Router} from 'react-router-dom';
import {BiUser} from 'react-icons/bi';
import {ImBooks} from 'react-icons/im';
import {BiBookAdd} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import Shelf from './Pages/Shelf/Shelf';
import MyLibrary from './Pages/MyLibrary/MyLibrary';
import AddBook from './AddBook';
import Profile from './Profile';


function Home() {
    return (
        <Router>
        <div className='container-fluid'>
            <div className='row pages-container'>
                <div className='col-3 pages-left'>
                    <div className='logo-pages'>
                    <img src='/asset/img/logo.svg' />
                        <Link to='/home'>
                            <h1>Lib'rary</h1>
                        </Link>
                    </div>
                    <div className='pages-profile'>
                        <div className='pages__profile-img'>
                            <img src='/asset/img/profile.png' alt='profile' />
                        </div>
                        <h1>Harttonz</h1>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <Link to='/profile' class='btn  list-flex-item-group'>
                                <BiUser/><span>Profile</span>
                            </Link>
                        </li>
                        <li class="list-group-item">
                            <Link to='/mylibrary' class='btn  list-flex-item-group'>
                                <ImBooks/><span>My Library</span>
                            </Link>
                        </li>
                        <li class="list-group-item spliter">
                            <Link to='/add-book' class='btn  list-flex-item-group'>
                                <BiBookAdd/><span>Add Book</span>
                            </Link>
                        </li>
                        <li class="list-group-item">
                            <Link to='/' class='btn  list-flex-item-group'>
                                <RiLogoutBoxRLine/><span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='col-9 pages-right'>
                    <Route exact path='/home'  component={Shelf}/>
                    <Route path='/mylibrary'   component={MyLibrary}/>
                    <Route path='/add-book'    component={AddBook}/>
                    <Route path='/profile'     component={Profile}/>
                </div>
            </div>    
        </div>
    </Router>
    )
}


export default Home
