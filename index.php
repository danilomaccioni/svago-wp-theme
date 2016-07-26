<?php

get_header();

$postsPageID = getPostsPageID();

// Post senza pagina statica
if ( ! $postsPageID ) {
	svgListPost();
}

get_footer();

?>