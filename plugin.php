<?php
/*
Plugin Name: Hex Calculator by www.calculator.io
Plugin URI: https://www.calculator.io/hex-calculator/
Description: Online hex calculator performs hex math operations and conversions. Hex addition, hex subtraction, hex multiplication, hex division became fast & easy
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_hex_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Hex Calculator by Calculator.iO";

function display_ci_hex_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Hex Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_hex_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_hex_calculator', 'display_ci_hex_calculator' );