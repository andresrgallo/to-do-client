import React, { Component } from 'react';
import axios from 'axios';
import { capitalize } from '../utils/capitalize';
import { confirmExpiration } from '../utils/jsnTokenMiddleware';

import styled from 'styled-components';

const qs = require('qs');

const UpdateForm = styled.div`
	width: 100%;
`;

const H4 = styled.h4`
	margin-top: 2.8rem;
	text-align: center;
	padding: 30px;
	line-height: 110%;
`;

class UpdateTodo extends Component {
	constructor(props) {
		super(props);
		this.state = { todo: { text: '', completed: '' } };
	}

	//Check if Jason Web Token has expired
	componentWillMount() {
		if (confirmExpiration()) {
			sessionStorage.removeItem('token', 'email');
			window.location = '/login';
		}
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

		axios
			.patch(`/todos/${this.props.match.params.id}`, qs.stringify(todo))
			.then(() => this.props.history.push('/todo-list'))
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
			<UpdateForm onSubmit={this.handleSubmit}>
				<H4 className="header-2">Update Todo</H4>
				<form className="col s12 l6 offset-l3 ">
					<div className="row">
						<div className="col s12 l6 offset-l3">
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
						<div className="input-field col s12 l6 offset-l3">
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
						<div className="input-field col s12 l6 offset-l3">
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
