import React, { Component } from 'react';
//import React from 'react';
import Alarm from '@material-ui/icons/Alarm';
import DoneAll from '@material-ui/icons/DoneAll';
import styled from 'styled-components';
import $ from 'jquery';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 100px;
`;

const TheIcons = styled.span`
	color: green;
`;

class Home extends Component {
	componentDidMount() {
		$(document).ready(function() {
			$('svg:nth-child(1)').addClass('animated bounce');
		});
	}

	render() {
		return (
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
				<h1 id="welcome">To-do App</h1>
				<p>
					The best of way of getting organized and maximizing your valuable
					time!
				</p>
			</Div>
		);
	}
}

export default Home;

// const Home = () => {
// 	return (
// 		<Div>
// 			<TheIcons>
// 				<Alarm
// 					style={{
// 						fontSize: '100px',
// 						paddingRight: '15px'
// 					}}
// 				/>
// 				<DoneAll
// 					style={{
// 						fontSize: '80px'
// 					}}
// 				/>
// 			</TheIcons>
// 			<h1 id="welcome">To-do App</h1>
// 			<p>
// 				The best of way of getting organized and maximizing your valuable time!
// 			</p>
// 		</Div>
// 	);
// };

// export default Home;
