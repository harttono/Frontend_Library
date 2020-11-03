import React,{useContext,useEffect} from 'react';
import Loader from '../../Loader';
import {useAuth} from '../../Provider/authProvider';
import {ProductContext} from '../../Provider/productProvider';
import {Link} from 'react-router-dom';
import {LIST_MYPRODUCTS_REQUEST,LIST_MYPRODUCTS_SUCCESS,LIST_MYPRODUCTS_FAIL} from '../../Provider/constants/Constant';
import Axios from 'axios';

function MyLibrary() {
    const {state:authData} = useAuth();
    const {userInfo} = authData;

    const [state,dispatch] = useContext(ProductContext);
    const {isLoading,error,myLibrary}  = state;
    console.log('isi state',myLibrary)

    useEffect(() => {
        const listMyproducts = async () =>{
                dispatch({
                    type:LIST_MYPRODUCTS_REQUEST
                })
            try{
                const {data:{data}} = await Axios.get(`/api/v1/list-mylibrary`,{
                    headers:{
                        Authorization:`${userInfo.token}`
                    }
                })
                    dispatch({
                        type:LIST_MYPRODUCTS_SUCCESS,
                        payload:data
                    })
            }catch(error){
                    dispatch({
                        type:LIST_MYPRODUCTS_FAIL,
                        payload:error.response.data.message
                    })
                
            }
        }
       listMyproducts();

    },[])

    return (
         <div className={userInfo && userInfo.isAdmin ? "container pageBook__admin" : "pageBook__Section"}>
             <h1>My Library</h1>
          
             <div className={myLibrary && myLibrary.length > 4 ? 'pages-books':  'pages-books justify-content-start'}>
             {isLoading ? <Loader/> : error ? <div>{error}</div> : 
              myLibrary ?  myLibrary.map( book => (
                <div className="card" key={book.id}>
                <Link to={`/detail/${book.id}`}>
                    <img src={book.cover} className="card-img-top" alt="book"/>
                </Link>
                <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                </div>
            </div>
              )): "No Book Available" }
            </div> 
         </div>
    )
    
}

export default MyLibrary
