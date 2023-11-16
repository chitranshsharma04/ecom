/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';
//this is a starting point
const getRegister = () => {
	//this is a method to get data from api

	return axios.post(API_BASE_URL + '/users/register', {
		headers: header,
	});
};
//this is a starting point
const UserService = {
	getRegister,
};

export default UserService;
