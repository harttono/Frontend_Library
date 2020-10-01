import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {BiBookAdd} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri';

function Navbar() {
    return (
        <nav class="navbar bg-light">
            <div className="container">
                 <div className='logo-pages'>
                    <img src='/asset/img/logo.svg' />
                        <Link to='/home'>
                            <h1>Lib'rary</h1>
                        </Link>
                 </div>

                <div className="d-flex align-items-center ">
                    <div className="dropdown-container">
                        <div className="dropdown">
                            <Link to="/profile">
                            <img src={"/asset/img/profile.png"}></img>
                            </Link>
                            <div className="dropdown-content">
                                <div className="dropdown-item spliter">
                                    <span><BiBookAdd/></span>        
                                    <Link to="/addbook">Add Book</Link>
                                </div>
                                <div className="dropdown-item">
                                    <span style={{color:'#EE4622'}}><RiLogoutBoxRLine/></span>   
                                    <Link to="/
                                    ">Logout</Link>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
