import React, { Component } from 'react';
import Axios from 'axios';

const qs = require('qs');

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = { oldPassword: null, newPassword: null };
	}

	handleInput = e => {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	};

	handleSubmit = e => {
		const { oldPassword } = this.state;
		const { newPassword } = this.state;
		Axios.post(
			'/users/update',
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
				console.log('at profile', error);
				if (error.response && error.response.data.code === 11000)
					if (error.response) alert(error.response);
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="container">
				<div className="col s8 m8 l6">
					<div className="card-panel">
						<h2 className="header2">Change your password</h2>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="Old Password"
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
											placeholder="New Password"
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
