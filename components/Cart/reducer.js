import {useReducer} from 'react';
const initialValue = {
	list: [],
	quantity: '',
	tax: '',
	tax_price: '',
	subTotal: '',
	cartLoading: true,
};
//this is a method to create reducer
const reducer = (state = initialValue, action) => {
	switch (action.type) {
		case 'SET_DATA':
			// eslint-disable-next-line no-case-declarations
			let subTotal = action.data.list.reduce(function (acc, obj) {
				return acc + Number(obj.final_value);
			}, 0);

			return {...state, ...action.data, subTotal};
		default:
			return state;
	}
};
//this is a method to create reducer
export const useCartListState = () => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	return {state, dispatch};
};
