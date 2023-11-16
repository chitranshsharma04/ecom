import {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {toast} from 'react-toastify';

import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {api} from '@utils/api';
import {useContextState} from '@context/reducer';
import RatingWidget from '@components/Common/Rating';
import Loading from '@components/Common/Loading';
import Image from '@components/Common/Image';
//this is the starting point
const Review = props => {
	const {state, dispatch} = useContextState({
		orderLoading: true,
		orderList: [],
	});
	const [starNumber, setStarNumber] = useState('');
	const [inputs, setInputs] = useState({});

	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
//this is a method to get data from api
	const fetchOrders = useCallback(async () => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				orderLoading: true,
			},
		});
		//this is a method to get data from api
		const orders = await api({
			url: '/order/product',
			method: 'POST',
			data: {
				order_id: props?.data?.values?.order_id,
				product_id: props?.data?.values?.product_id,
			},
		});

		if (orders.status) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					orderList: orders?.data,
					orderLoading: false,
				},
			});
		}
	}, []);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);
//this is a method to change values
	const handleChange = val => {
		setInputs(prev => ({
			...prev,
			rating: val,
			order_id: props?.data?.values?.order_id,
			product_id: props?.data?.values?.product_id,
		}));
		setStarNumber(val);
	};
//this is a method to change values
	const handleBlur = () => {
		setFormErrors(validate(inputs));
	};
//this is a method to change values
	const handleSubmit = async event => {
		event.preventDefault();
		setFormErrors({});
		const result = validate(inputs);
		if (Object.keys(result).length) {
			setFormErrors(result);
			return;
		} else {
			setIsSubmit(true);
			try {
				//this is a method to get data from api
				const response = await api({
					url: '/order/review',
					method: 'POST',
					data: inputs,
				});
				if (response.error) {
					toast.error(response.message);
				} else {
					toast.success(response.message);
					setIsSubmitSuccess(true);
				}
				setIsSubmit(false);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
			}
		}
	};
	//this is a method to get data from api
	const handleKeyUp = e => {
		const name = e.target.name;
		const value = e.target.value.trimStart();
		setInputs(values => ({...values, [name]: value}));
	};
//this is a method to validate
	const validate = values => {
		const errors = {};
		if (!values.rating) {
			errors.rating = 'Rating is required!';
		}
		// if (values.comment.length < 10) {
		// 	errors.comment = 'Minimum 10 characters is required!';
		// } else if (values.comment.length > 100) {
		// 	errors.comment = 'Maximum 100 characters is required!';
		// }
		return errors;
	};
//this is a method to change values
	const handleChangeInput = event => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}));
	};

	return (
		<>
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider  col-md-9 dashright-bx'>
							<h1 className='dash-head'>Product Review</h1>
							{state.orderLoading ? (
								<Loading />
							) : isSubmitSuccess === true ? (
								<div className='row p-5'>
									<div
										className='col-md-6 mt-5'
										style={{margin: 'auto'}}
									>
										<h2>
											Thanks, Your review has been
											submitted.
										</h2>
									</div>
									<div className='col-md-12 text-center'>
										<Link
											href='/'
											className='custom-btn btn'
										>
											{' '}
											Continue shopping
										</Link>
									</div>
								</div>
							) : state?.orderList?.reviews_all.length > 0 ? (
								<div className='row p-5'>
									<div
										className='col-md-6 mt-5 text-center'
										style={{margin: 'auto'}}
									>
										<h2>
											You have already reviewd this
											Product.
										</h2>
									</div>
									<div className='col-md-12 text-center'>
										<Link
											href='/'
											className='custom-btn btn'
										>
											{' '}
											Continue shopping
										</Link>
									</div>
								</div>
							) : (
								<>
									<div className='row'>
										<div className='col-md-6'>
											<strong>Product Details:-</strong>{' '}
											{state.orderList.title}
											<br />
											<span>
												<Image
													src={
														state.orderList
															?.product_image?.[0]
															?.image_link
													}
													alt={
														state.orderList
															?.product_image?.[0]
															?.image_name
													}
													width={100}
													height={100}
												/>
											</span>
										</div>
									</div>
									<RatingWidget
										value={starNumber}
										onChange={handleChange}
										onBlur={handleBlur}
										view={false}
									/>
									<div
										className='form_filds_block'
										style={{margin: 'auto'}}
									>
										<form
											onSubmit={handleSubmit}
											autoComplete='off'
										>
											<div className='row'>
												<div
													className='col-md-6'
													style={{
														margin: 'auto',
														textAlign: 'center',
													}}
												>
													<span className='text-danger'>
														{formErrors.rating}
													</span>

													<div className='form-group'>
														<input
															type='hidden'
															name='rating'
															id='rating'
															value={starNumber}
														/>
														<textarea
															name='comment'
															id='comment'
															onKeyUp={
																handleKeyUp
															}
															onChange={
																handleChangeInput
															}
															onBlur={handleBlur}
															placeholder='Comment'
															className='form-control'
															cols='30'
															rows='10'
														>
															{inputs.comment}
														</textarea>

														<span className='text-danger text-center'>
															{formErrors.comment}
														</span>
													</div>
												</div>

												<div className='col-md-12'>
													{' '}
													<div className='form-group text-center'>
														<button
															type='submit'
															className='custom-btn'
															disabled={isSubmit}
														>
															{!isSubmit
																? 'Submit'
																: 'Please wait...'}
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Review;
