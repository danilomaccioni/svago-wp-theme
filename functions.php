<?php

// OUTPUT BUFFER CLEANER
// il filtraggio viene fatto solo per la parte pubblica, l'area admin viene
// mantenuta integra

if ( !( is_admin() ) && !( is_login_page() ) ) {
	add_action('wp_loaded', 'buffer_start');
	function buffer_start() {
		ob_start("svagoCleaner");
	}

	add_action('wp_cache_close', 'buffer_end');
	function buffer_end() {
		ob_end_flush();
	}
}

function svagoCleaner($buffer) {
	header("Content-Type: image/svg+xml");
  /*return '<?xml version="1.0" standalone="yes"?>' . $buffer . '</svg>';*/
  
  return $buffer . '</svg>';
}

////////////////////////////////////////////////////////////////////////////////

function is_login_page() {
	return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
}

////////////////////////////////////////////////////////////////////////////////

function svgGetPages($string) {
	$pages = get_pages();
	$nav = '';
	
	if ($pages) {

		$nav = '<g id="nav_group"><text id="nav_txt"><rect id="nav_bg"></rect>';
		$nav .= '<tspan dx="1%">Pages:</tspan>';
		
		$postsPageID = getPostsPageID();
		
		// Se i post non hanno una pagina statica
		if ($postsPageID == false) $nav .= '<a xlink:href="' . get_home_url() . '" class="posts-link' . svgIsSelected( $postsPageID ) . '"><tspan dx="1%">' . $string . '</tspan></a>';

		// Lista le pagine
  	foreach ( $pages as $page ) {
  		
  		$classStr = ($postsPageID == $page->ID) ? ' class="posts-page-link' . svgIsSelected() . '"' : ' class="page-link"';
  		
			$nav .= '<a xlink:href="' . get_page_link( $page->ID ) . '"' . $classStr . '><tspan dx="1%">';
			$nav .= $page->post_title;
			$nav .= '</tspan></a>';
  	}
		$nav .= '</text></g>';
		return $nav;
	}
}

////////////////////////////////////////////////////////////////////////////////

//http://stackoverflow.com/questions/4837006/how-to-get-the-current-page-name-in-wordpress

function getPostsPageID() {	
	if ( 'page' == get_option('show_on_front') ) {
		return get_option('page_for_posts');
	} else {
		return false;
	}
}

////////////////////////////////////////////////////////////////////////////////

function svgIsSelected( $item ) {
	$status = '';
	if ( $item == false ) {
		
		
		
	}
	
	return $status;
}

////////////////////////////////////////////////////////////////////////////////

function svgListPost() {
	$str = '';
	$counter=0;
	
	if ( have_posts() ) :

		$str .= '<tspan x="2%" dy="1.5em" class="post_item">POSTS</tspan>';
	
		while ( have_posts() ) : the_post();
	
		
		if ( ! is_page() ) {
			$counter++;
			$y = $counter;
			$str .=
				
					'<a xlink:href="' . get_permalink() . '" class="link_post_item">' .
						'<tspan x="2%" dy="1.5em" class="post_item">' . the_title('','',false) . "</tspan>" .
					'</a>'
			;
		}
	endwhile; endif;

	echo '<text x="0%" y="30%" class="post_list">' . $str  . '</text>';
}

////////////////////////////////////////////////////////////////////////////////

function svgFilterText( $str ) {
	$str = preg_replace('/\[caption(.*?)?\](?:(.+?)?\[\/caption\])?/' , '' , $str);

	$newStr = '';

	$str = wp_strip_all_tags( $str );
	$arrStr = explode(' ' , $str);
	
	foreach ($arrStr as $item) {
		//$newStr .= '<tspan>' . $item . '</tspan>';
		$newStr .= $item ;
	}
	
	return $str;
}

////////////////////////////////////////////////////////////////////////////////

?>