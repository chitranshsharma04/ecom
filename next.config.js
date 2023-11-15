/* eslint-disable prettier/prettier */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['testing-admin-php-ecom-single.projectstatus.co.uk'],
	},
};
module.exports = nextConfig;

// const withCss = require('@zeit/next-css');
// const withPurgeCss = require('next-purgecss');

// module.exports = withCss(
// 	withPurgeCss({
// 		purgeCssEnabled: ({dev, isServer}) => !dev && !isServer, // Only enable PurgeCSS for client-side production builds
// 	}),
// );