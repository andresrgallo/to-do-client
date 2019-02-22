import React, { Component } from 'react';
import Axios from 'axios';

const qs = require('qs');

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
		console.log('at resetp', this.state);
		return (
			<div className="row" style={{ marginTop: '50px' }}>
				<div className="col s12 m8 l6 offset-l3 offsetm-2">
					<div className="card-panel">
						<h2 className="header2" style={{ textAlign: 'center' }}>
							Enter your temporary password
						</h2>
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
					</div>
				</div>
			</div>
		);
	}
}

export default Reset;
