/* Minified file [jjamerson.min.js] on 20160120, done by http://jscompress.com/ */
jQuery(document).ready(function($) {
	$('.track').each(function() {
		if ($(this).attr('data-tracking-category') > '') {
			var category = $(this).attr('data-tracking-category')
		} else {
			var category = 'General Click Tracking'
		}
		var value = false;
		if ($(this).attr('data-tracking-value') > '') {
			value = $(this).attr('data-tracking-value')
		} else if ($(this).attr('href') > '') {
			value = $(this).attr('href')
		} else if ($(this).attr('id') > '') {
			value = $(this).attr('id')
		}
		if ($(this).hasClass('track-click')) {
			$(this).click(function() {
				if (typeof(ga) != "undefined") {
					if (value) {
						ga('send', 'event', category, 'Click', value)
					}
				}
			})
		}
	});
	$('.front .view-hero-images .views-row').each(function(position, slider) {
		var img = $('img', slider).first(),
			link = $('a', slider).last();
		if (img && link) {
			$(link).click(function() {
				if (typeof(ga) != "undefined") {
					real_position = position + 1;
					position_label = 'Slider ' + real_position;
					slider_href = $(this).attr('href');
					position_url_label = real_position + ':' + slider_href;
					img_name = $(img).attr('src').split('/');
					img_name = (img_name[img_name.length - 1]) + ':' + slider_href;
					ga('send', 'event', 'Homepage Slider Positions', 'Click', position_label);
					ga('send', 'event', 'Homepage Slider Content', 'Click', position_url_label);
					ga('send', 'event', 'Homepage Slider Imagery', 'Click', img_name)
				}
			})
		}
	});
	$('#block-menu-menu-campus-tools .content li a').click(function() {
		var clone = $(this).clone(false);
		$('.menu-item-description', clone).remove();
		var value = clone.text();
		ga('send', 'event', 'Campus Tools', 'Click', value)
	})
});

