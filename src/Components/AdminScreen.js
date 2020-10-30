import React,{useEffect,useState,useContext} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {IconContext } from 'react-icons/lib';
import {FcCancel } from 'react-icons/fc';
import {useAuth} from './Provider/authProvider';
import {AdminProductContext} from './Provider/AdminDataProvider';
import Axios from 'axios';
import Loader from './Loader';
import {LIST_PRODUCTS_USER_REQUEST,LIST_PRODUCTS_USER_SUCCESS,LIST_PRODUCTS_USER_FAIL, 
       UPDATE_PRODUCT_USER_REQUEST,UPDATE_PRODUCT_USER_SUCCESS,UPDATE_PRODUCT_USER_FAIL } from './Provider/constants/Constant';


export default function Admin() {
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [dataId,setDataId] = useState(null);
    const [state,dispatch] = useContext(AdminProductContext);
    const {loading,error,updatedProduct,Products} = state;
    const [products,setProducts] = useState([]);
    
    let listProducts= async () =>{
        dispatch({
            type:LIST_PRODUCTS_USER_REQUEST
        })
    try{
        const {data:{data}} = await Axios.get(`/api/v1/list_transaction`,{
            headers:{
                Authorization:`${userInfo.token}`
            }
        })
        dispatch({
            type:LIST_PRODUCTS_USER_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:LIST_PRODUCTS_USER_FAIL,
            payload:error
        })
        }
    }

    const onUpdated = async (id,data) =>{
        const updateData = {
            status:data
        }
            dispatch({
                type:UPDATE_PRODUCT_USER_REQUEST
            })
        try{    
        const {data:{message}} = await Axios.patch(`api/v1/list-books/${id}`,updateData,{
            headers:{
                Authorization:`${userInfo.token}`
            }
        })
            dispatch({
                type:UPDATE_PRODUCT_USER_SUCCESS,
                payload:message
            })
            if(message){
                listProducts()
            }
        }catch(err){
            dispatch({
                type:UPDATE_PRODUCT_USER_FAIL,
                payload:err.response.data.message
            })
        }
        
    }
 
    useEffect( () => {
        
    listProducts();
    },[])
 
 
    return (
        <IconContext.Provider value={{color:'#3BB54A',size:'30px'}}>
            <div className="container  admin-section">
                <h2>Book Verification</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">User Or Author</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">E-Book</th>
                            <th scope="col">Status Payment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { loading ? <Loader/> : error ? <p>{error}</p> : Products ? Products.map( product => (
                        <tr key={product.id}>
                            <th scope="row">{product.id}</th>
                            <td>{product.userId.fullname}</td>
                            <td>{product.ISBN}</td>
                            <td>{product.file}</td>
                            <td>{product.status === "approved" ? <p style={{color:"#51B346"}}>{product.status}</p>:
                                 product.status === "waiting to be verificated" ? <p style={{color:"#F7BB00"}}>{product.status}</p> :
                                 product.status === "cancelled" ? <p style={{color:"#F70000"}}>{product.status}</p> : null}
                            </td>
                            <td>{product.status === 'approved' ? <FaCheckCircle/>:
                                 product.status === 'cancelled' ? <FcCancel/>:
                                 product.status !== "approved" ||  product.status !== "cancelled" || product.status == "waiting to be verificated" ? 
                                <div>
                                    <button className="btn btn-danger"  onClick={ () => onUpdated(product.id,'cancelled')}>cancelled</button>{" "}
                                    <button className="btn btn-success" onClick={ () => onUpdated(product.id,'approved')}>verificated</button>
                                </div>
                                :null }
                            </td>
                        </tr>
                    )):null }
                    </tbody>
                </table>    
            </div>   
        </IconContext.Provider>
    )
}
