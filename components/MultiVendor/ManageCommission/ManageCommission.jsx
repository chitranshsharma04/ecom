import {useState, useEffect} from 'react';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import {api} from '@utils/api';
import {useRouter} from 'next/router';
//this is a starting point
const ManageCommission = () => {
	const [commissionList, setCommissionList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(null);
	const [pageLink, setPageLink] = useState();
	const [currentPage, setCurrentPage] = useState(1);

	const router = useRouter();
	//this is a method to set router
	const setRouterPage = async page => {
		router.replace({
			query: {...router.query, page: page},
		});
	};
	//this is a method to get commision
	const getCommissionList = async () => {
		try {
			setLoading(true);
			//this is a method to call api
			const response = await api({
				url: '/category-list/commission?page=' + page,
				method: 'GET',
			});
			if (response.data) {
				setLoading(false);
				setCommissionList(response.data);
				setCurrentPage(response.data.current_page);
				setPageLink(response.data.links);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		if (page) {
			getCommissionList(page);
			setRouterPage(page);
		}
	}, [page]);

	useEffect(() => {
		setPage(router?.query?.page ?? 1);
	}, [router?.query?.page]);

	return (
		<>
			<SpinnerLoader loading={loading} />
			<section className='cms-page'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider col-md-9 dashright-bx'>
							<div>
								<div className='row'>
									<div className='col-md-4'>
										<h2 className='pb-3 mt-lg-3'>
											MANAGE COMMISSION
										</h2>
									</div>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='col-md-12'>
									<div className='table-responsive'>
										<table className='table manage-product-tbl'>
											<thead>
												<tr>
													<th scope='col'>S.NO</th>
													<th scope='col'>Title</th>
													<th scope='col'>
														Commission
													</th>
													<th scope='col'>Status</th>
													<th scope='col'>Created</th>
												</tr>
											</thead>
											<tbody>
												{commissionList?.data?.length >
												0 ? (
													commissionList?.data
														?.length > 0 &&
													commissionList?.data?.map(
														(value, index) => {
															return (
																<tr key={index}>
																	<th scope='row'>
																		{index +
																			1 +
																			10 *
																				(currentPage -
																					1)}
																	</th>
																	<td>
																		{
																			value.title
																		}
																	</td>
																	<td>
																		{
																			value.admin_commission
																		}
																	</td>
																	<td>
																		{value.status ===
																		1
																			? 'Active'
																			: 'In-Active'}
																	</td>
																	<td>
																		{value.created_at
																			.slice(
																				0,
																				10,
																			)
																			.split(
																				'-',
																			)
																			.reverse()
																			.join(
																				'-',
																			)}
																	</td>
																</tr>
															);
														},
													)
												) : (
													<tr>
														<td
															colSpan='7'
															align='center'
														>
															<strong>
																Commission Not
																Available.
															</strong>
														</td>
													</tr>
												)}
											</tbody>
										</table>
										<ul className='pagination justify-content-center'>
											{commissionList?.data?.length > 0
												? pageLink?.map(
														(item, index) => (
															<li
																key={index}
																className={
																	'page-item' +
																	(item.url
																		? ''
																		: ' disabled') +
																	(item.active
																		? ' active'
																		: '')
																}
															>
																<a
																	href='#top'
																	className='page-link'
																	onClick={() => {
																		setPage(
																			item?.url?.split(
																				'page=',
																			)?.[1],
																		);
																	}}
																>
																	<span aria-hidden='true'>{item.label}</span>
																</a>
															</li>
														),
												  )
												: ''}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ManageCommission;
