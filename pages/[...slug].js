import {useRouter} from 'next/router';
import ErrorPage from 'next/error';

import Cms from '@components/cms/Cms';
import Loading from '@components/Loading';
import {api} from '@utils/api';
//this is the starting point
const Page = props => {
	const {cmsdata} = props;
	const router = useRouter();
	if (!router.isFallback && !cmsdata) {
		return <ErrorPage statusCode={404} />;
	}

	return router.isFallback ? (
		<Loading />
	) : (
		<>
			<Cms cmsdata={cmsdata} />
			<div id='dynamicstyle' />
		</>
	);
};
//this is a method to get data from api
export async function getStaticProps({params}) {
	const slug = params?.slug ? params.slug.join('/') : '/';
//this is a method to get data from api
	const props = await getCmsPageProps(slug);

	let meta = {};
	if (props?.result && props.result.data) {
		const page = props.result.data;
		meta = {
			title: page.meta_title,
			description: page.meta_description,
			keywords: page.meta_keyword,
		};
	}
	return {
		props: {
			cmsdata: props?.result?.data?.description ?? null,
			meta,
		},
		revalidate: 60 * 15,
	};
}
//this is a method to get data from api
export async function getStaticPaths() {
	const pages = await api({
		url: '/users/page-all',
	});

	const paths = pages.data?.filter(item => {
	    return (
		item.slug !== 'term-policy' &&
		item.slug !== 'about-us' &&
		item.slug !== 'contact-us'
	    );
	});

	return {
		paths:
			paths?.map(node =>
				node.slug === '/' ? `${node.slug}` : `/${node.slug}`,
			) ?? [],
		fallback: true,
	};
}
//this is a method to get data from api
async function getCmsPageProps(path) {
	try {
		let result = await api({
			url: `/users/page-all?slug=${path}`,
			method: 'get',
		});

		return {
			result,
		};
	} catch (e) {
		return [];
	}
}

Page.Layout = true;
export default Page;
