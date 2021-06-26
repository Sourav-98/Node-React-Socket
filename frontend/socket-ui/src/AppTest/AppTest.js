
import './AppTest.css';

export default function AppTest(){
    return(
        <div className="app-test-container">
            <div className="col-1">
                <span>Custom Input</span><br/>
                <br/>
                <span>Default:</span>
                <input className="cm-input" placeholder="cm-input DEFAULT"></input>
                <input className="cm-input sm" placeholder="cm-input sm"></input>
                <input className="cm-input md" placeholder="cm-input md --- DEFAULT"></input>
                <input className="cm-input lg" placeholder="cm-input lg"></input>
                <hr/>
                <span>Round:</span>
                <input className="cm-input round" placeholder="cm-input DEFAULT"></input>
                <input className="cm-input round sm" placeholder="cm-input sm"></input>
                <input className="cm-input round md" placeholder="cm-input md --- DEFAULT"></input>
                <input className="cm-input round lg" placeholder="cm-input lg"></input>
                <br/>
                <br/>
            </div>
            <div className="col-1">
                <span>Custom Default Buttons</span><br/><br/>
                <span>Color:</span><br></br>
                <button className="cm-button outlined primary">Primary</button>
                <button className="cm-button outlined secondary">Secondary</button>
                <button className="cm-button outlined success">Success</button>
                <button className="cm-button outlined danger">Danger</button>
                <button className="cm-button outlined alert">Alert</button>
                <br/><br/>
                <span>Disabled:</span><br></br>
                <button className="cm-button outlined primary" disabled>Primary</button>
                <button className="cm-button outlined secondary" disabled>Secondary</button>
                <button className="cm-button outlined success" disabled>Success</button>
                <button className="cm-button outlined danger" disabled>Danger</button>
                <button className="cm-button outlined alert" disabled>Alert</button>
                <br/><br/>
                <span>Button Sizes</span><br/>
                <div className="button-sizing-box">
                    <button className="cm-button sm outlined primary">Button sm</button>
                    <button className="cm-button outlined success">Button md</button>
                    <button className="cm-button lg outlined danger">Button lg</button>
                </div>
                <br/><br/>
                <span>Custom Round Buttons</span><br/><br/>
                <button className="cm-button round outlined primary">Primary</button>
                <button className="cm-button round outlined secondary">Secondary</button>
                <button className="cm-button round outlined success">Success</button>
                <button className="cm-button round outlined danger">Danger</button>
                <button className="cm-button round outlined alert">Alert</button>
                <br/><br/>
            </div>
            <div className="col-1 dark">
                <span>Custom Dark Buttons</span><br/><br/>
                <span>Color:</span><br></br>
                <button className="cm-button outlined primary">Primary</button>
                <button className="cm-button outlined secondary">Secondary</button>
                <button className="cm-button outlined success">Success</button>
                <button className="cm-button outlined danger">Danger</button>
                <button className="cm-button outlined alert">Alert</button>
                <br/><br/>
                <span>Disabled:</span><br></br>
                <button className="cm-button outlined primary" disabled>Primary</button>
                <button className="cm-button outlined secondary" disabled>Secondary</button>
                <button className="cm-button outlined success" disabled>Success</button>
                <button className="cm-button outlined danger" disabled>Danger</button>
                <button className="cm-button outlined alert" disabled>Alert</button>
                <br/><br/>
                <span>Button Sizes</span><br/>
                <div className="button-sizing-box">
                    <button className="cm-button sm outlined primary">Button sm</button>
                    <button className="cm-button outlined success">Button md</button>
                    <button className="cm-button lg outlined danger">Button lg</button>
                </div>
                <br/><br/>
                <span>Custom Round Buttons</span><br/><br/>
                <button className="cm-button round outlined primary">Primary</button>
                <button className="cm-button round outlined secondary">Secondary</button>
                <button className="cm-button round outlined success">Success</button>
                <button className="cm-button round outlined danger">Danger</button>
                <button className="cm-button round outlined alert">Alert</button>
                <br/><br/>
                
            </div>
            <div className="col-1">
                
            </div>
        </div>
    )
}