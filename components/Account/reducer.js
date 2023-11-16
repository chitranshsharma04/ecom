import {useReducer} from 'react';
const initialValue = {
	profileDetails: [],
};
//this is a method to create reducer
const reducer = (state = initialValue, action) => {
	switch (action.type) {
		case 'SET_DATA':
			return {...state, ...action.data};

		default:
			return state;
	}
};
//this is a method to create reducer
export const useAccountState = () => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	return {state, dispatch};
};
