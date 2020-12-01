import React,{useContext,useEffect} from 'react';
import Loader from '../../Loader';
import {useAuth} from '../../Provider/authProvider';
import {ProductContext} from '../../Provider/productProvider';
import {Link} from 'react-router-dom';
import {LIST_BOOKMARK_REQUEST,LIST_BOOKMARK_SUCCESS,LIST_BOOKMARK_FAIL} from '../../Provider/constants/Constant';
import {API} from '../../../http';
import {useBookMark} from '../../Provider/bookmarkProvider'; 

function MyLibrary() {
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const {state:BookMark,dispatch} = useBookMark();
    const {Bookmarks,isLoading,error}  = BookMark;
    console.log('isi state',Bookmarks)

    useEffect(() => {
            let unmounted = false;
            const checkBookmarks = async () =>{
                dispatch({
                    type:LIST_BOOKMARK_REQUEST
                })
                try{
                const {data:{data}} = await API.get(`/bookmarks`,{
                    headers:{
                        Authorization:`Bearer ${userInfo.token}`
                    }
                })
                    if(!unmounted){
                        dispatch({
                            type:LIST_BOOKMARK_SUCCESS,
                            payload:data
                        })
                    }
                    console.log('isi data',data)
                }catch(error){
                    if(!unmounted){
                        dispatch({
                            type:LIST_BOOKMARK_FAIL,
                            payload:error.response.data.message
                        })
                    }
                }  
                    
            } 
    checkBookmarks();
    },[])

    return (
         <div className={userInfo && userInfo.isAdmin ? "container pageBook__admin" : "pageBook__Section"}>
             <h1>My Library</h1>
          
             <div className={Bookmarks && Bookmarks.length > 4 ? 'pages-books':  'pages-books justify-content-start'}>
             {isLoading ? <Loader/> : error ? <div>{error}</div> : 
              Bookmarks &&  Bookmarks.map( (book,index) => (
                <div className="card" key={index}>
                <Link to={`/detail/${book.books.id}`}>
                    <img src={book.books.cover} className="card-img-top" alt="book"/>
                </Link>
                <div className="card-body">
                <h5 className="card-title">{book.books.title}</h5>
                <p className="card-text">{book.books.author}</p>
                </div>
            </div>
              ))}
              {Bookmarks.length === 0 && <p>No Book Available</p> }
            </div> 
         </div>
    )
    
}

export default MyLibrary
