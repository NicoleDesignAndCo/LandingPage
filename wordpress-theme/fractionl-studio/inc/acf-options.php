<?php
/**
 * ACF options pages.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_register_options_pages(): void {
	if ( ! function_exists( 'acf_add_options_page' ) ) {
		return;
	}
	acf_add_options_page(
		array(
			'page_title' => __( 'Studio Settings', 'fractionl-studio' ),
			'menu_title' => __( 'Studio Settings', 'fractionl-studio' ),
			'menu_slug'  => 'fractionl-settings',
			'capability' => 'manage_options',
			'redirect'   => false,
			'position'   => 61,
			'icon_url'   => 'dashicons-admin-customizer',
		)
	);
}
add_action( 'acf/init', 'fractionl_register_options_pages' );

function fractionl_acf_json_save_point(): string {
	return FRACTIONL_PATH . '/acf-json';
}
add_filter( 'acf/settings/save_json', 'fractionl_acf_json_save_point' );

function fractionl_acf_json_load_point( array $paths ): array {
	$paths[] = FRACTIONL_PATH . '/acf-json';
	return $paths;
}
add_filter( 'acf/settings/load_json', 'fractionl_acf_json_load_point' );
