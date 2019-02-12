import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent.jsx';
import NotFound from './components/NotFound.jsx';
// import Axios from 'axios';

const Home = asyncComponent(() => {
	return import('./components/Home').then(module => module.default);
});
const Todos = asyncComponent(() => {
	return import('./components/Todos').then(module => module.default);
});
const Todo = asyncComponent(() => {
	return import('./components/Todo').then(module => module.default);
});
const TodoInput = asyncComponent(() => {
	return import('./components/TodoInput').then(module => module.default);
});
const NavBar = asyncComponent(() => {
	return import('./components/NavBar').then(module => module.default);
});
const UpdateTodo = asyncComponent(() => {
	return import('./components/UpdateTodo').then(module => module.default);
});
const Register = asyncComponent(() => {
	return import('./components/Register').then(module => module.default);
});
const Login = asyncComponent(() => {
	return import('./components/Login').then(module => module.default);
});
const ForgotPassword = asyncComponent(() => {
	return import('./components/ForgotPassword').then(module => module.default);
});

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar logout={this.handleLogOut} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/forgot-password" component={ForgotPassword} />
						<Route
							exact
							path="/todo-list"
							render={props =>
								!!sessionStorage.token ? <Todos {...props} /> : <Login />
							}
						/>
						<Route
							exact
							path="/todo-list/add"
							render={props =>
								!!sessionStorage.token ? <TodoInput {...props} /> : <Login />
							}
						/>
						<Route
							exact
							path="/todo-list/update/:id"
							render={props =>
								!!sessionStorage.token ? <UpdateTodo {...props} /> : <Login />
							}
						/>
						<Route
							exact
							path="/todo-list/:id"
							render={props =>
								!!sessionStorage.token ? <Todo {...props} /> : <Login />
							}
						/>
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
