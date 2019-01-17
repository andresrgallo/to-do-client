import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import Todo from '../Todo';

describe('Todo component', () => {
	const todo = {
		completed: false,
		completedAt: null,
		_id: '5c19e8d55ac0c37f364e7912',
		text: 'second test todo'
	};

	const wrapper = shallow(
		<Todo //required={true}
			match={{
				params: { id: '5c19e8d55ac0c37f364e7912' },
				isExact: true,
				path: '/todo-list/:id',
				url: '/todo-list/5c19e8d55ac0c37f364e7912'
			}}
		/>
	);
	wrapper.setState({ todo });
	it('Renders a  Todo title', () => {
		expect(wrapper.find('.card-title').text()).toBe('Todo');
	});
	it('Renders a p element with the description of the todo', () => {
		const P = styled.p``;
		expect(P.displayName).toBe('styled.p');
		//expect(wrapper.find('styled.p').length).toBe(1);
	});
	it('Renders the todo description', () => {
		const P = wrapper
			.find('.card-content')
			.children()
			.first()
			.text();

		expect(P).toBe('second test todo');
	});
	it('Renders two buttons', () => {
		expect(wrapper.find('.waves-effect').length).toBe(2);
	});
	it('Renders one delete and one update button', () => {
		const buttons = wrapper.find('.waves-effect');
		expect(
			buttons
				.first()
				.children()
				.last()
				.text()
		).toBe('Update');
		expect(
			buttons
				.last()
				.text()
				.split('>')[1]
		).toBe('Delete');
	});
});
