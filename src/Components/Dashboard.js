import React from 'react'
import './Dashboard.css';
import {Link} from 'react-router-dom';
import {BiUser} from 'react-icons/bi';
import {ImBooks} from 'react-icons/im';
import {BiBookAdd} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {IoIosArrowBack} from 'react-icons/io';
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';

function Dashboard() {
    return (
        <Router>
        <div className='container-fluid'>
            <div className='row pages-container'>
            <div className='col-3 pages-left'>
                <div className='logo-pages'>
                    <img src='/asset/img/logo.svg' />
                    <h1>Lib'rary</h1>
                </div>
                <div className='pages-profile'>
                    <div className='pages__profile-img'>
                        <img src='/asset/img/profile.png' alt='profile' />
                    </div>
                    <h1>Harttonz</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <Link class='btn  list-flex-item-group'>
                            <BiUser/><span>Profile</span>
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link class='btn  list-flex-item-group'>
                            <ImBooks/><span>My Library</span>
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link class='btn  list-flex-item-group'>
                            <BiBookAdd/><span>Add Book</span>
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link class='btn  list-flex-item-group'>
                            <RiLogoutBoxRLine/><span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='col-9 pages-right'>
            <Switch>
                {/* <Route path='/' exact component={Dasboard}/> */}
            </Switch>
                <div className='pages__cover'>
                    <div className='pages-cover-text'>
                        <h1>Share,Read</h1>
                        <h1>and <span>Love</span></h1>
                        <p>Reading is fascinating</p>
                    </div>
                    <div className='pages-cover-content'>
                        <img src='/asset/img/coverBook.png' alt='cover book'/>
                    </div>
                </div>
                <div className='pages-cover-nav'>
                    <h1>List Book</h1>
                    <Link to='/jk' className='btn btn-light pages__cover-nav'>
                        <IoIosArrowBack/> Category
                    </Link>       
                </div>
                <div className='row pages-books'>
                    
                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book1.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book2.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book3.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book4.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>



                </div>
            </div>
            </div>    
        </div>
    </Router>
    )
}


export default Dashboard
