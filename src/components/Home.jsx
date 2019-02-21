import React, { Component } from 'react';
import todoImage from './images/to-do-heroe-min.jpg';
import Alarm from '@material-ui/icons/Alarm';
import DoneAll from '@material-ui/icons/DoneAll';
import styled from 'styled-components';

const MAINDIV = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	padding: 30px;
	background-color: #f2f2f2;
	height: 91vh;
}
`;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 60px;
	padding-right: 10px;
`;

const TheIcons = styled.span`
	color: #7ff5a9;
`;

const H1 = styled.h1`
	font-size: 100px;
	color: #33363d;
`;

const P = styled.p`
	font-size: 25px;
	text-align: center;
`;

const IMAGE = styled.img`
	border-radius: 10%;
	max-width: 500px;
	max-height: 500px;
	margin-top: 50px;
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
						<Alarm
							style={{
								fontSize: '100px',
								paddingRight: '15px'
							}}
						/>
						<DoneAll
							style={{
								fontSize: '80px'
							}}
						/>
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
