
import "./App.css";

import {
	BrowserRouter as Router,
	Switch, 
	Route, 
	Link
} from "react-router-dom";

import LoginLanding from "./Auth/Login/LoginLanding";
import RegisterLanding from "./Auth/Register/RegisterLanding";
import ChatHome from "./ChatHome/ChatHome";
import AppTest from './AppTest/AppTest';

export default function App(){

	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	return(
		<Router>
			<Switch>
				<Route exact path="/">
					<ChatHome></ChatHome>
				</Route>
				<Route path="/login">
					<LoginLanding></LoginLanding>
				</Route>
				<Route path="/register">
					<RegisterLanding></RegisterLanding>
				</Route>
				<Route path="/css-view">
					<AppTest></AppTest>
				</Route>
			</Switch>
		</Router>
	);
}