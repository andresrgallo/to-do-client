import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

class TodoLine extends Component {
	render() {
		const { todos } = this.props;
		const list =
			todos.length > 0 ? (
				todos.map((todo, index) => (
					<tr key={index}>
						<td>
							<Link to={`/todo-list/${todo._id}`}>{todo.text}</Link>
						</td>
						<td>
							{`${new Date(todo.createdAt).getDate()} - ${new Date(
								todo.createdAt
							).getMonth()} - ${new Date(todo.createdAt).getFullYear()}`}
						</td>
						<td>
							{todo.completed ? <ThumbUp /> : <ThumbDown />}
							&emsp;&emsp;
							{todo.completed
								? `Completed on: ${new Date(
										todo.completedAt
								  ).getDate()} - ${new Date(
										todo.completedAt
								  ).getMonth()} - ${new Date(todo.completedAt).getFullYear()}`
								: null}
						</td>
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
