<?php
/**
 * Controlled ACF block library.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_register_acf_blocks(): void {
	if ( ! function_exists( 'acf_register_block_type' ) ) {
		return;
	}

	$blocks = array(
		'hero'               => array( 'Studio Hero', 'Large page introduction with optional actions and the signature interface artwork.', 'cover', array( 'align', 'anchor' ) ),
		'split-introduction' => array( 'Split Introduction', 'Eyebrow, statement, supporting copy, and an optional link.', 'align-wide', array( 'anchor' ) ),
		'card-grid'          => array( 'Card Grid', 'A controlled two, three, or four-column collection of content cards.', 'grid-view', array( 'anchor' ) ),
		'studio-differences' => array( 'Studio Differentiators', 'Numbered studio benefits with the Fractionl visual canvas.', 'screenoptions', array( 'anchor' ) ),
		'content-listing'    => array( 'Content Listing', 'Query-driven service, work, insight, or team cards.', 'index-card', array( 'anchor' ) ),
		'process-steps'      => array( 'Process Steps', 'A numbered sequence of project or contact steps.', 'editor-ol', array( 'anchor' ) ),
		'team-grid'          => array( 'Team Grid', 'Team members from Studio Settings.', 'groups', array( 'anchor' ) ),
		'media-text'         => array( 'Media and Text', 'A focused editorial section with image and supporting copy.', 'align-pull-left', array( 'align', 'anchor' ) ),
		'checklist'          => array( 'Checklist', 'A heading and client-friendly checklist.', 'yes-alt', array( 'anchor' ) ),
		'call-to-action'     => array( 'Call to Action', 'A controlled studio CTA with Tally and optional secondary link.', 'megaphone', array( 'anchor' ) ),
		'contact-options'    => array( 'Contact Options', 'Inquiry cards that open the configured Tally form.', 'email-alt', array( 'anchor' ) ),
		'engagement-models'  => array( 'Engagement Models', 'Numbered ways to work with the studio.', 'schedule', array( 'anchor' ) ),
	);

	foreach ( $blocks as $slug => $settings ) {
		acf_register_block_type(
			array(
				'name'            => 'fractionl-' . $slug,
				'title'           => __( $settings[0], 'fractionl-studio' ),
				'description'     => __( $settings[1], 'fractionl-studio' ),
				'category'        => 'fractionl-studio',
				'icon'            => $settings[2],
				'mode'            => 'preview',
				'keywords'        => array( 'fractionl', 'studio' ),
				'supports'        => array_fill_keys( $settings[3], true ),
				'render_template' => FRACTIONL_PATH . '/blocks/' . $slug . '/render.php',
				'enqueue_style'   => FRACTIONL_URI . '/assets/css/main.css',
			)
		);
	}
}
add_action( 'acf/init', 'fractionl_register_acf_blocks' );

function fractionl_block_categories( array $categories ): array {
	array_unshift(
		$categories,
		array(
			'slug'  => 'fractionl-studio',
			'title' => __( 'Fractionl Studio', 'fractionl-studio' ),
		)
	);
	return $categories;
}
add_filter( 'block_categories_all', 'fractionl_block_categories' );

function fractionl_block_classes( array $block, string $base ): string {
	$classes = array( $base );
	if ( ! empty( $block['className'] ) ) {
		$classes[] = sanitize_html_class( $block['className'] );
	}
	if ( ! empty( $block['align'] ) ) {
		$classes[] = 'align' . sanitize_html_class( $block['align'] );
	}
	return implode( ' ', $classes );
}

function fractionl_block_id( array $block, string $base ): string {
	return ! empty( $block['anchor'] ) ? sanitize_title( $block['anchor'] ) : $base . '-' . sanitize_html_class( $block['id'] ?? wp_unique_id() );
}
