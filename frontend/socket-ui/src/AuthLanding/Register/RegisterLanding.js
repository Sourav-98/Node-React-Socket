
import "./RegisterLanding.css";

export default function RegisterLanding(){
    return(
        <div className="register-container">
            <div className="register-box">
                <input className="text-input-round md" placeholder="Enter Name"></input>
                <br/>
                <input className="text-input-round md" placeholder="Enter Email Id"></input>
                <br/>
                <input className="text-input-round md" placeholder="Enter Password"></input>
                <br/>
                <input className="text-input-round md" placeholder="Re-Enter Password"></input>
                <br/>
                <br/>
                <br/>
                <button className="outlined primary">Register</button>
            </div>
        </div>
    )
}