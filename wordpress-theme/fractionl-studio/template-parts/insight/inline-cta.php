<?php
/** Insight CTA. @package Fractionl_Studio */
$variant = $args['variant'] ?? 'project';
if ( 'none' === $variant ) {
	return; }
$content = array(
	'website-review'  => array( 'Not sure what your website needs?', 'Get a clearer direction for your website.', 'We will look at your website in the context of your business and identify the opportunities most worth your attention.', 'Request a Website Review', fractionl_get_page_url( 'contact', '/contact/' ) ),
	'product-support' => array( 'Need extra product capacity?', 'Add experienced design, development, or both.', 'Fractionl Studio can work alongside your team on product initiatives, launches, overflow, and ongoing digital work.', 'Explore Product Support', home_url( '/services/fractional-product-design/' ) ),
	'project'         => array( 'Have something to build?', 'Bring the next digital project into focus.', 'Tell us what you are working on, what is no longer working, or where your team needs support.', 'Start a Project', fractionl_get_page_url( 'contact', '/contact/' ) ),
);
$cta     = $content[ $variant ] ?? $content['project'];
?>
<aside class="insight-inline-cta"><p class="eyebrow"><?php echo esc_html( $cta[0] ); ?></p><h2><?php echo esc_html( $cta[1] ); ?></h2><p><?php echo esc_html( $cta[2] ); ?></p><a class="btn btn-primary" href="<?php echo esc_url( $cta[4] ); ?>"><?php echo esc_html( $cta[3] ); ?></a></aside>
