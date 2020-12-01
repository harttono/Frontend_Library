import React,{useState,useContext,useEffect} from 'react';
import {BiBookmark} from 'react-icons/bi';
import {IoIosArrowForward} from 'react-icons/io';
import {MdDeleteForever} from 'react-icons/md';
import {useHistory} from 'react-router-dom';
import {API} from '../http';
import {useParams} from 'react-router-dom';
import {DETAIL_PRODUCT_REQUEST,DETAIL_PRODUCT_SUCCESS,DETAIL_PRODUCT_FAIL,
        REMOVE_PRODUCT_REQUEST,REMOVE_PRODUCT_SUCCESS,REMOVE_PRODUCT_FAIL,
        ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAIL,
        ADD_BOOKMARK_REQUEST,ADD_BOOKMARK_SUCCESS,ADD_BOOKMARK_FAIL,
        REMOVE_BOOKMARK_REQUEST,REMOVE_BOOKMARK_SUCCESS,REMOVE_BOOKMARK_FAIL,
        LIST_BOOKMARK_REQUEST,LIST_BOOKMARK_SUCCESS,LIST_BOOKMARK_FAIL
        } from './Provider/constants/Constant';
import {Modal} from 'react-bootstrap';
import {ProductContext} from './Provider/productProvider';
import {useBookMark} from './Provider/bookmarkProvider';
import {useAuth} from './Provider/authProvider';
import Loader from './Loader';

