import React, { Component } from 'react';
import axios from 'axios';
import Todos from './Todos';
import { capitalize } from '../utils/capitalize';
import { confirmExpiration } from '../utils/jsnTokenMiddleware';
const qs = require('qs');

class TodoInput extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	//Check if Jason Web Token has expired
	componentWillMount() {
		if (confirmExpiration()) {
			sessionStorage.removeItem('token', 'email');
			window.location = '/login';
		}
	}

	handleInput = e => {
		this.setState({ text: e.target.value });
	};

	handleSubmit = e => {
		let { text } = this.state;
		text = capitalize(text);
		axios
			.post('/todos', qs.stringify({ text }))
			.then(todo => console.log(todo))
			.catch(e => console.log(e));
		e.preventDefault();
		this.props.history.push('/todo-list');
	};

	render() {
		const { text } = this.state;
		return (
			<div className="row">
				<div className="col s8 m8 l6">
					<div className="card-panel">
						<h4 className="header2">Add a Todo</h4>
						<div className="row">
							<form className="col s12" onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="input-field col s12">
										<input
											placeholder="Todo Description"
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
					</div>
				</div>
			</div>
		);
	}
}

export default TodoInput;
