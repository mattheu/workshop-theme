<?php

namespace WorkshopTheme;

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
}
