import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import UpdateTodo from '../UpdateTodo';

describe('Update todo component', () => {
	const todo = {
		completed: false,
		completedAt: null,
		_id: '5c19e8d55ac0c37f364e7912',
		text: 'second test todo'
	};

	const wrapper = shallow(
		<UpdateTodo
			match={{
				params: { id: '5c19e8d55ac0c37f364e7912' },
				isExact: true,
				path: '/todo-list/:id',
				url: '/todo-list/5c19e8d55ac0c37f364e7912'
			}}
		/>
	);
	it('Displays an Update title', () => {
		const title = wrapper.find('h1').text();
		expect(title).toBeTruthy();
		expect(title).toBe('Update Todo');
	});
	it('Displays the description label for the input', () => {
		console.log(wrapper.debug());
		const inputTodo = wrapper
			.find('label')
			.first()
			.text();
		//console.log(inputTodo.first().text());
		expect(inputTodo).toBe('Todo Description');
		expect(inputTodo).toBeTruthy();
	});
});
