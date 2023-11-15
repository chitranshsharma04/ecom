import React, {useMemo, useEffect} from 'react';
import {useRouter} from 'next/router';
import CommonBreadcrumbs from '@components/Common/Header/Breadcrumb/CommonBreadcrumbs';

import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import {AppProvider, useListingContext} from './context';

const Listing = () => {
	const router = useRouter();
	const {state} = useListingContext();

	const breadcrumbs = useMemo(
		() =>
			state.breadcrumbs?.length
				? [
						...state.breadcrumbs.map(br => ({
							name: br.title,
							href:
								br.slug === router.query?.slugs?.[0]
									? ''
									: br.slug,
							active: br.slug === router.query?.slugs?.[0],
						})),
				  ]
				: [],
		[state.breadcrumbs],
	);

	useEffect(() => {
		console.log(router.pathname);
	}, [router]);

	return (
		<>
			<CommonBreadcrumbs breadcrumbs={breadcrumbs}></CommonBreadcrumbs>
			<div className='section pad-btm-sec'>
				<div className='container'>
					<div className='row no-gutters justify-content-between'>
						<LeftPanel />

						<RightPanel />
					</div>
				</div>
			</div>
		</>
	);
};

const Index = () => {
	return (
		<AppProvider>
			<Listing />
		</AppProvider>
	);
};
export default Index;
