import React from 'react';
import {BiBookmark} from 'react-icons/bi';
import {IoIosArrowForward} from 'react-icons/io';

function DetailBook() {
    return (
        <div className="detailBook">
            <div className="row detail__book-section">
                <div className="col-5 pb-4">
                    <img src="/asset/books/book1.png" class="w-100" alt="Detail Book"/>
                </div>
                <div className="col-7 pb-4 detail__info-book">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <h1>Tess on the road</h1>
                            <p>Rachel Hartman</p>
                        </li>
                        <li class="list-group-item">
                            <h3>Publication Date</h3>
                            <p>24-08-2020</p>
                        </li>
                        <li class="list-group-item">
                            <h3>Category</h3>
                            <p>Sci-Fi</p>
                        </li>
                        <li class="list-group-item">
                            <h3>Pages</h3>
                            <p>436</p>
                        </li>
                        <li class="list-group-item">
                            <h3>ISBN</h3>
                            <p>787874984947803</p>
                        </li>
                    </ul>    
                </div>    
            </div>
            <div className="desc__info-book">
                <h1>About This Book</h1>
                <p>
                In the medieval kingdom of Goredd, women are expected to be ladies, men are their protectors, and dragons get to be whomever they want. Tess, stubbornly, is a troublemaker. You can’t make a scene at your sister’s wedding and break a relative’s nose with one punch (no matter how pompous he is) and not suffer the consequences. As her family plans to send her to a nunnery, Tess yanks on her boots and sets out on a journey across the Southlands, alone and pretending to be a boy.</p>

                <p>Where Tess is headed is a mystery, even to her. So when she runs into an old friend, it’s a stroke of luck. This friend is a quigutl—a subspecies of dragon—who gives her both a purpose and protection on the road. But Tess is guarding a troubling secret. Her tumultuous past is a heavy burden to carry, and the memories she’s tried to forget threaten to expose her to the world in more ways than one.</p>

                <p>Returning to the fascinating world she created in the award-winning and New York Times bestselling Seraphina, Rachel Hartman introduces readers to a new character and a new quest, pushing the boundaries of genre once again in this wholly original fantasy
                </p>
            </div>
            <div className="d-flex justify-content-end">
                <button class='detail-book-addbtn mx-2'>
                    <span>Add Library</span><BiBookmark/>
                </button>
                <button class='detail-book-readbtn mx-2'>
                    <span>Read Book</span><IoIosArrowForward/>
                </button>
            </div>
        </div>
    )
}

export default DetailBook
