/* eslint-disable no-undef */
import {header} from './AuthHeader';
import {API_BASE_URL} from '@utils/api';
//this is a starting point
const getCategorie = () => {
	return axios.get(API_BASE_URL + '/category-list', {
		headers: header,
	});
};

const CategorieService = {
	getCategorie,
};

export default CategorieService;
