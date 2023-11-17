import {useState, useEffect} from 'react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import {useContextState} from '@context/reducer';
import {api} from '@utils/api';
import AccountSidebar from '@components/Common/Account/AccountSidebar';
import {useGlobalContext} from '@context/ContextApi';
import {confirmDialog} from '@utils/helper';
import {useRouter} from 'next/router';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
//this is the starting point
const AddressBook = () => {
	const {state, dispatch} = useContextState();
	const {state: globalState} = useGlobalContext();
	const [page, setPage] = useState(null);
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	//this is a method to change values
	const setRouterPage = async page => {
		router.replace({
			query: {...router.query, page: page},
		});
	};
	//this is a method to get data from api
	const getUserAddresses = async page => {
		setLoading(true);
		//this is a method to get data from api
		const response = await api({
			url: '/user-address?page=' + page,
			method: 'GET',
		});

		if (response.status) {
			setLoading(false);
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					addresses: response.data.data,
					links: response.data.links,
				},
			});
		}
	};
	//this is a method to change values
	const handleDelete = async id => {
		const confirm = await confirmDialog(
			'Are you really want to delete this address',
		);
		if (confirm) {
			//this is a method to get data from api
			const response = await api({
				url: `/user-address/delete/${id}`,
				method: 'GET',
			});

			if (response.status) {
				toast.success('Address deleted successfully');
				getUserAddresses();
			}
		}
	};

	useEffect(() => {
		if (page) {
			getUserAddresses(page);
			setRouterPage(page);
		}
	}, [page]);

	useEffect(() => {
		setPage(router?.query?.page ?? 1);
	}, [router?.query?.page]);
	//this is the starting point
	return (
		<>
			<SpinnerLoader loading={loading} />
			<div className='cms-page innerblock-padd'>
				<div className='container'>
					<div className='dashborad-panel'>
						<div className='col-md-3'>
							<AccountSidebar />
						</div>
						<div className='dashborad-rightsider  col-md-9 dashright-bx'>
							<div className='d-flex justify-content-between'>
								<h1 className='dash-head'>Address Book</h1>
								<Link href='/address-book/create' passHref>
									<button className='btn btn-danger btn-lg'>
										+ Add Address
									</button>
								</Link>
							</div>

							<table className='table table-hover'>
								<thead>
									<tr>
										<th scope='col'>Address</th>
										<th scope='col'>City</th>
										<th scope='col'>Postal Code</th>
										<th scope='col'>State/Province</th>
										<th scope='col'>Country</th>
										<th scope='col'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{state.addresses?.length ? (
										state.addresses?.map(
											(address, index) => (
												<tr key={index}>
													<td className='word-break'>
														{address.address1},{' '}
														{address.address2}
													</td>
													<td className='word-break'>
														{address.city}
													</td>
													<td>
														{address.postal_code}
													</td>
													<td className='word-break'>
														{address.state}
													</td>
													<td>
														{
															globalState?.countries?.find(
																i =>
																	i.id ===
																	address.country_id,
															)?.name
														}
													</td>
													<td>
														<Link
															href={`/address-book/edit/${address.id}`}
															passHref
															className='btn'
														>
															<i className='fas fa-edit' />
														</Link>
														<i
															className='fas fa-trash btn'
															onClick={() =>
																handleDelete(
																	address.id,
																)
															}
														/>
													</td>
												</tr>
											),
										)
									) : (
										<tr>
											<td
												colSpan={6}
												className='text-center'
											>
												No address available
											</td>
										</tr>
									)}
								</tbody>
							</table>
							{state.addresses?.length ? (
								<ul className='pagination justify-content-center'>
									{state?.links?.map((item, index) => (
										<li
											key={index}
											className={
												'page-item' +
												(item.url ? '' : ' disabled') +
												(item.active ? ' active' : '')
											}
										>
											<a
												className='page-link'
												onClick={() => {
													setPage(
														item?.url?.split(
															'page=',
														)?.[1],
													);
												}}
											>
												<span aria-hidden='true'>
													{item.label}
												</span>
											</a>
										</li>
									))}
								</ul>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddressBook;
