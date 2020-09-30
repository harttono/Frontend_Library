import React from 'react';
import MyLibrary from '../MyLibrary/MyLibrary';
import {Link} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';

function Shelf() {
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
                    <Link to='/jk' className='btn btn-light pages__cover-nav'>
                        <IoIosArrowBack/> Category
                    </Link>       
                </div>
                <MyLibrary/>
            
        </>
    )
}

export default Shelf
