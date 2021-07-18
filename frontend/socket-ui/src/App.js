
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

import MList from "./Test/Test";

import AppTest from './AppTest/AppTest';

export default function App(){

	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	return(
		<Router>
			<Switch>
				<Route exact path="/">
					<MList></MList>
				</Route>
				<Route exact path="/home">
					<ChatHome></ChatHome>
				</Route>
				<Route exact path="/login">
					<LoginLanding></LoginLanding>
				</Route>
				<Route exact path="/register">
					<RegisterLanding></RegisterLanding>
				</Route>
				<Route exact path="/css-view">
					<AppTest></AppTest>
				</Route>
			</Switch>
		</Router>
	);
}