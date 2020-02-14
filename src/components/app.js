import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import apiFetch from '@wordpress/api-fetch';
import Cart from './cart';
import Product from './product';

function App( props ) {
	const {
		savedCart = {}, // Set default value.
		userID = 0,
	} = props;

	// Setup state for different things using the useState hook.
	const [ products, setProducts ] = useState( [] );
	const [ cart, updateCart ] = useState( savedCart );
	const [ isLoading, setIsLoading ] = useState( false );

	// Fetch data from API when initially rendered.
	useEffect( () => {
		// Before fetching data, set loading state.
		setIsLoading( true );

		// Use apiFetch libary. Just need to import @wordpress-api-fetch.
		// It is a wrapper around window.fetch
		// It handles authentication and parsing JSON automatically.
		apiFetch( { path: '/wp/v2/product' } )
			// apiFetch uses promises, so can implement functionality after request is complete.
			.then( data => {
				// Set timeout to simulate slow network requests.
				window.setTimeout( () => {
					// Store products returned from api in state.
					setProducts( data );
					// Update isLoading state.
					setIsLoading( false );
				}, 500 );
			} );
	}, [] );

	// When cart changes, store updated cart data in user meta.
	useEffect( () => {

		// If not logged in,
		// Or if the cart is the same as the initial cart state
		// Return early. Don't save cart.
		if ( ! userID || cart === savedCart ) {
			return;
		}

		// Make a post request to the current user endpoint.
		// Post updated meta data.
		apiFetch( {
			path: '/wp/v2/users/me',
			method: 'POST',
			data: { meta: { cart: JSON.stringify( cart ) } },
		} );
	}, [ cart ] );

	// Handle logic when adding to a cart.
	const handleAddToCart = product => {
		// Note use of spread operator to clone the cart.
		const newCart = { ...cart }

		// Increment the counter for the current product.
		// Or set initial value if not yet set.
		if ( newCart[ product.id ] ) {
			newCart[ product.id ] += 1;
		} else {
			newCart[ product.id ] = 1;
		}

		// Update the cart state with new cart.
		updateCart( newCart );
	}

	// Handle resetting cart back to empty object.
	const handleResetCart = () => {
		updateCart( {} )
	}

	// Return React element.
	// Note passign cart state as a prop to the Cart component.
	// Note use of Fragment to wrap multiple elements without adding extra nodes.
	// Note && syntax for conditionally showing elements e.g. Loading...
	return (
		<div>
			<h1>My Shop</h1>
			<hr />

			<Cart
				cart={ cart }
				onResetCart={ () => handleResetCart() }
			/>
			<hr />

			{ isLoading && (
				<p>Loading...</p>
			) }

			{ ! isLoading && products.map( product => {
				return (
					<Fragment key={ product.id }>
						<Product
							product={ product }
							onAddToCart={ () => handleAddToCart( product ) }
						/>
						<hr />
					</Fragment>
				)
			} ) }
		</div>
	);
}

App.propTypes = {
	savedCart: PropTypes.object,
	userId: PropTypes.number,
}
export default App;
