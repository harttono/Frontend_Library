import React,{useContext,useEffect} from "react";
import Loader from './Loader';
import {ReactReader} from "react-reader";
import {DETAIL_PRODUCT_REQUEST,DETAIL_PRODUCT_SUCCESS,DETAIL_PRODUCT_FAIL} from './Provider/constants/Constant';
import {ProductContext} from './Provider/productProvider';
import {useAuth} from './Provider/authProvider';
import {API} from '../http';

function BookViewer(props){
  const [state,dispatch] = useContext(ProductContext);
  const {isLoading,error,detailProduct}  = state;
  const {id} = props.match.params;
  const {state:authData} = useAuth();
  const {userInfo} = authData;
  

  useEffect(() => {
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
      <>
          <div className={userInfo.isAdmin && 'mx_7'} style={{ position: "relative", height: "100vh"}}>
          {" "}

          {isLoading ? <Loader/> : error ? <div>{error}</div> : detailProduct ? 
             detailProduct.map( book => (
            <ReactReader
              url={book.file}
              showToc={false}
              title={book.title}
              style={{color:'#121212'}}
              location={"epubcfi(/6/2[cover]!/6)"}
              locationChanged={epubcifi => console.log(epubcifi)}
            />
            ))
            : null}
        </div>
      </>
    );
}
export default BookViewer


