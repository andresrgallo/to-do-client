import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';

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

const Table = styled.table`
	width: 70%;
	margin-left: 15%;
`;

const Th = styled.th`
	text-align: center;
`;

const H1 = styled.h1`
	text-align: center;
	font-size: 2.28rem;
	line-height: 110%;
	margin: 1.52rem 0 0.912rem 0;
`;

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
				<H1>Todos</H1>
				<Table>
					<thead>
						<tr>
							<Th>Todo</Th>
							<Th>Created Date</Th>
							<Th>Completed?</Th>
							<Th>Completed Date</Th>
						</tr>
					</thead>

					<tbody>
						<TodoLine todos={todos} />
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Todos;
