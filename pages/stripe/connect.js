import Connect from '@components/ThankU/Connect';
import {useRouter} from 'next/router';
//this is the starting point
const Email = () => {
	const router = useRouter();
	const pathdata = router.query;

	return (
		<p>
			<Connect pathdata={pathdata} />
		</p>
	);
};

export default Email;
