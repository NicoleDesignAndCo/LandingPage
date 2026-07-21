<article <?php post_class( 'work-card reveal' ); ?>>
	<a class="project-visual" href="<?php the_permalink(); ?>">
	<?php
	if ( has_post_thumbnail() ) {
		the_post_thumbnail( 'fractionl-card', array( 'loading' => 'lazy' ) );
	} else {
		echo '<div class="portfolio-sheet"><small>SELECTED WORK</small><strong>' . esc_html( get_the_title() ) . '</strong><div><i></i><i></i><i></i></div></div>'; }
	?>
	</a>
	<h3 class="work-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><p class="work-type"><?php echo esc_html( get_field( 'eyebrow' ) ); ?></p><p class="work-desc"><?php echo esc_html( get_field( 'summary' ) ?: get_the_excerpt() ); ?></p><a class="card-link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'View Project', 'fractionl-studio' ); ?><span aria-hidden="true">↗</span></a>
</article>
