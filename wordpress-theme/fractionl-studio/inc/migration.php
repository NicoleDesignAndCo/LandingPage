<?php
/**
 * Idempotent WP-CLI content and media importer.
 *
 * Run: wp fractionl install-content
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_snapshot(): array {
	$path = FRACTIONL_PATH . '/inc/content-snapshot.json';
	if ( ! is_readable( $path ) ) {
		return array();
	}
	$data = json_decode( (string) file_get_contents( $path ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	return is_array( $data ) ? $data : array();
}

function fractionl_upsert_post( array $post_data ): int {
	$existing = get_page_by_path( $post_data['post_name'], OBJECT, $post_data['post_type'] );
	if ( $existing instanceof WP_Post ) {
		$post_data['ID'] = $existing->ID;
		$result          = wp_update_post( wp_slash( $post_data ), true );
	} else {
		$result = wp_insert_post( wp_slash( $post_data ), true );
	}
	return is_wp_error( $result ) ? 0 : (int) $result;
}

function fractionl_import_theme_image( string $relative_path, string $alt = '' ): int {
	if ( ! $relative_path ) {
		return 0;
	}
	$relative_path = ltrim( $relative_path, '/' );
	if ( str_starts_with( $relative_path, 'images/' ) ) {
		$source = FRACTIONL_PATH . '/assets/' . $relative_path;
	} else {
		$source = FRACTIONL_PATH . '/assets/images/' . basename( $relative_path );
	}
	if ( ! is_readable( $source ) ) {
		return 0;
	}
	$hash     = md5_file( $source );
	$existing = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'meta_key'       => '_fractionl_source_hash',
			'meta_value'     => $hash,
			'fields'         => 'ids',
			'posts_per_page' => 1,
		)
	); // phpcs:ignore WordPress.DB.SlowDBQuery
	if ( $existing ) {
		return (int) $existing[0];
	}
	$upload = wp_upload_bits( basename( $source ), null, (string) file_get_contents( $source ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	if ( $upload['error'] ) {
		return 0;
	}
	$filetype = wp_check_filetype( $upload['file'] );
	$id       = wp_insert_attachment(
		array(
			'post_mime_type' => $filetype['type'],
			'post_title'     => sanitize_text_field( pathinfo( basename( $source ), PATHINFO_FILENAME ) ),
			'post_status'    => 'inherit',
		),
		$upload['file']
	);
	if ( ! $id || is_wp_error( $id ) ) {
		return 0;
	}
	require_once ABSPATH . 'wp-admin/includes/image.php';
	wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $upload['file'] ) );
	update_post_meta( $id, '_wp_attachment_image_alt', sanitize_text_field( $alt ) );
	update_post_meta( $id, '_fractionl_source_hash', $hash );
	return (int) $id;
}

function fractionl_acf_block_markup( string $slug, array $values, array $repeaters = array() ): string {
	$namespace = str_replace( '-', '_', $slug );
	$data      = array();
	$key_map   = array(
		'hero'               => array(
			'primary_label'       => 'block_primary_label',
			'primary_link'        => 'block_primary_link',
			'primary_opens_tally' => 'block_primary_tally',
			'secondary_link'      => 'block_secondary_link',
			'visual_style'        => 'hero_visual',
		),
		'split-introduction' => array(
			'body' => 'split_body',
			'link' => 'split_link',
		),
		'card-grid'          => array( 'columns' => 'cards_columns' ),
		'content-listing'    => array(
			'content_type'   => 'listing_type',
			'item_count'     => 'listing_count',
			'selected_items' => 'listing_manual',
			'archive_link'   => 'listing_link',
		),
		'team-grid'          => array( 'show_details' => 'team_detailed' ),
		'call-to-action'     => array(
			'primary_label'       => 'block_primary_label',
			'primary_link'        => 'block_primary_link',
			'primary_opens_tally' => 'block_primary_tally',
			'secondary_link'      => 'block_secondary_link',
		),
	);
	foreach ( $values as $name => $settings ) {
		$value               = is_array( $settings ) && array_key_exists( 'value', $settings ) ? $settings['value'] : $settings;
		$key_base            = is_array( $settings ) && ! empty( $settings['key'] ) ? $settings['key'] : ( $key_map[ $slug ][ $name ] ?? 'block_' . $name );
		$data[ $name ]       = $value;
		$data[ '_' . $name ] = 'field_fractionl_' . $key_base . '_' . $namespace;
	}
	foreach ( $repeaters as $name => $settings ) {
		$rows                = $settings['rows'];
		$data[ $name ]       = count( $rows );
		$data[ '_' . $name ] = 'field_fractionl_' . $settings['key'] . '_' . $namespace;
		foreach ( $rows as $index => $row ) {
			foreach ( $row as $sub_name => $sub_settings ) {
				$value               = is_array( $sub_settings ) && array_key_exists( 'value', $sub_settings ) ? $sub_settings['value'] : $sub_settings;
				$key                 = is_array( $sub_settings ) && ! empty( $sub_settings['key'] ) ? $sub_settings['key'] : $name . '_' . $sub_name;
				$flat                = $name . '_' . $index . '_' . $sub_name;
				$data[ $flat ]       = $value;
				$data[ '_' . $flat ] = 'field_fractionl_' . $key . '_' . $namespace;
			}
		}
	}
	return serialize_block(
		array(
			'blockName'    => 'acf/fractionl-' . $slug,
			'attrs'        => array(
				'name' => 'acf/fractionl-' . $slug,
				'data' => $data,
				'mode' => 'preview',
			),
			'innerBlocks'  => array(),
			'innerHTML'    => '',
			'innerContent' => array(),
		)
	);
}

function fractionl_page_content( string $slug ): string {
	$hero = static function ( string $eyebrow, string $heading, string $intro, bool $visual = false ): string {
		return fractionl_acf_block_markup(
			'hero',
			array(
				'eyebrow'             => $eyebrow,
				'heading'             => $heading,
				'introduction'        => $intro,
				'primary_label'       => 'Start a Project',
				'primary_opens_tally' => 1,
				'visual_style'        => $visual ? 'product' : 'none',
				'secondary_link'      => array(),
			),
			$visual ? array(
				'disciplines' => array(
					'key'  => 'hero_disciplines',
					'rows' => array(
						array(
							'label' => array(
								'value' => 'Product Design',
								'key'   => 'hero_discipline',
							),
						),
						array(
							'label' => array(
								'value' => 'Websites',
								'key'   => 'hero_discipline',
							),
						),
						array(
							'label' => array(
								'value' => 'Development',
								'key'   => 'hero_discipline',
							),
						),
						array(
							'label' => array(
								'value' => 'Digital Support',
								'key'   => 'hero_discipline',
							),
						),
					),
				),
			) : array()
		);
	};
	$cta  = static fn( string $heading, string $intro ) => fractionl_acf_block_markup(
		'call-to-action',
		array(
			'eyebrow'             => 'Work with Fractionl',
			'heading'             => $heading,
			'introduction'        => $intro,
			'primary_label'       => 'Start a Project',
			'primary_opens_tally' => 1,
		)
	);

	if ( 'home' === $slug ) {
		$content  = $hero( 'Digital Design & Development Studio', 'Custom digital products <span>for your next move.</span>', 'Fractionl Studio brings strategy, design, and development together to create websites, web applications, and digital experiences for founders, growing businesses, and internal teams across Canada and the U.S.', true );
		$content .= fractionl_acf_block_markup(
			'split-introduction',
			array(
				'eyebrow' => 'Built around the work',
				'heading' => 'Strategy, design, and development working together.',
				'body'    => '<p>Good digital work rarely fits neatly into one discipline. We bring product thinking, thoughtful design, and practical development together from the start—so ideas move forward with fewer gaps between planning and execution.</p><p>Whether you are launching something new, improving what already exists, or tackling an important project within your team, we shape the work around what the business actually needs.</p>',
			)
		);
		$content .= fractionl_acf_block_markup(
			'card-grid',
			array(
				'eyebrow' => 'Where we fit',
				'heading' => 'Built for the stage you are in.',
				'columns' => 3,
			),
			array(
				'cards' => array(
					'key'  => 'cards_items',
					'rows' => array(
						array(
							'title'       => array(
								'value' => 'Launching Something New',
								'key'   => 'card_title',
							),
							'description' => array(
								'value' => 'Turn a business idea, service, or product concept into a focused website, MVP, web application, or digital experience.',
								'key'   => 'card_description',
							),
						),
						array(
							'title'       => array(
								'value' => 'Improving What Already Exists',
								'key'   => 'card_title',
							),
							'description' => array(
								'value' => 'Redesign an outdated website, simplify a difficult experience, modernize an existing product, or replace a process that no longer works.',
								'key'   => 'card_description',
							),
						),
						array(
							'title'       => array(
								'value' => 'Moving a Team Project Forward',
								'key'   => 'card_title',
							),
							'description' => array(
								'value' => 'Bring in experienced strategy, design, development, or creative support for a key initiative.',
								'key'   => 'card_description',
							),
						),
					),
				),
			)
		);
		$content .= fractionl_acf_block_markup(
			'studio-differences',
			array(
				'eyebrow' => 'A different kind of studio',
				'heading' => 'Close collaboration without unnecessary layers.',
			),
			array(
				'items' => array(
					'key'  => 'differences_items',
					'rows' => array(
						array(
							'title' => array(
								'value' => 'Direct Access',
								'key'   => 'difference_title',
							),
							'body'  => array(
								'value' => 'Work closely with the people thinking through, designing, and building the project.',
								'key'   => 'difference_body',
							),
						),
						array(
							'title' => array(
								'value' => 'Connected Disciplines',
								'key'   => 'difference_title',
							),
							'body'  => array(
								'value' => 'Strategy, design, and development stay aligned throughout the work.',
								'key'   => 'difference_body',
							),
						),
						array(
							'title' => array(
								'value' => 'Flexible by Design',
								'key'   => 'difference_title',
							),
							'body'  => array(
								'value' => 'Bring us in for a defined project, continued support, or collaboration alongside your team.',
								'key'   => 'difference_body',
							),
						),
					),
				),
			)
		);
		$content .= fractionl_acf_block_markup(
			'content-listing',
			array(
				'eyebrow'      => 'What we do',
				'heading'      => 'The expertise to shape, build, and support digital work.',
				'introduction' => 'Work with Fractionl on a focused project, an evolving digital product, or continued support after launch.',
				'content_type' => 'service',
				'item_count'   => 4,
			)
		);
		$content .= fractionl_process_block();
		$content .= fractionl_acf_block_markup(
			'content-listing',
			array(
				'eyebrow'      => 'Latest Work',
				'heading'      => 'Ideas made useful.',
				'introduction' => 'A selection of websites, digital products, product features, and creative work.',
				'content_type' => 'case_study',
				'item_count'   => 3,
			)
		);
		$content .= fractionl_acf_block_markup(
			'team-grid',
			array(
				'eyebrow'      => 'The people behind Fractionl',
				'heading'      => 'Two disciplines. One connected studio.',
				'introduction' => 'We stay closely involved from the first conversation through final delivery.',
				'show_details' => 0,
			)
		);
		return $content . $cta( 'What are you trying to move forward?', 'Tell us what you are building, improving, or trying to solve.' );
	}
	if ( 'about' === $slug ) {
		return $hero( 'About Fractionl Studio', 'Built to work <span>alongside you.</span>', 'A small, experienced design and development studio for businesses and teams that need more digital capacity—without building it all in-house.' ) . fractionl_acf_block_markup(
			'split-introduction',
			array(
				'eyebrow' => 'About Fractionl Studio',
				'heading' => 'Experienced digital support, without building the whole team in-house.',
				'body'    => '<p>Fractionl Studio brings design, development, and digital strategy together to help businesses build, improve, and support the technology behind their work.</p><p>We work with founders bringing new ideas to market, businesses replacing outdated websites or manual systems, and teams that need experienced capacity.</p>',
			)
		) . fractionl_acf_block_markup(
			'team-grid',
			array(
				'eyebrow'      => 'The people',
				'heading'      => 'The people behind the work.',
				'introduction' => 'Product design, web design, software development, and digital strategy in one connected studio.',
				'show_details' => 1,
			)
		) . $cta( 'Bring experienced support to the table.', 'Tell us what you are building or where your team needs capacity.' );
	}
	if ( 'services' === $slug ) {
		return $hero( 'Strategy · Design · Development · Support', 'From first decision to <span>long-term momentum.</span>', 'Fractionl Studio helps ambitious businesses and product teams plan, design, build, and care for digital work.' ) . fractionl_acf_block_markup(
			'content-listing',
			array(
				'eyebrow'      => 'One studio, the full picture',
				'heading'      => 'Explore our services.',
				'introduction' => 'Bring us in at the beginning, in the middle of a build, or when the work needs consistent attention.',
				'content_type' => 'service',
				'item_count'   => 6,
			)
		) . fractionl_engagements_block() . $cta( 'Bring the next digital project into focus.', 'Tell us what needs to move forward.' );
	}
	if ( 'process' === $slug ) {
		return $hero( 'How we work', 'A simple, considered process.', 'A clear path from context and decisions through design, delivery, and continued support.' ) . fractionl_process_block() . $cta( 'Start with the next useful conversation.', 'You do not need to have every detail figured out.' );
	}
	if ( 'work' === $slug ) {
		return $hero( 'Selected work', 'Ideas made useful.', 'A mix of studio projects, product work, websites, and creative engagements.' ) . fractionl_acf_block_markup(
			'content-listing',
			array(
				'eyebrow'      => 'Studio work',
				'heading'      => 'Selected Work',
				'content_type' => 'case_study',
				'item_count'   => 12,
			)
		) . fractionl_external_work_blocks() . $cta( 'Want something like this for your business?', 'Tell us what you are building or improving.' );
	}
	if ( 'team' === $slug ) {
		return $hero( 'The team', 'Two people, one thoughtful workflow.', 'Meet the designers and developers behind Fractionl Studio.' ) . fractionl_acf_block_markup(
			'team-grid',
			array(
				'eyebrow'      => 'The people',
				'heading'      => 'The people behind the work.',
				'introduction' => 'We stay closely involved and bring in additional specialists only when a project genuinely requires them.',
				'show_details' => 1,
			)
		) . $cta( 'Bring experienced support to the table.', 'Tell us what your team needs.' );
	}
	if ( 'contact' === $slug ) {
		$content  = $hero( 'Contact', 'Tell us what you are building—or what is no longer working.', 'Whether you are launching a website, building a digital product, or adding experienced capacity, send us a short note.' );
		$content .= fractionl_contact_options_block();
		$content .= fractionl_checklist_block();
		$content .= fractionl_acf_block_markup(
			'process-steps',
			array(
				'eyebrow' => 'What happens next',
				'heading' => 'A straightforward next step.',
			),
			array(
				'steps' => array(
					'key'  => 'process_items',
					'rows' => array(
						array(
							'title'       => array(
								'value' => 'Send an Inquiry',
								'key'   => 'process_title',
							),
							'description' => array(
								'value' => 'Tell us what you need help with and share any context you already have.',
								'key'   => 'process_description',
							),
						),
						array(
							'title'       => array(
								'value' => 'We Review the Request',
								'key'   => 'process_title',
							),
							'description' => array(
								'value' => 'We look at the business need, scope, timing, and type of support.',
								'key'   => 'process_description',
							),
						),
						array(
							'title'       => array(
								'value' => 'We Follow Up',
								'key'   => 'process_title',
							),
							'description' => array(
								'value' => 'We reach out with next steps, questions, or a recommended approach.',
								'key'   => 'process_description',
							),
						),
					),
				),
			)
		);
		return $content . $cta( 'Ready to start?', 'Use the inquiry button to tell us what you are working on.' );
	}
	return '';
}

function fractionl_external_work_blocks(): string {
	$founders  = array(
		array( 'Nicole Buloran', 'Founder & Product Designer — 9+ years in product design, UX/UI, SaaS, and web.', 'https://nicole-buloran.com/work' ),
		array( 'Nick Castillo', 'Full-stack development, SaaS integrations, and software implementation.', 'https://nick-castillo.ca' ),
	);
	$demos     = array(
		array( 'Maya Bennett Real Estate', 'A personal brand website for an independent realtor, with listings, lead capture, and a property detail page.', 'https://maya-bennett.vercel.app/' ),
		array( 'Serene Paths Clinic', 'A calm website for a therapist, coach, or wellness provider, with services, resources, and consultation booking.', 'https://serene-paths.vercel.app/' ),
		array( 'North Peak Coffee Co.', 'A small ecommerce website for a local coffee roaster, with product browsing, cart experience, and brand storytelling.', 'https://north-peak-coffee-co.vercel.app/' ),
	);
	$make_rows = static function ( array $items ): array {
		return array_map(
			static fn( $item ) => array(
				'title'       => array(
					'value' => $item[0],
					'key'   => 'card_title',
				),
				'description' => array(
					'value' => $item[1],
					'key'   => 'card_description',
				),
				'link'        => array(
					'value' => array(
						'url'    => $item[2],
						'title'  => 'View Project',
						'target' => '_blank',
					),
					'key'   => 'card_link',
				),
			),
			$items
		);
	};
	return fractionl_acf_block_markup(
		'card-grid',
		array(
			'eyebrow' => 'Founder work',
			'heading' => 'Experience behind the studio.',
			'columns' => 2,
		),
		array(
			'cards' => array(
				'key'  => 'cards_items',
				'rows' => $make_rows( $founders ),
			),
		)
	) . fractionl_acf_block_markup(
		'card-grid',
		array(
			'eyebrow'      => 'Demo sites',
			'heading'      => 'Purpose-built examples.',
			'introduction' => 'Concept sites showing how different business models can translate into focused digital experiences.',
			'columns'      => 3,
		),
		array(
			'cards' => array(
				'key'  => 'cards_items',
				'rows' => $make_rows( $demos ),
			),
		)
	);
}

function fractionl_process_block(): string {
	$steps = array(
		array( 'Understand', 'We learn about the business, the people involved, the current challenges, and what the work needs to accomplish.' ),
		array( 'Shape', 'We define the right direction through strategy, structure, user flows, content, prototypes, and visual design.' ),
		array( 'Build', 'We develop, test, refine, and launch the experience with clear communication throughout the project.' ),
		array( 'Support', 'Where it makes sense, we stay involved through hosting, maintenance, and continued improvements.' ),
	);
	$rows  = array_map(
		static fn( $step ) => array(
			'title'       => array(
				'value' => $step[0],
				'key'   => 'process_title',
			),
			'description' => array(
				'value' => $step[1],
				'key'   => 'process_description',
			),
		),
		$steps
	);
	return fractionl_acf_block_markup(
		'process-steps',
		array(
			'eyebrow' => 'How we work',
			'heading' => 'A clear path from idea to finished work.',
		),
		array(
			'steps' => array(
				'key'  => 'process_items',
				'rows' => $rows,
			),
		)
	);
}

function fractionl_engagements_block(): string {
	$items = array(
		array( 'One-off project', 'A focused engagement with a clear outcome, from strategy and design through launch.' ),
		array( 'Temporary or fractional support', 'Senior capacity embedded with your team for a project, a quarter, or a coverage gap.' ),
		array( 'Ongoing support', 'A familiar studio on hand each month to keep creative and technical work moving.' ),
	);
	$rows  = array_map(
		static fn( $item ) => array(
			'title'       => array(
				'value' => $item[0],
				'key'   => 'engagement_title',
			),
			'description' => array(
				'value' => $item[1],
				'key'   => 'engagement_description',
			),
		),
		$items
	);
	return fractionl_acf_block_markup(
		'engagement-models',
		array(
			'eyebrow' => 'Ways to work with us',
			'heading' => 'The right shape of support for where you are now.',
		),
		array(
			'items' => array(
				'key'  => 'engagement_items',
				'rows' => $rows,
			),
		)
	);
}

function fractionl_contact_options_block(): string {
	$items = array(
		array( 'Website Design & Development', 'For a new business website, landing page, redesign, WordPress build, or an existing website that needs to work better.' ),
		array( 'Web Application or MVP', 'For SaaS products, customer portals, dashboards, booking systems, internal tools, and technology-enabled business ideas.' ),
		array( 'Product Design & Team Support', 'For UX/UI design, user flows, prototypes, design systems, project overflow, or temporary capacity.' ),
		array( 'Ongoing Creative or Technical Support', 'For recurring creative work, hosting, maintenance, updates, and ongoing digital improvements.' ),
	);
	$rows  = array_map(
		static fn( $item ) => array(
			'title'       => array(
				'value' => $item[0],
				'key'   => 'contact_option_title',
			),
			'description' => array(
				'value' => $item[1],
				'key'   => 'contact_option_description',
			),
		),
		$items
	);
	return fractionl_acf_block_markup(
		'contact-options',
		array(
			'eyebrow' => 'Inquiry options',
			'heading' => 'What can we help with?',
		),
		array(
			'options' => array(
				'key'  => 'contact_option_items',
				'rows' => $rows,
			),
		)
	);
}

function fractionl_checklist_block(): string {
	$items = array( 'Your business, product, or organization', 'What you are hoping to build, improve, or replace', 'Who will use it', 'Any timeline, budget range, or launch date already in mind', 'The best way to reach you' );
	$rows  = array_map(
		static fn( $item ) => array(
			'text' => array(
				'value' => $item,
				'key'   => 'checklist_item',
			),
		),
		$items
	);
	return fractionl_acf_block_markup(
		'checklist',
		array(
			'eyebrow'      => 'Helpful details',
			'heading'      => 'What should you include?',
			'introduction' => 'You do not need to have everything figured out. A short message is enough to start.',
		),
		array(
			'items' => array(
				'key'  => 'checklist_items',
				'rows' => $rows,
			),
		)
	);
}

function fractionl_insight_content( array $blocks ): string {
	$output = '';
	foreach ( $blocks as $block ) {
		$type = $block['type'] ?? '';
		if ( 'paragraph' === $type ) {
			$output .= '<!-- wp:paragraph --><p>' . esc_html( $block['text'] ) . '</p><!-- /wp:paragraph -->';
		} elseif ( 'h2' === $type || 'h3' === $type ) {
			$level   = (int) substr( $type, 1 );
			$anchor  = sanitize_title( $block['id'] ?? $block['text'] );
			$output .= sprintf( '<!-- wp:heading {"level":%1$d,"anchor":"%2$s"} --><h%1$d class="wp-block-heading" id="%2$s">%3$s</h%1$d><!-- /wp:heading -->', $level, esc_attr( $anchor ), esc_html( $block['text'] ) );
		} elseif ( 'unordered-list' === $type || 'ordered-list' === $type ) {
			$tag     = 'ordered-list' === $type ? 'ol' : 'ul';
			$output .= '<!-- wp:list' . ( 'ol' === $tag ? ' {"ordered":true}' : '' ) . ' --><' . $tag . ' class="wp-block-list">';
			foreach ( $block['items'] as $item ) {
				$output .= '<li>' . esc_html( $item ) . '</li>'; }
			$output .= '</' . $tag . '><!-- /wp:list -->';
		} elseif ( 'blockquote' === $type ) {
			$output .= '<!-- wp:quote --><blockquote class="wp-block-quote"><p>' . esc_html( $block['text'] ) . '</p>' . ( ! empty( $block['cite'] ) ? '<cite>' . esc_html( $block['cite'] ) . '</cite>' : '' ) . '</blockquote><!-- /wp:quote -->';
		} elseif ( 'callout' === $type ) {
			$output .= '<!-- wp:group {"className":"insight-callout"} --><div class="wp-block-group insight-callout">' . ( ! empty( $block['heading'] ) ? '<h3>' . esc_html( $block['heading'] ) . '</h3>' : '' ) . '<p>' . esc_html( $block['text'] ) . '</p></div><!-- /wp:group -->';
		} elseif ( 'table' === $type ) {
			$output .= '<!-- wp:table --><figure class="wp-block-table insight-table"><table><thead><tr>';
			foreach ( $block['headers'] as $header ) {
				$output .= '<th>' . esc_html( $header ) . '</th>'; }
			$output .= '</tr></thead><tbody>';
			foreach ( $block['rows'] as $row ) {
				$output .= '<tr>';
				foreach ( $row as $cell ) {
					$output .= '<td>' . esc_html( $cell ) . '</td>';
				} $output .= '</tr>'; }
			$output .= '</tbody></table></figure><!-- /wp:table -->';
		} elseif ( 'link' === $type ) {
			$href    = str_replace( 'https://nicoledesignandco.com/services', home_url( '/services/' ), $block['href'] );
			$output .= '<!-- wp:paragraph --><p><a href="' . esc_url( $href ) . '">' . esc_html( $block['text'] ) . '</a></p><!-- /wp:paragraph -->';
		} elseif ( 'button' === $type ) {
			$output .= '<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="' . esc_url( $block['href'] ) . '">' . esc_html( $block['label'] ) . '</a></div><!-- /wp:button --></div><!-- /wp:buttons -->';
		} elseif ( 'code' === $type ) {
			$output .= '<!-- wp:code --><pre class="wp-block-code"><code>' . esc_html( $block['code'] ) . '</code></pre><!-- /wp:code -->';
		} elseif ( 'inline-cta' === $type ) {
			$output .= '<!-- wp:separator {"className":"insight-inline-marker"} --><hr class="wp-block-separator has-alpha-channel-opacity insight-inline-marker"><!-- /wp:separator -->';
		}
	}
	return $output;
}

function fractionl_install_content(): array {
	if ( ! function_exists( 'update_field' ) ) {
		return array( 'error' => 'Advanced Custom Fields Pro must be active before importing content.' );
	}
	$snapshot = fractionl_snapshot();
	if ( ! $snapshot ) {
		return array( 'error' => 'The bundled content snapshot could not be read.' );
	}

	$page_titles = array(
		'home'     => 'Home',
		'about'    => 'About',
		'services' => 'Services',
		'process'  => 'Process',
		'work'     => 'Work',
		'team'     => 'Team',
		'contact'  => 'Contact',
		'insights' => 'Insights',
	);
	$page_ids    = array();
	foreach ( $page_titles as $slug => $title ) {
		$page_ids[ $slug ] = fractionl_upsert_post(
			array(
				'post_type'     => 'page',
				'post_status'   => 'publish',
				'post_name'     => $slug,
				'post_title'    => $title,
				'post_content'  => 'insights' === $slug ? '' : fractionl_page_content( $slug ),
				'page_template' => 'default',
			)
		);
	}
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $page_ids['home'] );
	update_option( 'page_for_posts', $page_ids['insights'] );

	$services    = array(
		array( '01', 'technology-consulting', 'Technology Consulting', 'Make confident technology decisions before they become expensive commitments.', 'We help you decide what to build, what to buy, and what to skip before you spend money on development.', 'Product strategy, MVP planning, system architecture, vendor and platform selection', 'strategy', array( 'Product strategy', 'MVP planning', 'System architecture', 'Vendor and platform selection' ) ),
		array( '02', 'website-design-development', 'Website Design & Development', 'A clear, fast, conversion-focused website designed around your business.', 'We design and build custom websites with fast load times, clear customer paths, and a structure your team can update.', 'New businesses, redesigns, service businesses, professional firms, and local businesses', 'website', array( 'Website strategy', 'UX and visual design', 'Responsive development', 'Flexible content management' ) ),
		array( '03', 'web-applications', 'Web Applications', 'Purpose-built products and tools that turn repetitive work into reliable systems.', 'We design and build dashboards, customer portals, booking flows, billing systems, and internal tools.', 'Founders building SaaS products and businesses replacing manual workflows', 'application', array( 'SaaS products', 'Dashboards and portals', 'Booking and billing flows', 'Internal tools' ) ),
		array( '04', 'fractional-product-design', 'Fractional Product Design & Development', 'Experienced product support, without the full-time hire.', 'Experienced product design and development support for launches, product initiatives, team gaps, leave coverage, overflow, and ongoing digital work.', 'Internal teams, agencies, founders, and businesses that need experienced capacity', 'product', array( 'Product strategy and UX', 'Product and UI design', 'Development', 'Ongoing support' ) ),
		array( '05', 'creative-retainer', 'Creative Retainer', 'Reliable creative momentum from a team that already understands the brand.', 'A reserved block of design support each month for campaigns, landing pages, sales collateral, presentations, and social assets.', 'Businesses that need consistent creative output without an in-house hire', 'creative', array( 'Campaign creative', 'Landing pages', 'Sales collateral', 'Presentations and social assets' ) ),
		array( '06', 'managed-hosting-support', 'Managed Hosting & Ongoing Support', 'Quiet, dependable technical care that keeps your digital presence healthy.', 'We keep what we build—or what you already have—online, secure, and fast with backups, monitoring, updates, and responsive support.', 'Any business that does not want website maintenance to become someone’s job', 'support', array( 'Managed hosting', 'Backups and monitoring', 'Security and updates', 'Responsive technical support' ) ),
	);
	$service_ids = array();
	foreach ( $services as $service ) {
		$id                         = fractionl_upsert_post(
			array(
				'post_type'    => 'service',
				'post_status'  => 'publish',
				'post_name'    => $service[1],
				'post_title'   => $service[2],
				'post_excerpt' => $service[4],
				'menu_order'   => (int) $service[0],
			)
		);
		$service_ids[ $service[1] ] = $id;
		update_field( 'display_number', $service[0], $id );
		update_field( 'short_statement', $service[3], $id );
		update_field( 'service_description', $service[4], $id );
		update_field( 'best_for', $service[5], $id );
		update_field( 'visual_treatment', $service[6], $id );
		update_field(
			'capabilities',
			array_map(
				static fn( $title ) => array(
					'title'       => $title,
					'description' => 'Defined and delivered in close collaboration with your team.',
				),
				$service[7]
			),
			$id
		);
		update_field(
			'process_steps',
			array(
				array(
					'title'       => 'Understand',
					'description' => 'We align on context, constraints, people, and outcomes.',
				),
				array(
					'title'       => 'Plan',
					'description' => 'We turn what we learn into priorities, scope, and a visible path.',
				),
				array(
					'title'       => 'Design & build',
					'description' => 'We make the work tangible and refine it with you.',
				),
				array(
					'title'       => 'Launch & support',
					'description' => 'We help the work land well and stay useful.',
				),
			),
			$id
		);
		update_field( 'seo_title', $service[2] . ' | Fractionl Studio', $id );
		update_field( 'meta_description', $service[4], $id );
	}
	foreach ( $service_ids as $slug => $id ) {
		update_field( 'related_services', array_slice( array_values( array_diff_key( $service_ids, array( $slug => true ) ) ), 0, 3 ), $id );
	}

	$case_ids = array();
	foreach ( $snapshot['caseStudies'] as $case ) {
		$id                        = fractionl_upsert_post(
			array(
				'post_type'    => 'case_study',
				'post_status'  => 'publish',
				'post_name'    => $case['slug'],
				'post_title'   => $case['title'],
				'post_excerpt' => $case['summary'] ?? '',
			)
		);
		$case_ids[ $case['slug'] ] = $id;
		$hero_id                   = fractionl_import_theme_image( $case['heroImage'] ?? '', $case['imageAlt'] ?? '' );
		if ( $hero_id ) {
			set_post_thumbnail( $id, $hero_id );
			update_field( 'hero_image', $hero_id, $id ); }
		update_field( 'hero_image_alt', $case['imageAlt'] ?? '', $id );
		update_field( 'eyebrow', $case['eyebrow'] ?? '', $id );
		update_field( 'introduction', $case['introduction'] ?? '', $id );
		update_field( 'summary', $case['summary'] ?? '', $id );
		update_field(
			'project_details',
			array_map(
				static fn( $item ) => array(
					'label' => $item['label'] ?? '',
					'value' => $item['value'] ?? '',
					'url'   => $item['url'] ?? '',
				),
				$case['details'] ?? array()
			),
			$id
		);
		update_field( 'overview_heading', $case['overviewHeading'] ?? '', $id );
		update_field( 'overview_copy', implode( '', array_map( static fn( $text ) => '<p>' . esc_html( $text ) . '</p>', $case['overview'] ?? array() ) ), $id );
		update_field( 'challenge_heading', $case['challenge']['heading'] ?? '', $id );
		update_field( 'challenge_copy', implode( '', array_map( static fn( $text ) => '<p>' . esc_html( $text ) . '</p>', $case['challenge']['paragraphs'] ?? array() ) ), $id );
		update_field( 'goals', array_map( static fn( $goal ) => array( 'goal' => $goal ), $case['goals'] ?? array() ), $id );
		update_field( 'approach', $case['approach'] ?? array(), $id );
		update_field( 'solution_heading', $case['solution']['heading'] ?? '', $id );
		update_field( 'solution_copy', implode( '', array_map( static fn( $text ) => '<p>' . esc_html( $text ) . '</p>', $case['solution']['paragraphs'] ?? array() ) ), $id );
		update_field( 'solution_highlights', array_map( static fn( $item ) => array( 'highlight' => $item ), $case['solution']['highlights'] ?? array() ), $id );
		$gallery = array();
		foreach ( $case['images'] ?? array() as $index => $image ) {
			$visual    = $case['visuals'][ $index ] ?? array();
			$gallery[] = array(
				'image'    => fractionl_import_theme_image( $image, $case['imageAlts'][ $index ] ?? '' ),
				'alt_text' => $case['imageAlts'][ $index ] ?? '',
				'title'    => $visual['title'] ?? '',
				'caption'  => $visual['caption'] ?? '',
				'wide'     => 'wide' === ( $visual['variant'] ?? '' ),
			);
		}
		update_field( 'project_gallery', $gallery, $id );
		update_field( 'outcome_heading', $case['outcome']['heading'] ?? '', $id );
		update_field( 'outcome_copy', implode( '', array_map( static fn( $text ) => '<p>' . esc_html( $text ) . '</p>', $case['outcome']['paragraphs'] ?? array() ) ), $id );
		$results = array_merge( $case['outcome']['improvements'] ?? array(), $case['results'] ?? array() );
		update_field( 'results', array_map( static fn( $item ) => array( 'result' => $item ), $results ), $id );
		update_field( 'testimonial', $case['testimonial']['quote'] ?? '', $id );
		update_field( 'testimonial_attribution', $case['testimonial']['attribution'] ?? '', $id );
		update_field( 'seo_title', $case['seoTitle'] ?? '', $id );
		update_field( 'meta_description', $case['metaDescription'] ?? '', $id );
	}
	foreach ( $snapshot['caseStudies'] as $case ) {
		$id = $case_ids[ $case['slug'] ];
		update_field( 'related_case_studies', array_values( array_filter( array_map( static fn( $slug ) => $case_ids[ $slug ] ?? 0, $case['related'] ?? array() ) ) ), $id );
		$provided = array();
		foreach ( $case['services'] ?? array() as $service ) {
			$service_slug = basename( $service['href'] );
			if ( isset( $service_ids[ $service_slug ] ) ) {
				$provided[] = $service_ids[ $service_slug ]; }
		}
		update_field( 'services_provided', $provided, $id );
	}

	$insight_ids = array();
	foreach ( $snapshot['insights'] as $insight ) {
		$status                          = 'published' === $insight['status'] ? 'publish' : 'draft';
		$id                              = fractionl_upsert_post(
			array(
				'post_type'    => 'post',
				'post_status'  => $status,
				'post_name'    => $insight['slug'],
				'post_title'   => $insight['title'],
				'post_excerpt' => $insight['excerpt'],
				'post_content' => fractionl_insight_content( $insight['content'] ),
				'post_date'    => ( $insight['publishedAt'] ?? gmdate( 'Y-m-d' ) ) . ' 12:00:00',
			)
		);
		$insight_ids[ $insight['slug'] ] = $id;
		$term                            = term_exists( $insight['category'], 'category' );
		if ( ! $term ) {
			$term = wp_insert_term( $insight['category'], 'category' ); }
		if ( ! is_wp_error( $term ) ) {
			wp_set_post_categories( $id, array( (int) ( is_array( $term ) ? $term['term_id'] : $term ) ) ); }
		$image_id = fractionl_import_theme_image( $insight['heroImage'] ?? '', $insight['heroImageAlt'] ?? '' );
		if ( $image_id ) {
			set_post_thumbnail( $id, $image_id ); }
		update_field( 'featured_insight', (bool) ( $insight['featured'] ?? false ), $id );
		update_field( 'reading_time', $insight['readingTime'] ?? '', $id );
		update_field( 'cta_variant', $insight['ctaVariant'] ?? 'project', $id );
		update_field( 'seo_title', $insight['seoTitle'] ?? '', $id );
		update_field( 'meta_description', $insight['metaDescription'] ?? '', $id );
		update_field( 'canonical_url', '', $id );
		update_field( 'seo_noindex', 'draft' === $status, $id );
	}
	foreach ( $snapshot['insights'] as $insight ) {
		$id = $insight_ids[ $insight['slug'] ];
		update_field( 'related_insights', array_values( array_filter( array_map( static fn( $slug ) => $insight_ids[ $slug ] ?? 0, $insight['relatedInsightSlugs'] ?? array() ) ) ), $id );
		update_field( 'related_services', array_values( array_filter( array_map( static fn( $slug ) => $service_ids[ $slug ] ?? 0, $insight['relatedServiceSlugs'] ?? array() ) ) ), $id );
	}

	$team_rows = array();
	foreach ( $snapshot['team'] as $member ) {
		$team_rows[] = array(
			'name'      => $member['name'],
			'role'      => $member['role'],
			'bio'       => $member['bio'],
			'photo'     => fractionl_import_theme_image( $member['sourceImage'], $member['imageAlt'] ),
			'photo_alt' => $member['imageAlt'],
			'skills'    => array_map( static fn( $skill ) => array( 'skill' => $skill ), $member['tags'] ),
			'email'     => $member['email'],
			'linkedin'  => $member['linkedin'],
			'portfolio' => $member['portfolio'],
		);
	}
	update_field( 'studio_name', $snapshot['site']['name'], 'option' );
	update_field( 'studio_email', $snapshot['site']['email'], 'option' );
	update_field( 'studio_location', $snapshot['site']['location'], 'option' );
	update_field( 'tally_form_id', $snapshot['site']['tallyFormId'], 'option' );
	update_field( 'tally_form_url', $snapshot['site']['tallyUrl'], 'option' );
	update_field( 'team_members', $team_rows, 'option' );
	update_field( 'footer_description', 'Digital design and development support for founders, growing businesses, agencies, and internal teams.', 'option' );
	update_field( 'ga4_id', 'G-5NYS64CK8P', 'option' );

	$menu_name = 'Primary Navigation';
	$menu      = wp_get_nav_menu_object( $menu_name );
	$menu_id   = $menu ? $menu->term_id : wp_create_nav_menu( $menu_name );
	if ( ! is_wp_error( $menu_id ) ) {
		$existing_items = wp_get_nav_menu_items( $menu_id );
		if ( ! $existing_items ) {
			foreach ( array( 'about', 'services', 'work', 'insights', 'process', 'team', 'contact' ) as $slug ) {
				wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'     => $page_titles[ $slug ],
						'menu-item-object-id' => $page_ids[ $slug ],
						'menu-item-object'    => 'page',
						'menu-item-type'      => 'post_type',
						'menu-item-status'    => 'publish',
					)
				); }
		}
		$locations            = get_theme_mod( 'nav_menu_locations', array() );
		$locations['primary'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}
	flush_rewrite_rules();
	update_option( 'fractionl_content_imported', gmdate( 'c' ), false );
	return array(
		'pages'        => count( array_filter( $page_ids ) ),
		'services'     => count( array_filter( $service_ids ) ),
		'case_studies' => count( array_filter( $case_ids ) ),
		'insights'     => count( array_filter( $insight_ids ) ),
	);
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'fractionl install-content',
		static function (): void {
			$result = fractionl_install_content();
			if ( isset( $result['error'] ) ) {
				WP_CLI::error( $result['error'] ); }
			WP_CLI::success( sprintf( 'Imported %d pages, %d services, %d case studies, and %d insights.', $result['pages'], $result['services'], $result['case_studies'], $result['insights'] ) );
		}
	);
}

function fractionl_migration_admin_notice(): void {
	if ( ! current_user_can( 'manage_options' ) || get_option( 'fractionl_content_imported' ) ) {
		return; }
	echo '<div class="notice notice-info"><p><strong>Fractionl Studio:</strong> Run <code>wp fractionl install-content</code> once after activating ACF Pro to create and populate the initial site. The importer is idempotent.</p></div>';
}
add_action( 'admin_notices', 'fractionl_migration_admin_notice' );
