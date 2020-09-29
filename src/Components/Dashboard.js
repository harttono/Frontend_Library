import React from 'react'
import './Dashboard.css';
import {Link} from 'react-router-dom';
import {BiUser} from 'react-icons/bi';
import {ImBooks} from 'react-icons/im';
import {BiBookAdd} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri'

function Dashboard() {
    return (
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
                        <Link class='btn btn-primary list-flex-item-group'>
                            <BiUser/><span>Profile</span>
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link class='btn btn-primary list-flex-item-group'>
                            <ImBooks/><span>My Library</span>
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link class='btn btn-primary list-flex-item-group'>
                            <BiBookAdd/><span>Add Book</span>
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link class='btn btn-primary list-flex-item-group'>
                            <RiLogoutBoxRLine/><span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='col-9'>
                    f
            </div>
            </div>    
        </div>
    )
}


export default Dashboard
