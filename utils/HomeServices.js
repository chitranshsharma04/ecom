/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';
//this is a starting point
const getHomeDetail = () => {
		//this is a method to get data from api

	return axios.get(API_BASE_URL + '/home', {
		headers: header,
	});
};
	//this is a method to get data from api

const getannerDetail = () => {
	return axios.get(API_BASE_URL + '/get_banners', {
		headers: header,
	});
};

const UserService = {
	getHomeDetail,
	getannerDetail,
};

export default UserService;
