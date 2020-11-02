import React from 'react';
import {Link} from 'react-router-dom';
import BrandScreen from './BrandScreen';
import {BiUser} from 'react-icons/bi';
import {ImBooks} from 'react-icons/im';
import {BiBookAdd} from 'react-icons/bi';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {USER_LOGOUT} from './Provider/constants/Constant';
import {useAuth} from './Provider/authProvider';
export default function SideBarScreen(props) {
    const {state,dispatch} = useAuth();
    const {userInfo} = state;
    const handleLogout = () => {
        dispatch({
            type:USER_LOGOUT
        })
    }
 
    return (
        <div>
            <Link to='/'><BrandScreen/></Link>
                {userInfo &&
                <div className='pages-profile'>
                    <div className='pages__profile-img'>
                        <img src={userInfo.picture}  alt='profile' />
                    </div>
                    <h1><p>{userInfo.fullname}</p></h1>
                </div>}
                <ul class="list-group">
                    <li class="list-group-item">
                        <Link to='/profile' class='btn  list-flex-item-group'>
                        <span><BiUser/></span>Profile
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <Link to='/mylibrary' class='btn  list-flex-item-group'>
                        <span><ImBooks/></span>My Library
                        </Link>
                    </li>
                    <li class="list-group-item spliter">
                        <Link to='/addbook' class='btn  list-flex-item-group'>
                        <span><BiBookAdd/></span>Add Book
                        </Link>
                    </li>
                    <li class="list-group-item">
                        <button class='btn  list-flex-item-group' onClick={handleLogout}>
                        <span><RiLogoutBoxRLine/></span>Logout</button>
                    </li>
                </ul>           
        </div>
    )
}
