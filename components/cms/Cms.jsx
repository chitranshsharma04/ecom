/** @format */
import {useCallback} from 'react';
import {useRouter} from 'next/router';
import {Container} from 'react-bootstrap';
//this is the starting point
function Cms(props) {
	const {cmsdata} = props;
	const router = useRouter();

	const html = cmsdata;
	//this is a callback func
	const handleAnchorClick = useCallback(
		e => {
			e.preventDefault();

			const targetLink = e.target.closest('a');
			if (!targetLink) return;
			const pathname = targetLink.href;

			router.push(pathname);
		},
		[router],
	);
	//this is the starting point
	return (
		<>
			<Container>
				<div
					role="button" tabIndex={0}
					className='foral-editor'
					id='content-area'
					onClick={handleAnchorClick}
					onKeyPress={handleAnchorClick}
				>{html}</div>
			</Container>
		</>
	);
}

export default Cms;
