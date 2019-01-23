import React, { Component } from 'react';
import Axios from 'axios';

const qs = require('qs');

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: null, password: null };
	}

	handleInput = e => {
		const name = e.target.name;
		console.log(name);
		this.setState({ [name]: e.target.value });
	};

	handleSubmit = e => {
		Axios.post(
			'/users/login',
			qs.stringify({
				email: this.state.email,
				password: this.state.password
			})
		)
			.then(res => {
				sessionStorage.setItem('token', res.data.data.token);
				this.props.history.push('/todo-list');
			})
			.catch(error => {
				alert('Wrong email or password');
			});

		e.preventDefault();
	};

	render() {
		console.log('at login', this.state);
		return (
			<div className="container">
				<div className="col s8 m8 l6">
					<div className="card-panel">
						<h2 className="header2">Log In To Your Account</h2>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="Email"
											id="email"
											name="email"
											type="email"
											onChange={this.handleInput}
											required
										/>
										<label htmlFor="email">Enter Email</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="password"
											id="password"
											name="password"
											type="password"
											onChange={this.handleInput}
											required
										/>
										<label htmlFor="password">Password</label>
									</div>
								</div>
								<div className="row">
									<div className="row">
										<div className="input-field col s12">
											<button
												className="btn cyan waves-effect waves-light right"
												type="submit"
												name="action"
											>
												Submit
												<i className="mdi-content-send right" />
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
