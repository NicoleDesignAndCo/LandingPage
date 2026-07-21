<?php
/**
 * Theme setup and shared helpers.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_setup(): void {
	load_theme_textdomain( 'fractionl-studio', FRACTIONL_PATH . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_editor_style( 'assets/css/editor.css' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary navigation', 'fractionl-studio' ),
			'footer'  => __( 'Footer navigation', 'fractionl-studio' ),
		)
	);

	add_image_size( 'fractionl-card', 720, 405, true );
	add_image_size( 'fractionl-hero', 1720, 970, false );
}
add_action( 'after_setup_theme', 'fractionl_setup' );

function fractionl_asset_url( string $path ): string {
	return esc_url( FRACTIONL_URI . '/assets/' . ltrim( $path, '/' ) );
}

function fractionl_option( string $name, mixed $fallback = '' ): mixed {
	if ( function_exists( 'get_field' ) ) {
		$value = get_field( $name, 'option' );
		if ( null !== $value && false !== $value && '' !== $value ) {
			return $value;
		}
	}
	return $fallback;
}

function fractionl_link( ?array $link, string $class = '' ): void {
	if ( empty( $link['url'] ) || empty( $link['title'] ) ) {
		return;
	}
	$target = ! empty( $link['target'] ) ? $link['target'] : '_self';
	$rel    = '_blank' === $target ? 'noopener noreferrer' : '';
	printf(
		'<a class="%1$s" href="%2$s" target="%3$s"%4$s>%5$s</a>',
		esc_attr( $class ),
		esc_url( $link['url'] ),
		esc_attr( $target ),
		$rel ? ' rel="' . esc_attr( $rel ) . '"' : '',
		esc_html( $link['title'] )
	);
}

function fractionl_get_page_url( string $slug, string $fallback = '/' ): string {
	$page = get_page_by_path( $slug );
	return $page instanceof WP_Post ? get_permalink( $page ) : home_url( $fallback );
}

function fractionl_body_classes( array $classes ): array {
	$classes[] = 'fractionl-site';
	return $classes;
}
add_filter( 'body_class', 'fractionl_body_classes' );

function fractionl_primary_menu_fallback(): void {
	$items = array(
		'about'    => 'About',
		'services' => 'Services',
		'work'     => 'Work',
		'insights' => 'Insights',
		'process'  => 'Process',
		'team'     => 'Team',
		'contact'  => 'Contact',
	);
	echo '<ul class="menu">';
	foreach ( $items as $slug => $label ) {
		printf( '<li><a href="%1$s">%2$s</a></li>', esc_url( fractionl_get_page_url( $slug, '/' . $slug . '/' ) ), esc_html( $label ) );
	}
	echo '</ul>';
}

function fractionl_tally_button( string $label = 'Start a Project', string $class = 'btn btn-primary' ): void {
	printf( '<button class="%1$s tally-button" type="button" data-tally-open>%2$s</button>', esc_attr( $class ), esc_html( $label ) );
}

function fractionl_render_section_heading( string $eyebrow, string $heading, string $intro = '' ): void {
	echo '<div class="section-head section-head--wide">';
	if ( $eyebrow ) {
		printf( '<p class="eyebrow">%s</p>', esc_html( $eyebrow ) );
	}
	printf( '<h2 class="section-title">%s</h2>', wp_kses_post( $heading ) );
	if ( $intro ) {
		printf( '<p class="section-intro">%s</p>', esc_html( $intro ) );
	}
	echo '</div>';
}

function fractionl_case_section( string $eyebrow, string $heading, string $copy, array $items = array(), string $item_key = '' ): void {
	if ( ! $heading && ! $copy && ! $items ) {
		return;
	}
	?>
	<section class="case-section"><div class="case-copy reveal"><p class="eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
	<?php
	if ( $heading ) :
		?>
		<h2><?php echo esc_html( $heading ); ?></h2><?php endif; ?><div class="case-prose"><?php echo wp_kses_post( $copy ); ?>
		<?php
		if ( $items ) :
			?>
		<ul>
				<?php
				foreach ( $items as $item ) :
					?>
	<li><?php echo esc_html( is_array( $item ) ? ( $item[ $item_key ] ?? reset( $item ) ) : $item ); ?></li><?php endforeach; ?></ul><?php endif; ?></div></div></section>
	<?php
}

function fractionl_reading_time( ?int $post_id = null ): string {
	$post_id  = $post_id ?: get_the_ID();
	$override = function_exists( 'get_field' ) ? get_field( 'reading_time', $post_id ) : '';
	if ( $override ) {
		return sanitize_text_field( $override );
	}
	$words = str_word_count( wp_strip_all_tags( (string) get_post_field( 'post_content', $post_id ) ) );
	return max( 1, (int) ceil( $words / 200 ) ) . ' min read';
}
