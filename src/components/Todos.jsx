import React, { Component } from 'react';
import Axios from 'axios';

import TodoLine from './TodoLine';

//Set up headers for Authorization when access /todos api
(function() {
	const token = sessionStorage.getItem('token');
	if (token) {
		Axios.defaults.headers.common['x-access-token'] = token;
	} else {
		Axios.defaults.headers.common['x-access-token'] = null;
	}
})();

class Todos extends Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	componentDidMount() {
		Axios.get('/todos' /*, { headers: { 'x-access-token': token } }*/)
			.then(response => {
				const todos = response.data.todos;
				this.setState({ todos });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		const todos = this.state.todos;
		return (
			<div>
				<h1>Todos</h1>
				<table>
					<thead>
						<tr>
							<th>Todo</th>
							<th>Created Date</th>
							<th>Completed?</th>
							<th>Completed Date</th>
						</tr>
					</thead>

					<tbody>
						<TodoLine todos={todos} />
					</tbody>
				</table>
			</div>
		);
	}
}

export default Todos;
