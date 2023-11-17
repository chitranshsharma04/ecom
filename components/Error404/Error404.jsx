/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
const Error404 = () => {
	return (
		<>
			<div className='section pad-btm-sec'>
				<div className='container'>
					<div className='error'>
						<div className='error-inner'>
							<h2>
								<span>Error</span> 404
							</h2>
							<div className='error-img'>
								<img src='/assets/images/error-img.png' alt="PlaceHolderImg" />
							</div>
							<h3>
								<strong>Oops!</strong> Sorry, The Page Not Found
							</h3>
							<p>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry&apos;s standard dummy.
							</p>
							<a className='custom-btn btn' href='#top'>
								Back to home
							</a>{' '}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Error404;
