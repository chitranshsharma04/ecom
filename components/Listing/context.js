import React, {useContext, useCallback, useEffect} from 'react';
import {useRouter} from 'next/router';

import {api} from '@utils/api';

import {useListingState} from './reducer';
import {useGlobalContext} from '@context/ContextApi';

const AppContext = React.createContext();
//this is the starting point
const AppProvider = ({children}) => {
	const router = useRouter();
	const {state, dispatch} = useListingState();
	const {currencyValue} = useGlobalContext();
	//this is a method to get data from api
	const fetchProductList = useCallback(async () => {
		const category =
			router?.query?.category ||
			router?.query?.slugs?.[router?.query?.slugs.length - 1] ||
			'';
		const payload = {
			category_slug: category,
		};
		if (router?.query?.search) {
			payload.search = router?.query?.search;
		}

		if (router?.query?.page) {
			payload.page = router?.query?.page;
		}

		if (state.sliderChange) {
			payload.min_price = state.sliderChange[0];
			payload.max_price = state.sliderChange[1];
		}

		if (state.search) {
			payload.search = state.search;
		}

		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				productLoading: true,
			},
		});

		const url = '/product/product-list';
		//this is a method to get data from api
		const response = await api({
			url: url,
			method: 'POST',
			data: payload,
		});

		if (response.status) {
			let sliderValueMin = [];
			sliderValueMin.push(
				parseInt(response?.data?.rang?.min),
				parseInt(response?.data?.rang?.max),
			);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					productList: response.data.data,
					breadcrumbs: response.data.breadcrumbs,
					productLoading: false,
					totalProduct: response.data.total,
					TotalPage: response.data.last_page,
					sliderValue: sliderValueMin,
				},
			});
		} else
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					productList: [],
					productLoading: false,
					totalProduct: 0,
					TotalPage: 0,
				},
			});
	}, [
		state.sliderValChange,
		state.loadPage,
		router?.query,
		state.search,
		currencyValue,
	]);
	useEffect(() => {
		//this is a method to create a timeout
		const timer = setTimeout(() => {
			fetchProductList();
		}, 1000);
		return () => clearTimeout(timer);
	}, [fetchProductList]);
	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
};
//this is a method to create a context
const useListingContext = () => {
	return useContext(AppContext);
};
export {AppProvider, useListingContext};
