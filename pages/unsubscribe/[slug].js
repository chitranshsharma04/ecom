import Unsubscribe from '@components/ThankU/Unsubscribe';
import {useRouter} from 'next/router';
//this is the starting point
const Email = () => {
	const router = useRouter();
	const pathdata = router.query;
	// const sessionid = pathdata.slug.split('?')[0];
	return (
		<p>
			<Unsubscribe data={{pathdata}} />
		</p>
	);
};

export default Email;
