import React from 'react';
import PropTypes from 'prop-types';

/**
 * Product component
 *
 * @param {object} props
 */
function Product( props ) {
	// Destructuring to extract data from props object and assign to constants.
	const {
		product,
		onAddToCart,
	} = props;

	return (
		<div>
			<h2>{ product.title.rendered }</h2>
			<p>Price: { product.meta.price }</p>
			<button
				type="button"
				onClick={ onAddToCart }
				className="uk-button uk-button-primary"
			>Add to cart</button>
		</div>
	);
}

Product.propTypes = {
	product: PropTypes.shape( {
		id: PropTypes.number.isRequired,
		title: PropTypes.shape( {
			rendered: PropTypes.string.isRequired,
		}).isRequired,
		meta: PropTypes.shape( {
			price: PropTypes.string.isRequired,
		}).isRequired,
	} ).isRequired,
	onAddToCart: PropTypes.func.isRequired,
}

export default Product;
