<?php
/**
 * ACF Pro field registration.
 *
 * Fields are kept in PHP so the editing model ships with the theme.
 *
 * @package Fractionl_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function fractionl_field( string $key, string $label, string $name, string $type = 'text', array $extra = array() ): array {
	return array_merge(
		array(
			'key'   => 'field_fractionl_' . $key,
			'label' => $label,
			'name'  => $name,
			'type'  => $type,
		),
		$extra
	);
}

function fractionl_repeater( string $key, string $label, string $name, array $sub_fields, array $extra = array() ): array {
	return fractionl_field(
		$key,
		$label,
		$name,
		'repeater',
		array_merge(
			array(
				'layout'       => 'block',
				/* translators: %s is the singular label of the repeater item. */
				'button_label' => sprintf( __( 'Add %s', 'fractionl-studio' ), $label ),
				'sub_fields'   => $sub_fields,
			),
			$extra
		)
	);
}

function fractionl_seo_fields( string $prefix ): array {
	return array(
		fractionl_field( $prefix . '_seo_tab', 'SEO', '', 'tab' ),
		fractionl_field(
			$prefix . '_seo_title',
			'SEO Title',
			'seo_title',
			'text',
			array(
				'maxlength'    => 70,
				'instructions' => 'Defaults to the WordPress title when empty.',
			)
		),
		fractionl_field(
			$prefix . '_meta_description',
			'Meta Description',
			'meta_description',
			'textarea',
			array(
				'rows'      => 3,
				'maxlength' => 170,
			)
		),
		fractionl_field( $prefix . '_canonical', 'Canonical URL', 'canonical_url', 'url', array( 'instructions' => 'Leave empty to use the current WordPress URL.' ) ),
		fractionl_field(
			$prefix . '_social_image',
			'Social Sharing Image',
			'social_image',
			'image',
			array(
				'return_format' => 'id',
				'preview_size'  => 'medium',
			)
		),
		fractionl_field( $prefix . '_noindex', 'Hide from Search Engines', 'seo_noindex', 'true_false', array( 'ui' => 1 ) ),
	);
}

