import {useEffect, useCallback, useState} from 'react';
import {api} from '@utils/api';
import {Spinner} from 'react-bootstrap';
import Cookies from 'js-cookie';
('use client');
import {useRouter} from 'next/router';
//this is a starting point
const Connect = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const router = useRouter();
	//this is a method to change values
	const handleReturn = useCallback(async () => {
		const acc = Cookies.get('connect_account');
		Cookies.remove('connect_account');
		setLoading(true);
		//this is a method to get data from api
		const response = await api({
			url: '/vendor/stripe/update-stripe-key',
			method: 'POST',
			data: {stripe_id: acc},
		});

		if (response.error) {
			setError(response.message);
		}

		setLoading(false);

		setTimeout(() => {
			router.push('/vendor/account');
		}, 3000);
	}, []);

	useEffect(() => {
		if (router.isReady) {
			handleReturn();
		}
	}, [router]);

	return (
		<div className='page-main'>
			<div className='text-center thank-block'>
				<div className='container'>
					<br />
					<br />
					{loading ? (
						<Spinner animation='border' variant='primary' />
					) : (
						<>
							<img
								src='/assets/images/thankYou.png'
								alt='thank-you'
							/>
							<br />
							<br />
							<h1>
								{error ??
									'Stripe Account Connected Successfuly'}
							</h1>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Connect;
