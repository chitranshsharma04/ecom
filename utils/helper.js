import Swal from 'sweetalert2';
import cookie from 'js-cookie';

import {api} from './api';
//this is a starting point
export const confirmDialog = (title, icon = 'warning') => {
	return new Promise(resolve => {
		Swal.fire({
			title: '',
			text: title,
			icon: icon,
			// showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: 'Confirm',
			confirmButtonColor: '#3299cc',
			// denyButtonText: `Don't save`,
		})
			.then(result => {
				if (result.isConfirmed) {
					resolve(true);
					// Swal.fire('Saved!', '', 'success');
				} else if (result.isDenied) {
					resolve(false);
					// Swal.fire('Changes are not saved', '', 'info');
				} else {
					resolve(false);
				}
			})
			.catch(() => resolve(false));
	});
};
	//this is a method to get data from api

export const getCountriesList = async () => {
	const response = await api({
		url: '/users/country-list',
	});

	if (response.status) return response.data;
	else return [];
};
	//this is a method to get data from api

export const getCurrencySymbol = () => {
	const currencyCode = cookie.get('currencyValue');
	
	let currencySymbol;
	switch (currencyCode) {
		case '49':
			currencySymbol = '₹';
			break;
		case '8':
			currencySymbol = 'Bs';
			break;
		case '5':
			currencySymbol = 'frCD';
			break;
		case '7':
			currencySymbol = ' ؋ ';
			break;
		case '9':
			currencySymbol = ' د.إ. ';
			break;
		case '10':
			currencySymbol = ' Lek';
			break;
		case '51':
			currencySymbol = ' դր. ';
			break;
		case '52':
			currencySymbol = ' ман. ';
			break;
		default:
			currencySymbol = '$';
	}

	return currencySymbol;
};
