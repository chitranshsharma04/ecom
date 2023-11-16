import {useReducer} from 'react';
const initialValue = {};
//this is the starting point
const reducer = (state = initialValue, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return {...state, ...action.data};
		default:
			return state;
	}
};
//this is a method to create context
export const useContextState = initial => {
	const [state, dispatch] = useReducer(reducer, initial || initialValue);
	return {state, dispatch};
};
