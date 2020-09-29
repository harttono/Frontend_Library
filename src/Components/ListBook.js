import React from 'react'

function ListBook() {
    return (
        <>
            <div className='row pages-books'>
     
                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book1.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book2.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book3.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                    <div class="card" style={{width:'15rem'}}>
                        <img src={'/asset/img/book4.png'} class="card-img-top" alt="books"/>
                        <div class="card-body">
                            <h5 class="card-title">What if ? Absurd Question</h5>
                            <p class="card-text">Randal Munroe.</p>
                        </div>
                    </div>

                </div>
        </>
    )
}

export default ListBook
