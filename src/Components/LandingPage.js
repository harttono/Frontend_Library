import React from 'react';
import './LandingPage.css'
import SignUp from './SIgn-Up';
import SignIn from './Sign-In';

function LandingPage() {

        return (
            <div className="LandingPage-container">
                <div className='d-flex flex-column justify-content-start banner-text'>
                    <div className='logo'>
                        <img src='/asset/img/logo.svg' alt='logo'/>
                        <h1>Lib'rary</h1>
                    </div>
                    <div className="banner-text-heading">
                        <h1>Your Library</h1>
                        <h1>Anywhere</h1>
                    </div>
                    
                    <div className="banner-text-paragraf">
                        <p>
                        Sign-up today and receive unlimited access to all of your reading - share your book.
                        </p>
                    </div>
                    <div className='banner-button'>
                        <div className='signUp-btn'>
                            <SignUp />
                        </div>
                        <div className='signIn-btn'>
                            <SignIn/>
                        </div>          
                    </div>
                </div>
                <div className='banner-content'>
                    <img src='/asset/img/bgHomed.png' className='banner-bg' alt='bg-banner'/>
                </div>
            </div>           
    )
}

export default LandingPage
