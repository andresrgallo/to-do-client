import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { h2Style, cardPanelStyle } from '../utils/commonStyle';

const qs = require('qs');

const H2 = h2Style;

const CardPanel = cardPanelStyle;

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
		user.password !== user.confirmPassword
			? alert("Passwords don't match")
			: Axios.post(
					`${process.env.REACT_APP_API_URL}/users/register`,
					qs.stringify({
						name: user.name,
						email: user.email,
						password: user.password
					})
			  )
					.then(() => {
						alert(
							'Your details have been added, please login after this prompt'
						);
						this.props.history.push('/login');
					})
					.catch(error => {
						console.log(error.response);

						if (error.response && error.response.data.code === 11000) {
							alert('Email already exists!');
						} else if (error.response.data.errors.password) {
							alert('Password minimum length is 5 characters');
						} else if (error.response.data.errors.name) {
							alert('Name minimum length is 2 characters');
						}
					});

		e.preventDefault();
	};

	render() {
		return (
			<div className="row">
				<div className="col s10 m10 l6 offset-l3 offset-m1 offset-s1">
					<CardPanel className="card-panel">
						<H2 className="header2" style={{ textAlign: 'center' }}>
							Open an Account
						</H2>
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
											autoFocus
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
							</form>
						</div>
					</CardPanel>
				</div>
			</div>
		);
	}
}
