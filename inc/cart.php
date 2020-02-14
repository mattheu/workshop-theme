<?php

namespace WorkshopTheme\Cart;

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\setup', 5 );
}

function setup() {
	register_meta(
		'user',
		'cart',
		[
			'description' => 'User Cart',
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
		]
	);
}
