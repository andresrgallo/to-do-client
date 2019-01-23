import React, { Component } from 'react';
import Axios from 'axios';

import TodoLine from './TodoLine';

//Set up headers for Authorization when access /todos api
(function() {
	const token = sessionStorage.getItem('token');
	console.log('at app token-----', token);
	if (token) {
		Axios.defaults.headers.common['x-access-token'] = token;
	} else {
		Axios.defaults.headers.common['x-access-token'] = null;
		/*if setting null does not remove `Authorization` header then try     
			delete axios.defaults.headers.common['Authorization'];
		*/
	}
})();

class Todos extends Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	componentDidMount() {
		//const token = sessionStorage.getItem('token');
		Axios.get('/todos' /*, { headers: { 'x-access-token': token } }*/)
			.then(response => {
				console.log(response.data.todos);
				const todos = response.data.todos;
				console.log('tttttt', todos);
				this.setState({ todos });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		console.log(this.props.location);
		console.log(sessionStorage);

		const todos = this.state.todos;
		console.log(todos);
		return (
			<div>
				<h1>Todos</h1>
				<table>
					<thead>
						<tr>
							<th>Todo</th>
							<th>Completed</th>
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
