import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { confirmExpiration } from '../utils/jsnTokenMiddleware';
import Schedule from '@material-ui/icons/Schedule';
import Check from '@material-ui/icons/CheckCircleOutline';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import Delete from '@material-ui/icons/Delete';
import SystemUpdate from '@material-ui/icons/SystemUpdate';
import { tokenInHeaders } from '../utils/tokenInHeaders';

//Set up headers for Authorization when access /todos api
tokenInHeaders();

const H1 = styled.h1`
	text-align: center
	padding: 30px
	font-size: 2.28rem;
	line-height: 110%;
	margin: 2.8rem 0 0.912rem 0;
`;

const P = styled.p`
	text-transform: capitalize;
	font-size: 20px;
`;

const MaterialIcon = styled.i`
	padding: 5px;
`;
const Button = styled.a`
	margin: 10px
	textAlign: center
`;

const TheButtons = styled.p`
	text-align: right;
`;

const CompletedQ = styled.div`
	display: flex;
	align-items: center;
`;
const ToBeCompleted = styled.div`
	display: flex;
	align-items: center;
`;

const Span = styled.span`
	font-size: 20px;
`;

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = { todo: [] };
	}

	handleDelete = () => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/todos/${this.state.todo._id}`)
			.then(() => console.log('succesfully deleted'))
			.catch(e => console.log('error', e));
		this.props.history.push('/todo-list');
	};

	//Check if Jason Web Token has expired
	componentWillMount() {
		if (confirmExpiration()) {
			sessionStorage.removeItem('token', 'email');
			window.location = '/login';
		}
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		axios
			.get(`${process.env.REACT_APP_API_URL}/todos/${id}`)
			.then(res => {
				const { todo } = res.data;
				this.setState({ todo });
			})
			.catch(e => {
				this.props.history.push('/todo-list');
			});
	}

	render() {
		const { todo } = this.state;

		return (
			<div className="row">
				<div className="col s12 m8 offset-m2">
					<div className="card">
						<H1>To-Do</H1>
						<div className="card-content">
							<P>{todo.text}</P>
						</div>
						<div className="card-action">
							<CompletedQ>
								<Span>Completed? </Span>
								{todo.completed ? (
									<Check
										style={{
											color: '#acfb8c',
											fontSize: '35px',
											marginLeft: '20px'
										}}
									/>
								) : (
									<SentimentVeryDissatisfied
										style={{
											color: '#fe4843',
											fontSize: '35px',
											marginLeft: '20px'
										}}
									/>
								)}
							</CompletedQ>
						</div>
						<div className="card-action">
							<Span>
								{todo.completedAt ? (
									`Completed on: ${new Date(
										todo.completedAt
									).getDate()} - ${new Date(
										todo.completedAt
									).getMonth()} - ${new Date(todo.completedAt).getFullYear()}`
								) : (
									<ToBeCompleted>
										<Span>To be completed</Span>{' '}
										<Schedule
											style={{
												color: 'orange',
												fontSize: '35px',
												marginLeft: '10px'
											}}
										/>
									</ToBeCompleted>
								)}
							</Span>
							<TheButtons>
								<Link
									to={`/todo-list/update/${todo._id}`}
									className="waves-effect waves-light btn-small"
									style={{ marginLeft: 10 }}
								>
									<MaterialIcon className="material-icons left">
										<SystemUpdate />
									</MaterialIcon>
									Update
								</Link>

								<Button
									className="waves-effect waves-light btn-small"
									onClick={this.handleDelete}
								>
									<MaterialIcon className="material-icons left">
										<Delete />
									</MaterialIcon>
									Delete
								</Button>
							</TheButtons>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Todo;
