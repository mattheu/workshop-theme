<?php

get_header();

while ( have_posts() ) :
	the_post();
	?>

	<div id="app-container">
	</div>

	<?php
endwhile;

get_footer();
