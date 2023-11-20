import axios from 'axios';

import { headerValue, API_BASE_URL, api} from '@utils/api';
//this is a method to change values
const getProfileDetail = () => {
	return axios.get(API_BASE_URL + '/users/profile-detail', {
		headers: headerValue(),
	});
};
//this is a method to change values
const getVendorProfileDetail = () => {
	return api({
		url: '/vendor/profile-detail',
		method: 'GET',
	});
};
//this is a method to change values
const updateVendorProfileDetail = giveData => {
	// return axios.post(API_BASE_URL + '/vendor/profile-update', giveData, {
	// 	headers: {...header},
	// });
	var form_data = new FormData();
	for (var key in giveData) {
	    if (Object.prototype.hasOwnProperty.call(giveData, key)) {
		form_data.append(key, giveData[key]);
	    }
	}
	// for (const key of giveData.keys()) {
	// 	form_data.append(key, giveData[key]);
	// 	console.log(giveData[key]);
	//   }
	return axios({
		method: 'post',
		url: API_BASE_URL + '/vendor/profile-update',
		data: giveData,
		headers: headerValue(),
	});
};
//this is a method to change values
const updateProfileDetail = (giveData, optionHeader) => {
	return axios.post(API_BASE_URL + '/users/profile-update', giveData, {
		headers: headerValue(),
	});
};

// const getAdminBoard = () => {
// 	return axios.get(config.API_BASE_URL + 'admin');
// };

const UserService = {
	getProfileDetail,
	updateProfileDetail,
	getVendorProfileDetail,
	updateVendorProfileDetail,
};

export default UserService;
