<?php
/**
 * Lightweight metadata, schema, and analytics.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_seo_plugin_active(): bool {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) || defined( 'SEOPRESS_VERSION' );
}

function fractionl_document_title( string $title ): string {
	if ( is_singular() && function_exists( 'get_field' ) ) {
		$custom = get_field( 'seo_title', get_queried_object_id() );
		if ( $custom ) {
			return sanitize_text_field( $custom );
		}
	}
	return $title;
}
add_filter( 'pre_get_document_title', 'fractionl_document_title' );

function fractionl_output_metadata(): void {
	if ( fractionl_seo_plugin_active() ) {
		return;
	}
	$site_name   = fractionl_option( 'studio_name', 'Fractionl Studio' );
	$description = '';
	$canonical   = '';
	$image       = '';
	$type        = is_singular( 'post' ) ? 'article' : 'website';

	if ( is_singular() ) {
		$post_id     = get_queried_object_id();
		$description = get_field( 'meta_description', $post_id ) ?: get_the_excerpt( $post_id );
		$canonical   = get_field( 'canonical_url', $post_id ) ?: get_permalink( $post_id );
		$image_id    = get_field( 'social_image', $post_id ) ?: get_post_thumbnail_id( $post_id );
		$image       = $image_id ? wp_get_attachment_image_url( (int) $image_id, 'full' ) : '';
		if ( get_field( 'seo_noindex', $post_id ) ) {
			echo '<meta name="robots" content="noindex,nofollow">' . "\n";
		}
	} elseif ( is_home() ) {
		$description = 'Practical insights on web design, WordPress, product design, UX/UI, web development, and digital strategy.';
		$canonical   = home_url( '/insights/' );
	}

	if ( ! $image ) {
		$default_image = (int) fractionl_option( 'default_social_image', 0 );
		$image         = $default_image ? wp_get_attachment_image_url( $default_image, 'full' ) : '';
	}
	$title = wp_get_document_title();
	if ( $description ) {
		printf( "<meta name=\"description\" content=\"%s\">\n", esc_attr( wp_strip_all_tags( $description ) ) );
	}
	if ( $canonical ) {
		printf( "<link rel=\"canonical\" href=\"%s\">\n", esc_url( $canonical ) );
	}
	printf( "<meta property=\"og:type\" content=\"%s\">\n<meta property=\"og:title\" content=\"%s\">\n", esc_attr( $type ), esc_attr( $title ) );
	if ( $description ) {
		printf( "<meta property=\"og:description\" content=\"%s\">\n", esc_attr( wp_strip_all_tags( $description ) ) );
	}
	if ( $canonical ) {
		printf( "<meta property=\"og:url\" content=\"%s\">\n", esc_url( $canonical ) );
	}
	printf( "<meta property=\"og:site_name\" content=\"%s\">\n<meta property=\"og:locale\" content=\"en_CA\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n", esc_attr( $site_name ) );
	if ( $image ) {
		printf( "<meta property=\"og:image\" content=\"%s\">\n<meta name=\"twitter:image\" content=\"%s\">\n", esc_url( $image ), esc_url( $image ) );
	}
}
add_action( 'wp_head', 'fractionl_output_metadata', 1 );

function fractionl_output_schema(): void {
	if ( fractionl_seo_plugin_active() ) {
		return;
	}
	$schema = array(
		'@context'    => 'https://schema.org',
		'@type'       => 'ProfessionalService',
		'name'        => fractionl_option( 'studio_name', 'Fractionl Studio' ),
		'url'         => home_url( '/' ),
		'email'       => fractionl_option( 'studio_email', 'hello@fractionlstudio.com' ),
		'description' => fractionl_option( 'studio_description', 'Digital design and development studio serving businesses across Canada and the United States.' ),
		'address'     => array(
			'@type'           => 'PostalAddress',
			'addressLocality' => 'Edmonton',
			'addressRegion'   => 'AB',
			'addressCountry'  => 'CA',
		),
		'areaServed'  => array( 'Canada', 'United States' ),
		'knowsAbout'  => array( 'Product Design', 'UX/UI Design', 'Web Design', 'Web Development', 'WordPress' ),
	);
	printf( '<script type="application/ld+json">%s</script>' . "\n", wp_json_encode( $schema, JSON_UNESCAPED_SLASHES ) );

	if ( is_singular( 'post' ) ) {
		$post_id = get_queried_object_id();
		$article = array(
			'@context'         => 'https://schema.org',
			'@type'            => 'Article',
			'headline'         => get_the_title( $post_id ),
			'description'      => get_the_excerpt( $post_id ),
			'datePublished'    => get_the_date( DATE_W3C, $post_id ),
			'dateModified'     => get_the_modified_date( DATE_W3C, $post_id ),
			'mainEntityOfPage' => get_permalink( $post_id ),
			'author'           => array(
				'@type' => 'Organization',
				'name'  => fractionl_option( 'studio_name', 'Fractionl Studio' ),
			),
			'publisher'        => array(
				'@type' => 'Organization',
				'name'  => fractionl_option( 'studio_name', 'Fractionl Studio' ),
				'url'   => home_url( '/' ),
			),
		);
		if ( has_post_thumbnail( $post_id ) ) {
			$article['image'] = get_the_post_thumbnail_url( $post_id, 'full' );
		}
		printf( '<script type="application/ld+json">%s</script>' . "\n", wp_json_encode( $article, JSON_UNESCAPED_SLASHES ) );
	}
}
add_action( 'wp_head', 'fractionl_output_schema', 20 );

function fractionl_output_analytics(): void {
	$ga4_id = trim( (string) fractionl_option( 'ga4_id', '' ) );
	if ( ! preg_match( '/^G-[A-Z0-9]+$/', $ga4_id ) ) {
		return;
	}
	wp_enqueue_script( 'fractionl-ga4', 'https://www.googletagmanager.com/gtag/js?id=' . rawurlencode( $ga4_id ), array(), FRACTIONL_VERSION, false );
	wp_add_inline_script( 'fractionl-ga4', "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" . esc_js( $ga4_id ) . "');", 'before' );
}
add_action( 'wp_enqueue_scripts', 'fractionl_output_analytics' );
