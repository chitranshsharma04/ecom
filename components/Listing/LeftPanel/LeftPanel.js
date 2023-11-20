import dynamic from 'next/dynamic';
import {useCallback, useEffect, useMemo, useState} from 'react';
// eslint-disable-next-line import/no-unresolved
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {useRouter} from 'next/router';
// eslint-disable-next-line import/no-unresolved
import LayoutServices from '@utils/layoutService/layoutService';
// eslint-disable-next-line import/no-unresolved
import {getCurrencySymbol} from '@utils/helper';

import {useListingContext} from '../context';

const Collapsible = dynamic(() => import('react-collapsible'), {
	ssr: false,
});
//this is the starting point
const LeftPanel = () => {
	// const {state, dispatch} = useListingContext();
	const [categories, setCategories] = useState([]);
	const {state, dispatch} = useListingContext();
	const [search, setSearch] = useState('');
	const [collapseToggle, setcollapseToggle] = useState(true);
	const [collapseToggleUp, setcollapseToggleUp] = useState('up');
	const [clickedItem, setClickedItem] = useState(0);
	const [collapseToggle2, setcollapseToggle2] = useState(true);
	const min = state?.sliderValue?.[0];
	const max = state?.sliderValue?.[1];

	const router = useRouter();

	// useEffect(() => {
	// 	setMin(parseInt(state?.sliderValue?.[0] ?? 0));
	// 	setMax(parseInt(state?.sliderValue?.[1] ?? 0));
	// }, [state?.sliderValue]);

	// const category = useMemo(() => {
	// 	return router?.query?.category || router?.query?.slugs?.[0] || null;
	// }, [router]);

	useEffect(() => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				sliderChange: [
					parseInt(state?.sliderValue?.[0]),
					parseInt(state?.sliderValue?.[1]),
				],
			},
		});
	}, [state?.sliderValue?.[0], state?.sliderValue?.[1]]);
	//this is a method to change values
	const handleChangeSlider = value => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				sliderChange: value,
				sliderValChange: !state.sliderValChange,
			},
		});
	};
	//this is a method to get data from api
	const getResults = useCallback(async () => {
		try {
			const resultCategorylist = await LayoutServices.getCategorylist();
			setCategories(resultCategorylist.data.data);
		} catch (e) {
			console.log({e});
		}
	}, []);

	useEffect(() => {
		getResults();
	}, [getResults]);

	useEffect(() => {
		handleChangeSlider(state?.sliderValue);
	}, [router]);
	//this is a method to change values
	const handleChange = e => {
		setSearch(e.target.value);
	};
	//this is a method to change values
	const handleKeyPress = e => {
		setSearch(e.target.value);
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				search: search,
			},
		});
	};
	//this is a method to change values
	const handleSubmit = () => {
		dispatch({
			type: 'SET_DATA',
			data: {
				...state,
				search: search,
			},
		});
	};
	//this is a method to memo
	const sliderRangeval = useMemo(() => {
		return state?.sliderChange
			?.map(val => `${getCurrencySymbol()} ${val}`)
			.join(' - ');
	}, [state?.sliderChange]);
	// const step = useMemo(() => {
	// 	return max < 10000 ? 100 : max < 1000000 ? 10000 : 100000;
	// }, [max]);

	return (
			<div className='left-panel'>
				<div className='input-group'>
					<input
						type='text'
						id='searchTitle'
						className='form-control'
						placeholder='Search'
						value={search}
						onChange={handleChange}
						onKeyUp={handleKeyPress}
					/>
					<div className='input-group-append'>
						<button
							aria-label='Search Button'
							className='btn search-btn '
							id='searchButton'
							type='button'
							onClick={handleSubmit}
						>
							&nbsp;
							<i className='fas fa-search' />
						</button>
					</div>
				</div>

				<h4>Filters</h4>
				<div id='accordion'>
					<div className='card'>
						<Collapsible
							open={collapseToggle}
							contentElementId={'Shop by Category'}
							trigger={
								<div className='card-header'>
									<a
										className={`${
											collapseToggle
												? ''
												: 'card-link collapsed'
										}`}
										data-toggle='collapse'
										href='#collapseOne'
										aria-expanded='false'
										onClick={() =>
											setcollapseToggle(!collapseToggle)
										}
									>
										Shop by Category
									</a>
								</div>
							}
						>
							{categories.map((items, index) => (
								<div className='card-body' key={index}>
									<ul className='catgory-list'>
										<li>
											<a
												href={`/products/${items.slug}`}
												className='card-name'
											>
												{items.title}
											</a>
											<Collapsible
												open={
													state?.breadcrumbs?.[0]
														?.slug === items.slug
												}
												contentElementId={
													'Shop by Category' + index
												}
												trigger={
													<a
														href='#top'
														onClick={() => {
															setcollapseToggleUp(
																collapseToggleUp ===
																	'up'
																	? 'down'
																	: 'up',
															);
															setClickedItem(
																index,
															);
														}}
													>
														<i
															style={{
																float: 'right',
																marginTop:
																	'-13px',
															}}
															className={`fa fa-chevron-${
																clickedItem ===
																index
																	? collapseToggleUp
																	: 'down'
															}`}
														/>
													</a>
												}
											>
												<div
													id='title40'
													className='collapses1_women collapse show'
													data-parent='#collapseOne'
												>
													<div className='card-body'>
														<ul>
															{items.children.map(
																(
																	subItems,
																	idx,
																) => (
																	<li
																		className='collapseThree_clothing menu-active showcollapseOne collapse show'
																		data-parent='#collapseThree'
																		key={
																			idx
																		}
																	>
																		<a
																			href={`/products/${items.slug}/${subItems.slug}`}
																			className={`card-name ${
																				state
																					?.breadcrumbs?.[1]
																					?.slug ===
																				subItems.slug
																					? 'text-danger'
																					: ''
																			}`}
																		>
																			{
																				subItems.title
																			}
																		</a>
																		<a
																			aria-hidden=true
																			href='#title46'
																			className='card-link'
																			style={{
																				float: 'right',
																			}}
																			data-toggle='collapse'
																		/>
																	</li>
																),
															)}
														</ul>
													</div>
												</div>
											</Collapsible>
										</li>
									</ul>
								</div>
							))}
						</Collapsible>
					</div>
					<div className='card'>
						<Collapsible
							trigger={
								<div className='card-header'>
									<a
										className={`card-link ${
											collapseToggle2 ? 'collapsed' : ''
										}`}
										data-toggle='collapse'
										href='#collapseTwo'
										onClick={() =>
											setcollapseToggle2(!collapseToggle2)
										}
									>
										Filter By Price
									</a>
								</div>
							}
						>
							<div className='card-body px-2'>
								<p className='text-center text-muted'>
									{sliderRangeval}
								</p>

								<Slider
									range
									draggableTrack
									value={state.sliderChange}
									min={parseInt(min)}
									max={parseInt(max)}
									// step={200}
									allowCross={false}
									onChange={value =>
										handleChangeSlider(value)
									}
								/>
							</div>
						</Collapsible>
					</div>
				</div>
			</div>
	);
};

export default LeftPanel;