function fractionl_register_acf_fields(): void {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key'      => 'group_fractionl_options',
			'title'    => 'Studio Settings',
			'fields'   => array(
				fractionl_field( 'options_identity_tab', 'Studio Identity', '', 'tab' ),
				fractionl_field(
					'studio_name',
					'Studio Name',
					'studio_name',
					'text',
					array(
						'default_value' => 'Fractionl Studio',
						'required'      => 1,
					)
				),
				fractionl_field( 'studio_email', 'General Email', 'studio_email', 'email', array( 'default_value' => 'hello@fractionlstudio.com' ) ),
				fractionl_field( 'studio_location', 'Location', 'studio_location', 'text', array( 'default_value' => 'Edmonton, Alberta' ) ),
				fractionl_field( 'studio_description', 'Short Studio Description', 'studio_description', 'textarea', array( 'rows' => 3 ) ),
				fractionl_field(
					'studio_logo',
					'Logo',
					'studio_logo',
					'image',
					array(
						'return_format' => 'id',
						'preview_size'  => 'medium',
					)
				),
				fractionl_field(
					'default_social_image',
					'Default Social Image',
					'default_social_image',
					'image',
					array(
						'return_format' => 'id',
						'preview_size'  => 'medium',
					)
				),
				fractionl_field( 'options_tally_tab', 'Project Inquiry', '', 'tab' ),
				fractionl_field(
					'tally_form_id',
					'Tally Form ID',
					'tally_form_id',
					'text',
					array(
						'default_value' => 'xXzMGr',
						'instructions'  => 'The short ID shown in the Tally share URL.',
					)
				),
				fractionl_field( 'tally_form_url', 'Tally Form URL', 'tally_form_url', 'url', array( 'default_value' => 'https://tally.so/r/xXzMGr' ) ),
				fractionl_field(
					'tally_embed_code',
					'Optional Tally Embed Code',
					'tally_embed_code',
					'textarea',
					array(
						'rows'         => 5,
						'instructions' => 'Optional. Only trusted administrators should edit embed code.',
					)
				),
				fractionl_field( 'options_announcement_tab', 'Announcement', '', 'tab' ),
				fractionl_field( 'announcement_enabled', 'Show Announcement', 'announcement_enabled', 'true_false', array( 'ui' => 1 ) ),
				fractionl_field( 'announcement_text', 'Announcement Text', 'announcement_text' ),
				fractionl_field( 'announcement_link', 'Announcement Link', 'announcement_link', 'link' ),
				fractionl_field( 'options_team_tab', 'Team', '', 'tab' ),
				fractionl_repeater(
					'team_members',
					'Team Member',
					'team_members',
					array(
						fractionl_field( 'team_name', 'Name', 'name', 'text', array( 'required' => 1 ) ),
						fractionl_field( 'team_role', 'Role', 'role' ),
						fractionl_field( 'team_bio', 'Biography', 'bio', 'textarea', array( 'rows' => 4 ) ),
						fractionl_field(
							'team_photo',
							'Photo',
							'photo',
							'image',
							array(
								'return_format' => 'id',
								'preview_size'  => 'medium',
							)
						),
						fractionl_field( 'team_photo_alt', 'Photo Alt Text', 'photo_alt', 'text', array( 'instructions' => 'Describe the person; do not repeat decorative details.' ) ),
						fractionl_field(
							'team_skills',
							'Skills',
							'skills',
							'repeater',
							array(
								'layout'     => 'table',
								'sub_fields' => array( fractionl_field( 'team_skill', 'Skill', 'skill' ) ),
							)
						),
						fractionl_field( 'team_email', 'Email', 'email', 'email' ),
						fractionl_field( 'team_linkedin', 'LinkedIn URL', 'linkedin', 'url' ),
						fractionl_field( 'team_portfolio', 'Portfolio URL', 'portfolio', 'url' ),
					),
					array(
						'min' => 1,
						'max' => 8,
					)
				),
				fractionl_field( 'options_footer_tab', 'Footer & Analytics', '', 'tab' ),
				fractionl_field( 'footer_description', 'Footer Description', 'footer_description', 'textarea', array( 'rows' => 3 ) ),
				fractionl_field( 'footer_legal', 'Footer Legal Text', 'footer_legal' ),
				fractionl_field( 'ga4_id', 'Google Analytics 4 ID', 'ga4_id', 'text', array( 'instructions' => 'Example: G-5NYS64CK8P. Consent management remains the site owner’s responsibility.' ) ),
			),
			'location' => array(
				array(
					array(
						'param'    => 'options_page',
						'operator' => '==',
						'value'    => 'fractionl-settings',
					),
				),
			),
		)
	);

	$service_fields = array(
		fractionl_field( 'service_content_tab', 'Service Content', '', 'tab' ),
		fractionl_field(
			'service_index',
			'Display Number',
			'display_number',
			'text',
			array(
				'default_value' => '01',
				'maxlength'     => 2,
			)
		),
		fractionl_field( 'service_statement', 'Short Statement', 'short_statement', 'textarea', array( 'rows' => 2 ) ),
		fractionl_field( 'service_description', 'Service Description', 'service_description', 'textarea', array( 'rows' => 4 ) ),
		fractionl_field( 'service_best_for', 'Best For', 'best_for', 'textarea', array( 'rows' => 2 ) ),
		fractionl_field(
			'service_visual',
			'Visual Treatment',
			'visual_treatment',
			'select',
			array(
				'choices'       => array(
					'strategy'    => 'Strategy map',
					'website'     => 'Responsive website',
					'application' => 'Application dashboard',
					'product'     => 'Product workflow',
					'creative'    => 'Creative collage',
					'support'     => 'Support dashboard',
				),
				'default_value' => 'strategy',
			)
		),
		fractionl_repeater(
			'service_capabilities',
			'Capability',
			'capabilities',
			array( fractionl_field( 'service_cap_title', 'Title', 'title' ), fractionl_field( 'service_cap_description', 'Description', 'description', 'textarea', array( 'rows' => 3 ) ) ),
			array(
				'min' => 1,
				'max' => 8,
			)
		),
		fractionl_field( 'service_problem_heading', 'Problem Heading', 'problem_heading' ),
		fractionl_field(
			'service_problem_copy',
			'Problem Copy',
			'problem_copy',
			'wysiwyg',
			array(
				'tabs'         => 'visual',
				'toolbar'      => 'basic',
				'media_upload' => 0,
			)
		),
		fractionl_repeater(
			'service_process',
			'Process Step',
			'process_steps',
			array( fractionl_field( 'service_process_title', 'Title', 'title' ), fractionl_field( 'service_process_description', 'Description', 'description', 'textarea', array( 'rows' => 3 ) ) ),
			array(
				'min' => 3,
				'max' => 6,
			)
		),
		fractionl_field(
			'service_related',
			'Related Services',
			'related_services',
			'relationship',
			array(
				'post_type'     => array( 'service' ),
				'return_format' => 'id',
				'max'           => 3,
			)
		),
		fractionl_field( 'service_cta_heading', 'CTA Heading', 'cta_heading' ),
		fractionl_field( 'service_cta_copy', 'CTA Copy', 'cta_copy', 'textarea', array( 'rows' => 3 ) ),
	);
	acf_add_local_field_group(
		array(
			'key'      => 'group_fractionl_service',
			'title'    => 'Service Details',
			'fields'   => array_merge( $service_fields, fractionl_seo_fields( 'service' ) ),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'service',
					),
				),
			),
		)
	);

	$case_fields = array(
		fractionl_field( 'case_overview_tab', 'Project Overview', '', 'tab' ),
		fractionl_field( 'case_eyebrow', 'Client / Eyebrow', 'eyebrow' ),
		fractionl_field( 'case_introduction', 'Introduction', 'introduction', 'textarea', array( 'rows' => 2 ) ),
		fractionl_field( 'case_summary', 'Summary', 'summary', 'textarea', array( 'rows' => 4 ) ),
		fractionl_repeater( 'case_details', 'Project Detail', 'project_details', array( fractionl_field( 'case_detail_label', 'Label', 'label' ), fractionl_field( 'case_detail_value', 'Value', 'value' ), fractionl_field( 'case_detail_url', 'Optional URL', 'url', 'url' ) ), array( 'max' => 6 ) ),
		fractionl_field(
			'case_hero',
			'Hero Image',
			'hero_image',
			'image',
			array(
				'return_format' => 'id',
				'preview_size'  => 'large',
			)
		),
		fractionl_field( 'case_hero_alt', 'Hero Image Alt Text', 'hero_image_alt' ),
		fractionl_field( 'case_story_tab', 'Project Story', '', 'tab' ),
		fractionl_field( 'case_overview_heading', 'Overview Heading', 'overview_heading' ),
		fractionl_field( 'case_overview_copy', 'Overview Copy', 'overview_copy', 'wysiwyg', array( 'toolbar' => 'basic' ) ),
		fractionl_field( 'case_challenge_heading', 'Challenge Heading', 'challenge_heading' ),
		fractionl_field( 'case_challenge_copy', 'Challenge Copy', 'challenge_copy', 'wysiwyg', array( 'toolbar' => 'basic' ) ),
		fractionl_repeater( 'case_goals', 'Goal', 'goals', array( fractionl_field( 'case_goal', 'Goal', 'goal' ) ) ),
		fractionl_repeater( 'case_approach', 'Approach Phase', 'approach', array( fractionl_field( 'case_approach_title', 'Title', 'title' ), fractionl_field( 'case_approach_body', 'Body', 'body', 'textarea', array( 'rows' => 4 ) ) ) ),
		fractionl_field( 'case_solution_heading', 'Solution Heading', 'solution_heading' ),
		fractionl_field( 'case_solution_copy', 'Solution Copy', 'solution_copy', 'wysiwyg', array( 'toolbar' => 'basic' ) ),
		fractionl_repeater( 'case_highlights', 'Solution Highlight', 'solution_highlights', array( fractionl_field( 'case_highlight', 'Highlight', 'highlight' ) ) ),
		fractionl_field( 'case_media_tab', 'Project Media', '', 'tab' ),
		fractionl_repeater(
			'case_gallery',
			'Project Image',
			'project_gallery',
			array(
				fractionl_field(
					'case_gallery_image',
					'Image',
					'image',
					'image',
					array(
						'return_format' => 'id',
						'preview_size'  => 'medium',
					)
				),
				fractionl_field( 'case_gallery_alt', 'Alt Text', 'alt_text' ),
				fractionl_field( 'case_gallery_title', 'Title', 'title' ),
				fractionl_field( 'case_gallery_caption', 'Caption', 'caption', 'textarea', array( 'rows' => 2 ) ),
				fractionl_field( 'case_gallery_wide', 'Wide Layout', 'wide', 'true_false', array( 'ui' => 1 ) ),
			)
		),
		fractionl_field( 'case_outcome_tab', 'Outcome & Relationships', '', 'tab' ),
		fractionl_field( 'case_outcome_heading', 'Outcome Heading', 'outcome_heading' ),
		fractionl_field( 'case_outcome_copy', 'Outcome Copy', 'outcome_copy', 'wysiwyg', array( 'toolbar' => 'basic' ) ),
		fractionl_repeater( 'case_results', 'Result / Improvement', 'results', array( fractionl_field( 'case_result', 'Result', 'result' ) ) ),
		fractionl_field( 'case_testimonial', 'Testimonial', 'testimonial', 'textarea', array( 'rows' => 4 ) ),
		fractionl_field( 'case_testimonial_author', 'Testimonial Attribution', 'testimonial_attribution' ),
		fractionl_field(
			'case_services',
			'Services Provided',
			'services_provided',
			'relationship',
			array(
				'post_type'     => array( 'service' ),
				'return_format' => 'id',
			)
		),
		fractionl_field(
			'case_related',
			'Related Case Studies',
			'related_case_studies',
			'relationship',
			array(
				'post_type'     => array( 'case_study' ),
				'return_format' => 'id',
				'max'           => 3,
			)
		),
		fractionl_field( 'case_cta_heading', 'CTA Heading', 'cta_heading' ),
		fractionl_field( 'case_cta_copy', 'CTA Copy', 'cta_copy', 'textarea', array( 'rows' => 3 ) ),
	);
	acf_add_local_field_group(
		array(
			'key'      => 'group_fractionl_case',
			'title'    => 'Case Study Details',
			'fields'   => array_merge( $case_fields, fractionl_seo_fields( 'case' ) ),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'case_study',
					),
				),
			),
		)
	);

	$post_fields = array(
		fractionl_field( 'insight_featured', 'Featured Insight', 'featured_insight', 'true_false', array( 'ui' => 1 ) ),
		fractionl_field( 'insight_reading_time', 'Reading Time Override', 'reading_time', 'text', array( 'placeholder' => '7 min read' ) ),
		fractionl_field(
			'insight_related_services',
			'Related Services',
			'related_services',
			'relationship',
			array(
				'post_type'     => array( 'service' ),
				'return_format' => 'id',
				'max'           => 3,
			)
		),
		fractionl_field(
			'insight_related_posts',
			'Related Insights',
			'related_insights',
			'relationship',
			array(
				'post_type'     => array( 'post' ),
				'return_format' => 'id',
				'max'           => 3,
			)
		),
		fractionl_field(
			'insight_cta_variant',
			'Inline CTA',
			'cta_variant',
			'select',
			array(
				'choices'       => array(
					'project'         => 'Start a project',
					'website-review'  => 'Website review',
					'product-support' => 'Product support',
					'none'            => 'None',
				),
				'default_value' => 'project',
			)
		),
	);
	acf_add_local_field_group(
		array(
			'key'      => 'group_fractionl_post',
			'title'    => 'Insight Settings',
			'fields'   => array_merge( $post_fields, fractionl_seo_fields( 'post' ) ),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'post',
					),
				),
			),
		)
	);
	acf_add_local_field_group(
		array(
			'key'      => 'group_fractionl_page_seo',
			'title'    => 'Page SEO',
			'fields'   => fractionl_seo_fields( 'page' ),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'page',
					),
				),
			),
		)
	);

	fractionl_register_block_fields();
}
add_action( 'acf/init', 'fractionl_register_acf_fields' );

