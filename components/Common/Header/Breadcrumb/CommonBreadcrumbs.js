import React, {useEffect} from 'react';
import Link from 'next/link';
import {useCommonState} from '../../reducer';
//this is the starting point
const CommonBreadcrumbs = props => {
	const {breadcrumbs} = props;
	const {state} = useCommonState();

	useEffect(() => {
		//It needs to empty, If any logic arises, dev will add it.
	}, [state]);
//this is the starting point
	return (
		<nav aria-label='breadcrumb' className='breadcrumb-sec'>
			<div className='container'>
				<ol className='breadcrumb'>
					<li className='breadcrumb-item' aria-current='page'>
						<Link href='/'>Home</Link>
					</li>
					{breadcrumbs.map((item, index) => {
						return item.href ? (
							<li
								className='breadcrumb-item'
								key={`breadcrumb-item-${index}`}
								aria-current='page'
							>
								<Link
									className={`${
										item?.active ? 'text-danger' : ''
									}`}
									href={item.href}
								>
									{item.name}
								</Link>
							</li>
						) : (
							<li
								className='breadcrumb-item active'
								key={`breadcrumb-item-${index}`}
								aria-current='page'
							>
								{item.name}
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
};

export default React.memo(CommonBreadcrumbs);
