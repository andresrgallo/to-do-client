import React, { Component } from 'react';
import axios from 'axios';
const qs = require('qs');

class TodoInput extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	handleInput = e => {
		this.setState({ text: e.target.value });
	};

	// handleChecked = e => {
	// 	this.setState(state => ({ completed: !state.checked }));
	// };

	handleSubmit = e => {
		axios
			.post('/todos', qs.stringify({ text: this.state.text }))
			.then(todo => console.log(todo))
			.catch(e => console.log(e));
		e.preventDefault();
		this.props.history.push('/todo-list');
	};

	render() {
		console.log(this.state);
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
