/* eslint-disable no-console */
import React from 'react';

import Productdetail from '@components/ProductDetail/ProductDetail';
import UserService from '@utils/ProductDetailServices';
import {api} from '@utils/api';

const meta = {
	title: '',
	description: '',
};
const index = props => {
	meta.title = 'hetere ';
	return (
		<div>
			<Productdetail productDetail={props.data || {}} />
		</div>
	);
};

index.meta = meta;

export default index;

export async function getServerSideProps(context) {
	const {query} = context;
	const slug = query.slug[query.slug.length - 1];

	try {
		if (context.req?.cookies?.userAuth) {
			const getResult = await api({
				url: `/product/product_detail/${slug}`,
				headers: {
					Authkey: JSON.parse(context.req?.cookies?.userAuth)
						?.auth_key,
					Authentication: `Bearer ${context.req?.cookies?.token}`,
					Currency: context.req?.cookies?.currencyValue
						? context.req?.cookies?.currencyValue
						: 1,
				},
			});

			return {
				props: getResult,
			};
		} else {
			const getResult = await UserService.getProductDetail(slug);
			return {
				props: getResult.data,
			};
		}
	} catch (error) {
		// console.log({e});
	}
}