function DetailBook(props) {
    const {id} = useParams();
    const [DeletedModal,ShowDeletedModal] = useState(false);
    const [message,setMessage] = useState('');
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [detailData,setDetailData] = useState({});
    const [categoryId,setCategoryId] = useState('');
    const [state,dispatch] = useContext(ProductContext);
    const {isLoading,error,detailProduct,newBook:messageInfo}  = state;
    const {state:BookMark,dispatch:ACT} = useBookMark();
    const {Bookmarks}  = BookMark;
    const [marked,setMarked] = useState(false);
    console.log('isi collection',marked)
    const closeDeletedModal = () => ShowDeletedModal(false);
    
    const openDeletedModal = () => ShowDeletedModal(true);
    const handleReader = () =>  props.history.push(`/read/${id}`);
    

     //add bookmark
     const addBookmark = async (literatureId) => {
            dispatch({
                type:ADD_BOOKMARK_REQUEST
            })
        try{    
        const {data:{data}} = await API.get(`/bookmark?bookId=${literatureId}`,{
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        })
            dispatch({
                type:ADD_BOOKMARK_SUCCESS,
                payload:data
            })
            if(data){
                props.history.push('/mylibrary')
            }
        }catch(err){
            dispatch({
                type:ADD_BOOKMARK_FAIL,
                payload:err.response.data.message
            })
        }    
    }   

     //remove bookmark
    const removeBookmark = async (bookId) =>{
            dispatch({
                type:REMOVE_BOOKMARK_REQUEST
            })
        try{    
        const {data:{data}} = await API.delete(`/bookmark/${bookId}`,{
            headers:{
                authorization:`Bearer ${userInfo.token}`
            }
        })
            dispatch({
                type:REMOVE_BOOKMARK_SUCCESS,
                payload:data
            })
            if(data){
                props.history.push('/mylibrary')
            }
        }catch(err){
            dispatch({
                type:REMOVE_BOOKMARK_FAIL,
                payload:err.response.data.message
            })
        }    
    }   

    useEffect(() => {
        let unmounted = false;
        const checkBookmarks = async () =>{
                 ACT({
                type:LIST_BOOKMARK_REQUEST
            })
            try{
            const {data:{data}} = await API.get(`/bookmarks`,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            })
                if(!unmounted){
                    ACT({
                        type:LIST_BOOKMARK_SUCCESS,
                        payload:data
                    })
                }
            }catch(error){
                if(!unmounted){
                    ACT({
                        type:LIST_BOOKMARK_FAIL,
                        payload:error.response.data.message
                    })
                }
            }  
                
        } 

        checkBookmarks();

        const listDetailProduct = async () =>{
                    dispatch({
                        type:DETAIL_PRODUCT_REQUEST
                    })
            try{
                const {data:{data}} = await API.get(`/book/${id}`,{
                    headers:{
                        Authorization:`Bearer ${userInfo.token}`
                    }
                })
                    dispatch({
                        type:DETAIL_PRODUCT_SUCCESS,
                        payload:data
                    })


                    if(data){
                        setDetailData(data);
                        setCategoryId(data.categoryId.id);
                    }
                    console.log('isi detail data',data)
            }catch(error){
                    dispatch({
                        type:DETAIL_PRODUCT_FAIL,
                        payload:error.message
                    })
                
            }
        }
      
       listDetailProduct();

       
    if(Bookmarks.length > 0){
        const checkBookMark = Bookmarks.some( mark => mark.books.id == id );
        setMarked(checkBookMark);
    }
   
       
    },[])

    return (
        <React.Fragment>
            {isLoading ? <Loader/> : error ? <div>{error}</div> : detailProduct ? 
                detailProduct.map( book => (
                <div className={userInfo.isAdmin ? 'container mx_7' : 'detailBook'} key={book.id}>
                    <div className="row detail__book-section">
                        <div className="col-5  detail__book-img ">
                            <img src={book.cover}  alt="Detail Book"/>
                        </div>
                        <div className="col-7 pb-4 detail__info-book">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <h1>{book.title}</h1>
                                    <p>{book.author}</p>
                                </li>
                                <li class="list-group-item">
                                    <h3>Publication Date</h3>
                                    <p>{book.publication}</p>
                                </li>
                                <li class="list-group-item">
                                    <h3>Category</h3>
                                <p>{book.categoryId.name}</p>
                                </li>
                                <li class="list-group-item">
                                    <h3>Pages</h3>
                                    <p>{book.pages}</p>
                                </li>
                                <li class="list-group-item">
                                    <h3>ISBN</h3>
                            
                                    <p>{book.ISBN}</p>
                                </li>
                            </ul>    
                        </div>    
                    </div>
                    <div className="desc__info-book">
                        <h1>About Book</h1>
                        <p>{book.description}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        { book.userId.id === userInfo.id ?
                                        <button className='detail-book-addbtn mx-2' onClick={openDeletedModal}>
                                            <span>Delete</span><MdDeleteForever/>
                                        </button>: marked ? 
                                        <button className='detail-book-addbtn mx-2' onClick={() => removeBookmark(book.id)}>
                                                <span>Remove</span><BiBookmark/> 
                                        </button> :
                                        <button className='detail-book-addbtn mx-2' onClick={ () => addBookmark(book.id)}>
                                                <span>Add To Library</span><BiBookmark/>
                                        </button>
                        }
                        <DeletedMessage show={DeletedModal} onHide={closeDeletedModal} message={message}  title={book.title}/>
                        <button onClick={handleReader}  className='detail-book-readbtn mx-2' disabled={book.status !== "approved"} >
                            <span>Read Book</span><IoIosArrowForward/>
                        </button>
                    </div>
                </div>
                ))
            : null}
        </React.Fragment>
            
    )
}

export default DetailBook


function DeletedMessage(props) {
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [state,dispatch] = useContext(ProductContext);
    const history = useHistory();

    const removeBook = async (productId) =>{
        let action = false;
            dispatch({
            type:REMOVE_PRODUCT_REQUEST
        })
    try{
        const {data:{message}} = await API.delete(`/book/${productId}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:REMOVE_PRODUCT_SUCCESS,
            payload:message
        }) 
        if(message){
            action = true;     
        }
    }catch(error){
        dispatch({
            type:REMOVE_PRODUCT_FAIL,
            payload:error
        })
    }   
        if(action){
            history.push('/profile');
        }
    
    }

    return (
      <>
        <Modal show={props.show} onHide={props.onHide} centered>
            <div className="messageBox">
                <div>
                    <p>Are you sure to delete <b>{props.title}</b> ??</p>
                    <div className="d-flex justify-content-center mt-2">
                        <button className="btn btn-danger w-50 mx-2" onClick={props.onHide}>No</button>{" "}
                        <button className="btn btn-success w-50 mx-2" onClick={ () => removeBook(props.bookId)}>Yes</button>
                    </div>
                </div>
            </div>
        </Modal>
      </>
    );
  }