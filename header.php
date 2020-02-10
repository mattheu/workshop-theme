<!doctype html>

<html lang="en">
	<head>
		<meta charset="utf-8">
		<?php wp_head(); ?>
	</head>

	<body>

	<?php if ( is_front_page() && is_home() ) : ?>
		<h1 class="uk-heading-large uk-heading-line uk-text-center">
			<span>
				<?php bloginfo( 'title' ); ?>
			</span>
		</h1>
	<?php else : ?>
		<p class="uk-heading-large uk-heading-line uk-text-center">
			<a href="<?php echo esc_url( home_url() ); ?>"><?php bloginfo( 'title' ); ?></a>
		</p>
	<?php endif; ?>
