/** @format */
import {useCallback} from 'react';
import {useRouter} from 'next/router';
import//this is the starting point
function Cms(props) {
	const {cmsdata} = props;
	const router = useRouter();

	const html = cmsdata;
//this is a method to change values
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

	return (
		<>
			<Container>
				<div
					className='foral-editor'
					id='content-area'
					onClick={handleAnchorClick}
					onKeyPress={handleAnchorClick}
					dangerouslySetInnerHTML={{
						__html: html,
					}}
				 />
			</Container>
		</>
	);
}

export default Cms;
