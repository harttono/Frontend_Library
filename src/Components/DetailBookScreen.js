import React,{useState,useContext,useEffect} from 'react';
import {BiBookmark} from 'react-icons/bi';
import {IoIosArrowForward} from 'react-icons/io';
import {MdDeleteForever} from 'react-icons/md';
import {useHistory} from 'react-router-dom';
import API from '../http-common';
import {Link,useParams} from 'react-router-dom';
import {DETAIL_PRODUCT_REQUEST,DETAIL_PRODUCT_SUCCESS,DETAIL_PRODUCT_FAIL,
        REMOVE_PRODUCT_REQUEST,REMOVE_PRODUCT_SUCCESS,REMOVE_PRODUCT_FAIL,
        ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAIL} from './Provider/constants/Constant';
import {Modal} from 'react-bootstrap';
import {ProductContext} from './Provider/productProvider';
import {useAuth} from './Provider/authProvider';
import Loader from './Loader';
function DetailBook(props) {
    const {id} = useParams();
    const [DeletedModal,ShowDeletedModal] = useState(false);
    const [bookMarkModal,ShowbookMarkModal] = useState(false);
    const [message,setMessage] = useState('');
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [detailData,setDetailData] = useState('');
    const [categoryId,setCategoryId] = useState('');
    const [state,dispatch] = useContext(ProductContext);
    const {isLoading,error,detailProduct,newBook:messageInfo}  = state;
    const closeDeletedModal = () =>{
        ShowDeletedModal(false);
    }

    const openDeletedModal = () =>{
        ShowDeletedModal(true);
    }
    const closeBookmarkModal = () =>{
        ShowbookMarkModal(false);
    }

    const openBookmarkModal = () =>{
        ShowbookMarkModal(true);
    }
    
    const handleReader = () =>{
        props.history.push(`/read/${id}`);
    }

    const BookData = {
        title:detailData.title,
        author:detailData.author,
        publication:detailData.publication,
        category:{
            id:categoryId
        },
        pages:detailData.pages,
        ISBN:detailData.ISBN,
        file:detailData.file,
        cover:detailData.cover,
        status:detailData.status,
        description:detailData.description
    }

    useEffect(() => {
        const listDetailProduct = async () =>{
                    dispatch({
                        type:DETAIL_PRODUCT_REQUEST
                    })
            try{
                const {data:{data}} = await API.get(`/book/${id}`,{
                    headers:{
                        Authorization:`${userInfo.token}`
                    }
                })
                    dispatch({
                        type:DETAIL_PRODUCT_SUCCESS,
                        payload:data
                    })
                    setDetailData(data);
                    setCategoryId(data.categoryId.id);
            }catch(error){
                    dispatch({
                        type:DETAIL_PRODUCT_FAIL,
                        payload:error.response.data.message
                    })
                
            }
        }
      
       listDetailProduct();
       
    }, [])

    return (
        <React.Fragment>
            {isLoading ? <Loader/> : error ? <div>{error}</div> : detailProduct ? 
                detailProduct.map( book => (
                <div className="detailBook" key={book.id}>
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
                        {book.userId.id != userInfo.id ? 
                            <button class='detail-book-addbtn mx-2' disabled={book.status !== "approved"} onClick={openBookmarkModal}>
                            <span>Add to library</span><BiBookmark/>
                            </button>:
                            <button class='detail-book-addbtn mx-2'  onClick={openDeletedModal}>
                                <span>Delete </span><MdDeleteForever/>
                            </button>
                        }
                        <DeletedMessage show={DeletedModal} onHide={closeDeletedModal} message={message}  bookId={id}/>
                        <BookMarkMessage show={bookMarkModal} onHide = {closeBookmarkModal} info={messageInfo} data={BookData}/>
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

function BookMarkMessage(props){
    const {state:authData} = useAuth();
    const {userInfo} = authData;
    const [state,dispatch] = useContext(ProductContext);
    const history = useHistory();

    const saved = async () =>{
        let action = false;
            dispatch({
                type:ADD_PRODUCT_REQUEST
            })
        try{    
        const {data:{message:result}} = await API.post('/book',props.data,{
            headers:{
                Authorization:`${userInfo.token}`
            }
        })
            dispatch({
                type:ADD_PRODUCT_SUCCESS,
                payload:result
            })
            if(result){
                action = true;  
            }
        }catch(err){
            dispatch({
                type:ADD_PRODUCT_FAIL,
                payload:err.response.data.message
            })
        }    

        if(action){
            history.push('/');
        }
       
    }

    return(
            <Modal  show={props.show} onHide={props.onHide}>
                    <Modal.Body>
                    <div className="cek">
                        <div className="px-2 text-center">{`add book with title " ${props.data.title}" in your library ??`}</div>
                        <div className="d-flex justify-content-center mt-2">
                            <button className="btn btn-danger w-50 mx-2" onClick={props.onHide}>No</button>{" "}
                            <button className="btn btn-success w-50 mx-2" onClick={saved}>Yes</button>
                        </div>
                    </div>
                    </Modal.Body>   
            </Modal>
    )
}

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
                Authorization:`${userInfo.token}`
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
            history.push('/');
        }
    
    }

    return (
      <>
        <Modal show={props.show} onHide={props.onHide}>
            <div className="messageBox">
                <div>
                    <p>{`Are you sure to delete your book with id: ${props.bookId} ??`}</p>
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