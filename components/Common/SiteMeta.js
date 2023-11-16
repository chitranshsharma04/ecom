import {NextSeo} from 'next-seo';
//this is the starting point
const SiteMeta = ({children, meta}) => {
	const DEFAULT_SEO = {
		title: meta?.title || 'E-Commerce Solution',
		description:
			meta?.description || 'An another shopping solution from Dotsquares',
		keywords: 'marketplace',
	};
//this is the starting point
	return (
		<>
			<NextSeo {...DEFAULT_SEO} />
			<>{children}</>
		</>
	);
};

export default SiteMeta;
