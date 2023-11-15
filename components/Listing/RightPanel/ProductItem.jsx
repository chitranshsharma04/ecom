import {toast} from 'react-toastify';

import {api} from '@utils/api';
import {useGlobalContext} from '@context/ContextApi';
import NextImage from '@components/Common/Image';
import {useContextState} from '@context/reducer';

function ProductItem({item}) {
	const {
		state: globalState,
		getWishlistCount,
		isAuthenticated,
	} = useGlobalContext();
	const {state, dispatch} = useContextState({inWishlist: item.inWishlist});

	const addRemoveToWishlist = async (event, product) => {
		try {
			event.preventDefault();
			if (!isAuthenticated)
				return toast.info('Please login to add Wishlist');
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: true,
				},
			});

			const response = await api({
				url: '/wishlist/add-remove-list',
				method: 'POST',
				data: {
					product_id: product.id,
					user_id: globalState.userAuth.id,
					status_type: state.inWishlist ? 0 : 1,
				},
			});
			if (response.status) {
				dispatch({
					type: 'SET_DATA',
					data: {
						...state,
						removeFromCartLoading: false,
						inWishlist: !state.inWishlist,
					},
				});
				if (response.message) toast.success(response.message);
				getWishlistCount();
			}
		} catch (error) {
			dispatch({
				type: 'SET_DATA',
				data: {
					...state,
					removeFromCartLoading: false,
				},
			});
		}
	};
	return (
		<div className='product-box'>
			{state.removeFromCartLoading ? (
				<div
					className='spinner-border wishlistLoader'
					role='status'
					style={{float: 'right'}}
				>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<span
					className='addWish like'
					onClick={event => addRemoveToWishlist(event, item)}
				>
					<NextImage
						width={15}
						height={15}
						src={`/assets/images/${
							state.inWishlist ? 'heartfull' : 'heart'
						}.png`}
						alt={'heart'}
					/>

					{/* <i className='fa fa-heart' style={{color: 'red'}} id='wishlist' /> */}
				</span>
			)}
			<figure>
				<NextImage
					width={400}
					height={500}
					src={item.product_image[0]?.image_link}
					alt={item.title}
				/>
			</figure>

			<h4>{item.title} </h4>
			<span className='price'>
				{item.display_discounted_price
					? `${item.display_discounted_price}`
					: `${item.display_price}`}
				&nbsp;
				{item.display_discounted_price ? (
					<s style={{color: 'red'}}>{`${item.display_price}`}</s>
				) : null}
			</span>
		</div>
	);
}

export default ProductItem;
