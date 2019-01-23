import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
							Logo
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
									<button onClick={this.handleClick}>Logout</button>
									<li>
										<a href="/todo-list">Todos</a>
									</li>
									<li>
										<a href="/todo-list/add">Add a Todo</a>
									</li>
									<li>
										<a href="collapsible.html">Javascript</a>
									</li>
									<li>
										<a href="mobile.html">Mobile</a>
									</li>
								</React.Fragment>
							)}
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-demo">
					<li>
						<a href="sass.html">Sass</a>
					</li>
					<li>
						<a href="badges.html">Components</a>
					</li>
					<li>
						<a href="collapsible.html">Javascript</a>
					</li>
					<li>
						<a href="mobile.html">Mobile</a>
					</li>
				</ul>
			</React.Fragment>
		);
	}
}

export default withRouter(Navbar);
