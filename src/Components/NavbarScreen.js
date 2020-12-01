import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {RiLogoutBoxRLine} from 'react-icons/ri';
import {MdLibraryAdd} from 'react-icons/md';
import {BsListUl,BsCollection} from 'react-icons/bs';
import {Dropdown} from 'react-bootstrap';
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
                <form className="form-inline my-2 my-lg-0">
                    <div className="dropdown-container">
                        <Link to="/profile"> {userInfo && <img src={userInfo.picture}></img>}</Link>
                        <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            {" "}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#"><Link to="/mylibrary"><BsCollection/> My Collection</Link></Dropdown.Item>
                            <Dropdown.Item href="#"><Link to="/addbook" ><MdLibraryAdd/> Add Book</Link></Dropdown.Item>
                            <Dropdown.Item href="#"><Link to="/category"><BsListUl/> List Category</Link></Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handleLogout}><RiLogoutBoxRLine/> Logout</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </form>
            </div>
        </nav>
    )
}

export default Navbar
