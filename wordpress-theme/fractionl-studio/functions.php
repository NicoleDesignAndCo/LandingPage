<?php
/**
 * Fractionl Studio theme bootstrap.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FRACTIONL_VERSION', '1.0.0' );
define( 'FRACTIONL_PATH', get_template_directory() );
define( 'FRACTIONL_URI', get_template_directory_uri() );

$fractionl_includes = array(
	'setup',
	'enqueue',
	'post-types',
	'acf-options',
	'acf-blocks',
	'acf-fields',
	'seo',
	'migration',
);

foreach ( $fractionl_includes as $fractionl_include ) {
	require_once FRACTIONL_PATH . '/inc/' . $fractionl_include . '.php';
}
