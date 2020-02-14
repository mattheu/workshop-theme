import React from 'react';

/**
 * Cart component.
 *
 * @param {object} props Component props
 */
function Cart( props ) {
	// Destructuring to extract data from props object and assign to constants.
	const {
		cart,
		onResetCart,
	} = props;

	return (
		<div>
			<h3>Cart</h3>
			<pre>
				{ /* Just output JSON for demonstration purposes */ }
				{ JSON.stringify( cart ) }
			</pre>
			<button
				onClick={ onResetCart }
				className="uk-button uk-button-default"
			>
				Clear Cart
			</button>
		</div>
	);
}

export default Cart;
