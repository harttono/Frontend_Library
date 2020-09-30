import React from 'react';
import {Book5} from './Data';
import Book from '../../Book';

function MyBook() {
    return (
        <div className="pageBook__Section">
            <h1>My Book</h1>
            <div className='row pages-books'>
                <Book {...Book5}/>  
           </div> 
        </div>
    )
}

export default MyBook
