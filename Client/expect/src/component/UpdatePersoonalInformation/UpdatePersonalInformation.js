import React from 'react'
import './updatePI.scss';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useReducer } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { globalUser } from '../../Context/HomeContext';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const UpdatePersonalInformation = ({PI,setShow}) => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden"; // to disable scrollbar
    const cookie = new Cookies();
    const [showUserName,setShowUserName] = useState(false);
    const [showEmail,setShowEmail] = useState(false);
    const [showPhone,setShowPhone] = useState(false);
    const [showPass,setShowPass] = useState(false);
    const navigate = useNavigate();
    const state = {msg : '',showMsg : false }
    const {userGlob,setUserGlob} = globalUser();
    const ReducerFn = (state,action)=>{
        switch(action.type){
            case 'passwords-Dont-Match' :
                return { msg : "Your New Passswords Do Not match" , showMsg : true };
            case 'hide-Msg' : 
                return {msg : '',showMsg: false};
            case 'Empty-Feild':
                return {msg:action.payload, showMsg :true};
            case 'Server-Msg' :
                return {msg : action.payload , showMsg : true};
        }
    }
    const [stateMsg,dispatch] = useReducer(ReducerFn,state);

    const HandleUpdate = async(e)=>{
        e.preventDefault();
        const userNameDom = document.getElementById('update-userName');
        const emailDom = document.getElementById('update-emial');
        const userPhoneDom = document.getElementById('update-PhoneNumber');
        const oldPassDom = document.getElementById('oldPassword');
        const newPassDom = document.getElementById('newPassword');
        const rePassDom = document.getElementById('re-newPasswprd');
        
        let updatedDetails = {}; // jsut empty object to store any value that the user edit  
        if(showPass){
            if(newPassDom.value !== rePassDom.value)
                return dispatch({type : 'passwords-Dont-Match'});
            if(newPassDom.value.trim() === '' || rePassDom.value.trim() === '' || oldPassDom.value.trim() === '') // to check that is not entering an empty string with spaces
                return dispatch({type : 'Empty-Feild',payload : "Check all Password fields"});
            
            updatedDetails.oldPass = oldPassDom.value;    
            updatedDetails.password = newPassDom.value;
        }
            
        // this is to check that that the userName is rendered in the DOM so if its true i can get its value
        /*  beside That i implmented the value with DOM Not With UseState in order to not to render the dom
            every time the compnent changes 
        */
        if(showUserName){
            if(userNameDom.value.trim() === '')
                return dispatch({type : "Empty-Feild", payload : "Username Field is empty"})
            updatedDetails.userName = userNameDom.value;
        }
        if(showPhone){
            if(userPhoneDom.value.trim() === '')
                return dispatch({type : "Empty-Feild", payload : "Phone Number Field is empty"})
            updatedDetails.phoneNumber = userPhoneDom.value;
        }
        if(showEmail){
            if(emailDom.value.trim() === '')
                return dispatch({type : "Empty-Feild", payload : "Email Field is empty"})
            updatedDetails.email = emailDom.value;
        }
        let token = cookie.get("token");

        try{
            
            const response = await axios.put(`/users/edituser/${userGlob}`,
                {payload : JSON.stringify(updatedDetails)},
                {headers : {
                    token 
                }}
            ); 
            if(response.status === 203) 
                dispatch({type : "Server-Msg", payload : response.data})
            else if(response.status === 204) 
                navigate('/register/signin')
            else if(response.status === 201){
                setUserGlob(response.data.userName); // since it succesfully updated i will change the user Name
                setShow(false)
                cookie.set("token", response.headers.token);
            }
        }catch(err){
            console.log(err);
        }

    }


  return (
    <div className='updatePersonalPopup'>
        <div className="updatePersonal-container">
            <CloseIcon className='close-icon' onClick={()=>setShow(false)}/>
            <div className="header">
                <ManageAccountsIcon  />
                <h1>Update Information</h1>
            </div>
            <h3>Select Which Field To Change</h3>
            <form>
                
                <div className="inputContainer">
                    <span onClick={()=>setShowUserName(true)} 
                          className={`showField }`}>
                            {!showUserName && <>Change User Name <ModeEditIcon/></> }

                    </span>
                    { showUserName &&
                        <>
                            <span className='fieldHeader'>User Name {showUserName && <CloseIcon className='closeIcon' 
                                    onClick = {()=>{setShowUserName(false);dispatch({type : 'hide-Msg'})}}/>}</span>

                            <label htmlFor="update-userName">
                                <input placeholder={PI.userName} type="text" name="userName" id="update-userName" />
                            </label>
                        </>
                    }
                    </div>
                <div className="inputContainer">
                    <span onClick={()=>setShowEmail(true)} 
                          className={`showField }`}>
                            {!showEmail && <> Change Email <ModeEditIcon/></>}
                    </span>
                    {
                        showEmail && 
                        <>
                            <span className='fieldHeader'>Email {showEmail && <CloseIcon className='closeIcon' onClick = {()=>setShowEmail(false)}/>}</span>
                            <label htmlFor="update-emial">
                            <input placeholder = {PI.email} type="emil" name="email" id="update-emial" />
                            </label>
                        </>   
                    }
                </div>
                <div className="inputContainer"> 
                    <span onClick={()=>setShowPhone(true)} 
                          className={`showField}`}>
                            {!showPhone && <>Change Phone Number<ModeEditIcon/></>}</span>
                    { showPhone &&
                        <>
                            <span className='fieldHeader'>Phone Number {showPhone && <CloseIcon className='closeIcon' onClick = {()=>setShowPhone(false)}/>}</span>
                            <label htmlFor="update-PhoneNumber">
                                <input placeholder={PI.phoneNumber} minLength={8} maxLength={8} type="number" name="PhoneNumber" id="update-PhoneNumber" />
                            </label>
                        </>
                    }
                </div>
                <div className="inputContainer"> 
                    <span onClick={()=>setShowPass(true)} 
                          className={`showField }`}>
                            {!showPass && <>Change Password<ModeEditIcon/></>}</span>
                    { showPass &&
                        <>
                            <span className='fieldHeader'>Old Password {showPass && <CloseIcon className='closeIcon' 
                                  onClick = {()=>{setShowPass(false);dispatch({type : 'hide-Msg'})}}/>}</span>
                            <label htmlFor="update-PhoneNumber">
                                <input placeholder= 'Enter Your old Password'  type="password" name="oldPassword" id="oldPassword" />
                            </label>
                            
                            <span className='fieldHeader'>New Password</span>
                            <label htmlFor="newPassword">
                                <input placeholder= 'Enter New Password' type="password" name="password" id="newPassword" />
                            </label>
                            
                            <span className='fieldHeader'>Re-Enter Password</span>
                            <label htmlFor="re-newPasswprd">
                                <input placeholder= 'Re Enter Your Password' type="password" name="password" id="re-newPasswprd" />
                            </label>
                        </>
                    }
                </div>

                { stateMsg.showMsg && 
                    <div className="msg-container">
                            {stateMsg.msg}
                    </div>
                }
                {
                    (showEmail || showPass || showPhone || showUserName ) && // this logic is to let the user update on thing of his choice and he cant update nothing so the button will not apper if he chose nothing 
                    
                    <div className="button-wrapper">
                        <button onClick={HandleUpdate}>Update<CheckCircleIcon/></button>
                    </div>
                }
            </form>
        </div>
    </div>
  )
}

export default UpdatePersonalInformation;