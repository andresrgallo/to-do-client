import React, { Component } from 'react';
import Axios from 'axios';
import { capitalize } from '../utils/capitalize';
import { confirmExpiration } from '../utils/jsnTokenMiddleware';
import styled from 'styled-components';

import { tokenInHeaders } from '../utils/tokenInHeaders';

//Set up headers for Authorization when access /todos api
tokenInHeaders();

const qs = require('qs');

const Card = styled.div`
	margin-top: 2.8rem;
`;

const H4 = styled.h4`
	text-align: center;
	padding: 20px;
	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

class TodoInput extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	//Check if Jason Web Token has expired
	componentWillMount() {
		confirmExpiration();
	}

	handleInput = e => {
		this.setState({ text: e.target.value });
	};

	handleSubmit = e => {
		let { text } = this.state;
		text = capitalize(text);
		Axios.post(`${process.env.REACT_APP_API_URL}/todos`, qs.stringify({ text }))
			.then(todo => console.log('To-do Added'))
			.catch(e => {
				console.log(e.response);
				if (e.response.data.error === 'ValidatorError')
					alert('To-do minimum length is 3 characters');
			});
		e.preventDefault();
		this.props.history.push('/todo-list');
	};

	render() {
		const { text } = this.state;
		return (
			<div className="row">
				<div className="col s8 m8 l6 offset-l3 offset-m2 offset-s2">
					<Card className="card-panel">
						<H4 className="card-title">Add a To-Do</H4>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="To-Do Description"
											id="todo-description"
											type="text"
											value={text}
											onChange={this.handleInput}
											autoFocus
											required
										/>
										<label htmlFor="todo-description">Description</label>
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
					</Card>
				</div>
			</div>
		);
	}
}

export default TodoInput;
