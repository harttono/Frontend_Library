import React from 'react'

function Book({img,title,writer}) {
    return (
        <>
            {/* <div className='row pages-books'> */}
                 <div class="card">
                    <img src={img} class="card-img-top" alt="books"/>
                    <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{writer}</p>
                    </div>
                </div>
            {/* </div>  */}
        </>
    )
}

export default Book
