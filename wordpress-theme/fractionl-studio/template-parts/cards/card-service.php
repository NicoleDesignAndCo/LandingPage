<?php
$home_titles = array(
	'website-design-development' => 'Website & Web Application Design & Development',
	'fractional-product-design'   => 'Fractional Product & Creative Support',
);
$home_descriptions = array(
	'technology-consulting'       => 'Clarify the opportunity, define the right solution, and make confident technology decisions before expensive commitments.',
	'website-design-development'  => 'Web design and custom websites built from real business, clear customer paths, and a structure your team can update.',
	'fractional-product-design'    => 'Experienced product design and creative support for launches, product initiatives, team gaps, leave coverage, overflow, and ongoing work.',
	'managed-hosting-support'      => 'Reliable hosting, maintenance, monitoring, backups, and technical support that keeps your digital work healthy after launch.',
);
$slug        = get_post_field( 'post_name' );
$card_title  = is_front_page() && isset( $home_titles[ $slug ] ) ? $home_titles[ $slug ] : get_the_title();
$description = is_front_page() && isset( $home_descriptions[ $slug ] ) ? $home_descriptions[ $slug ] : ( get_field( 'service_description' ) ?: get_the_excerpt() );
?>
<article <?php post_class( 'service-card reveal' ); ?>><span class="service-index"><?php echo esc_html( get_field( 'display_number' ) ?: '01' ); ?></span><h3 class="service-title"><a href="<?php the_permalink(); ?>"><?php echo esc_html( $card_title ); ?></a></h3><p class="service-desc"><?php echo esc_html( $description ); ?></p><a class="card-link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Learn more', 'fractionl-studio' ); ?></a></article>
