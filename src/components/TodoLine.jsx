import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

class TodoLine extends Component {
	render() {
		const { todos } = this.props;
		console.log('at todoline', todos);
		const list =
			todos.length > 0 ? (
				todos.map((todo, index) => (
					<tr key={index}>
						<td>
							<Link to={`/todo-list/${todo._id}`}>{todo.text}</Link>
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
				<p>No todos for now!</p>
			);

		return <React.Fragment>{list}</React.Fragment>;
	}
}

export default TodoLine;
