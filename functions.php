<?php

namespace WorkshopTheme;

require_once __DIR__ . '/inc/product.php';
require_once __DIR__ . '/inc/cart.php';

Product\bootstrap();
Cart\bootstrap();

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_scripts_and_styles' );

/**
 * Enqueue theme scripts and styles.
 *
 * @return void
 */
function enqueue_scripts_and_styles() {
	wp_register_style(
		'ui-kit',
		get_stylesheet_directory_uri() . '/css/ui-kit.css',
		[],
		'1.0'
	);

	wp_enqueue_style(
		'workshop-theme',
		get_stylesheet_directory_uri() . '/css/theme.css',
		[ 'ui-kit' ],
		'1.0'
	);

	// Enqueue the built theme script.
	$asset_file = include(
		plugin_dir_path( __FILE__ ) . 'build/index.asset.php'
	);

	wp_register_script(
		'workshop-theme-script',
		get_stylesheet_directory_uri() . '/build/index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	wp_localize_script(
		'workshop-theme-script',
		'workshopThemeData',
		[
			// Pass the cart data for the current user.
			'cart' => is_user_logged_in() ? get_user_meta( get_current_user_id(), 'cart', true ) : '',
			'user_id' => get_current_user_id(),
		]
	);

	// Enqueue the script only on single product pages.
	if ( is_single( 'product' ) ) {
		wp_enqueue_script( 'workshop-theme-script' );
	}
}
