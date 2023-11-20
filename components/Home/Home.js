/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-unresolved */
import React, {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import UserService from '@utils/HomeServices';
import LayoutServices from '@utils/layoutService/layoutService';
import NextImage from '@components/Common/Image';
import {DealECarousel, ECarousel} from '@components/Common/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import CarouselBanner from '@components/Common/CarouselBanner';
import {api} from '@utils/api';
import cookie from 'js-cookie';
import {useGlobalContext} from '@context/ContextApi';
import SpinnerLoader from '@components/Common/SpinnerLoader/SpinnerLoader';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

// import { useContextState } from '@context/reducer';

const Home = () => {
	const [newArrivals, setNewArrivals] = useState([]);
	const [banners, setBanners] = useState([]);
	const {getCartCount} = useGlobalContext();

	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	
	//this is a method to get data from api
	const getResults = async () => {
		setIsLoading(true);
		try {
			await api({
				url: '/list_cart',
				method: 'GET',
			});

			const result = await UserService.getHomeDetail();
			setNewArrivals(result.data.data.new_arrival);
			setIsLoading(false);
		} catch (e) {
			console.log({e});
			setIsLoading(false);
		}
	};
	//this is a method to get data from api

	const getannerDetailData = async () => {
		setIsLoading(true);
		try {
			const result = await UserService.getannerDetail();
			setBanners(result.data.data);
			setIsLoading(false);
		} catch (e) {
			console.log({e});
			setIsLoading(false);
		}
	};

	//this is a method to get data from api
	const fetchCategories = useCallback(async () => {
		setIsLoading(true);
		try {
			const results = await LayoutServices.getCategorylist();
			setIsLoading(false);
			const items = [];
			for (const item of results.data.data) {
				items.push(
					<div className='item' key={item.id}>
						<div className='deal-box'>
							<figure className='catimag'>
								<Link href={`/products/${item.slug}`} passHref>
									<NextImage
										src={item.image_link}
										alt={item.title}
										width={91}
										height={188}
									/>
								</Link>
							</figure>
							<div className='deal-txt'>
								<h4>{item.title}</h4>
							</div>
						</div>
					</div>,
				);
			}

			setCategories(items);
		} catch (e) {
			console.log({e});
			setIsLoading(false);
		}
	}, []);

	//this is a method to get data from api
	const handleguestUser = async () => {
		// const confirm = await confirmDialog('Are you want to return this order?');
		const response = await api({
			url: "/users/guest",
			method: 'post',
		});

		if (response.message === 'You have logged in successfully.') {
			// fetchOrders();
			// cookie.set('userAuth', JSON.stringify(response.data));
			cookie.set('tokenguest', response.data.api_token);
		}
	};

	useEffect(() => {
		getResults();
		fetchCategories();
		getannerDetailData();
		handleguestUser();
		getCartCount();
	}, []);
	// console.log(newArrivals, 'khud');
	return (
		<div className='home'>
			{/*Banner Start*/}
			<SpinnerLoader loading={isLoading} />
			<div className='banner-slider homeCarousel'>
				<CarouselBanner>{banners}</CarouselBanner>

				{/* <div className='hotdeals'>
					<div>
						<NextImage
							width={300}
							height={300}
							alt='hotdeal'
							src='/assets/images/hot-deal.png'
						/>
					</div>
					<div className='hotdeallnk'>
						<a>
							Hot Deals <i className='fas fa-long-arrow-right' />
						</a>
					</div>
				</div> */}
			</div>
			{/* <Carousel></Carousel> */}
			{/*Banner End*/}
			{/*ecommerce service Start*/}
			<div className='ecommerce-service ecomCarousel'>
				<div className='container'>
					<ul>
						<li>
							<i>
								<Image
									priority
									alt='freedelivery'
									src='/assets/images/1.webp'
									width={67}
									height={59}
								/>
							</i>
							<div className='ecom-info'>
								<strong>Free Delivery</strong>
								<p>From $59.89</p>
							</div>
						</li>
						<li>
							<i>
								<Image
									priority
									alt='ecommerce'
									src='/assets/images/2.webp'
									width={67}
									height={59}
								/>
							</i>
							<div className='ecom-info'>
								<strong>Support 24/7</strong>
								<p>Online 24 hours</p>
							</div>
						</li>
						<li>
							<i>
								<Image
									priority
									alt='ecommerceicon3'
									src='/assets/images/3.webp'
									width={67}
									height={59}
								/>
							</i>
							<div className='ecom-info'>
								<strong>Free Return</strong>
								<p>365 a day</p>
							</div>
						</li>
						<li>
							<i>
								<Image
									priority
									alt='ecommerceicon4'
									src='/assets/images/4.webp'
									width={67}
									height={59}
								/>
							</i>
							<div className='ecom-info'>
								<strong>Payment Method</strong>
								<p>Secure payment</p>
							</div>
						</li>
						<li>
							<i>
								<Image
									priority
									alt='ecommerceicon5'
									src='/assets/images/5.webp'
									width={67}
									height={59}
								/>
							</i>
							<div className='ecom-info'>
								<strong>Big Saving</strong>
								<p>Weekend Sales</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			{/*ecommerce service End*/}
			{/*Popular Start*/}
			<div className='deals dealsCarousel' aria-hidden='false'>
				<div className='container'>
					<div className='deals-inner'>
						<div className='slidegirl'>
							<h2>
								Popular
								<br />
								Categories
							</h2>
							<p>
								It is a long established fact that a reader will
								be distracted by the readable content of a page
								when looking at its layout. The point of using
								Lorem{' '}
							</p>
						</div>

						{categories.length>0 ? <div className='dealsoftheday'>
							<div className='dealsection' style={{padding: 20}}>
								<DealECarousel className='deal-slider'>
									{categories}
								</DealECarousel>
							</div>
						</div>: <Skeleton count={10}/>}
					</div>
				</div>
			</div>
			<div className='section sectionCarousel'>
				<div className='container'>
					<div className='mid-heading'>
						<h2>DEALS OF THE DAYS</h2>
					</div>

					<ECarousel max showThumbs={false}>
						{newArrivals?.length ? (
							newArrivals.map((item, key) => (
								<div
									className='item'
									key={key}
									style={{padding: 5}}
								>
									<div className='product-box'>
										<div className='sale-bx'>SALE</div>
										<figure>
											<Link
												key={key}
												href={`/product/${item?.slug}`}
												passHref
											>
												<NextImage
													width={500}
													height={500}
													// width='auto'
													// height='auto'
													alt={
														item.product_image?.[0]
															?.image_name ??
														'demo image'
													}
													src={
														item.product_image?.[0]
															?.image_link
													}
												/>
											</Link>
										</figure>
										<h4>{item.title}</h4>
										<div className='star-rating'>
											<img
												src='/assets/images/star.png'
												alt='star-icon'
											/>
										</div>
										<div className='price-bx d-flex justify-content-between'>
											<span className='price'>
												{item.discounted_price
													? `${item.display_discounted_price}`
													: `${item.display_price}`}
											</span>
											<span className='price'>
												<span
													style={{
														marginLeft: '5px',
														color: 'red',
													}}
												>
													<del>
														{item.discounted_price
															? `${item.display_price}`
															: null}
													</del>
												</span>
											</span>
										</div>
									</div>
								</div>
							))
						) : (
							<div />
						)}
					</ECarousel>
				</div>
			</div>
			{/*Ad Start*/}
			<div className='section ad-mid-section midSectionCarousel' >
				<div className='container'>
					<div className='row'>
						<div className='col-sm-6'>
							<a href='#top'>
								<Image
									priority
									src='/assets/images/add-banner.webp'
									alt='image'
									width={586}
									height={297}
								/>
							</a>
						</div>
						<div className='col-sm-6'>
							<a href='#top'>
								<Image
									priority
									src='/assets/images/add-banner1.webp'
									alt='image'
									height={297}
									width={586}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
			{/*Ad End*/}
			{/* <div className='section'>
				<div className='container'>
					<div className='mid-heading'>
						<h2>FEATURED PRODUCTS</h2>
					</div>

					<ECarousel max={true} showThumbs={false}>
						{newArrivals?.length ? (
							newArrivals.map((item, key) => (
								<div
									className='item'
									key={key}
									style={{padding: 5}}
								>
									<div className='product-box'>
										<div className='sale-bx'>SALE</div>
										<figure>
											<Link
												key={key}
												href={`/product/${item?.slug}`}
												passHref
											>
												<NextImage
													// width={500}
													// height={500}
													width='auto'
													height='auto'
													alt={
														item.product_image?.[0]
															?.image_name ||
														'demo image'
													}
													src={
														item.product_image?.[0]
															?.image_link
													}
												/>
											</Link>
										</figure>
										<h4>{item.title}</h4>
										<div className='star-rating'>
											<img src='/assets/images/star.png' />
										</div>
										<div className='price-bx  d-flex justify-content-between'>
											<span className='price'>
												{item.discounted_price
													? `${item.display_discounted_price}`
													: `${item.display_price}`}
											</span>
											<span className='price'>
												<span
													style={{
														marginLeft: '5px',
														color: 'red',
													}}
												>
													<del>
														{item.discounted_price
															? `${item.display_price}`
															: null}
													</del>
												</span>
											</span>w
										</div>
									</div>
								</div>
							))
						) : (
							<div></div>
						)}
					</ECarousel>
				</div>
			</div> */}
			{/*Ad Start*/}
			<div className='section ad-mid-section midSectionCarousel2'>
				<div className='container'>
					<div className='row'>
						<div className='col-sm-12'>
							<a href='#top'>
								<NextImage
									src='/assets/images/new-arrivals.webp'
									alt='new-arrivals'
									width={1199}
									height={227}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
			{/*Ad End*/}
			<div className='section lastSection' >
				<div className='container'>
					<div className='mid-heading'>
						<h2>New Arrivals</h2>
					</div>
					<ECarousel max>
						{newArrivals?.length
							? newArrivals.map((item, key) => (
									<div
										className='item'
										key={key}
										style={{padding: 5}}
									>
										<div className='product-box'>
											<div className='sale-bx'>SALE</div>
											<figure>
												<Link
													key={key}
													href={`/product/${item?.slug}`}
													passHref
												>
													<NextImage
														// width={400}
														// height={400}
														width='auto'
														height='auto'
														src={
															item
																.product_image?.[0]
																?.image_link
														}
														alt={
															item
																.product_image?.[0]
																?.image_name ??
															'img'
														}
													/>
												</Link>
											</figure>
											<h4>{item.title}</h4>
											<div className='price-bx d-flex justify-content-between'>
												<span className='price'>
													{item.discounted_price
														? `${item.display_discounted_price}`
														: `${item.display_price}`}
												</span>
												<span className='price'>
													<span
														style={{
															marginLeft: '5px',
															color: 'red',
														}}
													>
														<del>
															{item.discounted_price
																? `${item.display_price}`
																: null}
														</del>
													</span>
												</span>
											</div>
										</div>
									</div>
							  ))
							: []}
					</ECarousel>
				</div>
			</div>
		</div>
	);
};

export default Home;
