/* eslint-disable no-console */
import axios from 'axios';
import {API_BASE_URL, api} from '@utils/api';

import {header} from './AuthHeader';
//this is a starting point
const getCart = () => {
	return axios.get(API_BASE_URL + '/list_cart', {
		headers: header,
	});
};
//this is a method to change values
const removeCart = getData => {
	return api({
		url: '/cart/remove',
		method: 'POST',
		data: getData,
	});
};
//this is a method to change values
const updateCart = getData => {
	return axios.post(API_BASE_URL + '/cart/update', getData, {
		headers: header,
	});
};
//this is a method to call api
const CartService = {
	getCart,
	removeCart,
	updateCart,
};

export default CartService;
