<?php

/**
 * Implementing hook_process_page()
 */
function jjamerson_preprocess_page(&$variables) {

  global $base_url, $base_path, $user;

  if ( isset($node['language']) ) {
    $lang = $node['language'];
  } else {
    $lang = 'und';
  }

  // Set a current node variable, because otherwise actions that rely on field data will affect
  // both the draft & published version of the page.
  if ( function_exists('workbench_moderation_node_current_load') ) {
    if ( substr($_GET['q'], -strlen('/draft') ) === '/draft' ) {
      $current_node = workbench_moderation_node_current_load($variables['node']);
    } else {
      $current_node = $variables['node'];
    }
  } else {
    $current_node = isset($variables['node']) ? $variables['node'] : false;
  }

  /* Return unformatted content if notemplate variable is defined */
  if ( isset($_GET['notemplate']) && $_GET['notemplate'] === '1') {
    drupal_static_reset('drupal_add_css');
    drupal_static_reset('drupal_add_js');
    echo render($variables['page']['content']['system_main']['main']);
    die; // Ich sterbe.
  }

  /* Hide tabs from users that aren't included in workbench moderation */
  if ( module_exists('workbench_moderation') && !user_access('view moderation history') ) {
    $variables['tabs'] = array();
  }

  /* If this is a development environment, rebuild the minified JS file.
     For the automatic JS minification to occur:
     1. PHP needs write permissions for /js/jjamerson.min.js
     2. The development_environment variable needs to be defined. You can do this
        either in a local settings file (e.g. settings.local.php) or via a drush command:
        drush vset development_environment 1
  */
  $dev_env = variable_get('development_environment');
  if ( $dev_env == 1) {
    require dirname(__FILE__) . '/third-party/class.JavaScriptPacker.php';

    $source = '';
    if ( $directory_handle = opendir( dirname(__FILE__) . '/js/source') ) {
      while ( ($file = readdir($directory_handle) ) !== false) {
        // Only load JS extensions. This prevents issues with the packer loading .DS_Store files, at the least.
        if ( substr($file, -3) === '.js') {
          $source .= file_get_contents(  dirname(__FILE__) . '/js/source/' . $file) . "\n";
        }
      }
      closedir($directory_handle);
    }
    $packer = new JavaScriptPacker($source, 'None', true, false);
    $packed = $packer->pack();
    file_put_contents( dirname(__FILE__) . '/js/jjamerson.min.js', $packed);
  } elseif ( $dev_env == 2) {
    /* Alternatively, just add each JS file via drupal_add_js. Better for hunting down errors because
       the console will tell you the offending file & line number: */
    if ( $directory_handle = opendir( dirname(__FILE__) . '/js/source') ) {
      while ( ($file = readdir($directory_handle) ) !== false) {
        if ( preg_match('/.js$/', $file) ) {
          drupal_add_js( drupal_get_path('theme', 'jjamerson')   . '/js/source/' . $file );
        }
      }
      closedir($directory_handle);
    }
  }

  //drupal_add_css( path_to_theme() . '/third-party/bootstrap/bootstrap-combined.no-icons.min.css');
  drupal_add_css( drupal_get_path('theme', 'jjamerson') . '/fonts/font-awesome/css/font-awesome.min.css');

  drupal_add_js(  drupal_get_path('theme', 'jjamerson') . '/third-party/html5shiv-printshiv.js');
  drupal_add_js(  drupal_get_path('theme', 'jjamerson') . '/third-party/respond.min.js', array('scope' => 'footer') );
  drupal_add_js(  drupal_get_path('theme', 'jjamerson') . '/third-party/soundcloud-api.js', array('scrope' => 'footer'));
  drupal_add_js(  drupal_get_path('theme', 'jjamerson') . '/third-party/jquery.dataTables.min.js');

  /* Allows you to use node-type, and node ID base page templates: */
  if (!empty($variables['node'])) {
    $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
    $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->vid;
  } //Adds custom 404 error page template
  elseif (drupal_get_http_header('status')) {
    $variables['theme_hook_suggestions'][] = 'page__404';
  }

  /* Add a pretitle page variable */
  $variables['pretitle'] = '';
  if ($variables['page']['#type'] === 'page' && isset ( $variables['node'] )) {
    if ( isset($variables['node']->field_pretitle) && count($variables['node']->field_pretitle) ) {
      $variables['pretitle'] = $variables['node']->field_pretitle[$lang][0]['safe_value'];
      $variables['pretitle'] = "<span class='pretitle'>{$variables['pretitle']}</span>";
    }
  }

  /* Return unformatted content if notemplate variable is defined */
  if ( isset($_GET['content-only']) ) {
    unset($variables['page']['header']);
    unset($variables['page']['sidebar_first']);
    unset($variables['page']['sidebar_second']);
    unset($variables['page']['content']['berklee_info_block_berklee_info_block']);
    unset($variables['page']['page_top']);
    unset($variables['page']['page_bottom']);
    unset($variables['page']['footer']);
    /* check if this is an ajax request. if so, return just the page content: */
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
      echo drupal_render( $variables['page']['content'] );
      echo drupal_render( $variables['page']['content_bottom'] );
      die;
    }
  }

  if ( isset($_GET['render-only']) ) {
    $renderable_regions = explode('--', $_GET['render-only']);
    foreach( $variables['page'] as $page_array_item => $bla ) {
      if ( strpos($page_array_item, '#') !== 0) {
        $unset_region = true;
        foreach( $renderable_regions as $region_name) {
          if ( $region_name === $page_array_item ) {
            $unset_region = false;
          }
        }
        if ($unset_region) {
          unset( $variables['page'][$page_array_item] );
        }
      }
    }
    if ( !in_array('tabs', $renderable_regions) ) {
      unset($variables['tabs']);
    }
    if ( !in_array('content', $renderable_regions) ) {
      $variables['title'] = '';
      unset( $variables['page']['header']['share_links'] );
    }
  }

	// jsong
	// resizing the front page .front-block
	// add "Full list" text on front page schedule block
	if(drupal_is_front_page()){
		drupal_add_js('jQuery(document).ready(function($){
			var frontblocks = $(".front-block");
			var n = frontblocks.length;
			var w = $(document).width();
			if(w > 873){
				if(n == 8){
					$(".home-block-7").width("40%");
					$(".home-block-8").width("40%");
					return;
				}
				if(n == 9 && ($(".home-block-5").length || $(".home-block-6").length)){
					$(".home-block-7").width("31%");
					$(".home-block-8").width("31%");
					return;
				}
			}

			$("body.front").find("caption > a").append("&nbsp;&raquo;&nbsp<span style=\"font-size:70%\">Full list</span>");

		});', 'inline');
	}

	// jsong
	// quick dirty way of redirecting login required page to Onelogin site.
	// to-do: find the better way of achiving this function.
	//dpm($variables['node']->type);
	if(node_is_page($variables['node']) && !user_is_logged_in()){
		$nodeType = $variables['node']->type;
		if($nodeType == 't_individual' || $nodeType == 't_class' || $nodeType == 't_core' || $nodeType == 'webform'){
			$dest = drupal_get_destination();
			drupal_goto('https://learningcenter.berklee.edu/onelogin_saml/sso?destination='.$dest['destination']);
		}
	}

}

