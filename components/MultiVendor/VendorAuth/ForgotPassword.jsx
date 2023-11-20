import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {toast} from 'react-toastify';

import {api} from '@utils/api';
//this is the starting point
const ForgotPassword = () => {
	const [inputs, setInputs] = useState({});
	const [validateError, setValidateError] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [loading, setLoading] = useState(false);
	//this is a method to validate
	const validate = values => {
		const emailRegex =
			// eslint-disable-next-line no-useless-escape
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		const errors = {};
		if (!values.email) {
			errors.email = 'Email field is required !';
		} else if (!emailRegex.test(values.email)) {
			errors.email = 'Enter valid email address!';
		}
		return errors;
	};

	//this is a method to change values
	const handleChange = event => {
		const name = event.target.name;
		const value = event.target.value.replace(/^\s/, '');
		setInputs(values => ({...values, [name]: value}));
	};
	//this is a method to change values
	const handleBlur = () => {
		setValidateError(validate(inputs));
	};
	//this is a method to change values
	const handleSubmit = async event => {
		event.preventDefault();
		// eslint-disable-next-line babel/camelcase
		inputs.device_id = 'wqr333443r34';
		// eslint-disable-next-line babel/camelcase
		inputs.device_type = 'android';

		const result = validate(inputs);

		if (Object.keys(result).length) {
			// eslint-disable-next-line no-undef
			setValidateError(result);
		} else {
			setValidateError({});
			setIsSubmit(true);
			try {
				setLoading(true);
				//this is a method to get data from api
				const response = await api({
					url: '/vendor/forgot-password',
					method: 'POST',
					data: inputs,
				});

				if (!response.error) {
					toast.success(response.message);
					setLoading(false);
				} else {
					toast.error(response.message);
					setLoading(false);
				}
				setIsSubmit(false);
				setLoading(false);
				setInputs('');
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
			}
		}
	};

	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='login_page_block'>
				<div className='container'>
					<div className='login_form_block'>
						<div className='row align-items-center'>
							<div className='col-md-6'>
								<div className='login_img'>
									<Image
										src='/assets/images/login-img.png'
										alt='login-img'
										width={560}
										height={354}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='login_form_right'>
									<div className='form_heading'>
										<h2>Reset your account password</h2>
									</div>

									<form onSubmit={handleSubmit}>
										<div className='form_filds_block'>
											<div className='form-group'>
												<input
													type='text'
													placeholder='Enter your email'
													className='form-control'
													name='email'
													value={
														inputs.email
															? inputs.email
															: ''
													}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<span className='text-danger'>
													{validateError.email}
												</span>
											</div>
											<div className='form-group'>
												<button
													className='custom-btn'
													type='submit'
													disabled={
														isSubmit
															? 'disabled'
															: ''
													}
												>
													{!isSubmit
														? 'Send Password Reset Link'
														: 'Please wait...'}
												</button>
											</div>
											<div className='dont_account_block'>
												<span className='dont_text'>
													Don’t have an account?
													<Link href='/vendor/signup'>
														Register Now
													</Link>
												</span>
											</div>
										</div>
										<div className='dont_account_block'>
											<span className='dont_text'>
												Already Have an Account?{' '}
												<Link href='/vendor/login'>
													Login
												</Link>
											</span>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
