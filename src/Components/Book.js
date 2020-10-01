import React from 'react';
import {Link} from 'react-router-dom';

function Book({img,title,writer}) {
    return (
        <>
            <div class="card">
                <Link to='/detail-book'>
                    <img src={img} class="card-img-top" alt="books"/>
                </Link>
                <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{writer}</p>
                </div>
            </div>

        </>
    )
}

export default Book
