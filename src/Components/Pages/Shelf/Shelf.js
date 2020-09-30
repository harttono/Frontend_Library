import React from 'react';
import {Link} from 'react-router-dom';
import {IoIosArrowBack} from 'react-icons/io';
import {Book1,Book2,Book3,Book4} from '../MyLibrary/Data';
import Book from '../../Book';

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
                <div className="row pages-books">
                    <Book {...Book1}/>
                    <Book {...Book2}/>
                    <Book {...Book3}/>
                    <Book {...Book4}/>  
                </div>     
        </>
    )
}

export default Shelf
