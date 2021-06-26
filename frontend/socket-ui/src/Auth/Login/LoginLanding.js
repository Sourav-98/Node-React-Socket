
import "./LoginLanding.css"

import { useState } from "react";


export default function LoginLanding(){


    const [username, setUsername] = useState(undefined);
    const [userPassword, setUserPassword] = useState(undefined);

    
    function usernameInputHandler(event){
        setUsername(event.target.value);
    }

    function userPasswordInputHandler(event){
        setUserPassword(event.target.value);
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <input className="cm-input" placeholder="Username" onChange={usernameInputHandler} />
                <br/>
                <input className="cm-input" placeholder="Password" onChange={userPasswordInputHandler}/>
                <br></br>
                <button className="outlined success">Login</button>
            </div>
        </div>
    )
}