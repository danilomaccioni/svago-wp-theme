<?php

get_header();

if ( have_posts() ) :

	$str = '';	

	while ( have_posts() ) :

		$str .= '<g class="post_item_box">';
	
		the_post();

		if ( ! is_page() ) {
			$counter++;
			$y = $counter;
			$str .=
				'<rect class="post_item_bg"></rect>' .
				'<a xlink:href="' . get_permalink() . '" class="link_post_item">' .
					'<text>' . get_the_title() . "</text>" .
					'<text>' . get_the_date() . "</text>" .
				'</a>'
			;
		}

		$str .= '</g>';
		
		
	endwhile;
	
	echo '<g >' . $str . '</g>';
endif;

get_footer();

?>