import React,{useEffect,useContext,useState} from 'react';
import BookScreen from './BookScreen';
import Loader from './Loader';
import Axios from 'axios';
import {ProductContext} from './Provider/productProvider';
import {useAuth} from './Provider/authProvider';

import {Dropdown,ButtonGroup,DropdownButton} from 'react-bootstrap';
import {LIST_PRODUCTS_REQUEST,LIST_PRODUCTS_SUCCESS,LIST_PRODUCTS_FAIL,LIST_CATEGORY_REQUEST,LIST_CATEGORY_SUCCESS,LIST_CATEGORY_FAIL, GET_PRODUCTS_BY_CATEGORY_REQUEST, GET_PRODUCTS_BY_CATEGORY_SUCCESS, GET_PRODUCTS_BY_CATEGORY_FAIL} from './Provider/constants/Constant';


function BookListScreen(props) {
        const [state,dispatch] = useContext(ProductContext);
        const {state:authState} = useAuth();
        const {userInfo} = authState;
        const [books,setBooks] = useState([]);
        const [listOfCategory,setListOfCategory] = useState([]);
        const {isLoading,error,products,listCategory,categories} = state;
        
        let handleSelect = (key) =>{
            if(key == 0){
                listProducts();
            }else{
                getListCategories(key)
            }
        }

        const params = {
            status:'approved'
        }

        const listProducts = async () =>{
            dispatch({
                type:LIST_PRODUCTS_REQUEST
            })
        try{

            const {data:{data}} = await Axios.get('/api/v1/list-books',{
                params:params,
                headers:{
                    Authorization:`${userInfo.token}` 
                }
            })
          
            dispatch({
                    type:LIST_PRODUCTS_SUCCESS,
                    payload:data
            })
                setBooks(data);
        }catch(error){
                dispatch({
                    type:LIST_PRODUCTS_FAIL,
                    payload:error.response.data.message
                })
                
            }
        }


        const getListCategories= async (categoryId) =>{
            dispatch({
                type:GET_PRODUCTS_BY_CATEGORY_REQUEST
            })
        try{
            const {data:{data}} = await Axios.get(`/api/v1/list-books?categoryId=${categoryId}`,{
                headers:{
                    Authorization:`${userInfo.token}`
                }
            })
            dispatch({
                type:GET_PRODUCTS_BY_CATEGORY_SUCCESS,
                payload:data
            })
            setBooks(data)
        }catch(error){
            dispatch({
                type:GET_PRODUCTS_BY_CATEGORY_FAIL,
                payload:error
            })
            }
        }

        const bookList = books.filter( (book,index,self) => index === self.findIndex( (t) => (t.file === book.file && t.publication === book.publication)))

        useEffect( () => {
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
                setListOfCategory(data);
            
            }catch(error){
                dispatch({
                    type:LIST_CATEGORY_FAIL,
                    payload:error
                })
                }
            }
            listProducts();
            getListCategory();
        }, [])

        console.log('data',books)
        return (
            <>
                <div className='pages__cover'>
                    <div className='pages-cover-text'>
                        <h1>Share,Read</h1>
                        <h1>and <span>Love</span></h1>
                        <p>Reading is fascinating</p>
                    </div>
                    <div className='pages-cover-content'>
                        <img src='/asset/img/coverBook.png' alt='cover book'/>
                    </div>
                </div>
                <div className='pages-cover-nav'>
                    <h1>List Book</h1>
                    <DropdownButton
                        key="left"
                        id="dropdown-button-drop-left"
                        drop="left"
                        variant="light"
                        title="Sort Category"
                        style={{ float: "right", width: "15%" }}
                        onSelect={handleSelect}
                        >  
                    <Dropdown.Item eventKey="0">Show All</Dropdown.Item>
                    {!isLoading && listOfCategory ? listOfCategory.map( category => (
                    <Dropdown.Item eventKey={category.id}>{category.name}</Dropdown.Item>)) : null}
                    </DropdownButton>
                 </div>
              
                <div className={bookList && bookList.length > 3 ? 'pages-books':  'pages-books justify-content-start'}>
                { isLoading ? <Loader/> : error ? <div>{error}</div> :
                    bookList.length > 0 ? bookList.map( book => (
                       <BookScreen key={book.id} {...book} />
                 )) : <div className="text-center alert alert-warning w-100">No Book Available.</div>} 
                </div>    
            </>
        )
    }

export default BookListScreen;
