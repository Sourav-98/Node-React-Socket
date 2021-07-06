
import "./RegisterLanding.css";

import { useState, useEffect } from 'react';

export default function RegisterLanding(){

    const [userName, setUserName] = useState(undefined);
    const [userEmail, setUserEmail] = useState(undefined);
    const [userPassword, setUserPassword] = useState(undefined);
    const [userPasswordConfirm, setUserPasswordConfirm] = useState(undefined);

    const [registerFormBody, setRegisterFormBody] = useState(undefined);

    function userNameHandler(event){
        setUserName(event.target.value);
    }

    function userEmailHandler(event){
        setUserEmail(event.target.value);
    }

    function userPasswordHandler(event){
        setUserPassword(event.target.value);
    }

    function userPasswordConfirmHandler(event){
        setUserPasswordConfirm(event.target.value);
    }

    async function registerFormSubmit(event){
        // console.log(event);
        event.preventDefault();
        let registerFormData = {
            'fullName' : userName,
            'email' : userEmail, 
            'password': userPassword
        }
        let registerFormBody = await getUrlEncoded(registerFormData);
        fetch('/register-dummy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
            body: registerFormBody
        })
        .then(res =>{
            return res.json();
        })
        .then( result =>{
            console.log(result);
        });
    }

    async function getUrlEncoded(formData){
        let formBody = []
        for(let element in formData){
            let key = encodeURIComponent(element);
            let value = encodeURIComponent(formData[element]);
            formBody.push(key + "=" + value);
        }
        formBody = formBody.join('&');
        return formBody;
    }

    return(
        <div className="register-container">
            <div className="register-box">
                <form onSubmit={registerFormSubmit}>
                    <input className="cm-input" placeholder="Enter Name" onChange={userNameHandler}></input>
                    <br/>
                    <input className="cm-input" placeholder="Enter Email Id" onChange={userEmailHandler}></input>
                    <br/>
                    <input className="cm-input" placeholder="Enter Password" onChange={userPasswordHandler}></input>
                    <br/>
                    <input className="cm-input" placeholder="Re-Enter Password" onChange={userPasswordConfirmHandler}></input>
                    <br/>
                    <br/>
                    <br/>
                    <button name="registerSubmit" type="submit" className="cm-button outlined primary">Register</button>
                </form>
            </div>
        </div>
    )
}