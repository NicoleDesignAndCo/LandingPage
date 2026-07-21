<?php
/** Insights index. @package Fractionl_Studio */
get_header();
$categories = get_categories( array( 'hide_empty' => true ) );
?>
<div class="insights-index">
	<section class="insights-hero"><div class="container insights-hero__inner"><p class="eyebrow"><?php esc_html_e( 'Insights', 'fractionl-studio' ); ?></p><h1><?php esc_html_e( 'Practical thinking for better digital work.', 'fractionl-studio' ); ?></h1><p><?php esc_html_e( 'Clear guidance on websites, digital products, UX/UI, development, and technology decisions—written for founders, businesses, and teams.', 'fractionl-studio' ); ?></p></div></section>
	<section class="insights-latest"><div class="container"><div class="insights-section-head"><div><p class="eyebrow"><?php esc_html_e( 'Latest insights', 'fractionl-studio' ); ?></p><h2><?php esc_html_e( 'Ideas you can actually use.', 'fractionl-studio' ); ?></h2></div>
	<?php
	if ( $categories ) :
		?>
		<div class="insight-filters" aria-label="<?php esc_attr_e( 'Filter insights by category', 'fractionl-studio' ); ?>"><button type="button" aria-pressed="true" data-insight-filter="all"><?php esc_html_e( 'All Insights', 'fractionl-studio' ); ?></button>
		<?php
		foreach ( $categories as $category ) :
			?>
		<button type="button" aria-pressed="false" data-insight-filter="<?php echo esc_attr( $category->slug ); ?>"><?php echo esc_html( $category->name ); ?></button><?php endforeach; ?></div><?php endif; ?></div><div class="insight-grid">
		<?php
		while ( have_posts() ) :
			the_post();
			get_template_part( 'template-parts/cards/card', 'post' );
endwhile;
		?>
</div><?php the_posts_pagination( array( 'class' => 'pagination' ) ); ?></div></section>
	<section class="insights-cta"><div class="container insights-cta__inner"><p class="eyebrow">Need help applying it?</p><h2>Turn the next idea into something useful.</h2><p>Tell us what you are building, improving, or trying to solve.</p><div class="insights-cta__actions"><?php fractionl_tally_button(); ?><a class="btn btn-ghost" href="<?php echo esc_url( fractionl_get_page_url( 'services', '/services/' ) ); ?>">Explore Our Services</a></div></div></section>
</div>
<?php get_footer(); ?>