function jjamerson_process_image_style(&$variables) {
  //_jjamerson_update_image($variables);
}

function jjamerson_process_image(&$variables) {
  // Check to make sure the image wasn't run through image_style() or another function which might cause
  // the path to be converted to an absolute one.
  if ( (strpos($variables['path'], 'http') === false) ) {
    //_jjamerson_update_image($variables);
  }
}

// Add URL for smaller image size as an attribute, to be picked up and swapped out in image.tpl.php file
// (run image_styles() to see available options)
function _jjamerson_update_image(&$variables) {
  // if the image has been resized by an image style to a smaller size, leave it alone:
  if ( ($variables['width'] < 950) && isset($variables['attributes']['small-src']) ) {
    unset($variables['attributes']['small-src']);
    return false;
  }

  $image_uri = drupal_realpath($variables['path']);
  $image_size = getimagesize ( $image_uri );
  if ($image_size) {
    if ($image_size[0] > 1000)  {
      $variables['attributes']['medium-src'] = image_style_url('scale_to_970px_width', $variables['path']);
    }
    if ($image_size[0] > 500)  {
      $variables['attributes']['small-src'] = image_style_url('scale_to_480px_width', $variables['path']);
    }
  }
}


function jjamerson_preprocess_region(&$region) {
  if ( isset($node['language']) ) {
    $lang = $node['language'];
  } else {
    $lang = 'und';
  }

  $row_div_prefix = '<div class="row">';
  $row_div_suffix = '</div>';
  switch($region['region']) {
    case 'sidebar_first':
      $region['attributes_array']['id'] = 'sidebar-first';
      $region['attributes_array']['role'] = 'complimentary';
      break;
    case 'sidebar_second':
    $region['attributes_array']['id'] = 'sidebar-second';
      $region['attributes_array']['role'] = 'complimentary';
      break;
    case 'header';
      $region['attributes_array']['role'] = 'banner';
      break;
    case 'content_top':
    	$region['attributes_array']['class'][] = 'clearfix';
    case 'content_bottom':
      break;
    case 'footer':
      $region['attributes_array']['id'] = 'footer';
      $region['attributes_array']['role'] = 'contentinfo';
      $region['content'] = $row_div_prefix . $region['content'] . $row_div_suffix;
      break;
  }
}

