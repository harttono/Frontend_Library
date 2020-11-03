import React,{useState,useEffect,useRef} from 'react';
import {useAuth} from '../../Provider/authProvider';
import './LandingPage.css';
import Brand from '../../BrandScreen';
import SignIn from '../../SignInScreen';
import SignUp from '../../SIgnUpScreen';

function LandingPage(props) {
    const {state} = useAuth();
    const {userInfo,isLogin} = state;
    const[signIn,setSignIn]=useState(false);
    const[signUp,setSignUp]=useState(false);

    const openSignUpModal = (e) => {
        e.preventDefault();
        setSignIn(true);
        setSignUp(false);
    }
    const openSignInModal = (e) =>{
        e.preventDefault();
        setSignUp(true);
        setSignIn(false);
    }
    useEffect(() => {
            if(isLogin && !userInfo.isAdmin){
                props.history.push('/home')
            }else if(isLogin && userInfo.isAdmin){
                props.history.push('/admin')
            }
      },[userInfo])
    return (

        <div className="LandingPage-container">
            <div className='d-flex flex-column justify-content-start banner-text'>
                <div className="brand-wrapper">
                    <Brand/>
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
                    <div className="signUp-btn">
                        <SignUp showModal={() => setSignUp(true)} 
                        showSignUp={signUp} closeModal={()=>setSignUp(false)} 
                        openSignUpModal={openSignUpModal}/>
                    </div>
                    <div className='signIn-btn'>
                        <SignIn showModal={() => setSignIn(true)} 
                        showSignIn={signIn} 
                        closeModal={() => setSignIn(false)} 
                        openSignInModal={openSignInModal}/> 
                    </div>
                </div>
            </div>
                <div className='banner-content'>
                    <img src='/asset/img/bgHome.png' className='banner-bg' alt='bg-banner'/>
                </div>
        </div>    
       
    )
}

export default LandingPage
