<?php
/**
 * Public content types and URL structures.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_register_content_types(): void {
	register_post_type(
		'service',
		array(
			'labels'       => array(
				'name'          => __( 'Services', 'fractionl-studio' ),
				'singular_name' => __( 'Service', 'fractionl-studio' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'rewrite'      => array(
				'slug'       => 'services',
				'with_front' => false,
			),
			'menu_icon'    => 'dashicons-admin-tools',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
		)
	);

	register_post_type(
		'case_study',
		array(
			'labels'       => array(
				'name'          => __( 'Case Studies', 'fractionl-studio' ),
				'singular_name' => __( 'Case Study', 'fractionl-studio' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'rewrite'      => array(
				'slug'       => 'work',
				'with_front' => false,
			),
			'menu_icon'    => 'dashicons-portfolio',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
		)
	);

	register_taxonomy(
		'work_type',
		array( 'case_study' ),
		array(
			'labels'            => array( 'name' => __( 'Work Types', 'fractionl-studio' ) ),
			'public'            => false,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'hierarchical'      => true,
		)
	);
}
add_action( 'init', 'fractionl_register_content_types' );

function fractionl_insights_rewrite_rules(): void {
	add_rewrite_rule( '^insights/page/([0-9]+)/?$', 'index.php?post_type=post&paged=$matches[1]', 'top' );
	add_rewrite_rule( '^insights/([^/]+)/?$', 'index.php?name=$matches[1]', 'top' );
}
add_action( 'init', 'fractionl_insights_rewrite_rules' );

function fractionl_post_permalink( string $permalink, WP_Post $post ): string {
	if ( 'post' !== $post->post_type ) {
		return $permalink;
	}
	return home_url( user_trailingslashit( 'insights/' . $post->post_name ) );
}
add_filter( 'post_link', 'fractionl_post_permalink', 10, 2 );

function fractionl_query_insights_index( WP_Query $query ): void {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}
	if ( $query->is_home() ) {
		$query->set( 'posts_per_page', 12 );
	}
}
add_action( 'pre_get_posts', 'fractionl_query_insights_index' );
