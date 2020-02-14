<?php

namespace WorkshopTheme\Product;

const POST_TYPE = 'product';

function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\\setup_post_types', 5 );
}

function setup_post_types() {
	register_post_type( POST_TYPE, [
		'labels'             => [
			'name'          => 'Products',
			'singular_name' => 'Product',
		],
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => [
			'slug' => 'product'
		],
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => [ 'title', 'editor', 'custom-fields' ],
		'show_in_rest' => true,
	] );

	register_post_meta(
		POST_TYPE,
		'price',
		[
			'description' => 'Product price',
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'sanitize_callback' => function( $price ) {
				return floatval( $price );
			},
		]
	);

}
