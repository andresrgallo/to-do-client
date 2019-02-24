import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { cardPanelStyle } from '../utils/commonStyle';

const qs = require('qs');

const CardPanel = cardPanelStyle;

const H2 = styled.h2`
	font-size: 40px;

	@media (max-width: 768px) {
		font-size: 35px;
	}
	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

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
			`${process.env.REACT_APP_API_URL}/users/forgotpassword`,
			qs.stringify({
				email: email
			})
		)
			.then(() => {
				//alert(`A new password will be sent to ${email} `);
				this.props.history.push('/reset-message');
			})
			.catch(error => {
				if (error.response) alert(error.response.data.error);
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="row">
				<div className="col s12 m8 l6 offset-m2 offset-l3">
					<CardPanel className="card-panel">
						<H2 className="header2" style={{ textAlign: 'center' }}>
							Reset your password
						</H2>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="Email"
											id="email"
											name="email"
											type="email"
											autoFocus
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
					</CardPanel>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
