/* eslint-disable no-console */
import axios from 'axios';
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';
//this is the starting point
const getProductDetail = (slug, isPublic = true) => {
	//this is a method to get data from api
	return axios.get(API_BASE_URL + `/product/product_detail/${slug}`, {
		headers: isPublic ? {} : header,
	});
};
//this is the starting point
const UserService = {
	getProductDetail,
};

export default UserService;
