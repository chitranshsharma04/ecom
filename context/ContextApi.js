/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react';
import cookie from 'js-cookie';

// import {useRouter} from 'next/router';

// eslint-disable-next-line import/no-unresolved
import {api} from '@utils/api';

import {getCountriesList} from '@utils/helper';

import {useContextState} from './reducer';
//this is a method to create a context
const AppContext = React.createContext();
//this is the starting point
const AppProvider = ({children}) => {
	// const router = useRouter();
	// console.log('router', router);
	const [productList, setProductList] = useState([]);
	const {state, dispatch} = useContextState();
	const [configData, setConfigData] = useState();
	//this is a method to create a memo
	const isAuthenticated = useMemo(
		() => (cookie.get('token') ? true : false),
		[cookie.get('token')],
	);
	//this is a method to create a memo
	const currencyValue = useMemo(
		() => cookie.get('currencyValue'),
		[cookie.get('currencyValue')],
	);
	//this is a method to change values
	const handleConfigFile = async () => {
		// const confirm = await confirmDialog('Are you want to return this order?');
		//this is a method to get data from api
		const response = await api({
			url: '/users/user-config',
			method: 'get',
		});

		if (response.message === 'Settings fetch successfully.') {
			setConfigData(response.data);
		}
	};
	//this is a method to create a memo
	const isGuestAuthenticated = useMemo(
		() => (cookie.get('tokenguest') ? true : false),
		[cookie.get('tokenguest')],
	);
	//this is a method to create a callback
	const getCartCount = useCallback(async () => {
		// if (!isAuthenticated) return;
		// getUserCookie();
		//this is a method to get data from api
		const count = await api({
			url: '/cart/count',
			method: 'POST',
		});
		if (count.status)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					cartCount: count.data,
				},
			});
	}, []);
	//this is a method to create a callback
	const getWishlistCount = useCallback(async () => {
		if (!isAuthenticated) return;
		//this is a method to get data from api
		const count = await api({
			url: '/wishlist/count',
			method: 'POST',
		});
		if (count.status)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					wishlistCount: count.data,
				},
			});
	}, [isAuthenticated]);
	//this is a method to create a callback
	const getCountries = useCallback(async () => {
		//this is a method to get data from api
		const data = await getCountriesList();
		if (data?.length)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					countries: data,
				},
			});
	}, []);
//this is a method to get cookies
	const getUserCookie = () => {
		if (cookie?.get('userAuth')) {
			return JSON.parse(cookie.get('userAuth'));
		} else return {};
	};
	//this is a method to create callback
	const getUserProfileDetail = useCallback(async () => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				loadingProfile: true,
			},
		});

		if (!isAuthenticated) return;

		let cookiedata = getUserCookie('userAuth');
//this is a method to get data from api
		const response = await api({
			url: '/' + (cookiedata.userType ?? 'users') + '/profile-detail',
		});

		if (response.status)
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					userAuth: response.data,
				},
			});

		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				loadingProfile: false,
			},
		});
	}, [isAuthenticated]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isAuthenticated) {
				getWishlistCount();
				getUserProfileDetail();
				getCountries();
				handleConfigFile();
				getCartCount();
			}
		}, 2000);
		return () => clearTimeout(timer);
	}, [
		getCartCount,
		getUserProfileDetail,
		getWishlistCount,
		getCountries,
		isAuthenticated,
	]);

	useEffect(() => {
		handleConfigFile();
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				productList,
				setProductList,
				isAuthenticated,
				currencyValue,
				getCartCount,
				getWishlistCount,
				getUserCookie,
				isGuestAuthenticated,
				configData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
const useGlobalContext = () => {
	return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};