/**
 * Implementing hook_preprocess_html()
 */
function jjamerson_preprocess_html(&$variables) {
  /* Add user roles to the body class: */
  if ( isset($variables['user']) ) {
    $user = $variables['user'];
    if (is_array($user->roles) && count($user->roles) ) {
      foreach($user->roles as $role_id => $role_name) {
        $variables['classes_array'][] = 'role-'.$role_id;
        //$variables['classes_array'][] = 'role-'.$role_name;
      }
    }
  }
}

function jjamerson_process_html(&$variables) {
  if ( isset($_GET['render-only']) ) {
    unset($variables['page_bottom']);
  }
}

/**
 * Implementing hook_html_head_alter()
 */
function jjamerson_html_head_alter(&$variables) {
  //Change the meta content type to HTML5 content type
  $variables['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8'
  );

  //Adding the mobile viewport
  $variables['viewport'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
    )
  );

  $variables['chrome_frame_compatability'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'X-UA-Compatible',
      'content' => 'IE=edge,chrome=1',
    ),
    '#access' => TRUE,
  );
}

/* Placeholder. Allows you to manipulate the rendered (pfft) menu tree. */
function jjamerson_preprocess_menu_tree(&$variables) {
}

function jjamerson_menu_tree(&$variables) {
  return '<ul class="menu">' . $variables['tree'] . '</ul>';
}


function jjamerson_preprocess_block(&$variables) {
  /* Add an item count to the menu itself */
  if ( ($variables['block']->module === 'menu'
  || $variables['block_html_id']  === 'block-system-main-menu')
  || $variables['block']->module === 'berklee_site_section'
  || ( strpos( $variables['block']->css_class, 'main-menu-block') > -1 )
  && isset($variables['elements']) ) {
    if ( isset( $variables['block']->subject) && $variables['block']->subject > '') {
      $aria_label = "aria-label='". strip_tags($variables['block']->subject) ."'";
    } else { $aria_label = ''; }
    $page_menus[ $variables['block_html_id'] ] = $variables['block_html_id'];
    $counter = 0;
    foreach ($variables['elements'] as $element) {
      if (is_array($element) && isset($element['#original_link'])) {
        $counter++;
      }
    }
    // This may be a block where the menu is already rendered in the content region. If so,
    // we parse the content region for parent-level list items.
    if ($counter === 0 && isset($variables['content']) && in_array('main-menu-block', $variables['classes_array']) ) {
      // we'll use querypath to parse. https://www.drupal.org/project/querypath | http://querypath.org/
      if ( function_exists('htmlqp') ) {
        try {
          $content_qp = htmlqp($variables['content']);
          $child_menus = $content_qp->remove('ul ul');
          $content_qp->top('ul');
          $counter = $content_qp->find('li')->length;
        } catch (Exception $e) {

        }
      }
    }

    if ($counter > 0) {
      /* Add it both as a class and as an attribute. The attribute is easier to
         grab & work with in JS. */
      $variables['classes_array'][] = 'item-count-' . $counter;
      $variables['attributes_array']['item-count'] = $counter;
    }

    $variables['content'] = "<nav role='navigation' {$aria_label}>" . $variables['content'] . '</nav>';
  }
}

