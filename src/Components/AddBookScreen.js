import React,{useEffect,useContext,useState} from 'react';
import {Modal} from 'react-bootstrap';
import {CgAttachment} from 'react-icons/cg';
import {BiBookAdd} from 'react-icons/bi';
import {LIST_CATEGORY_REQUEST,LIST_CATEGORY_SUCCESS,LIST_CATEGORY_FAIL,ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAIL} from './Provider/constants/Constant';
import {useAuth} from './Provider/authProvider';
import Axios from 'axios';
import {ProductContext} from './Provider/productProvider';
import Fileuploader from './FileUploadScreen';


function AddBook(props) {
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [show,setShow] = useState(false);
    const [showMessage,setShowMessage] = useState(false);
    const [categoryId,setCategoryId] = useState(1);
    const [state,dispatch] = useContext(ProductContext);
    const {isLoading,error,listCategory,newBook:message}  = state;
    const [urlFiles,setUrlFiles] = useState([]);
    const [status,setStatus] = useState('');

    const [formData,setFormData] = useState({
        title:'',
        author:'',
        publication:'',
        pages:'',
        ISBN:'',
        description:''
    })
    
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }


    const openModal = () =>  setShow(true);

    const closeModal = () => setShow(false);

    const closeMessage = () =>{
        setShowMessage(false);
        props.history.push('/profile');
    }

    const BookData = {
        title:formData.title,
        author:formData.author,
        publication:parseInt(formData.publication),
        category:{
            id:categoryId
        },
        pages:parseInt(formData.pages),
        ISBN:parseInt(formData.ISBN),
        cover:urlFiles[0],
        file:urlFiles[1],
        status:status,
        description:formData.description
    }
   

    const onSaved = async (e) =>{
        e.preventDefault();
            dispatch({
                type:ADD_PRODUCT_REQUEST
            })
        try{    
        const {data:{message}} = await Axios.post('/api/v1/book',BookData,{
            headers:{
                Authorization:`${userInfo.token}`
            }
        })
            dispatch({
                type:ADD_PRODUCT_SUCCESS,
                payload:message
            })
        }catch(err){
            dispatch({
                type:ADD_PRODUCT_FAIL,
                payload:err.response.data.message
            })
        }
        
       if(userInfo.isAdmin){
           props.history.push('/profile')
       }else{
            setShowMessage(true);
       }
    }

    // get urls
    const getUrls = (urls) =>{
        setUrlFiles([...urlFiles,urls])
    }
   

    useEffect(() => {
    const getListCategory= async () =>{
            dispatch({
                type:LIST_CATEGORY_REQUEST
            })
        try{
            const {data:{data}} = await Axios.get(`/api/v1/category`,{
                headers:{
                    Authorization:`${userInfo.token}`
                }
            })
            dispatch({
                type:LIST_CATEGORY_SUCCESS,
                payload:data
            })
        }catch(error){
            dispatch({
                type:LIST_CATEGORY_FAIL,
                payload:error
            })
        }
    }
   getListCategory();

   if(userInfo){
        if (userInfo.isAdmin){
            setStatus('approved')
        }else{
            setStatus('waiting to be verificated')
        }           
    }
   return () =>{

   }
   },[])

    return (
        <div className={userInfo && userInfo.isAdmin ? 'container pageBook__admin' : 'add-book__page'}>
            <h1>Add Book</h1>
            <form>
                <div className="form-group">
                    <input type="text" name="title" autoComplete="off" className="form-control bg-light" placeholder="Title" onChange={ (e) => handleChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" name="author" autoComplete="off" className="form-control bg-light" placeholder="Author" onChange={ (e) => handleChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" name="publication"   autoComplete="off" className="form-control bg-light" placeholder="Publication Date"  onChange={ (e) => handleChange(e)}/>
                </div>
                <div className="form-group">
                        <select className=" w-100  p-2 select-category"  onChange={ (e) => setCategoryId(e.target.value)}>
                            <option value='choose'>Choose a category book</option>
                            {!error && listCategory ? listCategory.map( category => 
                                <option value={category.id} key={category.id} >{category.name}</option>
                            ) : null}
                        </select>
                </div>
                <div className="form-group">
                    <input type="number" name="pages" className="form-control bg-light" placeholder="Pages" onChange={ (e) => handleChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" name="ISBN" autoComplete="off" className="form-control bg-light" placeholder="ISBN" onChange={ (e) => handleChange(e)}/>
                </div>
                <div className="form-group">
                    <textarea placeholder='description a book' name='description' className="form-control bg-light" rows="5" onChange={ (e) => handleChange(e)}></textarea>
                </div>
                <div className="form-group">
                    <button type="button" className="upload-btn" onClick={openModal} >
                      <span> Attach Book File</span><CgAttachment/>       
                    </button>
                    <Fileuploader show={show}  closeModal={closeModal} getUrls = {getUrls}/>
                </div>
            </form>
            <div className="add-book__page-btn">
                <button class='add-book-btn' onClick={(e) => onSaved(e)} disabled={urlFiles == 0}>
                    <span>Add Book</span><BiBookAdd/>
                </button>
                <Message show={showMessage} hide ={closeMessage} data={message}/>
            </div>
        </div>
    )
}

export default AddBook

function Message(props){
    return(
    <Modal show={props.show} onHide={props.hide} centered size="lg">
        <div className="message_box">
            <Modal.Body>
                <div className="text-center">
                    Thank you for adding your own books to our website
                </div>
                <div className="text-center">
                     please wait 1 x 24 hours to verify whether this book is your writing
                </div>
            </Modal.Body>   
        </div>
    </Modal>     
    )
}