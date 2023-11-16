/* eslint-disable no-console */

import ThankU from '@components/ThankU/ThankU';
//this is a starting point
const index = props => {
	return (
		<div>
			<ThankU props={props} />
		</div>
	);
};

index.auth = true;
export default index;
//this is a starting point
export async function getServerSideProps(context) {
	const {query} = context;
	try {
		return {
			props: query,
		};
	} catch (error) {
		console.log('klg-26', error);
		// console.log({e});
	}
}
