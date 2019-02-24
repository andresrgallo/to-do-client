import React, { Component } from 'react';
import todoImage from './images/to-do-heroe-min.jpg';
import styled from 'styled-components';
import './Home.css';

const MAINDIV = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	padding: 30px;
	background-color: #f2f2f2;
	height: 91vh;
	@media (max-width: 768px) {
		padding: 20px;
	}
	@media (max-width: 600px) {
		padding: 5px;
		flex-wrap: wrap;
		height: 91vh;
	}
}
`;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 60px;
	padding-right: 10px;
	@media (max-width: 600px) {
		padding-top: 15px;
		height: 25%;
	}
`;

const TheIcons = styled.span`
	color: #7ff5a9;
`;

const H1 = styled.h1`
	font-size: 85px;
	color: #33363d;
	@media (max-width: 992px) {
		font-size: 50px;
	}
	@media (max-width: 768px) {
		font-size: 30px;
	}
	@media (max-width: 600px) {
		margin: 10px;
	}
`;

const P = styled.p`
	font-size: 25px;
	text-align: center;
	@media (max-width: 992px) {
		font-size: 20px;
	}
	@media (max-width: 768px) {
		font-size: 18px;
	}
`;

const IMAGE = styled.img`
	border-radius: 10%;
	max-width: 500px;
	max-height: 500px;
	margin-top: 50px;
	@media (max-width: 992px) {
		max-width: 450px;
		max-height: 450px;
	}
	@media (max-width: 768px) {
		max-width: 350px;
		max-height: 350px;
	}
	@media (max-width: 600px) {
		max-width: 280px;
		max-height: 280px;
		margin-top: 30px;
	}
`;

class Home extends Component {
	componentDidMount() {
		const alarmIcon = document.getElementsByTagName('span')[0].firstChild;
		alarmIcon.classList.add('animated', 'shake');
		const tickIcon = document.getElementsByTagName('span')[0].lastChild;
		tickIcon.classList.add('animated', 'swing');
		const pLine = document.getElementsByTagName('p')[0];
		pLine.classList.add('animated', 'delay-1s', 'flipInY');
	}

	render() {
		return (
			<MAINDIV>
				<Div>
					<TheIcons>
						<i class="large material-icons icon-responsive">access_alarm</i>
						<i class="large material-icons icon-responsive">done_all</i>
					</TheIcons>
					<H1 id="welcome">To-Do App</H1>
					<P>
						The best of way of getting organized and maximizing your valuable
						time!
					</P>
				</Div>
				<IMAGE src={todoImage} />
			</MAINDIV>
		);
	}
}

export default Home;
