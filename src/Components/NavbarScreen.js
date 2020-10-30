import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {MdLibraryAdd} from 'react-icons/md';
import {BsListUl,BsCollection} from 'react-icons/bs';
import {Dropdown,DropdownButton} from 'react-bootstrap';
import Brand from './BrandScreen';
import {useAuth} from './Provider/authProvider';
import {USER_LOGOUT} from './Provider/constants/Constant';


function Navbar() {
    const {state,dispatch} = useAuth();
    const {userInfo} = state;
    const handleLogout = () => {
        dispatch({
            type:USER_LOGOUT
        })
    }

    return (
        <nav class="navbar bg-light">
            <div className="container">
                <Link to="/admin"><Brand/></Link>
                <div className="dropdown-container">
                <Link className="dropdown-item"> {userInfo && <img src={userInfo.picture}></img>}</Link>
                <DropdownButton title="drop" >
                    <Link className="dropdown-item" to="/addbook"><MdLibraryAdd/>add book</Link>
                    <Link className="dropdown-item" to="/category"><BsListUl/> List Category</Link>
                    <Link className="dropdown-item" to="#" onClick={handleLogout}><RiLogoutBoxRLine/> Logout</Link>
                </DropdownButton>
            </div>
                    
                
            </div>
        </nav>
    )
}

export default Navbar
