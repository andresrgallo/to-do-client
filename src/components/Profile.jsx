import React, { Component } from 'react';
import Axios from 'axios';
import { confirmExpiration } from '../utils/jsnTokenMiddleware';

const qs = require('qs');

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { oldPassword: null, newPassword: null };
	}

	//Check if Jason Web Token has expired
	componentWillMount() {
		if (confirmExpiration()) {
			sessionStorage.removeItem('token', 'email');
			window.location = '/login';
		}
	}

	handleInput = e => {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	};

	handleSubmit = e => {
		const { oldPassword } = this.state;
		const { newPassword } = this.state;
		Axios.post(
			`${process.env.REACT_APP_API_URL}/users/update`,
			qs.stringify({
				oldPassword: oldPassword,
				newPassword: newPassword,
				email: sessionStorage.getItem('email')
			})
		)
			.then(res => {
				alert('Your Password has been updated');
				this.props.history.push('/todo-list');
			})
			.catch(error => {
				if (error.response && error.response.data.code === 11000) {
					alert(error.response);
				} else {
					alert('Old password does not match');
				}
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="container">
				<div className="col s8 m8 l6">
					<div className="card-panel">
						<h2 className="header2" style={{ textAlign: 'center' }}>
							Change your password
						</h2>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											id="old-password"
											name="oldPassword"
											type="password"
											onChange={this.handleInput}
											required
										/>
										<label htmlFor="old-password">Enter Old Password</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s12">
										<input
											id="new-password"
											name="newPassword"
											type="password"
											onChange={this.handleInput}
											required
										/>
										<label htmlFor="new-password">Enter New Password</label>
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

export default Profile;
