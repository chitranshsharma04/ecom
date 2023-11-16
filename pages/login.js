import login from '@components/Auth/Login';

login.meta = {
	title: 'Login | E-Commerce Solution',
};
//this is the starting point
export async function getServerSideProps(ctx) {
	const token = ctx.req.cookies.token;
	if (token) {
		return {
			redirect: {
				permanent: false,
				destination: '/dashboard',
			},
		};
	} else {
		return {props: {}};
	}
}
export default login;
