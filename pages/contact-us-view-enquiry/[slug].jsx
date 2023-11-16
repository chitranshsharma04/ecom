import {useRouter} from 'next/router';

import ContactUsViewDetailEnquiry from '@components/ContactUsEnquiry/ContactUsViewDetailEnquiry';
//this is the starting point
const ContactUsViewEnquiry = () => {
	const router = useRouter();
	const pathdata = router.query;
	return <ContactUsViewDetailEnquiry data={pathdata} />;
};

export default ContactUsViewEnquiry;