function rememberCollapsed(action, thing) {
	if (typeof(Storage) == undefined || localStorage == null) {
		return -1
	}
	if (action === 'add') {
		localStorage.collapsedBlocks += thing
	}
	if (action === 'remove') {
		localStorage.collapsedBlocks = localStorage.collapsedBlocks.split(thing).join('')
	}
	if (action === 'check') {
		if (!localStorage.collapsedBlocks) {
			localStorage.collapsedBlocks = '';
			return -1
		} else {
			return localStorage.collapsedBlocks.indexOf(thing)
		}
	}
}
jQuery(document).ready(function($) {
	if (typeof(Storage) != undefined && localStorage != null) {
		$('.block.collapsible').each(function() {
			if ($(this).attr('id')) {
				var isCollapsed = rememberCollapsed('check', $(this).attr('id'));
				if (isCollapsed > -1) {
					$(this).addClass('collapsed').removeClass('expanded')
				}
			}
		})
	}
	$('.block.collapsible.collapsed .content').hide().addClass('jquery-altered');
	$('.block.collapsible > h3').click(function() {
		var parent = $(this).parent('.block');
		if (!parent.hasClass('collapsed') && !parent.hasClass('expanded')) {
			parent.addClass('expanded')
		} /* parent.toggleClass('collapsed expanded'); */
		$('.content', parent).slideToggle(142);
		if (parent.hasClass('collapsed')) {
			rememberCollapsed('add', '|' + parent.attr('id'))
		} else {
			rememberCollapsed('remove', '|' + parent.attr('id'))
		}
	});
	$('ul.collapsible').each(function() {
		$('li:nth-child(n+4)', this).hide();
		var expand = $('<div />').addClass('expand').html('See All').appendTo($(this));
		expand.click(function() {
			var parent = $(this).parent('ul.collapsible');
			$('li:nth-child(n+4)', parent).toggle(200);
			if ($(this).html() === 'See All') {
				$(this).html('Collapse List').addClass('expanded')
			} else {
				$(this).html('See All').removeClass('expanded')
			}
		})
	});
	$('.berklee-grid').each(function() {
		var height = $(this).attr('height');
		var minWidth = $(this).attr('data-min-width');
		$('.berklee-gridblock', this).each(function() {
			$(this).css('height', height).addClass('jquery-altered');
			if (minWidth) {
				$(this).css('minWidth', minWidth)
			}
		})
	})
});
jQuery(document).ready(function($){

	// to memorized and keep the position of emergency bar.
	var check_emergency_cookie = function(c){
		var duration = 3600 * 3 * 1000; // 3 hours
		//var duration = 60 * 1000; // for debugging
		var targetStamp = $.cookie('mdev_emergency_duration');
		var now = $.now();

		if(targetStamp == null || targetStamp < now){
			if(c==undefined){
				$.cookie('mdev_emergency_duration', now+duration, {path:'/', domain:'berklee.edu'});
				//$.cookie('mdev_emergency_duration', now+duration, {path:'/', domain:'lb.dev'}); // for debugging
				console.debug("cookie reset-> "+ $.cookie('mdev_emergency_duration'));
			}
			return false;
		}else{
			return true;
		}
	};
  if ( $('body').hasClass('emergency') ){
    var classes = $('body').attr('class').split(' ');
    for (i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('emergency-id') > -1) {
        var emergencyId = classes[i];
      }
    }
  }
  //rememberCollapsed('remove', emergencyId);
  $('.region-emergency-bar').each(function() {
    var emergencyBar = $(this);
    var emergencyExpand = $('span.expand-button', this);
    $(this).css('marginTop', '0px');
    // close
    $('.container', this).click(function() {

      emergencyBar.css('marginTop', '-300px');
      emergencyExpand.css('marginTop', '300px');
      emergencyExpand.css('opacity', 0.9);
      rememberCollapsed('add', '|' + emergencyId);
      check_emergency_cookie();

    });
    //open
    emergencyExpand.click(function() {
      $(this).css('opacity', 0);
      emergencyBar.css('marginTop', '0');
      rememberCollapsed('remove', emergencyId);
			$.cookie('mdev_emergency_duration', '', {path:'/', domain:'berklee.edu', expires: -1});
    });

		// the bar remains as closed
		if(check_emergency_cookie('loaded') == true){
			emergencyBar.css('marginTop', '-300px');
			emergencyExpand.css('marginTop', '300px');
			emergencyExpand.css('opacity', 0.9);
		}

  });
});
jQuery(document).ready(function($) {
	$('.form-item').each(function() {
		var label = $('> label', this);
		if (label.length) {
			var span = $('span', label).clone();
			$('span', label).remove();
			var newLabel = label.html().trim();
			label.html(newLabel);
			if (span.length) {
				span.appendTo(label)
			}
		}
	});
	$('select').each(function() {
		if ($(this).attr('size')) {
			$(this).height('auto')
		}
	})
});

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		var value = pair[1];
		if (value === undefined) {
			value = true
		}
		if (pair[0] == variable) {
			return value
		}
	}
	return (false)
}
jQuery(document).ready(function($) {
	$("body .node:not(.preserve-styles) .content *[style]").not('img').not('.jquery-altered').not('.webform-component').removeAttr("style");
	var history = window.history.state;
	var history_altered = false;
	$(document).ajaxComplete(function(event, xhr, settings) {
		pagerMod()
	});
	var remember_theme = getQueryVariable('remember');
	var timestamp = getQueryVariable('timestamp');
	if (remember_theme && !timestamp) {
		var timestamp = Date.now();
		window.location.href = window.location.href + '&timestamp=' + timestamp
	} else {
		$('body').css('opacity', 1)
	}
	function pagerMod() {
		$('ul.pager li a').click(function() {
			var targetUrl = $(this).attr('href');
			var newHash = $(this).attr('href').split('?')[1];
			window.history.pushState(history, 'Events', targetUrl);
			history_altered = true
		})
	};
	pagerMod();
	$('#skip-link a').click(function() {
		var target = $(this).attr('href');
		$(target).attr('tabindex', -1).focus()
	});
	window.onpopstate = function(event) {
		if (history_altered) {
			window.location.href = window.location.href
		}
	};
	$('.match-auto-height').each(function() {
		var parent = $(this).parent();
		var parentAutoHeight = parseInt(parent.attr('auto-height'));
		var paddingTop = parseInt($(this).css('paddingTop').replace('px', ''));
		var paddingBottom = parseInt($(this).css('paddingBottom').replace('px', ''));
		var height = $(this).height() + paddingTop + paddingBottom;
		if (height > parentAutoHeight || isNaN(parentAutoHeight)) {
			parent.attr('auto-height', height + paddingTop + paddingBottom);
			parent.addClass('auto-height-matched')
		}
	});

	function updateFlexr() {
		$('.flexr').each(function() {
			var multiplier = false;
			if (($(this).attr('data-aspect-multiplier') > 0)) {
				multiplier = $(this).attr('data-aspect-multiplier')
			} else if ($(this).hasClass('flexr-2-1')) {
				multiplier = 0.5
			} else if ($(this).hasClass('flexr-16-9')) {
				multiplier = 0.5625
			} else if ($(this).hasClass('flexr-3-2')) {
				multiplier = 0.66
			} else if ($(this).hasClass('flexr-3-4')) {
				multiplier = 0.75
			} else {
				multiplier = 1
			}
			var dimension = false;
			if ($(this).attr('data-dimension') > '') {
				dimension = $(this).attr('data-dimension')
			} else if ($(this).hasClass('flexr-height')) {
				dimension = 'height'
			} else {
				dimension = 'width'
			}
			if (dimension === 'width' && multiplier) {
				$(this).height($(this).width() * multiplier)
			} else {
				$(this).width($(this).height() * multiplier)
			}
			if (!$(this).hasClass('flexrd')) {
				$(this).addClass('flexrd')
			}
		})
	}
	updateFlexr();
	$(window).resize(function() {
		updateFlexr()
	});
	$('.image-background .card, .image-covered, .cover-image').each(function() {
		if ($(this).hasClass('covered-image')) {
			var container = $(this).parent('div');
			var image = $(this)
		} else {
			var container = $(this);
			var image = $('img', this)
		}
		var containerRatio = container.width() / container.height();
		var imageWidth, imageHeight;
		var imageClone = $('<img />').attr('src', image.attr('src')).load(function() {
			imageWidth = this.width;
			imageHeight = this.height;
			var imageRatio = imageWidth / imageHeight;
			if ((container.width() / imageRatio) < container.height()) {
				var newImageWidth = container.height() * imageRatio;
				image.width(newImageWidth)
			} else {
				image.width(container.width())
			}
			image.height('auto');
			image.css('opacity', 1)
		})
	});
	$('.auto-height-matched').each(function() {
		$('.match-auto-height', this).css('minHeight', $(this).attr('auto-height') + 'px')
	});
	$('.region a').each(function() {
		if ($(this).attr('href') > '' && $(this).attr('href').indexOf('berklee.edu') == -1 && $(this).attr('href').indexOf('http') > -1) {
			$(this).attr('target', '_blank')
		}
	});
	$('.region-content a').each(function() {
		if ($(this).attr('href') > '' && $(this).attr('href').indexOf('/user/login') > -1 && $(this).attr('href').indexOf('http') == -1 && $(this).attr('href').indexOf('?') == -1) {
			var newHref = $(this).attr('href') + '?destination=' + document.URL;
			$(this).attr('href', newHref)
		}
	});
	var userAgent = navigator.userAgent;
	if (userAgent) {
		var userAgentSplit = userAgent.split('/');
		var lastUAItem = userAgentSplit[userAgentSplit.length - 1];
		if (lastUAItem.toLowerCase().indexOf('ieverywhere') > -1) {
			$('body').addClass('content-only-display')
		}
	}
	$('a[rel=tooltip-ajax]').each(function() {
		$(this).qtip({
			content: {
				text: function(event, api) {
					var full_link = $(this).attr('href'),
						source = full_link,
						max_text_length = 150;
					if (source.indexOf('?') > -1) {
						source += '&'
					} else {
						source += '?'
					}
					source += 'content-only';
					$.get(source, function(ajaxContent) {
						var trimmed_content = $(ajaxContent).each(function() {
							$(this).find('.field-item').each(function() {
								var item_content = $(this).text();
								if (item_content.length > max_text_length) {
									$(this).text(item_content.substring(0, max_text_length) + '...')
								}
							});
							$(this).find('.content').last().append('<div class="button"><a href="' + full_link + '">See Full Listing</div></a>')
						});
						api.set('content.text', trimmed_content)
					});
					return 'Loading...'
				}
			},
			position: {
				viewport: $(window)
			},
			style: 'qtip-wiki',
			hide: {
				fixed: true,
				delay: 500
			}
		})
	});
	$('a[rel=tooltip-link]').each(function() {
		$(this).qtip({
			content: {
				text: function(event, api) {
					var link = $(this).attr('href');
					if (!$(this).attr('title')) {
						if (link.indexOf('/courses') > -1) {
							var linkText = 'View all courses that fulfill this requirement.'
						} else {
							var linkText = 'Read more.'
						}
					} else {
						var linkText = $(this).attr('title')
					}
					return '<a href="' + link + '">' + linkText + '</a>'
				}
			},
			position: {
				viewport: $(window)
			},
			style: 'qtip-wiki',
			hide: {
				fixed: true,
				delay: 500
			}
		})
	});
	$('a[rel=tooltip]').each(function() {
		$(this).qtip({
			content: {
				text: $(this).attr('title')
			},
			position: {
				viewport: $(window)
			},
			style: 'qtip-light',
			show: {
				delay: 1000,
			},
		})
	});
	$('a[rel=subtitle]').each(function() {
		var subtitle = $('<span />').addClass('subtitle').text($(this).attr('title')).appendTo($(this))
	});
	$('.front .view-hero-images .views_slideshow_slide').each(function(position, slider) {
		var img = $('img', slider).first(),
			link = $('a', slider).last();
		if (img && link) {
			$(link).click(function() {
				real_position = position + 1;
				position_label = 'Slider ' + real_position;
				slider_href = $(this).attr('href');
				position_url_label = real_position + ':' + slider_href;
				img_name = $(img).attr('src').split('/');
				img_name = (img_name[img_name.length - 1]) + ':' + slider_href;
				if (typeof(_gaq) != "undefined") {
					_gaq.push(['_trackEvent', 'Homepage Slider Positions', 'Click', position_label]);
					_gaq.push(['_trackEvent', 'Homepage Slider Content', 'Click', position_url_label]);
					_gaq.push(['_trackEvent', 'Homepage Slider Imagery', 'Click', img_name])
				}
			})
		}
	});
	$('iframe.soundcloud-creditable').each(function(index, element) {
		var credits = document.createElement('div');
		$(element).after(credits);
		var widget = SC.Widget(element);
		widget.bind(SC.Widget.Events.READY, function() {
			widget.bind(SC.Widget.Events.PLAY, function() {
				widget.getCurrentSound(function(current_sound) {
					var url_regex = /(https?:\/\/(([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
					var description = current_sound.description.replace(url_regex, function(match, p1, offet, string) {
						return '<a href="' + p1 + '" target="_blank">' + p1 + '</a>'
					});
					credits.innerHTML = '<p><strong>Current Song:</strong> ' + current_sound.title + '</p>' + '<p><strong>Current Artist:</strong> ' + current_sound.user.username + '</p>' + '<p><strong>Description/Credits</strong><br />' + description.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</p>'
				})
			})
		})
	});
	$('.highlights-stripe .views-row').each(function() {
		var container = $('<div />').addClass('highlight-box-teaser-container');
		container.insertAfter($('img', this));
		$('h2, p, a', this).appendTo(container)
	})
});
var breakPoint = 767;
jQuery(document).ready(function($) {
	if ($(window).width() > 480) {
		$('img.shrinkage-performed').each(function() {
			var width = false;
			if ($(this).parents('.view').width()) {
				width = $(this).parents('.view').width()
			} else if ($(this).parent().width() > $(this).width()) {
				width = $(this).parent().width()
			} else {
				width = 1000
			}
			if (width > 970) {
				$(this).attr('src', $(this).attr('large-src'))
			} else if (width > 480) {
				if ($(this).attr('medium-src') > '') {
					$(this).attr('src', $(this).attr('medium-src'))
				} else if ($(this).attr('large-src') > '') {
					$(this).attr('src', $(this).attr('large-src'))
				}
			}
			$(this).removeClass('shrinkage-performed').addClass('shrinkage-undone')
		})
	}
	function createSlideshow(imageSet, inputType, classes, replacedElementName) {
		var slideshow = $('<div />').addClass('content-slideshow ' + classes).attr('data-active-slide', 0);
		var slideshowChrome = $('<div />').addClass('slideshow-chrome').appendTo(slideshow);
		var slideshowLeft = $('<div />').addClass('slideshow-left fa fa-arrow-circle-left fa-6').appendTo(slideshowChrome);
		var slideshowRight = $('<div />').addClass('slideshow-right fa fa-arrow-circle-right fa-6').appendTo(slideshowChrome);
		var slideshowThumbs = $('<div />').addClass('slideshow-thumbs').appendTo(slideshow);
		var slideshowImages = $('<div />').addClass('slideshow-images').appendTo(slideshow);
		var slideCount = imageSet.length;
		var counter = 0;
		imageSet.each(function() {
			var slideshowFigure = $('<figure />').attr('data-number', counter);
			if (inputType === 'links') {
				var slideshowImage = $('<img />').attr('src', $(this).attr('href')).attr('data-number', counter).appendTo(slideshowFigure)
			} else {
				var slideshowImage = $('<img />').attr('src', $(this).attr('src')).attr('data-number', counter).appendTo(slideshowFigure)
			}
			var figcaption = $('<figcaption />').appendTo(slideshowFigure);
			var caption = $(this).attr('title');
			if (caption.length > 0) {
				var captionCreditSplit = caption.split('&nbsp;  ');
				if (captionCreditSplit.length > 1) {
					caption = captionCreditSplit[0] + '<div class="credit">' + captionCreditSplit[1] + '</div>'
				}
			} else {
				caption = $('.field-name-field-image-caption', $(this).parent('.media-element-wrapper')).text();
				var credit = $('.field-name-field-photo-credit', $(this).parent('.media-element-wrapper')).text();
				caption = caption + '<div class="credit">' + credit + '</div>'
			}
			figcaption.html(caption);
			slideshowFigure.appendTo(slideshowImages);
			var slideshowThumb = slideshowImage.clone(false).appendTo(slideshowThumbs);
			slideshowThumb.click(function() {
				activeSlide = $(this).attr('data-number');
				moveToActiveSlide()
			});
			counter++
		});
		var activeSlide = 0;
		slideshowRight.click(function() {
			if (activeSlide < (slideCount - 1)) {
				activeSlide++
			} else {
				activeSlide = 0
			}
			moveToActiveSlide()
		});
		slideshowLeft.click(function() {
			if (activeSlide > 0) {
				activeSlide--
			} else {
				activeSlide = slideCount - 1
			}
			moveToActiveSlide()
		});

		function moveToActiveSlide() {
			slideshow.attr('data-active-slide', activeSlide);
			var figureHeight = $('figure[data-number="' + activeSlide + '"]', slideshowImages).height();
			slideshow.height(figureHeight + 70);
			thisOffset = Math.max(0, activeSlide * (slideshowThumbsWidth / slideCount) - (slideshow.width() / 2));
			slideshowThumbs.css('transform', 'translate3d(-' + thisOffset + 'px, 0, 0)')
		}
		$(replacedElementName).replaceWith(slideshow);
		var slideshowThumbsWidth = 0;
		var slideshowThumbsLoaded = 0;
		$('.slideshow-thumbs img').load(function() {
			slideshowThumbsWidth += $(this).width();
			slideshowThumbsLoaded++;
			if (slideshowThumbsLoaded === slideCount) {
				slideshow.css('opacity', 1)
			}
		});
		slideshow.css('opacity', 0.1);
		$('figure[data-number="0"] img').load(function() {
			moveToActiveSlide()
		})
	}
	$('.node.tagged-content-slider-mini .field-name-field-image').each(function() {
		createSlideshow($('a', this), 'links', 'mini', '.field-name-field-image')
	});
	$('.node.tagged-content-slider .field-name-field-image').each(function() {
		createSlideshow($('a', this), 'links', 'full-sized', '.field-name-field-image')
	});
	var slidesByClass = $('.node img.slideshow, .node img.content-slider, .node img.content-slider-mini');
	if (slidesByClass.length) {
		slidesByClass.hide();
		if (slidesByClass.hasClass('mini') || slidesByClass.hasClass('content-slider-mini')) {
			var classes = 'mini'
		} else {
			var classes = 'full-sized'
		}
		if (slidesByClass.first().parent('.media-element-wrapper').length) {
			var parent = slidesByClass.first().parent('.media-element-wrapper')
		} else {
			var parent = slidesByClass.first()
		}
		createSlideshow(slidesByClass, 'images', classes, parent)
	}
	$('#page img:not(.slideshow):not(.content-slider):not(.content-slider-mini)').one("load", function() {
		var parentLink = $(this).parent('a');
		if (parentLink) {
			parentLink.addClass('no-external-link-icon')
		}
		if ($(this).parent('.media-element-wrapper')) {
			var wrapperWidth = $(this).width();
			$(this).parent('.media-element-wrapper').css('float', $(this).css('float'));
			if ($(this).css('float') == 'right') {
				$(this).parent('.media-element-wrapper').css('marginLeft', '1.5em')
			}
			$(this).parent('.media-element-wrapper').css('clear', 'both');
			$(this).parent('.media-element-wrapper').css('width', wrapperWidth)
		}
		if ($(this).attr('caption') || $(this).attr('credit')) {
			if ($(this).parent('.media-element-wrapper')) {
				parent = $(this).parent('.media-element-wrapper');
				if ($(this).attr('caption')) {
					$('figcaption', parent).remove();
					$('.field-name-field-image-caption', parent).remove()
				}
				if ($(this).attr('credit')) {
					$('.field-name-field-photo-credit', parent).remove()
				}
				$(this).unwrap()
			}
			var width = $(this).attr('width');
			var imageWrapped = $(this).wrap('<figure class="image-wrapper"/>');
			var figure = imageWrapped.parent('figure');
			figure.width(width + 'px');
			figure.addClass($(this).attr('displayStyle'));
			var figcaption = $('<figcaption />');
			if ($(this).attr('caption')) {
				var caption = $('<div />').addClass('caption').html($(this).attr('caption'));
				caption.appendTo(figcaption)
			}
			if ($(this).attr('credit')) {
				var credit = $('<div />').addClass('credit').html($(this).attr('credit'));
				credit.appendTo(figcaption)
			}
			figcaption.appendTo(figure)
		}
		if ($(this).attr('link')) {
			var imageWrapped = $(this).wrap('<a href="' + $(this).attr('link') + '" target="_blank" />')
		} else {
			if ($(this).attr('overlay') == 'true') {
				$(this).addClass('overlay-element');
				$(this).click(function() {
					if ($(window).width() < 490) {
						return true
					} else {
						var berkleeOverlayContainer = $('<div />').addClass('berklee-overlay-container');
						var berkleeOverlayItem = $('<div />').addClass('berklee-overlay-item').css('display', 'inline-block');
						var berkleeOverlayImage = $('<img />').attr('src', $(this).attr('src'));
						var berkleeOverlayClose = $('<a />').addClass('icon-remove').addClass('berklee-overlay-close').attr('href', '#').click(function() {
							$('.berklee-overlay').hide();
							$('.berklee-overlay .berklee-overlay-container').remove();
							return false
						});
						berkleeOverlayItem.append(berkleeOverlayImage).append(berkleeOverlayClose.clone(true));
						berkleeOverlayContainer.append(berkleeOverlayItem);
						$('.berklee-overlay').append(berkleeOverlayContainer);
						berkleeOverlayContainer.show();
						$('.berklee-overlay').show();
						return false
					}
				})
			}
		}
		if (figure) {
			setTimeout(function() {
				figure.css('opacity', '1')
			}, 50)
		}
		$(this).parent('.media-element-wrapper').show(100)
	}).each(function() {
		if (this.complete) $(this).load()
	});
	$('.tutorial-zoom-icon').click(function() {
		$('img', $(this).parent('figure')).click()
	});
	$('.media-element-wrapper > a').parent('.media-element-wrapper').addClass('media-link');
	setTimeout(function() {
		$('.media-element-wrapper').css('maxHeight', '10000px')
	}, 60);

	function coverImage(image) {
		if ($(window).width() < breakPoint) {
			image.width('100%');
			image.height('auto');
			image.css('marginLeft', 0);
			image.css('marginTop', 0);
			return
		}
		var tempImg = new Image();
		tempImg.src = image.attr('src');
		var imageWidth = tempImg.width;
		var imageHeight = tempImg.height;
		var aspectRatio = imageWidth / imageHeight;
		image.removeProp('width');
		image.removeProp('height');
		image.height(0);
		image.width(0);
		var elementWidth = image.parent().width();
		var elementHeight = image.parent().height();
		var elementAspectRatio = elementWidth / elementHeight;
		if (aspectRatio >= elementAspectRatio) {
			image.height('100%');
			image.width('auto');
			var leftMargin = Math.min(0, (elementWidth - image.width()) / 3);
			image.css('marginLeft', leftMargin);
			image.css('marginTop', 0)
		} else {
			image.width('100%');
			image.height('auto');
			image.css('marginLeft', 0);
			var topMargin = Math.min(0, (elementHeight - image.height()) / 3);
			image.css('marginTop', topMargin)
		}
	}
	$('img.image-cover, .image-cover > img').one('load', function() {
		coverImage($(this))
	}).each(function() {
		if (this.complete) {
			$(this).load()
		}
	});
	$(window).resize(function() {
		$('img.image-cover, .image-cover > img').each(function() {
			coverImage($(this))
		})
	})
});
jQuery(document).ready(function($) {
	var loginLogout = $('.region-top-nav .user-login-logout');
	var loginNav = $('nav', loginLogout);
	var firstLoginLink = $('a:first-child', loginNav);
	var interval = false;
	$('h3', loginLogout).hover(function() {
		firstLoginLink.addClass('highlight');
		firstLoginLink.click()
	}, function() {
		firstLoginLink.removeClass('highlight')
	});
	$('h3', loginLogout).click(function(e) {
		firstLoginLink[0].click()
	});
	$('a', loginNav).each(function() {
		var description = $(this).attr('title');
		descriptionSpan = $('<span />').addClass('description').text(description);
		descriptionSpan.appendTo($(this))
	});
	loginLogout.mouseover(function() {
		loginNav.addClass('visible');
		loginNav.css('opacity', '1');
		clearInterval(interval)
	});
	loginLogout.mouseout(function() {
		loginNav.css('opacity', '0');
		interval = setInterval(function() {
			loginNav.removeClass('visible')
		}, 400)
	})
});
jQuery(document).ready(function($) {
	var layout = false;
	if ($(window).width() > 0) {
		if ($(window).width() < 768) {
			layout = 'small';
			mobileMenuCollapse();
			mobileDashboard();
			var loginjsong = $('.mobileMenu > div:first li:last a');
			if(loginjsong.text() == 'Login'){
				var dest = loginjsong.attr('href').split("=").pop();
				loginjsong.attr('href','/onelogin_saml/sso?destination='+dest);
			}
		} else if ($(window).width() < 980) {
			layout = 'medium';
			mediumMenuTweak()
		} else {
			layout = 'big'
		}
	}
	var windowReloading = false;
	var shrinkage = false;
	$(window).resize(function() {
		if (!windowReloading && !shrinkage && ($(window).width() > 0)) {
			if ($(window).width() >= 768 && layout === 'small') {
				windowReloading = true;
				window.location.href = window.location.href
			}
			if ($(window).width() >= 768 && $(window).width() < 980 && layout === 'big') {
				layout = 'medium';
				shrinkage = true;
				mediumMenuTweak()
			}
			if ($(window).width() >= 980 && layout === 'medium') {
				layout = 'big';
				shrinkage = true;
				mediumMenuTweak()
			}
			if ($(window).width() < 768 && layout !== 'small') {
				layout = 'small';
				shrinkage = true;
				mobileDashboard();
				mobileMenuCollapse()
			}
		}
	});

	function mobileDashboard() {
		if ($('body').hasClass('page-dashboard')) {
			$('h1#page-title').prependTo($('#page'))
		} else {
			$('.region-header a[href*="/dashboard"]').html('Visit Dashboard')
		}
		shrinkage = false
	}
	function mobileMenuCollapse() {
		var header = $('.region-header');
		var headerExpand = $('<div />').addClass('header-expand').appendTo(header);
		var headerIcon = $('<div />').addClass('header-expand-icon').attr('aria-hidden', 'true').appendTo(headerExpand);
		var mobileMenu = $('<div />').addClass('mobileMenu').attr('aria-hidden', 'true').appendTo($('body'));
		var menus = $('nav .block-menu').not('.region-off-screen-overlay .block-menu');
		menus.each(function() {
			id = $(this).attr('id');
			if (!id && $(this).hasClass('main-menu-block')) {
				id = 'main-menu-block'
			}
			switch (id) {
			case 'block-menu-menu-department-menu':
				var campusMenu = $(this).clone(false);
				campusMenu.insertAfter($(this));
				campusMenu.attr('id', 'choose-campus-menu-mobile');
				campusMenu.attr('aria-hidden', 'true');
				var campusDropdown = $('<div />').addClass('campus-dropdown').appendTo($('body'));
				$('.content li:nth-child(2) a', campusMenu).html('Valencia Campus');
				$('.content li:nth-child(3) a', campusMenu).html('Berklee Online');
				$('.content li:not(:first-child) a', campusMenu).appendTo(campusDropdown);
				$('.content li:first-child a', campusMenu).html('Berklee');
				campusMenu.click(function() {
					$('.content li:first-child a', campusMenu).toggleClass('expanded');
					campusDropdown.toggleClass('expanded')
				});
				break;
			case 'block-menu-menu-follow-berklee-links':
			case 'block-berklee-site-section-breadcrumb':
				break;
			default:
				var clone = $(this).clone(false);
				$(this).addClass('hidden-on-small-screen');
				clone.removeClass('main-menu-block');
				clone.attr('aria-hidden', 'true');
				clone.removeAttr('id').appendTo(mobileMenu);
			}
		});
		var sectionMenus = $('.region-sidebar-first .block-menu, .region-sidebar-first .block-dynamic-book-block, .region-sidebar-first .block-berklee-site-section:not(#block-berklee-site-section-breadcrumb)');
		sectionMenus.each(function() {
			var clone = $(this).clone(false);
			$(this).addClass('hidden-on-small-screen');
			clone.attr('aria-hidden', 'true');
			clone.removeAttr('id').prependTo(mobileMenu)
		});
		var breadcrumb = $('#block-berklee-site-section-breadcrumb nav ul li:last-child a');
		var breadcrumbClone = breadcrumb.clone(false);
		breadcrumb.addClass('hidden-on-small-screen');
		breadcrumbClone.attr('aria-hidden', 'true').addClass('mobile-breadcrumb').prependTo(mobileMenu);
		var searchbox = $('.region-top-nav form#search-block-form');
		var searchboxClone = searchbox.clone(true, true);
		searchbox.addClass('hidden-on-small-screen');
		searchboxClone.attr('aria-hidden', 'true').prependTo(mobileMenu);
		var login = $('.user-login-logout');
		var loginClone = login.clone();
		login.addClass('hidden-on-small-screen');
		loginClone.attr('aria-hidden', 'true').prependTo(mobileMenu);
		headerExpand.click(function() {
			mobileMenu.toggleClass('expanded');
			if (mobileMenu.hasClass('expanded')) {
				var topValue = '57px'
			} else {
				var topValue = '100%';
				$('#page').slideDown(200)
			};
			mobileMenu.css('display', 'block');
			$('html,body').animate({
				scrollTop: '0px'
			}, 100);
			mobileMenu.animate({
				top: topValue
			}, 100, function() {
				if ($(this).hasClass('expanded') == false) {
					$(this).css('display', 'none')
				} else {
					$('#page').slideUp(200)
				}
			})
		});
		shrinkage = false
	};

	function mediumMenuTweak() {
		$('#block-system-main-menu.block-menu .content > nav > ul.menu > li a').attr('style', '');
		$('#block-system-main-menu.block-menu .content > nav > ul.menu > li a').each(function() {
			if ($(this).height() > 20) {
				var newTopMargin = parseInt(($(this).height() - 20) / 2);
				$(this).css('marginTop', '-' + newTopMargin + 'px')
			}
		});
		shrinkage = false
	}
	$('.region-sidebar-first nav li.expanded, .mobileMenu nav li.expanded').each(function() {
		if ($('a.active', this).length === 0) { /* $(this).toggleClass('collapsed expanded') */
		}
		$('span', this).click(function() { /* $(this).parent('li').toggleClass('collapsed expanded') */
		})
	})
});
jQuery(document).ready(function($) {
	$('.main-menu-button').click(function() {
		$('body').toggleClass('off-screen-visible');
		$('.region-header').toggleClass('open closed');
		$('.region-top-nav').toggleClass('offscreen-open');
		$('#off-screen').toggleClass('visible hidden');
		$("#page").toggleClass('open closed');
		if ($('#video-play-pause-button i').hasClass('fa-pause')) {
			$('#video-play-pause-button').click()
		}
		$("#off-screen-sidebar").toggleClass('closed open');
		return false
	});
	$('#off-screen').click(function(event) {
		if (event.target == this) {
			$('.main-menu-button').click()
		}
	});
	campusToolsH3 = $('#block-menu-menu-campus-tools h3');
	campusToolsLink = $('<a />').attr('href', '/campus-tools').text(campusToolsH3.text());
	campusToolsH3.html(campusToolsLink)
});
jQuery(document).ready(function($) {
	var berkleeOverlay = $('<div />').addClass('berklee-overlay');
	$('body').append(berkleeOverlay);
	var berkleeOverlayBg = $('<div />').addClass('berklee-overlay-background');
	berkleeOverlay.append(berkleeOverlayBg);
	var berkleeOverlayClose = $('<a />').addClass('icon-remove').addClass('berklee-overlay-close').attr('href', '#').click(function() {
		$('.berklee-overlay').hide();
		$('.berklee-overlay .berklee-overlay-container').remove();
		return false
	});
	$('.berklee-overlay-thumbnail a, .berklee-filters-thumbnail-field-title a').click(function() {
		if ($(window).width() < 490) {
			return true
		} else {
			var id = $(this).attr('rel');
			$(this).parents('.berklee-overlay-group').children('.berklee-overlay-container').each(function() {
				var image = $(this).find('img');
				image.attr('src', image.attr('url'));
				$(this).clone(true).appendTo(berkleeOverlay)
			});
			$('.berklee-overlay').find('#' + id).parent().show();
			berkleeOverlay.show();
			return false
		}
	});
	$('.berklee-overlay-group').each(function() {
		var berkleeOverlayItems = $(this).find('.berklee-overlay-item');
		berkleeOverlayClose.clone(true).appendTo(berkleeOverlayItems);
		$('<a />').addClass('icon-chevron-right').attr('href', '#').click(function() {
			var item = $(this).parents('.berklee-overlay-container');
			item.hide();
			item.next().show();
			return false
		}).appendTo(berkleeOverlayItems);
		$('<a />').addClass('icon-chevron-left').attr('href', '#').click(function() {
			var item = $(this).parents('.berklee-overlay-container');
			item.hide();
			item.prev().show();
			return false
		}).prependTo(berkleeOverlayItems);
		berkleeOverlayItems.first().children('.icon-chevron-left').remove();
		berkleeOverlayItems.last().children('.icon-chevron-right').remove()
	});
	$('.berklee-filters-view-more a').click(function() {
		if ($(this).attr('donttouchme') === 'true') {
			return true
		}
		if ($(window).width() < 490) {
			return true
		} else {
			var index = $(this).attr('rel');
			$(this).parents('.berklee-overlay-group').children('.berklee-overlay-container').each(function() {
				var image = $(this).find('img');
				image.attr('src', image.attr('url'));
				$(this).clone(true).appendTo(berkleeOverlay)
			});
			$('.berklee-overlay').children().eq(index).show();
			berkleeOverlay.show();
			return false
		}
	});
	$('a.berklee-overlay[href$=".jpg"]').click(function() {
		if ($(window).width() < 490) {
			return true
		} else {
			var berkleeOverlayContainer = $('<div />').addClass('berklee-overlay-container');
			var berkleeOverlayItem = $('<div />').addClass('berklee-overlay-item').css('display', 'inline-block');
			var berkleeOverlayImage = $('<img />').attr('src', $(this).attr('href'));
			berkleeOverlayItem.append(berkleeOverlayImage).append(berkleeOverlayClose.clone(true));
			berkleeOverlayContainer.append(berkleeOverlayItem);
			berkleeOverlay.append(berkleeOverlayContainer);
			berkleeOverlayContainer.show();
			berkleeOverlay.show();
			return false
		}
	})
});
jQuery(document).ready(function($) {
	function updateScrollAnimations() {
		var scrollPosition = parseInt($(document).scrollTop());
		var windowHeight = parseInt($(window).height());
		if (scrollPosition < (windowHeight / 3)) {
			if (!$('.region-top-nav').hasClass('at-the-top')) {
				$('.region-top-nav').addClass('at-the-top')
			}
		} else {
			if ($('.region-top-nav').hasClass('at-the-top')) {
				$('.region-top-nav').removeClass('at-the-top')
			}
		}
		if ($('body').hasClass('admin-menu')) {
			if (scrollPosition > 29) {
				$('.region-top-nav').css('marginTop', 0);
				$('.region-top-nav').removeClass('at-the-top')
			} else if (scrollPosition < 29) {
				if (!$('.region-top-nav').hasClass('at-the-top')) {
					$('.region-top-nav').addClass('at-the-top')
				}
				$('.region-top-nav').css('marginTop', 29 - scrollPosition)
			}
		}
		$('.region-stripes .block').each(function() {
			var slidePos = parseInt($(this).offset().top);
			var slideHeight = parseInt($(this).height());
			var startPos = slidePos - windowHeight;
			var endPos = slidePos + slideHeight;
			var ceiling = endPos + windowHeight - slidePos;
			var ceilingRatio = 1 / ceiling;
			if ((scrollPosition > startPos) && (scrollPosition < endPos)) {
				var pixelDifference = endPos - scrollPosition;
				var percentToTop = (1 - (pixelDifference * ceilingRatio)) * 100;
				if ($(this).hasClass('parallax')) {
					var alterationAmount = -50 * alterationPercent
				}
				if ($(this).hasClass('highlights-stripe') && !$(this).hasClass('scroll-effect-executed')) {
					alterationPercent = (25 - percentToTop);
					alterationPercent = Math.max(alterationPercent, 0) * 4;
					if (alterationPercent < 75) {
						$('.views-row-1', this).css('marginTop', '0px');
						var parent = this;
						setTimeout(function() {
							$('.views-row-2', parent).css('marginTop', '0px')
						}, 100);
						setTimeout(function() {
							$('.views-row-3', parent).css('marginTop', '0px')
						}, 200);
						$(this).addClass('scroll-effect-executed')
					}
				}
				if ($(this).hasClass('fade-in-stripe')) {
					var triggerDistance = $(window).height() * 1.4;
					if (pixelDifference < triggerDistance) {
						$(this).css('opacity', 1);
						setTimeout(function() {
							$(this).removeClass('fade-in-stripe')
						}, 2500)
					}
				}
			}
		})
	}
	if ($(window).width() > 767) {
		setTimeout(updateScrollAnimations, 100);
		$(window).scroll(function() {
			updateScrollAnimations()
		})
	}
	setTimeout(function() {
		if (window.location.hash) {
			if ($(window.location.hash).length) {
				var target = $(window.location.hash)
			} else {
				var name = window.location.hash.replace('#', '');
				var target = $("a[name='" + name + "']")
			}
			if (target.length) {
				var targetPosition = parseInt(target.offset().top - 30);
				$('html, body').animate({
					scrollTop: targetPosition + 'px'
				}, 400)
			}
		}
	}, 100);
	$("a[href*=#]").click(function() {
		var href = $(this).attr('href');
		if ($(href).length) {
			var target = $(href)
		} else {
			var name = href.replace('#', '');
			var target = $("a[name='" + name + "']")
		}
		if ($(target).length) {
			var targetPosition = parseInt($(target).offset().top - 40);
			$('html, body').animate({
				scrollTop: targetPosition + 'px'
			}, 400);
			window.location.hash = hash
		}
		return false
	})
});
jQuery(document).ready(function($) {
	//var searchInput = $('form.google-cse input[name="search_block_form"]');
	var searchInput = $('form#search-block-form input[name="search_api_views_fulltext"]');
	searchInput.attr('autocomplete', 'off');
	var searchDefaultText = 'Type to search';
	var menuFilter = $('<div />').addClass('menu-filter');
	var menuFilterTitle = $('<h3 />').text("Don't see what you're looking for?").appendTo(menuFilter);
	var menuFilterDefaultText = 'Search';
	var menuFilterSearch = $('<input />').attr('type', 'text').addClass('default-text menu-filter-search');
	var menuFilterSubmit = $('<div />').text('Go').addClass('button menu-filter-submit').appendTo(menuFilter);
	menuFilterSearch.val(menuFilterDefaultText).appendTo(menuFilter);
	var menuFilterResults = $('<div />').addClass('results');
	$(".region-off-screen-overlay > .container").prepend(menuFilter);
	searchInput.each(function() {
		if (!$(this).val()) {
			$(this).val(searchDefaultText)
		}
		$(this).focus(function() {
			if ($(this).val() == searchDefaultText) {
				$(this).val('')
			}
			menuFilterResults.appendTo($(this).parent())
		});
		$(this).blur(function() {
			if ($(this).val() == '') {
				$(this).val(searchDefaultText)
			}
			setTimeout(function() {
				menuFilterResults.detach()
			}, 150)
		})
	});
	menuFilterSearch.focus(function() {
		if ($(this).val() == menuFilterDefaultText) {
			$(this).val('');
			$(this).removeClass('default-text')
		}
		menuFilter.addClass('active');
		menuFilterResults.appendTo($(this).parent())
	}).blur(function() {
		if ($(this).val() == '') {
			$(this).val(menuFilterDefaultText);
			$(this).addClass('default-text')
		}
		menuFilter.removeClass('active');
		setTimeout(function() {
			menuFilterResults.detach()
		}, 150)
	});
	menuFilterSubmit.click(function() {
		$('#search-block-form input[type="submit"]').click()
	});
	var potentialMenuLinks = $('#block-system-user-menu .content ul a, #block-system-main-menu .content ul a, .region-off-screen-overlay .block-menu .content ul a');
	var filteredMenuLinks = new Array();
	var uniqueList = new Array();
	potentialMenuLinks.each(function() {
/*
		if (($(this).text() == 'About') || ($(this).text() == 'About Us')) {
			if ($(this).attr('href').indexOf('/about/about-berklee') == -1) {
				return
			}
		}
		if (($(this).text() == 'Contact') || ($(this).text() == 'Contact Us')) {
			if ($(this).attr('href').indexOf('/contact-berklee') == -1) {
				return
			}
		}
*/
		if (uniqueList.indexOf($(this).text()) == -1) {
			uniqueList.push($(this).text());
			filteredMenuLinks.push($(this))
		}
	});
	menuLinks = $(filteredMenuLinks);
	var inputs = [menuFilterSearch, searchInput];
	$.each(inputs, function() {
		this.keyup(function(event) {
			if ($(this).hasClass('menu-filter-search')) {
				searchInput.val(menuFilterSearch.val());
				if (event.which == 13) {
					$('#search-block-form input[type="submit"]').click()
				}
			} else {
				menuFilterSearch.val(searchInput.val())
			}
			var input = $(this).val();
			if (input.length > 1) {
				menuFilterResults.empty();
				var resultCount = 0;
				menuLinks.each(function() {
					$('div', this).remove();
					if ($(this).text().toLowerCase().indexOf(input.toLowerCase()) > -1) {
						$(this).clone(false).appendTo(menuFilterResults);
						resultCount++
					}
				});
				if (resultCount > 0) {
					menuFilterResults.height((resultCount * 26) + 'px');
					menuFilter.addClass('results');
					menuFilterResults.addClass('populated')
				} else {
					menuFilter.removeClass('results');
					menuFilterResults.removeClass('populated')
				}
			} else {
				menuFilterResults.empty();
				menuFilterResults.height('0px');
				menuFilter.removeClass('results');
				menuFilterResults.removeClass('populated')
			}
		})
	})
});
jQuery(document).ready(function($) {
	$('.expandable').each(function() {
		var expandableElement = $(this);
		var expandableContent = $('.expandable-content', this);
		$('> h4', this).click(function() {
			expandableElement.toggleClass('expanded')
		})
	});
	$('.expandable-children').each(function() {
		var expandableElements = $('.field, h3', this);
		expandableElements.each(function() {
			$(this).addClass('expandable');
			var expandableContent = $('.field-items', this);
			expandableContent.addClass('expandable-content');
			$('.field-label', this).addClass('expandable-title');
			$('> h4, .field-label', this).click(function() {
				$(this).parents('.field').toggleClass('expanded')
			})
		})
	})
});
jQuery(document).ready(function($) {
	$('.not-front .banner.slider').each(function() {
		var slideTimer = false;
		var currentSlide = 1;
		var slideButtons = $('.sbutton', this);
		var pauseButtonActive = false;
		var pauseButton = $('<div />').addClass('sbutton pause').attr('target-slide', -1).html("&#xf04c;");
		if (slideButtons.length < 1) {
			slides = $('.slide', this);
			sliderNav = $('<div />').addClass('slider-nav widget_pager').appendTo($(this));
			var slideNumber = 0;
			slides.each(function() {
				slideNumber++;
				$(this).attr('number', slideNumber);
				var slideButton = $('<div />').addClass('sbutton').attr('target-slide', slideNumber).text(slideNumber).appendTo(sliderNav);
				if (slideNumber == 1) {
					$(this).addClass('active');
					slideButton.addClass('active')
				}
			})
		} else {
			sliderNav = $('.slider-nav .container', this)
		}
		pauseButton.appendTo(sliderNav);
		slideButtons = $('.sbutton', this);
		slideButtons.on('click', function() {
			if (!$(this).hasClass('pause')) {
				clearInterval(slideTimer);
				var targetSlide = parseInt($(this).attr('target-slide'));
				$('.slide[number="' + currentSlide + '"]').removeClass('active');
				$('.slide[number="' + targetSlide + '"]').addClass('active');
				$('.sbutton[target-slide = "' + currentSlide + '"]').removeClass('active');
				$(this).addClass('active');
				currentSlide = parseInt(targetSlide);
				if (!pauseButtonActive) {
					clearInterval(slideTimer);
					slideTimer = setInterval(slide, 7000)
				}
			} else {
				if (!$(this).hasClass('active')) {
					clearInterval(slideTimer);
					$(this).addClass('active');
					pauseButtonActive = true
				} else {
					clearInterval(slideTimer);
					slideTimer = setInterval(slide, 3000);
					$(this).removeClass('active');
					pauseButtonActive = false
				}
			}
		});
		if ($(this).hasClass('front')) {
			pauseButton.click()
		}
		$('h2, p, a', this).mouseenter(function() {
			if (!pauseButtonActive) {
				pauseButton.addClass('active');
				clearInterval(slideTimer)
			}
		}).mouseleave(function() {
			if (!pauseButtonActive) {
				pauseButton.removeClass('active');
				clearInterval(slideTimer);
				slideTimer = setInterval(slide, 3000)
			}
		});
		var slideTimer = setInterval(slide, 7000);

		function slide() {
			targetSlide = currentSlide + 1;
			if ($('.sbutton[target-slide="' + targetSlide + '"]').length == 0) {
				targetSlide = 1
			}
			$('.sbutton[target-slide="' + targetSlide + '"]').click()
		}
	});
	$('.sm').each(function() {
		var currentTabTarget = $('.smtab.active').attr('target-area');
		$('.smtab').click(function() {
			var newTabTarget = $(this).attr('target-area');
			$('.smarea.' + currentTabTarget).removeClass('active');
			$('.smtab[target-area="' + currentTabTarget + '"]').removeClass('active');
			$('.smarea.' + newTabTarget).addClass('active');
			$(this).addClass('active');
			currentTabTarget = newTabTarget
		})
	});
	$('.berklee-slider').each(function() {
		var width = $(this).attr('width');
		var height = $(this).attr('height');
		var slides = $('.berklee-slide', this);
		var rightMargin = slides.css('marginRight');
		var sliderCount = slides.length;
		var currentSlider = 1;
		var slideDirection = 'horizontal';
		var rightButton = $('.berklee-slider-button.right-button', this);
		var leftButton = $('.berklee-slider-button.left-button', this);
		var canvas = $('.berklee-slider-canvas', this);
		if ($(this).hasClass('vertical')) {
			slideDirection = 'vertical'
		}
		if ($(this).hasClass('fade-transition')) {
			slideDirection = 'fade'
		}
		if ($(this).hasClass('random')) {
			currentSlider = Math.random(4) + 1;
			if (currentSlider > 1) {
				$('.berklee-slider-button.left-button', this).removeClass('disabled')
			}
			if (currentSlider === sliderCount) {
				$('.berklee-slider-button.right-button', this).addClass('disabled')
			}
			canvas.animate({
				'marginLeft': currentSlider * width
			})
		}
		var autoSlide = $(this).attr('autoslide');
		if (autoSlide) {
			if (autoSlide < 1000) {
				autoSlide = autoSlide * 1000
			}
			var slideTimer = setInterval(function() {
				if (currentSlider < sliderCount) {
					rightButton.click()
				} else {
					currentSlider = 1;
					leftButton.addClass('disabled');
					rightButton.removeClass('disabled');
					canvas.animate({
						'marginLeft': 0
					})
				}
			}, autoSlide)
		}
		$('.berklee-slider-button', this).click(function() {
			newWidth = parseInt(width.replace('px', '')) + parseInt(rightMargin.replace('px', ''));
			if ($(this).hasClass('disabled')) {
				return
			}
			if ($(this).hasClass('right-button')) {
				var operator = '-';
				currentSlider++;
				if (currentSlider === sliderCount) {
					$(this).addClass('disabled')
				}
				$(this).siblings('.berklee-slider-button.left-button').removeClass('disabled')
			} else {
				var operator = '+';
				currentSlider--;
				if (currentSlider === 1) {
					$(this).addClass('disabled')
				}
				$(this).siblings('.berklee-slider-button.right-button').removeClass('disabled')
			}
			if (slideDirection === 'horizontal' || slideDirection === 'vertical') {
				canvas.animate({
					'marginLeft': operator + '=' + newWidth
				})
			}
			if (slideDirection === 'fade') {
				canvas.animate({
					'opacity': 0
				});
				canvas.animate({
					'marginLeft': operator + '=' + newWidth
				});
				canvas.animate({
					'opacity': 1
				})
			}
		})
	})
});
jQuery(document).ready(function($) {
	var tables = $('.region-content table');
	tables.each(function() {
		var firstRow = $('tr', this).filter(':first');
		var cellCount = $('td', firstRow).size();
		$('td').each(function() {});
		var tableWidth = $(this).width() + (parseInt($(this).css('padding').replace('px', '')) * 2) + (parseInt($(this).css('border-width').replace('px', '')) * 2);
		if (tableWidth > $('.region-content').width() && $('body.page-manage').length == 0) {
			$(this).addClass('oversized');
			var headers = $('th', this);
			for (var i = 1; i < headers.length + 1; i++) {
				var headerText = headers.eq(i - 1).text().trim();
				$('tr', this).each(function() {
					$('td:nth-child(' + i + ')', this).each(function() {
						if (headerText > '') {
							var thisText = $(this).remove('label').text();
							if (thisText > '') {
								var separator = ': '
							} else {
								var separator = ''
							}
							var newText = ' <span class="table-header-text">' + headerText + separator + ' </span><span class="original-content">' + $(this).html() + '</span>';
							$(this).html(newText)
						}
					})
				})
			}
		}
	});
	$('.datatable').each(function() {
		page_length = parseInt($(this).attr('data-page-length') || 10);
		order_column = $(this).attr('data-order-column') || null;
		order_direction = $(this).attr('data-order-direction') || null;
		if (order_column || order_direction) {
			order = [order_column, order_direction || 'asc']
		} else {
			order = []
		}
		$(this).dataTable({
			"lengthMenu": [
				[page_length, -1],
				[page_length, "All"]
			],
			"order": order,
			"pageLength": page_length
		})
	})
});

/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
/* for adding campustools */
jQuery(document).ready(function($){
  var campusTools = $('.region-top-nav .block-menu.campus-tools');
  var campusToolsNav = $('nav', campusTools);
  var tip = $('<div />').addClass('tip').appendTo( $('.content', campusTools) );
  // Campus Tools items excluding the campuses, since those are constant
  // (if we decide to remove the campuses from the menu, this selector
  // may need to be updated):
  var campusToolsItems = $('ul li:nth-child(2) ul li', campusToolsNav);

  var interval = false;
  campusTools.mouseover(function() {
    campusToolsNav.addClass('visible');
    tip.addClass('visible').css('opacity', '1');
    campusToolsNav.css('opacity', '1');
    clearInterval(interval);
  });
  campusTools.mouseout(function() {
/**/
    campusToolsNav.css('opacity', '0');
    tip.css('opacity', '0');
    interval = setInterval(
      function() {
        campusToolsNav.removeClass('visible');
        tip.removeClass('visible');
      },
      400
    );
/**/
  });
  if ( $('body').hasClass('logged-in') ) {
    var hostname = window.location.hostname;
    if ( hostname.indexOf('hub.berklee.edu') > -1) {
      var url = '/drupal_menu?endpoint=onelogin';
    } else if ( hostname.indexOf('berklee.edu') > -1 || hostname.indexOf('berkleedev') > -1) {
      var url = '/api/v1/onelogin/onelogin/user.json';
    } else {
      campusToolsItems.addClass('visible');
      resizeCampusTools();
      return;
    }
    $.ajax(url).done(function(onelogin) {
      var appData = $( $.parseXML(onelogin.data) );
      var apps = $('app',appData);
      // If no apps are returned, don't do anything but resize the box
      if ( apps.length == 0) {
        campusToolsItems.addClass('visible');
        resizeCampusTools();
        return;
      }
      apps.each(function() {
        var appName = $('name', this).text();
        var appId = $('id', this).text();
        var appHref = "https://app.onelogin.com/client/apps/launch/" + appId;
        var matched = false;
        // Explicitly exclude some apps, like www.berklee.edu:
        if (appId === 456892 || appName === 'www.berklee.edu') {
          return;
        }
        campusToolsItems.each(function() {
          var campusToolsLink = $('a', this);
          var campusToolsLinkText = $('.text', this).text();
          if ( (campusToolsLinkText.indexOf('Calendar') > -1) || (campusToolsLinkText.indexOf('Drive') > -1) ) {
            $(this).addClass('oneloginified visible');
            campusToolsLink.attr('target', '_blank');
            return;
          }
          var campusToolName = campusToolsLinkText;
          if (campusToolName == appName) {
            campusToolsLink.attr('href', appHref);
            $(this).addClass('oneloginified visible');
            campusToolsLink.attr('target', '_blank');
            matched = true;
          }
        });
        if (matched == false) {
          var icon = $('icon', this).text();
          if (icon.indexOf('http' > -1) ) {
            var newCampusTool = $('<li />')
              .addClass('leaf no-submenu oneloginified visible')
              .appendTo('.region-top-nav .block-menu.campus-tools nav .menu li.last ul.menu');
            var newCampusToolLink = $('<a />')
              .attr('href', appHref)
              .attr('_target', 'blank')
              .appendTo(newCampusTool);
            var newCampusToolIcon = $('<img />').addClass('icon image-icon').attr('src', icon).appendTo(newCampusToolLink);
            var newCampusToolText = $('<span />').addClass('text').text(appName).appendTo(newCampusToolLink);
          }
        }
      });
      $(campusToolsItems).not('.oneloginified').removeClass('visible').hide();
      campusTools.addClass('oneloginified');
      // update the list of campus tools items so that resizeCampusTools() calculates correctly
      campusToolsItems = $('ul li:nth-child(2) ul li', campusToolsNav);
      resizeCampusTools();
    });
  } else {
    campusToolsItems.addClass('visible');
    attachIcons(campusToolsItems);
    resizeCampusTools();
  }
  function attachIcons(campusToolsItems){
	  campusToolsItems.each(function(){
		  var linkItem = $('a',this);
		  var linkDesc = $('div',this);
		  var linkText = linkItem.clone().find('div').remove().end().text();
		  linkItem.html('<i class="icon '+linkItem.attr('id')+'" aria-hidden="true"></i><span class="text">'+linkText+'<div class="menu-item-description">'+linkDesc.text()+'</div>');
	  });
  }
  function resizeCampusTools() {
    var itemCount = 0;
    campusToolsItems.each(function() {
      if ( $(this).hasClass('visible') ) {
        itemCount++;
      }
    });
    if (itemCount > 9) {
      var moreButton = $('<div />').addClass('more').appendTo(campusToolsNav);
      var moreIcon = $('<i />').addClass('fa fa-chevron-down').appendTo(moreButton);
      var moreText = $('<span />').addClass('text').text('More').appendTo(moreButton);
      moreButton.click(function() {
        moreButton.toggleClass('top');
        moreIcon.toggleClass('fa-chevron-up fa-chevron-down');
        if ( moreButton.hasClass('top') ) {
          campusToolsNav.animate({
            scrollTop: campusToolsNav.height()
          }, 400);
          // Calculate the gap from the bottom as being the number of 3-item, 100px rows,
          // minus the first 3 rows, plus 5px of padding
          var bottom = campusToolsNav.height() - ( ( Math.ceil(itemCount / 3) - 3) * 100) + 5;
          $(this).css('bottom', bottom + 'px');
        } else {
          campusToolsNav.animate({
            scrollTop: 0
          }, 400);
          $(this).css('bottom', '0px');
        }
      });
    }
  }
});

/*
Swap the logo to the mobile version 
*/
jQuery(window).bind("ready resize",function(e){
	var $bcmW = jQuery(e.target).width();
	if($bcmW < 768) jQuery('#logo>img').attr('src', '/sites/all/themes/jjamerson/logo-lc-mobile.svg');
	else jQuery('#logo>img').attr('src', '/sites/all/themes/jjamerson/logo.png');
});