import React,{useContext,useEffect,useState} from 'react';
import {ProductContext} from './Provider/productProvider';
import {useAuth} from './Provider/authProvider';
import {Link} from 'react-router-dom';
import Loader from './Loader';
import {MY_PRODUCTS_REQUEST,MY_PRODUCTS_SUCCESS,MY_PRODUCTS_FAIL} from './Provider/constants/Constant';
import Axios from 'axios';

export default function CartScreen() {
    const [state,dispatch] = useContext(ProductContext);
    const {state:authState} = useAuth();
    const {userInfo} = authState;
    const {isLoading,error,myBooks} = state;
    useEffect(()=>{
        const getMybook= async () =>{
            dispatch({
                type:MY_PRODUCTS_REQUEST
            })
        try{
            const {data:{data}} = await Axios.get(`/api/v1/book-user`,{
                headers:{
                    Authorization:`${userInfo.token}`
                }
            })
        
            dispatch({
                type:MY_PRODUCTS_SUCCESS,
                payload:data
            })
     
        }catch(error){
            console.log('isi error')
            dispatch({
                type:MY_PRODUCTS_FAIL,
                payload:error
            })
            }
        }

        getMybook();
    },[])
    return (
        <>  
          <div className={userInfo && userInfo.isAdmin ? 'container mt-3' : 'pageBook__Section'}>
                <h1>My Book</h1>
                <div className={myBooks && myBooks.length > 4 ? 'pages-books':  'pages-books justify-content-start'}>
                { isLoading ? <Loader/> : error ? <div>{error}</div> : myBooks.length > 0 ? myBooks.map( book => 
                    book.userId.id == userInfo.id &&<div className={book.status == 'approved' ? 'card':'card pending-status-card'}>
                        <Link to={`/detail/${book.id}`}>
                            <img src={book.cover} className="card-img-top" alt="book"/>
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">{book.author}</p>
                        </div>
                        {book.status === "waiting to be verificated" ? 
                        <div className="waiting-approval">waiting to be verificated.</div>:
                        book.status === "cancelled" ? 
                        <div className="waiting-approval">cancelled.</div>
                        : null
                        }
                    </div>     
                ) : <div>You don't have a book.</div>}
                </div>
           </div>
        </>
    )
}


