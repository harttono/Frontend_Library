import React,{useEffect,useState,useContext} from 'react';
import {FaCheckCircle} from 'react-icons/fa';
import {IconContext } from 'react-icons/lib';
import {useAuth} from './Provider/authProvider';
import {AdminProductContext} from './Provider/AdminDataProvider';
import {Link} from 'react-router-dom';
import Loader from './Loader';
import {API} from '../http';

import {LIST_PRODUCTS_USER_REQUEST,LIST_PRODUCTS_USER_SUCCESS,LIST_PRODUCTS_USER_FAIL, 
       UPDATE_PRODUCT_USER_REQUEST,UPDATE_PRODUCT_USER_SUCCESS,UPDATE_PRODUCT_USER_FAIL,DELETE_PRODUCT_USER_REQUEST,DELETE_PRODUCT_USER_SUCCESS,DELETE_PRODUCT_USER_FAIL } from './Provider/constants/Constant';


export default function Admin() {
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [state,dispatch] = useContext(AdminProductContext);
    const {loading,error,Products} = state;
    
    // list product Admin
    let listProducts= async () =>{
        dispatch({
            type:LIST_PRODUCTS_USER_REQUEST
        })
    try{
        const {data:{data}} = await API.get(`/list_transaction`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
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
    
    // update data admin
    const onUpdated = async (id,data) =>{
        const updateData = {
            status:data
        }
            dispatch({
                type:UPDATE_PRODUCT_USER_REQUEST
            })
        try{    
        const {data:{message}} = await API.patch(`/list-books/${id}`,updateData,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
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
                payload:err.message
            })
        }
        
    }

     // delete data admin
    const onDeleted = async (id) =>{
            dispatch({
                type:DELETE_PRODUCT_USER_REQUEST
            })
        try{    
        const {data:{message}} = await API.delete(`/book/${id}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
            dispatch({
                type:DELETE_PRODUCT_USER_SUCCESS,
                payload:message
            })
            if(message){
                listProducts()
            }
        }catch(err){
            dispatch({
                type:DELETE_PRODUCT_USER_FAIL,
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
                <table class="table table-striped text-dark">
                    <thead>
                        <tr>
                            <th style={{width:'5%'}}>No</th>
                            <th style={{width:'15%'}}>User Or Author</th>
                            <th style={{width:'10%'}}>ISBN</th>
                            <th style={{width:'30%'}}>E-Book</th>
                            <th style={{width:'15%'}}>Status Payment</th>
                            <th style={{width:'20%'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { loading ? <Loader/> : error ? <p>{error}</p> : Products ? Products.map( (product,index) => (
                        <tr key={index+1}>
                            <th scope="row">{index+1}</th>
                            <td>{product.userId.fullname}</td>
                            <td>{product.ISBN}</td>
                            <Link to={`/detail/${product.id}`}><td>{product.file}</td></Link>
                            <td>{product.status === "approved" ? <p style={{color:"#51B346"}}>{product.status}</p>:
                                 product.status === "waiting to be verificated" ? <p style={{color:"#F7BB00"}}>{product.status}</p> :
                                 product.status === "cancelled" ? <p style={{color:"#F70000"}}>{product.status}</p> : null}
                            </td>
                            <td>{product.status === 'approved' ? <FaCheckCircle/>:
                                 product.status === 'cancelled' ? <button className="btn btn-info" onClick={ () => onDeleted(product.id) }>Delete</button>:
                                 product.status !== "approved" ||  product.status !== "cancelled" || product.status == "waiting to be verificated" ? 
                                <div style={{float:'right'}}>
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
