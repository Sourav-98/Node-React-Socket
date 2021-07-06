
import "./LoginLanding.css"

import { useState, useEffect } from "react";


export default function LoginLanding(){


    const [username, setUsername] = useState(undefined);
    const [userPassword, setUserPassword] = useState(undefined);
    const [csrfToken, setCsrfToken ] = useState(undefined);

    
    function usernameInputHandler(event){
        setUsername(event.target.value);
    }

    function userPasswordInputHandler(event){
        setUserPassword(event.target.value);
    }

    useEffect(()=>{
        fetch('https://localhost:5000/csrf', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include', 
            mode: 'cors'
        })
        .then( res => res.json())
        .then( result =>{
            console.log(result);
            setCsrfToken(result.csrfToken)
        })
        .catch( err =>{
            console.log(err);
        })
    }, [])

    async function loginSubmitHandler(event){
        event.preventDefault();
        let loginData = {
            'username' : username, 
            'password' : userPassword
        };
        let loginFormBody = await getUrlEncoded(loginData);
        fetch('https://localhost:5000/login-dummy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 
                // 'Access-Control-Allow-Origin': '*'
                'xsrf-token' : csrfToken
            },
            credentials: 'include',
            body: loginFormBody
        })
        .then( res => res.json() )
        .then(result => {
            console.log(result);
        })
        .catch( err =>{
            console.log(err);
        })
    }

    async function getUrlEncoded(formData){
        let formBody = [];
        for(let element in formData){
            let key = encodeURIComponent(element);
            let value = encodeURIComponent(formData[element]);
            formBody.push(key + "=" + value);
        }
        formBody = formBody.join('&');
        return formBody;
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={loginSubmitHandler}>
                    <input className="cm-input" placeholder="Username" onChange={usernameInputHandler} />
                    <br/>
                    <input className="cm-input" placeholder="Password" onChange={userPasswordInputHandler}/>
                    <br></br>
                    <button className="cm-button outlined success">Login</button>
                </form>
                
            </div>
        </div>
    )
}