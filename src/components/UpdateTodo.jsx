import React, { Component } from 'react';
import axios from 'axios';
import { capitalize } from '../utils/capitalize';

import styled from 'styled-components';

const qs = require('qs');
const UpdateForm = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

class UpdateTodo extends Component {
	constructor(props) {
		super(props);
		this.state = { todo: { text: '', completed: '' } };
	}

	handleChange = e => {
		let { todo } = this.state;
		const value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		let name = e.target.name;
		todo[name] = value;
		this.setState({ todo });
	};

	handleSubmit = e => {
		let { todo } = this.state;
		todo.text = capitalize(todo.text);
		console.log('toodoo', todo);
		//const token = sessionStorage.getItem('token');
		// const headers = {
		// 	'x-access-token': token
		// };
		//const data = qs.stringify(todo);

		axios
			.patch(`/todos/${this.props.match.params.id}`, qs.stringify(todo))
			.then(res => this.props.history.push('/todo-list'))
			.catch(function(error) {
				console.log(error);
			});
		e.preventDefault();
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		const token = sessionStorage.getItem('token');
		axios
			.get(`/todos/${id}`, {
				headers: { 'x-access-token': token }
			})
			.then(res => {
				this.setState({ todo: res.data.todo });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		const { todo } = this.state;
		return (
			<UpdateForm className="row" onSubmit={this.handleSubmit}>
				<h1>Update Todo</h1>
				<form className="col s8">
					<div className="row">
						<div className="col s8">
							<label htmlFor="text">Todo Description</label>
							<input
								name="text"
								id="text"
								type="text"
								value={this.state.todo.text}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s8">
							<label>
								<input
									name="completed"
									type="checkbox"
									className="filled-in"
									checked={todo.completed}
									onChange={this.handleChange}
								/>
								<span>Completed?</span>
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s8">
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
			</UpdateForm>
		);
	}
}

export default UpdateTodo;
