import {useMemo, useEffect} from 'react';
import {useRouter} from 'next/router';
import CommonBreadcrumbs from '@components/Common/Header/Breadcrumb/CommonBreadcrumbs';

import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import {AppProvider, useListingContext} from './context';
//this is the starting point
const Listing = () => {
	const router = useRouter();
	const {state} = useListingContext();
//this is a method to create a memp
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

	useEffect(() => {}, [router]);
//this is the starting point
	return (
		<>
			<CommonBreadcrumbs breadcrumbs={breadcrumbs} />
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
//this is the starting point
const Index = () => {
	return (
		<AppProvider>
			<Listing />
		</AppProvider>
	);
};
export default Index;
