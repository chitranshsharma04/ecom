// import React from 'react';
import {Watch} from 'react-loader-spinner';
//this is a starting point
const SpinnerLoader = () => {
	return (
		<div>
			<Watch
				height='25'
				width='80'
				radius='48'
				color='#fff'
				ariaLabel='watch-loading'
				wrapperStyle={{}}
				wrapperClassName=''
				visible
			/>
		</div>
	);
};

export default SpinnerLoader;
