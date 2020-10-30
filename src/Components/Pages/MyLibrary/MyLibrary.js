import React,{useContext,useEffect} from 'react';
import {Shelf} from '../../fakeData/Shelf';
import Axios from 'axios';
import Loader from '../../Loader';
import BookScreen from '../../BookScreen';
import {useAuth} from '../../Provider/authProvider';
import {ProductContext} from '../../Provider/productProvider';
import {LIST_MYPRODUCTS_REQUEST,LIST_MYPRODUCTS_SUCCESS,LIST_MYPRODUCTS_FAIL} from '../../Provider/constants/Constant';

import API from '../../../http-common';

function MyLibrary() {
    const {state:authData} = useAuth();
    const {userInfo} = authData;

    const [state,dispatch] = useContext(ProductContext);
    const {isLoading,error,myLibrary}  = state;

    useEffect(() => {
        let source = Axios.CancelToken.source();
        const listMyproducts = async () =>{
                dispatch({
                    type:LIST_MYPRODUCTS_REQUEST
                })
            try{
                const {data:{data}} = await API.get(`/list-mylibrary`,{
                    headers:{
                        Authorization:`${userInfo.token}`
                    }
                },{cancelToken:source.token})
                    dispatch({
                        type:LIST_MYPRODUCTS_SUCCESS,
                        payload:data
                    })
            }catch(error){
                console.log('isi error')
                    dispatch({
                        type:LIST_MYPRODUCTS_FAIL,
                        payload:error.response.data.message
                    })
                
            }
        }
       listMyproducts();
       return () =>{
            source.cancel();
       }
    },[])

    return (
         <div className="pageBook__Section">
             <h1>My Library</h1>
          
             <div className={myLibrary && myLibrary.length > 4 ? 'pages-books':  'pages-books justify-content-start'}>
             {isLoading ? <Loader/> : error ? <div>{error}</div> : 
              myLibrary ?  myLibrary.map( book => ( <BookScreen key={book.id} {...book}/>) ) : "No Book Available" }
            </div> 
         </div>
    )
    
}

export default MyLibrary
