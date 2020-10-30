import React,{useContext,useEffect,useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import Axios from 'axios';
import Loader from './Loader';
import {AdminProductContext} from './Provider/AdminDataProvider';
import {LIST_CATEGORY_REQUEST,LIST_CATEGORY_SUCCESS,LIST_CATEGORY_FAIL, REMOVE_CATEGORY_REQUEST, REMOVE_CATEGORY_SUCCESS, REMOVE_CATEGORY_FAIL} from './Provider/constants/Constant';
import {useAuth} from './Provider/authProvider';
function CategoryScreen() {
    const {state:authState} = useAuth();
    const {userInfo} = authState;
    const [state,dispatch] = useContext(AdminProductContext);
    const {loading,error,categories} = state;
    const [show,setShow] = useState(false);


    const openModal = () =>{
        setShow(true);
    }



    const listCategories = async () =>{
        dispatch({
            type:LIST_CATEGORY_REQUEST
        })
    try{

        const {data:{data}} = await Axios.get('/api/v1/category',{
            headers:{
                Authorization:`${userInfo.token}` 
            }
        })
      
        dispatch({
                type:LIST_CATEGORY_SUCCESS,
                payload:data
        })
        console.log('sis data',data)
    }catch(error){
            dispatch({
                type:LIST_CATEGORY_FAIL,
                payload:error.response.data.message
            })
            
        }
    }

    const onDeleted = async (id) =>{
            dispatch({
                type:REMOVE_CATEGORY_REQUEST
            })
        try{    
        const {data:{message}} = await Axios.delete(`api/v1/category/${id}`,{
            headers:{
                Authorization:`${userInfo.token}`
            }
        })
            dispatch({
                type:REMOVE_CATEGORY_SUCCESS,
                payload:message
            })
            if(message){
                listCategories()
            }
        }catch(err){
            dispatch({
                type:REMOVE_CATEGORY_FAIL,
                payload:err.response.data.message
            })
        }
        
    }
    useEffect(() => {
        
    listCategories()
    }, [])
    return (
        <div className="container category-page">
                <h2>List Categories</h2>
                <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {loading ? <Loader></Loader> : error ? <div>{error}</div> : categories ? categories.map(
                            (category,index) => (
                                <tr key={index}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                    <button className="btn btn-primary" onClick={ openModal}>Add</button>{" "}
                                    <AddCategory  show={show} onHide={ () => setShow(false)}/>
                                    <button className="btn btn-danger" onClick={() => onDeleted(category.id)} >Delete</button>
                                    </td>
                                </tr>
                        )) : null}
                        </tbody>
                </table>    
        </div>
    )
}

export default CategoryScreen


function AddCategory(props){
    const [name,setName] = useState('');
    
    
    return(
    <Modal {...props} centered size="md">
        <div className="message_box">
            <Modal.Body>
                <div className="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Name</span>
                    </div> 
                    <input type="text" class="form-control" autoComplete="off" onChange={ (e) => setName(e.target.value)}  aria-label="name" aria-describedby="basic-addon1"/>
                </div>
            </Modal.Body>   
            <Modal.Footer>
                <button className="btn btn-success" onClick={props.onHide}>Save</button>
                {" "}
                <button className="btn btn-danger" onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </div>
    </Modal>     
    )
}