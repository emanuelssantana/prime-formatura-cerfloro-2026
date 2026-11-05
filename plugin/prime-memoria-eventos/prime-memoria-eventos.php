<?php
/**
 * Plugin Name: Prime — Memória de Eventos
 * Description: Central fotográfica e memória acadêmica CERFloRO, independente do CRM.
 * Version: 0.3.1
 * Author: Emanuel Santana / Antigravity B550, Antigravity Dell G3 & Codex Dell G3
 */
defined('ABSPATH') || exit;

add_action('template_redirect', function(){
    if (isset($_SERVER['REQUEST_URI']) && (strpos($_SERVER['REQUEST_URI'], 'ii-cerfloro') !== false || strpos($_SERVER['REQUEST_URI'], 'fotos') !== false)) {
        if (!defined('DONOTCACHEPAGE')) define('DONOTCACHEPAGE', true);
        if (!defined('LITESPEED_DISABLE_ALL')) define('LITESPEED_DISABLE_ALL', true);
        nocache_headers();
        header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
        header('Pragma: no-cache');
        header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
    }
}, 1);

add_action('wp_enqueue_scripts',function(){
 if(!is_singular('page'))return;
 $p=get_post(); if(!$p||(!has_shortcode($p->post_content,'prime_fotos_central')&&!has_shortcode($p->post_content,'prime_cerfloro')))return;
 wp_enqueue_style('prime-memory',plugins_url('style.css',__FILE__),[], '0.3.0.'.filemtime(__DIR__.'/style.css'));
 wp_enqueue_script('prime-memory',plugins_url('app.js',__FILE__),[], '0.3.0.'.filemtime(__DIR__.'/app.js'),true);
 wp_enqueue_style('prime-memory-v15',plugins_url('pm-v15-experience.css',__FILE__),['prime-memory'],'0.3.1.'.filemtime(__DIR__.'/pm-v15-experience.css'));
 wp_enqueue_script('prime-memory-v15',plugins_url('pm-v15-experience.js',__FILE__),['prime-memory'],'0.3.1.'.filemtime(__DIR__.'/pm-v15-experience.js'),true);
 if(has_shortcode($p->post_content,'prime_cerfloro')){wp_enqueue_script('prime-legacy-music',plugins_url('mf-music-legacy.js',__FILE__),[], '0.3.0.'.filemtime(__DIR__.'/mf-music-legacy.js'),true);wp_enqueue_script('prime-memory-docs',plugins_url('v14-app.js',__FILE__),['prime-legacy-music'], '0.3.0.'.filemtime(__DIR__.'/v14-app.js'),true);}
 wp_add_inline_script('prime-memory','window.PRIME_MEMORY_BASE='.wp_json_encode(plugin_dir_url(__FILE__)).';','before');
 wp_add_inline_style('prime-memory','body:has(.pm-shell){overflow-x:clip;background:#090b18} body:has(.pm-shell) #masthead,body:has(.pm-shell) .entry-header,body:has(.pm-shell) #colophon{display:none} body:has(.pm-shell) #primary{margin:0;width:100%} body:has(.pm-shell) .ast-container{max-width:none;padding:0} body:has(.pm-shell) .site-main > article{padding:0} body:has(.pm-shell) .entry-content{margin:0}');
});
add_shortcode('prime_fotos_central',function(){return file_get_contents(__DIR__.'/central.html');});
add_shortcode('prime_cerfloro',function(){return file_get_contents(__DIR__.'/event.html');});
add_action('wp_head',function(){if(!is_singular('page'))return;$p=get_post();if(!$p||!has_shortcode($p->post_content,'prime_cerfloro'))return;
 $data=['@context'=>'https://schema.org','@type'=>'CollectionPage','name'=>'II CERFloRO 2026 — memória fotográfica','url'=>get_permalink(),'description'=>'Cobertura autoral de Emanuel Santana nos dias 3 e 4 de novembro de 2026. Fotografias em alta resolução com entrega gratuita anunciada.','inLanguage'=>'pt-BR','author'=>['@type'=>'Person','name'=>'Emanuel Santana'],'isPartOf'=>['@type'=>'WebSite','name'=>'Prime Formatura','url'=>home_url('/')]];
 echo '<script type="application/ld+json">'.wp_json_encode($data,JSON_UNESCAPED_UNICODE|JSON_HEX_TAG|JSON_HEX_AMP).'</script>';
});

add_filter('script_loader_tag',function($tag,$handle){if($handle==='prime-memory-docs')return str_replace('<script ','<script type="module" ',$tag);return $tag;},10,2);
