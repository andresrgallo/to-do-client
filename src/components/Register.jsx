import React, { Component } from 'react';
import Axios from 'axios';

const qs = require('qs');

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: { name: null, email: null, password: null, confirmPassword: null }
		};
	}

	handleInput = e => {
		let { user } = this.state;
		let { name } = e.target;
		user[name] = e.target.value;
		this.setState({ user });
	};

	handleSubmit = e => {
		const { user } = this.state;
		console.log(user.email);
		//const { name, email, password } = user;
		user.password !== user.confirmPassword
			? alert("Passwords don't match")
			: Axios.post(
					'/users/register',
					qs.stringify({
						name: user.name,
						email: user.email,
						password: user.password
					})
			  )
					.then(() => this.props.history.push('/login'))
					.catch(error => {
						if (error.response && error.response.data.code === 11000)
							alert('Email already exists!');
					});

		e.preventDefault();
	};

	render() {
		//console.log(this.state);
		return (
			<div className="container">
				<div className="col s8 m8 l6">
					<div className="card-panel">
						<h2 className="header2">Open an Account</h2>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="Name"
											id="name"
											name="name"
											type="text"
											onChange={this.handleInput}
											required
										/>
										<label htmlFor="name">Name</label>
									</div>
								</div>
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
										<label htmlFor="email">Email</label>
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
									<div className="row">
										<div className="input-field col s12">
											<input
												placeholder="Confirm password"
												name="confirmPassword"
												id="confirm-password"
												type="password"
												onChange={this.handleInput}
												required
											/>
											<label htmlFor="confirm-password">Confirm Password</label>
										</div>
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
