import React,{useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
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

    const  history = useHistory();

    useEffect( ()=>{

    },[state])
 
    return (
        <div>
            <Link to='/'><BrandScreen/></Link>
                {userInfo &&
                <div className='pages-profile'>
                    <div className='pages__profile-img'>
                      {userInfo && <img src={userInfo.picture} alt='profile' onClick={ () => history.push('/profile')}/>}
                    </div>
                    <h1><p>{userInfo.fullname}</p></h1>
                </div>}
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to='/profile' className='btn  list-flex-item-group'>
                        <span><BiUser/></span>Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/mylibrary' className='btn  list-flex-item-group'>
                        <span><ImBooks/></span>My Library
                        </Link>
                    </li>
                    <li className="list-group-item spliter">
                        <Link to='/addbook' className='btn  list-flex-item-group'>
                        <span><BiBookAdd/></span>Add Book
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <button className='btn  list-flex-item-group' onClick={handleLogout}>
                        <span><RiLogoutBoxRLine/></span>Logout</button>
                    </li>
                </ul>           
        </div>
    )
}
