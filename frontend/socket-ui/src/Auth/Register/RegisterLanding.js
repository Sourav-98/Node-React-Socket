
import "./RegisterLanding.css";

export default function RegisterLanding(){
    return(
        <div className="register-container">
            <div className="register-box">
                <input className="cm-input" placeholder="Enter Name"></input>
                <br/>
                <input className="cm-input" placeholder="Enter Email Id"></input>
                <br/>
                <input className="cm-input" placeholder="Enter Password"></input>
                <br/>
                <input className="cm-input" placeholder="Re-Enter Password"></input>
                <br/>
                <br/>
                <br/>
                <button className="outlined primary">Register</button>
            </div>
        </div>
    )
}