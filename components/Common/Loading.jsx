import {Spinner} from 'react-bootstrap';
//this is the starting point
function Loading() {
	//this is the starting point
	return (
		<div
			className='right-panel d-flex justify-content-center'
			style={{paddingLeft: '25%'}}
		>
			{' '}
			<Spinner animation='border' variant='primary' />
			<span
				style={{marginLeft: '-3rem', marginTop: '2rem'}}
				className='visually-hidden'
			>
				Fetching...
			</span>
		</div>
	);
}

export default Loading;
