import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AddtoDo from '@material-ui/icons/AddToQueue';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { confirmExpiration } from '../utils/jsnTokenMiddleware';
import { tokenInHeaders } from '../utils/tokenInHeaders';

//Set up headers for Authorization when access /todos api
tokenInHeaders();

const Td = styled.th`
	text-align: center;
`;
const MaterialIcon = styled.i`
	padding: 5px;
`;

class TodoLine extends Component {
	//Check if Jason Web Token has expired
	componentWillMount() {
		if (confirmExpiration()) {
			sessionStorage.removeItem('token', 'email');
			window.location = '/login';
		}
	}
	render() {
		const { todos } = this.props;
		const list =
			todos.length > 0 ? (
				todos.map((todo, index) => (
					<tr key={index}>
						<Td>
							<Link to={`/todo-list/${todo._id}`}>{todo.text}</Link>
						</Td>
						<Td>
							{`${new Date(todo.createdAt).getDate()} - ${new Date(
								todo.createdAt
							).getMonth()} - ${new Date(todo.createdAt).getFullYear()}`}
						</Td>
						<Td>
							{todo.completed ? (
								<ThumbUp style={{ color: '#acfb8c' }} />
							) : (
								<ThumbDown style={{ color: '#fe4843' }} />
							)}
						</Td>
						<Td>
							{todo.completed
								? `Completed on: ${new Date(
										todo.completedAt
								  ).getDate()} - ${new Date(
										todo.completedAt
								  ).getMonth()} - ${new Date(todo.completedAt).getFullYear()}`
								: null}
						</Td>
					</tr>
				))
			) : (
				<tr style={{ borderBottom: 'none' }}>
					<td style={{ textAlign: 'center', color: '#ad0b0b' }}>
						-- Add your first to-do --
					</td>
				</tr>
			);

		return <React.Fragment>{list}</React.Fragment>;
	}
}

export default TodoLine;
