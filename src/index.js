import ReactDOM from 'react-dom';
import App from './components/app';

const appContainer = document.getElementById( 'app-container' );

// Parse the cart data, stored as JSON, into an object.
const savedCart = workshopThemeData.cart ? JSON.parse( workshopThemeData.cart ) : {};

// The appContainer isn't available on every page,
// so only render the app if the element is found.
if ( appContainer ) {
	ReactDOM.render( (
		<App
			savedCart={ savedCart }
			userId={ workshopThemeData.userId }
		/>
	), appContainer );
}