function jjamerson_preprocess_views_view_views_rss(&$variables) {
  // add the iTunes namespace as necessary (Sounds of Berklee & Inside Berklee)
  // This says false for now because the iTunes feeds are not implemented yet!
  if(false) {
    $variables['view']->style_plugin->options['namespaces']['itunes'] = array(
      'prefix' => 'xmlns',
      'uri' => 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    );
  }
}

function jjamerson_form_search_block_form_alter(&$form, &$form_state, $form_id){

	//replace default search callback (search_box_form_submit)
	//$form['#submit'][0] = 'search_api_views';
	//$form['actions']['submit']['#value'] = 'search/site';
	$form['search_api_views_fulltext'] = $form['search_block_form'];
	unset($form['search_block_form']);
	//$form['#theme'][0] = 'search_api_views_fulltext';
	$form['#action'] = '/search/site';
	$form['#method'] = 'get';
	//$form['#form_id'] = 'search_api_views_fulltext';
	unset($form['#form_id']);
	//$form['#token'] = 'search_api_views_fulltext';
	unset($form['#token']);
	//$form['form_id']['#value'] = 'search_api_views_fulltext';
	unset($form['form_id']);

	unset($form['form_token']);

	$form['search_api_views_fulltext']['#attributes']['placeholder'] = t('SEARCH IN LEARNING CENTER');

	//dsm($form);
}

function jjamerson_menu_link($variables) {
  $element = $variables['element'];
  $options = $element['#localized_options'];
  $href = $element['#href'];
  $link_text = $element['#title'];

  if ( $element['#original_link']['hidden'] == TRUE) {
    return;
  }

  $sub_menu = '';
  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
    $element['#attributes']['class'][] = 'has-submenu';
  } else {
    $element['#attributes']['class'][] = 'no-submenu';
  }

  /* Add an icon, if set: */
  if ( function_exists('menu_fields_get_value') ) {
    $mlid = $element['#original_link']['mlid'];
    if ( menu_fields_get_value($mlid, 'Icon') ) {
      $icon = menu_fields_get_value($mlid, 'Icon');
      $link_text = "<i class='icon {$icon}' aria-hidden='true'></i><span class='text'>{$link_text}</span>";
      $options['html'] = TRUE;
    }
  }

  /* Add classes, if set: */
  if ( function_exists('menu_fields_get_value') ) {
    $mlid = $element['#original_link']['mlid'];
    if ( menu_fields_get_value($mlid, 'Classes') ) {
      $class = menu_fields_get_value($mlid, 'Classes');
      $options['attributes'] = array('class' => array($class));
    }
  }

  /* Mess with the main menu: */
  if ($element['#theme'] === 'menu_link__main_menu') {
    if ($element['#title'] === 'Faculty/Staff Services') {
      global $user;
      if ( is_object($user) && is_array($user->roles) && count($user->roles) ) {
        if ( isset($user->roles[13]) ) {
          $link_text = 'Staff Services';
        } elseif (isset($user->roles[14]) ) {
          $link_text = 'Faculty Services';
        }
      }
    }
    /* Add the search block to the dropdown: * by jsong
    if ( $href == 'search/google') {
      $search_block = module_invoke('search', 'block_view', 'search');
      $sub_menu = "<ul class='menu'>".render($search_block)."</ul>";
    }
    /**/
  }

  /* Print out the description, which is left up to the CSS to display/hide. */
  if ( isset($element['#localized_options']['attributes']['title']) ) {
    $description = '<div class="menu-item-description">' . $element['#localized_options']['attributes']['title'] . '</div>';
    $options['html'] = TRUE;
  } else {
    $description = '';
  }

  if ( isset($_GET['absolute-links']) ) {
    if ( strpos($href, 'node/') > -1 || strpos($href, '.') == false ) {
      $real_base_url = 'http://www.berklee.edu/';
      $href = $real_base_url . drupal_get_path_alias($href);
    }
  }

  /* attach destination to onelogin link */
  if ($element['#theme'] == 'menu_link__menu_login_menu' && $element['#title'] == 'Login'){
	  $dest = drupal_get_destination();
	  $href = $element['#href'].'?destination='.$dest['destination'];
	  $link = '<a href="/'.$href.'">'.$link_text.'</a>';
	  return '<li' . drupal_attributes($element['#attributes']) . '>' . $link . $sub_menu . "</li>\n";
	}
	/**/

  $link = l($link_text . $description, $href, $options);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $link . $sub_menu . "</li>\n";
}



















