<?php

get_header();

$wp_object = get_post();
echo(
	'<text id="page_title">' . $wp_object->post_title . '</text>'.
	'<g id="page_group">' .
		'<rect id="page_box"></rect>' .
		'<text id="page_content">' . svgFilterText( $wp_object->post_content ) . '</text>' .
	'</g>'
);

get_footer();

?>