
import "./App.css";

import {
	BrowserRouter as Router,
	Switch, 
	Route, 
	Link
} from "react-router-dom";

import LoginLanding from "./AuthLanding/Login/LoginLanding";
import RegisterLanding from "./AuthLanding/Register/RegisterLanding";
import AppLanding from "./AppSocketV2/App";

import AppTest from './AppTest/AppTest';

export default function App(){

	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	return(
		<div>
			<AppLanding></AppLanding>
			{/* <LoginLanding></LoginLanding> */}
			{/* <RegisterLanding></RegisterLanding> */}
			{/* <AppTest></AppTest> */}
		</div>
	);
}