import React, { Component } from 'react';
import Axios from 'axios';

const qs = require('qs');

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = { email: null };
	}

	handleInput = e => {
		this.setState({ email: e.target.value });
	};

	handleSubmit = e => {
		const { email } = this.state;

		Axios.post(
			'/users/forgotpassword',
			qs.stringify({
				email: email
			})
		)
			.then(() => {
				alert(`A new password will be sent to ${email} `);
				this.props.history.push('/login');
			})
			.catch(error => {
				if (error.response) alert(error.response.data.error);
			});
		e.preventDefault();
	};

	render() {
		// console.log(this.state);
		return (
			<div className="container">
				<div className="col s8 m8 l6">
					<div className="card-panel">
						<h2 className="header2" style={{ textAlign: 'center' }}>
							Reset your password
						</h2>
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

export default ForgotPassword;
