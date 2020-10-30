// import React, { Component } from 'react';
// import {Route,BrowserRouter as Router,Switch,Link,useRouteMatch} from 'react-router-dom';
// import {BiUser} from 'react-icons/bi';
// import {ImBooks} from 'react-icons/im';
// import {BiBookAdd} from 'react-icons/bi';
// import {RiLogoutBoxRLine} from 'react-icons/ri';
// import BrandScreen from '../../BrandScreen';
// import BookList from '../../BookListScreen';
// import Profile from '../../ProfileScreen';
// import MyLibrary from '../MyLibrary/MyLibrary';
// import AddBook from '../../AddBookScreen';
// import DetailBook from '../../DetailBookScreen';
// import Reader from '../../readerScreen';


// import {USER_LOGOUT} from '../../Provider/constants/Constant';
// import {useAuth} from '../../Provider/authProvider';
// import './index.css';
// import {ProductContextProvider} from '../../Provider/productProvider';

// export const Home = ({match}) => {

//     const {state,dispatch} = useAuth();
//     const {userInfo} = state;
//     const handleLogout = () => {
//         dispatch({
//             type:USER_LOGOUT
//         })
//     }
//     console.log('isi state di index',state)
//     return (
//        <Router>
//             <div  className="container-fluid">
//                 <div className='row pages-container'>
//                     <div className='col-2 sidebar'>
//                         <Link to={`${match.url}`}><BrandScreen/></Link>
//                         {userInfo && <div className='pages-profile'>
//                             <div className='pages__profile-img'>
//                                 <img src={userInfo.picture}  alt='profile' />
//                             </div>
//                             <h1><p>{userInfo.fullname}</p></h1>
//                         </div>}
//                         <ul class="list-group">
//                             <li class="list-group-item">
//                                 <Link to={`${match.url}/profile`} class='btn  list-flex-item-group'>
//                                 <span><BiUser/></span>Profile
//                                 </Link>
//                             </li>
//                             <li class="list-group-item">
//                                 <Link to={`${match.url}/mylibrary`} class='btn  list-flex-item-group'>
//                                 <span><ImBooks/></span>My Library
//                                 </Link>
//                             </li>
//                             <li class="list-group-item spliter">
//                                 <Link to={`${match.url}/addbook`} class='btn  list-flex-item-group'>
//                                     <span><BiBookAdd/></span>Add Book
//                                 </Link>
//                             </li>
//                             <li class="list-group-item">
//                                 <button class='btn  list-flex-item-group' onClick={handleLogout}>
//                                 <span><RiLogoutBoxRLine/></span>Logout
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className='col-10 pages-right'>
//                     <Switch>
//                         <ProductContextProvider>
//                             <Route exact path={`${match.path}/`} component={BookList} />  
//                             <Route exact path={`${match.path}/profile`} component={Profile} />  
//                             <Route exact path={`${match.path}/mylibrary`} component={MyLibrary} />  
//                             <Route exact path={`${match.path}/addbook`} component={AddBook} />  
//                             <Route exact path={`${match.path}/detail/:id`} component={DetailBook} />  
//                             <Route exact path={`${match.path}/detail/:id/read`} component={Reader} />  
//                         </ProductContextProvider>
//                     </Switch>              
//                     </div>
//                 </div>
//             </div>
//        </Router>
//     )
// }


