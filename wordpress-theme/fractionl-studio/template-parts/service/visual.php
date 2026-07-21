<?php
/** Decorative service visual. @package Fractionl_Studio */
$type = sanitize_key( $args['type'] ?? 'strategy' );
if ( 'website' === $type ) : ?>
<div class="visual-website" aria-label="Responsive website shown on desktop and mobile"><div class="mock-browser"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-site"><small>Fractionl project</small><strong>Ideas made<br>useful.</strong><button tabindex="-1">Start here</button></div></div><div class="mock-mobile"><div class="mock-mobile__content"><strong>Ideas made<br>useful.</strong><p>Clear thinking for ambitious digital work.</p><span>Start here ↗</span></div></div></div>
<?php elseif ( 'application' === $type ) : ?>
<div class="visual-app" aria-label="Application dashboard"><div class="app-sidebar"><b>F</b><i></i><i></i><i></i></div><div class="app-main"><small>Workspace overview</small><div class="app-greeting">Good morning, Alex.</div><div class="app-stats"><span><b>84%</b>Efficiency</span><span><b>128</b>Automations</span></div><div class="app-chart"><i style="height:42%"></i><i style="height:66%"></i><i style="height:54%"></i><i style="height:88%"></i><i style="height:72%"></i></div></div><div class="app-toast">✓ Workflow completed</div></div>
<?php elseif ( 'product' === $type ) : ?>
<div class="visual-product" aria-label="Product design workflow"><div class="flow-card"><small>Checkout flow</small><div><i></i><i></i><i></i></div></div><div class="design-screen"><span class="design-toolbar">Design system · v2.4</span><div class="design-ui"><i></i><i></i><i></i></div></div><div class="comment-pin">N</div><div class="comment-bubble">Ready for dev handoff</div></div>
<?php elseif ( 'creative' === $type ) : ?>
<div class="visual-creative" aria-label="Creative deliverables collage"><div class="creative-poster"><small>Campaign 04</small><strong>Make it<br><em>matter.</em></strong></div><div class="creative-social"><span>New release</span><b>F/</b></div><div class="creative-slide"><small>Sales deck</small><strong>One clear story.</strong><i></i></div></div>
<?php elseif ( 'support' === $type ) : ?>
<div class="visual-support" aria-label="Monitoring and support interface"><div class="support-head"><span><i></i>All systems operational</span><small>Live monitoring</small></div><div class="uptime"><small>Uptime · last 30 days</small><strong>99.99%</strong></div><div class="support-metrics"><span><small>Last backup</small><b>12 min ago</b></span><span><small>Security</small><b>Protected</b></span></div></div>
<?php else : ?>
<div class="visual-strategy" aria-label="Technology decision map"><div class="visual-label">Decision map</div><div class="strategy-node strategy-node--start">Business goal</div><i></i><div class="strategy-options"><span>Build</span><span>Buy</span><span>Skip</span></div><div class="strategy-note">Recommended path → MVP</div></div>
<?php endif; ?>
