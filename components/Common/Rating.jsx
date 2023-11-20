import React from 'react';
//this is the starting point
function Star(props) {
	return (
		<div
			role='button'
			tabIndex={0}
			className={`star ${props.value === 0 ? 'semi-active' : ''} ${
				props.position <= props.rated ? 'active' : ''
			} `}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onClick={props.onClick}
		>
			<i className='fas fa-star' />
		</div>
	);
}
//this is the starting point
function Rating() {
	// function Rating(props) {
	// let rating = props.rating;

	return (
		<></>
		// 	<span>
		// 		You rated this {rating} star{rating > 1 ? 's' : ''}
		// 	</span>
	);
}
//this is the starting point
class RatingWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stars: Array(5).fill(-1),
			rated: 0,
		};
	}
	//this is a method to change values
	handleMouseOver(i) {
		if (this.props.view) return;
		const currentRating = this.state.rated;

		if (currentRating > 0) {
			const hoverRatedStars = this.state.stars.slice();
			hoverRatedStars.fill(currentRating, 0, i);
			// _.fill(hoverRatedStars, 0, currentRating, i);
			this.setState({stars: hoverRatedStars});
		} else {
			const hoverStars = Array(5).fill(-1);
			hoverStars.fill(0, 0, i + 1);
			// _.fill(hoverStars, 0, 0, i + 1);
			this.setState({stars: hoverStars});
		}
	}
	//this is a method to change values
	handleMouseOut() {
		if (this.props.view) return;
		const currentRating = this.state.rated;
		if (currentRating > 0) {
			const resetRatedStars = this.state.stars.slice();
			resetRatedStars.fill(currentRating, -1, resetRatedStars.length);

			// _.fill(resetRatedStars, -1, currentRating, resetRatedStars.length);
			this.setState({stars: resetRatedStars});
		} else {
			const resetStars = this.state.stars.slice();
			resetStars.fill(-1, 0, resetStars.length);

			// _.fill(resetStars, -1, 0, resetStars.length);
			this.setState({stars: resetStars});
		}
	}
	//this is a method to change values
	handleClick(i) {
		if (this.props.view) return;
		const clickedStar = this.state.stars.slice();

		clickedStar.fill(1, 0, i);
		clickedStar.fill(1, i, clickedStar.length);

		// _.fill(clickedStar, 1, 0, i);
		// _.fill(clickedStar, 1, i, clickedStar.length);

		this.setState({
			stars: clickedStar,
			rated: i,
		});
		if (this.props.onChange) this.props.onChange(i);
	}
	//this is a method to change values
	componentDidMount() {
		this.setState(prevState => ({
			...prevState,
			rated: this.props.value,
		}));
	}
	//this is a method to change values
	handleRating() {
		return <Rating rating={this.state.rated} />;
	}
	//this is a method to change values
	renderStar(i) {
		return (
			<Star
				position={i}
				value={this.state.stars[i]}
				rated={this.state.rated}
				onMouseEnter={() => this.handleMouseOver(i)}
				onMouseLeave={() => this.handleMouseOut()}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	//this is the starting point
	render() {
		return (
			<div className='rating-stars-widget-outer'>
				<div className='rating-stars'>
					{this.renderStar(1)}
					{this.renderStar(2)}
					{this.renderStar(3)}
					{this.renderStar(4)}
					{this.renderStar(5)}
				</div>

				{this.handleRating(this.state.rated)}
			</div>
		);
	}
}

export default RatingWidget;
