import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { cardPanelStyle } from '../utils/commonStyle';

const qs = require('qs');

const CardPanel = cardPanelStyle;

const H2 = styled.h2`
	font-size: 40px;

	@media (max-width: 992px) {
		font-size: 35px;
	}

	@media (max-width: 768px) {
		font-size: 30px;
	}
	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

class Reset extends Component {
	constructor(props) {
		super(props);
		this.state = { code: '' };
	}

	handleInput = e => {
		this.setState({ code: e.target.value });
	};

	handleSubmit = e => {
		const { code } = this.state;
		Axios.post(
			`${process.env.REACT_APP_API_URL}/users/resetpassword`,
			qs.stringify({
				code
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
		return (
			<div className="row" style={{ marginTop: '50px' }}>
				<div className="col s12 m8 l6 offset-l3 offset-m2">
					<CardPanel className="card-panel">
						<H2 className="header2" style={{ textAlign: 'center' }}>
							Enter your temporary password
						</H2>
						<div className="row">
							<form className="col s8  offset-s2" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="password"
											id="code"
											name="code"
											type="password"
											autoFocus
											onChange={this.handleInput}
											required
										/>
										<label htmlFor="code">Enter password</label>
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

export default Reset;
