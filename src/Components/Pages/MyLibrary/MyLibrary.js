import React from 'react';
import Books from './Data';

function MyLibrary() {
    return (
        <>
           <h1>My Library</h1>
            <div className='row pages-books'>
            { Books.listBooks.length > 0 ? Books.listBooks.map( book => (
                            <div class="card" key={book.id}>
                            <img src={book.img} class="card-img-top" alt="books"/>
                            <div class="card-body">
                            <h5 class="card-title">{book.title}</h5>
                            <p class="card-text">{book.writer}</p>
                            </div>
                        </div>

                        )) : 
                        <div>No Books</div>
            }
            </div>
        </>
    )
}

export default MyLibrary
