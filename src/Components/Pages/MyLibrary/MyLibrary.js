import React from 'react';
import {Book1,Book2,Book3,Book4} from './Data';
import Book from '../../Book';

function MyLibrary() {
    return (
         <div className="pageBook__Section">
             <h1>My Library</h1>
             <div className='row pages-books'>
                <Book {...Book1}/>
                <Book {...Book2}/>
                <Book {...Book3}/>
                <Book {...Book4}/>
            </div> 
         </div>
    )
}

export default MyLibrary
