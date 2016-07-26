<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
>
	<link  href="<?php echo get_stylesheet_uri(); ?>" xmlns="http://www.w3.org/1999/xhtml" rel="stylesheet" type="text/css" />
	<link href="<?php echo get_template_directory_uri(); ?>/images/favicon.ico" xmlns="http://www.w3.org/1999/xhtml" rel="shortcut icon" />
	<script xlink:href="<?php echo get_template_directory_uri(); ?>/js/svago-bg.js"  type="application/ecmascript" />
	<script xlink:href="<?php echo get_template_directory_uri(); ?>/js/svago-style.js" type="application/ecmascript" />
	<script xlink:href="<?php echo get_template_directory_uri(); ?>/js/svago-main.js"  type="application/ecmascript" />
	<image
	id="svg_wallpaper"
	preserveAspectRatio="none"
	xlink:href="<?php echo get_template_directory_uri(); ?>/images/background.jpg"
	x="-10%"
	y="-10%"
	height="120%"
	width="120%"
/>
<title><?php bloginfo('name'); ?></title>

<g id="bar_group">
	<rect id="bar_bg"></rect>
	
	<a xlink:href="<?php echo site_url(); ?>">
		<text id="header_txt"><?php bloginfo('name'); ?></text>
	</a>

	<g id="headerDesc_group">
		<rect id="headerDesc_box"></rect>
		<text id="headerDesc_text">
			<?php bloginfo('description'); ?>
		</text>
	</g>
	
	<?php
		echo svgGetPages('Posts');
		$th = wp_get_theme();
	?>
	<text id="footer_txt">
		<a xlink:href="<?php echo $th->get( 'ThemeURI' ); ?>" target="_blank">
    	<tspan><?php echo $th->get( 'Name' ); ?></tspan>
		</a>
    <tspan>
    	<?php echo $th->get( 'Version' ) ; ?> is a
    </tspan>
		<a xlink:href="http://www.wordpress.org" target="_blank">
			<tspan>Wordpress</tspan>
		</a>
		<tspan> theme by</tspan>
		<a xlink:href="<?php echo $th->get( 'AuthorURI' ); ?>" target="_blank">
			<tspan><?php echo $th->get( 'Author' ); ?></tspan>
		</a>
	</text>
</g>
