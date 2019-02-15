import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ListAlt from '@material-ui/icons/ListAlt';
import styled from 'styled-components';

const Signout = styled.button`
	background-color: #ee6e73;
	color: white;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	height: 64px;
	padding-right: 20px;
`;

class Navbar extends Component {
	handleClick = () => {
		sessionStorage.removeItem('token');
		this.props.history.push('/');
	};

	componentDidMount() {
		var elems = document.querySelectorAll('.sidenav');
		var instances = M.Sidenav.init(elems);
	}

	render() {
		return (
			<React.Fragment>
				<nav>
					<div className="nav-wrapper">
						<a href="/" className="brand-logo">
							<ListAlt style={{ fontSize: '63px', paddingLeft: '20px' }} />
						</a>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
							{!sessionStorage['token'] ? (
								<React.Fragment>
									<li>
										<a href="/register">Register</a>
									</li>
									<li>
										<a href="/login">Login</a>
									</li>
								</React.Fragment>
							) : (
								<React.Fragment>
									<Signout onClick={this.handleClick}>Logout</Signout>
									<li>
										<a href="/todo-list">Todos</a>
									</li>
									<li>
										<a href="/todo-list/add">Add a Todo</a>
									</li>
									<li>
										<a href="/profile">Profile</a>
									</li>
								</React.Fragment>
							)}
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-demo">
					<li>
						<a href="/todo-list">Todos</a>
					</li>
					<li>
						<a href="/todo-list/add">Add a Todo</a>
					</li>
					<li>
						<a href="/users/profile">Profile</a>
					</li>
				</ul>
			</React.Fragment>
		);
	}
}

export default withRouter(Navbar);
