import React,{useContext} from 'react';
import {Link} from 'react-router-dom';


function BookScreen({id,cover,title,author,status}) {

    return (
        <>
            {status == 'approved' &&  
            <div class="card" key={id}>
                <Link to={`/detail/${id}`}>
                    <img src={cover} class="card-img-top" alt="book"/>
                </Link>
                <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{author}</p>
                </div>
            </div>}
        </>
    )
}

export default BookScreen
