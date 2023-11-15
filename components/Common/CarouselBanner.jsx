/* eslint-disable prettier/prettier */
import Image from 'next/image';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Carousel} from 'react-responsive-carousel';

import banner1 from '../../public/assets/images/slide-1.jpg';
import banner2 from '../../public/assets/images/slide-2.jpg';
const CarouselBanner = ({children}) => {
	const renderIndicator = (onClickHandler, isSelected, index) => {
		const dotStyle = {
			backgroundColor: isSelected ? '#333' : '#ccc',
			width: '10px',
			height: '10px',
			borderRadius: '50%',
			display: 'inline-block',
			margin: '0 5px 250px 5px', // add 10px margin bottom
		};
		return (
			<li
				style={dotStyle}
				onClick={onClickHandler}
				key={index}
				// role='span'
				tabIndex='0'
				aria-label={`slide ${index + 1}`}
			/>
		);
	};
	console.log(banner1, 'child');
	return (
		<Carousel
			// swipeable={true}
			// axis={'horizontal'}
			// autoFocus={true}
			// autoPlay={true}
			// dynamicHeight={false}
			// useKeyboardArrows={false}
			interval={2000}
			infiniteLoop
			// showArrows={true}
			// showStatus={false}
			// showThumbs={true}
			// showIndicators={true}
			preventMovementUntilSwipeScrollTolerance={false}
			transitionTime={500}
			renderIndicator={renderIndicator}
		>
			{children.length > 0
				? children.map((item, index) => {
						let title = item.title;
						if (title?.length > 10) {
							title = title.substring(0, 8) + '...';
						}
						if (index === 0) {
							return (
								<div key={index} className='banner-slider '>
									<div className='item'>
										<div className='container d-flex flex-wrap justify-content-between'>
											<div className='banner-content'></div>
											<div className='banner-content'>
												<span className='title-top'>
													Latest Collection
												</span>
												<h1>
													New Arrivals
													{/* { {title} } */}
												</h1>
												<p>
													It is a long established
													fact that a reader will be
													distracted by the readable
													content of a page when
													looking at its layout. The
													point of using Lorem Ipsum
													is that it has a
													more-or-less normal
													distribution
												</p>
											</div>

											<figure className='slider-img'>
												{/* <NextImage
												src={item.image}
												alt='img2girl'
												width="auto"
												height="auto"
												style={{padding: '10%'}}
											/> */}
												<Image
													src={banner1 ? banner1 : "https://placehold.co/600x400"}
													alt='img2girl'
													width={1080}
													height={250}
													priority
													loading='eager'
												/>
											</figure>
										</div>
									</div>
								</div>
							);
						} else {
							return (
								<div
									key={index}
									className='banner-slider '
									style={{}}
								>
									<div className='item'>
										<div className='container d-flex flex-wrap justify-content-between'>
											<div className='banner-content'>
												<span className='title-top'>
													Latest Collection
												</span>
												<h1>
													New Arrivals
													{/* { {title} } */}
												</h1>
												<p>
													It is a long established
													fact that a reader will be
													distracted by the readable
													content of a page when
													looking at its layout. The
													point of using Lorem Ipsum
													is that it has a
													more-or-less normal
													distribution
												</p>
											</div>

											<figure
												className='slider-img'
												style={{}}
											>
												{/* <NextImage
												src={item.image}
												alt='img2girl'
												width="auto"
												height="auto"
												style={{padding: '10%'}}
											/> */}
												<Image
													src={banner2 ? banner2 : "https://placehold.co/600x400"}
													alt='img2girl'
													width={1080}
													height={250}
													priority
												/>
											</figure>
										</div>
									</div>
								</div>
							);
						}
				  })
				: null}
		</Carousel>
	);
};

export default CarouselBanner;
