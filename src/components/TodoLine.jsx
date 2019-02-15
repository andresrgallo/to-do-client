import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

const Td = styled.th`
	text-align: center;
`;

class TodoLine extends Component {
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
				<tr>
					<td>No todos for now</td>
				</tr>
			);

		return <React.Fragment>{list}</React.Fragment>;
	}
}

export default TodoLine;
