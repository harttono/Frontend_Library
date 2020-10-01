import React from 'react';
import './Admin.css';
import {FaCheckCircle} from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

export default function Admin() {
    return (
        <IconContext.Provider value={{color:'#3BB54A',size:'30px'}}>
        <div className="admin-section">
            <div className="container">
                <h2>Book Verification</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">User Or Author</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">E-Book</th>
                            <th scope="col">Status Payment</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Rachel Hartman</td>
                            <td>124243434542</td>
                            <td>Glyph.pdf</td>
                            <td style={{color:'#3BB54A'}}>Approved</td>
                            <td><FaCheckCircle/></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Rachel Hartman</td>
                            <td>124243434542</td>
                            <td>Glyph.pdf</td>
                            <td style={{color:'#3BB54A'}}>Approved</td>
                            <td><FaCheckCircle/></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Rachel Hartman</td>
                            <td>124243434542</td>
                            <td>Glyph.pdf</td>
                            <td style={{color:'#ff0000'}}>Canceled</td>
                            <td>
                                <button className="btn btn-danger mr-2">Cancel</button>
                                <button className="btn btn-success">Approved</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Rachel Hartman</td>
                            <td>124243434542</td>
                            <td>Glyph.pdf</td>
                            <td style={{color:'#EE4622'}}>Waiting to be verified</td>
                            <td>
                                <button className="btn btn-danger mr-2">Cancel</button>
                                <button className="btn btn-success">Approved</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Rachel Hartman</td>
                            <td>124243434542</td>
                            <td>Glyph.pdf</td>
                            <td style={{color:'#EE4622'}}>Waiting to be verified</td>
                            <td>
                                <button className="btn btn-danger mr-2">Cancel</button>
                                <button className="btn btn-success">Approved</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>Rachel Hartman</td>
                            <td>124243434542</td>
                            <td>Glyph.pdf</td>
                            <td style={{color:'#EE4622'}}>Waiting to be verified</td>
                            <td>
                                <button className="btn btn-danger mr-2">Cancel</button>
                                <button className="btn btn-success">Approved</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>

        </IconContext.Provider>
    )
}
