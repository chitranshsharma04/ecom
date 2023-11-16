/* eslint-disable no-console */
// import React from 'react';

import OrderDetail from '@components/Order/OrderDetail';
import {api} from '@utils/api';
//this is a starting point
const index = data => {
	return (
		<div>
			<OrderDetail data={data || {}} />
		</div>
	);
};

export default index;
//this is a starting point
export async function getServerSideProps(context) {
	const {query} = context;
	try {
		if (!context.req?.cookies?.userAuth)
			return {
				props: {},
			};
		//this is a method to get data from api
		const getResult = await api({
			url: `/order/${query.slug}`,
			headers: {
				Authkey: JSON.parse(context.req?.cookies?.userAuth)?.auth_key,
				Authentication: `Bearer ${context.req?.cookies?.token}`,
			},
		});

		return {
			props: getResult.data,
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
