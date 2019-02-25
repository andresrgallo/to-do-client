import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { withRouter } from 'react-router-dom';
import ListAlt from '@material-ui/icons/ListAlt';
import styled from 'styled-components';
import './NavBar.css';

const My = styled.a`
	@media (max-width: 992px) {
		visibility: hidden;
	}
`;

const Signout = styled.button`
	background-color: #ee6e73;
	color: #ffc287;
	border: none;
	cursor: pointer;
	font-size: 20px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	height: 64px;
	padding-right: 20px;
`;

const Link = styled.a`
	font-size: 20px;
	color: #ffc287;
`;

const MobLogOut = styled.button`
	border: none;
	cursor: pointer;
	width: 100%;
	font-size: 14px;
	font-weight: 500;
	height: 48px;
	line-height: 48px;
	padding: 0 32px;
	text-align: left;
	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

class Navbar extends Component {
	handleClick = () => {
		sessionStorage.clear();
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
						<My href="/" className="brand-logo">
							<ListAlt
								style={{
									fontSize: '63px',
									paddingLeft: '20px',
									color: '#ffc287'
								}}
							/>
						</My>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
							{!sessionStorage['token'] ? (
								<React.Fragment>
									<li>
										<Link href="/register">Register</Link>
									</li>
									<li>
										<Link href="/login">Login</Link>
									</li>
								</React.Fragment>
							) : (
								<React.Fragment>
									<Signout onClick={this.handleClick}>Logout</Signout>
									<li>
										<Link href="/todo-list">To-Do(s)</Link>
									</li>
									<li>
										<Link href="/todo-list/add">Add a To-Do</Link>
									</li>
									<li>
										<Link href="/profile">Profile</Link>
									</li>
								</React.Fragment>
							)}
						</ul>
					</div>
				</nav>
				<ul className="sidenav" id="mobile-demo">
					{!sessionStorage['token'] ? (
						<React.Fragment>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li>
								<Link href="/register">Register</Link>
							</li>
							<li>
								<Link href="/login">Login</Link>
							</li>
						</React.Fragment>
					) : (
						<React.Fragment>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li>
								<a href="/todo-list">To-Do(s)</a>
							</li>
							<li>
								<a href="/todo-list/add">Add a To-Do</a>
							</li>
							<li>
								<a href="/profile">Profile</a>
							</li>
							<MobLogOut onClick={this.handleClick}>Logout</MobLogOut>
						</React.Fragment>
					)}
				</ul>
			</React.Fragment>
		);
	}
}

export default withRouter(Navbar);
