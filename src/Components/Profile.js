import React from 'react'
import {MdLocalPostOffice} from 'react-icons/md';
import {FaTransgender,FaPhoneAlt,FaMapMarkerAlt} from 'react-icons/fa';
import MyBook from '../Components/Pages/MyBook/MyBook';


function Profile() {
    return (
        <>
            <div className='profile__page_container'>
                <ul class="list-group profile__page_info">
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><MdLocalPostOffice/></span>
                        </div>
                        <div>
                            <h5>Harttonz@gmail.com</h5>
                            <p>Email</p>
                        </div>
                    </li>
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><FaTransgender/></span>
                        </div>
                        <div>
                            <h5>Male</h5>
                            <p>Gender</p>
                        </div>
                    </li>
                    <li class="list-group-item flex-profile-info">
                        <div className="profile__icon_info">
                            <span><FaPhoneAlt/></span>
                        </div>
                        <div>
                            <h5>08988678832</h5>
                            <p>Mobile Phone</p>
                        </div>
                    </li>
                    <li class="list-group-item flex-profile-info">
                         <div className="profile__icon_info">
                            <span><FaMapMarkerAlt/></span>
                        </div>
                        <div>
                            <h5>Perumahan Permata Bintaro Residence C-3</h5>
                            <p>Address</p>
                        </div>
                    </li>  
                </ul>
                <div className=" profile__page_picture">
                    <div class="card card-profile">
                        <img src="/asset/img/mediumPicture.png" class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <a href="#" class="btn btn-danger ">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            <MyBook/>
        </>
    )
}

export default Profile
