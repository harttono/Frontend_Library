import React from 'react'
import {CgAttachment} from 'react-icons/cg';
import {BiBookAdd} from 'react-icons/bi';

function AddBook() {
    return (
        <div className='add-book__page'>
            <h1>Add Book</h1>
            <form>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Title"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Publication Date"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Category"/>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Pages"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="ISBN"/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <div class="custom-file bg-light">
                        <input type="file" class="custom-file-input"/>
                        <div className="content-file-input"><span> Attach Book File</span><CgAttachment/></div>       
                    </div>
                </div>
            </form>
            <div className="add-book__page-btn">
                <button class='add-book-btn'>
                    <span>Add Book</span><BiBookAdd/>
                </button>
            </div>
        </div>
    )
}

export default AddBook
