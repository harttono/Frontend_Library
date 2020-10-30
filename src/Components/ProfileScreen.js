import React,{useState,useEffect} from 'react'
import {MdLocalPostOffice} from 'react-icons/md';
import {FaTransgender,FaPhoneAlt,FaMapMarkerAlt} from 'react-icons/fa';
import CartScreen from './CartScreen';
import Loader from './Loader';
import Fileuploader from './FileUploadScreen';
import {useAuth} from './Provider/authProvider';
import { UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './Provider/constants/Constant';
import Axios from 'axios';
import Cookie from 'js-cookie';

function Profile() {
    const {state:authData,dispatch} = useAuth();
    const {isLoading,error,userInfo,info} = authData;
    const [show,setShow] = useState(false);
    const [disable,able] = useState(false);
 
    const [urlProfile,setUrlProfile] = useState('');
   
    let urls = JSON.parse(localStorage.getItem('url')) || [];
    var userId = userInfo.id;
    const updateData = {
        picture:urlProfile
    }
    

    const onUpdated = async (userId) => {
        dispatch({
                type:UPDATE_USER_REQUEST
            })
        try{    
        const {data:{message}} = await Axios.patch(`/api/v1/user/${userId}`,updateData,{
            headers:{
                Authorization:`${userInfo.token}`
            }
        })
            dispatch({
                type:UPDATE_USER_SUCCESS,
                payload:message
            })
        }catch(err){
            dispatch({
                type:UPDATE_USER_FAIL,
                payload:err.response.data.message
            })
        }
    }

    if(urls.length > 0){
        setUrlProfile(urls[0].url);
        localStorage.removeItem('url');
    }

      
    const openModal = () =>{
        setShow(true);
        able(true);
    }
     
    
    useEffect(() => {
        if(info){
            const infoProfile = Cookie.getJSON('userInfo');
            const updateProfile = {...infoProfile,picture:urlProfile}
            Cookie.set('userInfo',JSON.stringify(updateProfile));
            setUrlProfile('');
            window.location.reload();
          }
    }, [])
    return (
        <> 
            { isLoading ? <Loader/> : error ? <div>{error}</div> : userInfo ? 
            (<div className="profile__page-bg">
            <h1>Profile</h1>

            <div className='profile__page_container'>
                <ul class="list-group profile__page_info">
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><MdLocalPostOffice/></span>
                        </div>
                        <div>
                            <h5>{userInfo.email}</h5>
                            <p>Email</p>
                        </div>
                    </li>
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><FaTransgender/></span>
                        </div>
                        <div>
                            <h5>{userInfo.gender}</h5>
                            <p>Gender</p>
                        </div>
                    </li>
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><FaPhoneAlt/></span>
                        </div>
                        <div>
                            <h5>{userInfo.phone}</h5>
                            <p>Mobile Phone</p>
                        </div>
                    </li>
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><FaMapMarkerAlt/></span>
                        </div>
                        <div>
                            <h5>{userInfo.address}</h5>
                            <p>Address</p>
                        </div>
                    </li>  
                </ul>

                <div className=" profile__page_picture">
                    <div class="card card-profile">
                        <img src={userInfo.picture} class="card-img-top" alt="..."/>
                        <div class="card-body">
                           {urlProfile ? <button className="btn btn-success w-100" onClick={ () => onUpdated(userId)}>save</button> :  <button class="btn btn-danger w-100" onClick={openModal}>Change your profile</button>}
                            <Fileuploader show={show} able={disable}closeModal={() => setShow(false)}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>) : null }
            <CartScreen/>
        </>
    )
}

export default Profile