function fractionl_register_block_fields(): void {
	$common_heading = array(
		fractionl_field( 'block_eyebrow', 'Eyebrow', 'eyebrow' ),
		fractionl_field(
			'block_heading',
			'Heading',
			'heading',
			'textarea',
			array(
				'rows'     => 2,
				'required' => 1,
			)
		),
		fractionl_field( 'block_intro', 'Introduction', 'introduction', 'textarea', array( 'rows' => 3 ) ),
	);
	$button_fields  = array(
		fractionl_field( 'block_primary_label', 'Primary Button Label', 'primary_label' ),
		fractionl_field( 'block_primary_link', 'Primary Button Link', 'primary_link', 'link' ),
		fractionl_field( 'block_primary_tally', 'Open Tally Form', 'primary_opens_tally', 'true_false', array( 'ui' => 1 ) ),
		fractionl_field( 'block_secondary_link', 'Secondary Link', 'secondary_link', 'link' ),
	);
	$groups         = array(
		'hero'               => array_merge(
			$common_heading,
			$button_fields,
			array(
				fractionl_field(
					'hero_visual',
					'Visual Style',
					'visual_style',
					'select',
					array(
						'choices'       => array(
							'product' => 'Product dashboard',
							'none'    => 'No visual',
						),
						'default_value' => 'product',
					)
				),
				fractionl_repeater( 'hero_disciplines', 'Discipline', 'disciplines', array( fractionl_field( 'hero_discipline', 'Label', 'label' ) ), array( 'max' => 6 ) ),
			)
		),
		'split-introduction' => array_merge(
			$common_heading,
			array(
				fractionl_field(
					'split_body',
					'Body',
					'body',
					'wysiwyg',
					array(
						'toolbar'      => 'basic',
						'media_upload' => 0,
					)
				),
				fractionl_field( 'split_link', 'Optional Link', 'link', 'link' ),
			)
		),
		'card-grid'          => array_merge(
			$common_heading,
			array(
				fractionl_field(
					'cards_columns',
					'Columns',
					'columns',
					'button_group',
					array(
						'choices'       => array(
							2 => 'Two',
							3 => 'Three',
							4 => 'Four',
						),
						'default_value' => 3,
					)
				),
				fractionl_repeater(
					'cards_items',
					'Card',
					'cards',
					array( fractionl_field( 'card_title', 'Title', 'title', 'text', array( 'required' => 1 ) ), fractionl_field( 'card_description', 'Description', 'description', 'textarea', array( 'rows' => 3 ) ), fractionl_field( 'card_link', 'Optional Link', 'link', 'link' ) ),
					array(
						'min' => 1,
						'max' => 8,
					)
				),
			)
		),
		'studio-differences' => array_merge(
			$common_heading,
			array(
				fractionl_repeater(
					'differences_items',
					'Difference',
					'items',
					array( fractionl_field( 'difference_title', 'Title', 'title' ), fractionl_field( 'difference_body', 'Body', 'body', 'textarea', array( 'rows' => 3 ) ) ),
					array(
						'min' => 2,
						'max' => 4,
					)
				),
			)
		),
		'content-listing'    => array_merge(
			$common_heading,
			array(
				fractionl_field(
					'listing_type',
					'Content Type',
					'content_type',
					'select',
					array(
						'choices'       => array(
							'service'    => 'Services',
							'case_study' => 'Case studies',
							'post'       => 'Insights',
						),
						'default_value' => 'case_study',
					)
				),
				fractionl_field(
					'listing_count',
					'Maximum Items',
					'item_count',
					'number',
					array(
						'default_value' => 3,
						'min'           => 1,
						'max'           => 12,
					)
				),
				fractionl_field(
					'listing_manual',
					'Manually Select Items',
					'selected_items',
					'relationship',
					array(
						'post_type'     => array( 'service', 'case_study', 'post' ),
						'return_format' => 'id',
					)
				),
				fractionl_field( 'listing_link', 'Archive Link', 'archive_link', 'link' ),
			)
		),
		'process-steps'      => array_merge(
			$common_heading,
			array(
				fractionl_repeater(
					'process_items',
					'Step',
					'steps',
					array( fractionl_field( 'process_title', 'Title', 'title' ), fractionl_field( 'process_description', 'Description', 'description', 'textarea', array( 'rows' => 3 ) ) ),
					array(
						'min' => 2,
						'max' => 6,
					)
				),
			)
		),
		'team-grid'          => array_merge(
			$common_heading,
			array(
				fractionl_field(
					'team_detailed',
					'Show Full Bios and Links',
					'show_details',
					'true_false',
					array(
						'ui'            => 1,
						'default_value' => 1,
					)
				),
			)
		),
		'media-text'         => array_merge(
			$common_heading,
			array(
				fractionl_field( 'media_body', 'Body', 'body', 'wysiwyg', array( 'toolbar' => 'basic' ) ),
				fractionl_field(
					'media_image',
					'Image',
					'image',
					'image',
					array(
						'return_format' => 'id',
						'preview_size'  => 'large',
					)
				),
				fractionl_field( 'media_alt', 'Image Alt Text', 'image_alt' ),
				fractionl_field(
					'media_position',
					'Image Position',
					'image_position',
					'button_group',
					array(
						'choices'       => array(
							'left'  => 'Left',
							'right' => 'Right',
						),
						'default_value' => 'right',
					)
				),
			)
		),
		'checklist'          => array_merge(
			$common_heading,
			array(
				fractionl_repeater(
					'checklist_items',
					'Checklist Item',
					'items',
					array( fractionl_field( 'checklist_item', 'Text', 'text' ) ),
					array(
						'min' => 1,
						'max' => 12,
					)
				),
			)
		),
		'call-to-action'     => array_merge( $common_heading, $button_fields ),
		'contact-options'    => array_merge(
			$common_heading,
			array(
				fractionl_repeater(
					'contact_option_items',
					'Inquiry Option',
					'options',
					array( fractionl_field( 'contact_option_title', 'Title', 'title' ), fractionl_field( 'contact_option_description', 'Description', 'description', 'textarea', array( 'rows' => 3 ) ) ),
					array(
						'min' => 1,
						'max' => 6,
					)
				),
			)
		),
		'engagement-models'  => array_merge(
			$common_heading,
			array(
				fractionl_repeater(
					'engagement_items',
					'Engagement Model',
					'items',
					array( fractionl_field( 'engagement_title', 'Title', 'title' ), fractionl_field( 'engagement_description', 'Description', 'description', 'textarea', array( 'rows' => 3 ) ) ),
					array(
						'min' => 1,
						'max' => 5,
					)
				),
			)
		),
	);

	foreach ( $groups as $slug => $fields ) {
		$fields = fractionl_namespace_field_keys( $fields, str_replace( '-', '_', $slug ) );
		acf_add_local_field_group(
			array(
				'key'      => 'group_fractionl_block_' . str_replace( '-', '_', $slug ),
				'title'    => ucwords( str_replace( '-', ' ', $slug ) ),
				'fields'   => $fields,
				'location' => array(
					array(
						array(
							'param'    => 'block',
							'operator' => '==',
							'value'    => 'acf/fractionl-' . $slug,
						),
					),
				),
			)
		);
	}
}

/**
 * ACF field keys must be globally unique even when field names are intentionally shared.
 */
function fractionl_namespace_field_keys( array $fields, string $namespace ): array {
	foreach ( $fields as &$field ) {
		$field['key'] .= '_' . $namespace;
		if ( ! empty( $field['sub_fields'] ) ) {
			$field['sub_fields'] = fractionl_namespace_field_keys( $field['sub_fields'], $namespace );
		}
	}
	return $fields;
}
