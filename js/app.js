$(document).ready(function(){


	/*  ***********
	 * 	Global Vars
	 *  -----------
	 */


	// Custom Media Queries
	// --------------------
	var small 		= '(min-width: 0em)';
	var medium 		= '(min-width: 40em)';
	var large 		= '(min-width: 64em)';
	var xlarge 		= '(min-width: 75em)';
	var xxlarge 	= '(min-width: 90em)';
	var portrait 	= '(orientation: portrait)';
	var landscape 	= '(orientation: landscape)';
	
	var small_retina =' only screen and (-webkit-min-device-pixel-ratio: 2) and '+small+', only screen and (min--moz-device-pixel-ratio: 2) and '+small+', only screen and (-o-min-device-pixel-ratio: 2/1) and '+small+', only screen and (min-device-pixel-ratio: 2) and '+small+', only screen and (min-resolution: 192dpi) and '+small+', only screen and (min-resolution: 2dppx) and '+small;
	
	var medium_retina =' only screen and (-webkit-min-device-pixel-ratio: 2) and '+medium+', only screen and (min--moz-device-pixel-ratio: 2) and '+medium+', only screen and (-o-min-device-pixel-ratio: 2/1) and '+medium+', only screen and (min-device-pixel-ratio: 2) and '+medium+', only screen and (min-resolution: 192dpi) and '+medium+', only screen and (min-resolution: 2dppx) and '+medium;
	
	var large_retina =' only screen and (-webkit-min-device-pixel-ratio: 2) and '+large+', only screen and (min--moz-device-pixel-ratio: 2) and '+large+', only screen and (-o-min-device-pixel-ratio: 2/1) and '+large+', only screen and (min-device-pixel-ratio: 2) and '+large+', only screen and (min-resolution: 192dpi) and '+large+', only screen and (min-resolution: 2dppx) and '+large;
	
	var xlarge_retina =' only screen and (-webkit-min-device-pixel-ratio: 2) and '+xlarge+', only screen and (min--moz-device-pixel-ratio: 2) and '+xlarge+', only screen and (-o-min-device-pixel-ratio: 2/1) and '+xlarge+', only screen and (min-device-pixel-ratio: 2) and '+xlarge+', only screen and (min-resolution: 192dpi) and '+xlarge+', only screen and (min-resolution: 2dppx) and '+xlarge;
	
	var retina = 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)';

	//Foundation.Interchange.SPECIAL_QUERIES['small_retina'] = small_retina;
	//Foundation.Interchange.SPECIAL_QUERIES['medium_retina'] = medium_retina;
	//Foundation.Interchange.SPECIAL_QUERIES['large_retina'] = large_retina;
	//Foundation.Interchange.SPECIAL_QUERIES['xlarge_retina'] = xlarge_retina;
	
	
	// Speed numbers
	// -------------
	var v = {
		animation_delay_profile : 500,
		animation_delay_written : 2500,
		animation_delay_storytale : 1000,
		animation_delay_arrow : 4500		
	};	


	/*  *****************
	 * 	Logic & Functions
	 *  -----------------
	 */


	// Kick-off Foundation
	// -------------------
	$(document).foundation();
	
	
	// Set Vars
	// --------
	function setVars(){		
		var mq_small = Foundation.MediaQuery.get('small');
		var mq_medium = Foundation.MediaQuery.get('medium');
		var mq_large = Foundation.MediaQuery.get('large');
				
		$('body').data('isSmall', matchMedia(mq_small).matches);
		$('body').data('isMedium', matchMedia(mq_medium).matches);
		$('body').data('isLarge', matchMedia(mq_large).matches);		
				
		if (Foundation.MediaQuery.atLeast('large')) {
			$('body').data('isSmallOnly', false);
			$('body').data('isMediumOnly', false);	
			$('body').data('isLargeOnly', true);						
		}
		
		if (!Foundation.MediaQuery.atLeast('large')) {
			$('body').data('isSmallOnly', false);
			$('body').data('isMediumOnly', true);	
			$('body').data('isLargeOnly', false);						
		}		

		if (!Foundation.MediaQuery.atLeast('medium')) {
			$('body').data('isSmallOnly', true);
			$('body').data('isMediumOnly', false);
			$('body').data('isLargeOnly', false);							
		} 
				
		$('body').data('isPortrait', matchMedia('only screen and (orientation: portrait)').matches);
		$('body').data('isLandscape', matchMedia('only screen and (orientation: landscape)').matches);
		$('body').data('isRetina', matchMedia(retina).matches);
						
		$('body').data('vh', verge.viewportH());
		$('body').data('vw', verge.viewportW());
		
		if($('body').data('isSmallOnly'))
			$('body').data('topBarHeight', 120);
		else
			$('body').data('topBarHeight', 75);
			
		$('body').data('scrolled', false);	
		
		if($('body').data('page') == 'index' || 
			($('body').data('page') == 'blog' && !$('body').data('detail')) || 
			($('body').data('page') == 'team' && !$('body').data('detail')) || 
			($('body').data('page') == 'projecten' && $('body').data('isMedium')) ||
			($('body').data('page') == 'projecten' && !$('body').data('detail') && $('body').data('isSmall'))
		){		
			$('body').data('fullpage', true);
		} else {
			$('body').data('fullpage', false);
		}	
		if($('body').data('fullpage'))		
			if($('body').data('isSmallOnly') && $('body').data('is_facebook'))
				fixFacebookSizes();		
	}	
		
  	setVars();
  	
  	
  	function fixFacebookSizes(){
	  	var index = 108;
		var vh = $('body').data('vh') - index;
		$('body').data('vh', vh);
  		$('.c-homepage-right').css('bottom',index+'px');
  		
  		var arrowBottom = $('.c-arrow').css('bottom');
  		arrowBottom.replace('px','');
  		arrowBottom = parseInt(arrowBottom) + (index/2);
  		$('.c-arrow').css('bottom', arrowBottom+'px');
  		
    	var html = document.querySelector('html');
        html.style.height = window.innerHeight + 'px';  		
  	}
	
	
	// Image Interchange
	// -----------------
	function imgInterchange(){		
		var currentSize = $('body').data('interchangeCurrentSize');
		if(currentSize)
			if($('body').data('is'+currentSize))
				return;	

		$('*[data-imginterchange]').each(function(){
			var id = Math.floor(Math.random() * 100);
			if(!$(this).is(":visible"))
				return;
				
			var _this = this,
				value = $(this).data('imginterchange').trim().replace(/ /g,''),
				a_Options = value.split('],[');
			
			for (var i in a_Options) {	
				var a_Values = a_Options[i].split(','),
					_img = a_Values[0].replace(/\[/g,''),
					_size = a_Values[1].replace(/\]/g,'');			
				
				var a_Sizes = _size.split('_'),
					_size = a_Sizes[0],
					_retina = (a_Sizes.length > 1) ? a_Sizes[1] : false;
					
				// Check the screen size
				if($('body').data('is'+_size.charAt(0).toUpperCase() + _size.slice(1))){					
					var size = _size,
						img_1x = _retina ? _img.replace(/@2x/, '@1x') : _img,
						img_2x = _img.replace(/@1x/,'@2x');												
				}			
			}		
			
			if(!size)
				return;			
			
			$('body').data('interchangeCurrentSize', size.charAt(0).toUpperCase() + size.slice(1));
			
			// load default @0x image
			var img_0x = img_1x.replace(/@1x/,'@0x');
			loadImage(img_0x, this);
			
			// Default images are loaded. Load the 'real' ones.
			if(!$('#preload_1x'+id).length)
				$('body').append('<div id="preload_1x'+id+'" style="display: none;"></div>');

			// Load the @1x images
			$('#preload_1x'+id).append('<img src="'+img_1x+'" />');
			$('#preload_1x'+id).imagesLoaded( function() {
				loadImage(img_1x, _this);
				
				if($('body').data('isSmallOnly'))
					$(_this).parent().find('.c-loader').fadeOut();	
				else				
					$(_this).find('.c-loader').fadeOut();
				
				// Load the @2x images if we have a retina screen
				if(_retina && $('body').data('isRetina')){
					if(!$('#preload_2x'+id).length)
						$('body').append('<div id="preload_2x'+id+'" style="display: none;"></div>');
						
					$('#preload_2x'+id).append('<img src="'+img_2x+'" />');
					$('#preload_2x'+id).imagesLoaded(function(){
						loadImage(img_2x, _this);	
					});
				}
			});

			function loadImage(src, element){
				var s = src.trim();
				if($(element).is('img'))
					$(element).attr('src', s).load(function(){});
				else if($(element).is('div'))
					$(element).css({ 'background-image': 'url('+s+')' });				
			}
		});
	}
	imgInterchange();
	
	
	
	// Hamburger Icon / Off Canvas
	// ---------------------------	

	/*	
		WJ EDIT FOUNDATION
		I commented line 211 out. -> $('body').scrollTop(0);
		File foundation.offcanvas.js		
		
		 * Opens the off-canvas menu.
		 * @function
		 * @param {Object} event - Event object passed from listener.
		 * @param {jQuery} trigger - element that triggered the off-canvas to open.
		 * @fires OffCanvas#opened
		 
		OffCanvas.prototype.open = function(event, trigger) {
		  if (this.$element.hasClass('is-open')){ return; }
		  var _this = this,
		      $body = $(document.body);
		//  $('body').scrollTop(0);
	*/
	
	var $offcanvas = new Foundation.OffCanvas($('#offcanvas'), {});
	$('.c-hamburger-icon').click(function(){
		$('#offcanvas').foundation('toggle');
	});	
	
	$('#offcanvas').on('opened.zf.offcanvas', function() {
		$('.c-hamburger-icon').addClass('open');
		
		// prevent the container to scroll		
		if($('body').data('fullpage'))
			$.fn.fullpage.setAllowScrolling(false);
		
		// apply padding on the off canvas to get in screen
		var scrollPos = parseInt(window.pageYOffset);
		$(this).css({'padding-top':scrollPos});
		
		// Remove the arrow
		clearTimeout(arrowAnimationTimeOut);
		removeArrow();
		
		// Fix the position on 'c-content-frame'
		$('.c-content-frame').css('position','relative');
				
	});

	$('#offcanvas').on('closed.zf.offcanvas', function() {
		$('.c-hamburger-icon').removeClass('open');
		
		// The container can scroll again
		if($('body').data('fullpage'))
			$.fn.fullpage.setAllowScrolling(true);
			
		// Fix the position on 'c-content-frame'
		setTimeout(function(){$('.c-content-frame').css('position','fixed');}, 500);			
	});	
	
	

	
	
	
	// FullPage
	// --------
	function setSlidesHeight(){
		if($('body').data('isSmallOnly')){
/* HEIGHT			$('.c-slidee.show-for-small-only').find('.columns').each(function(){
				$(this).height(Math.round($('body').data('vh') - $('body').data('topBarHeight')) +'px');
			});*/
			$('.c-homepage.show-for-small-only').each(function(){
				$(this).height(Math.round($('body').data('vh')) +'px');			
			}); 
		}
		
		// set margin content slides
		var extra = 80;
		if($('body').data('isSmallOnly')){
			var extra = 20;
		}
		var contentHeight = 0,
			slideHeight = Math.round($('body').data('vh') - $('body').data('topBarHeight'));
		
		$('.c-slidee-content').children().each(function(){
			contentHeight += $(this).height();
		});
		
		var padding = ((slideHeight - contentHeight) / 2) - extra;
		$('.c-slidee-content h3').css({'margin-top':padding+'px'});		
	}
	
	$('body').data('currentColorSchemeContentSlideHomepage', 'purple');
	function loopColorSchemesContentSlideHomepage(){
		switch($('body').data('currentColorSchemeContentSlideHomepage')){
			case 'purple':
				setTimeout(function(){
					$('.c-slidee-content').addClass('c-color-green');
					$('.c-slidee-content').removeClass('c-color-purple');
					$('.c-slidee-content h3').html('Apart h&egrave;, dat <strike>paars</strike> groen.');
					$('body').data('currentColorSchemeContentSlideHomepage', 'green');					
				}, 2000);
			break;
			case 'green':
				$('.c-slidee-content').removeClass('c-color-green');
				$('.c-slidee-content').removeClass('c-color-purple');
				$('.c-slidee-content').addClass('c-color-yellow');
				$('.c-slidee-content h3').html('Geel, ook leuk!');
				$('body').data('currentColorSchemeContentSlideHomepage', 'yellow');
			break;
			case 'yellow':
				$('.c-slidee-content').removeClass('c-color-green');
				$('.c-slidee-content').removeClass('c-color-purple');
				$('.c-slidee-content').removeClass('c-color-yellow');
				$('.c-slidee-content').addClass('c-color-blue');
				$('.c-slidee-content h3').html('We blijven niet bezig :)');
				$('body').data('currentColorSchemeContentSlideHomepage', 'blue');
			break;
			case 'blue':
				return;
			break;
		}
		
	}

	(function(){
		if($('body').data('fullpage')){
			setSlidesHeight(); 
			
			var selectorToRemove = $('body').data('isSmallOnly') ? '.c-sly-slidee-medium' : '.c-sly-slidee-small';
			$(selectorToRemove).remove();					
		
			var selectorFullpage = $('body').data('isSmallOnly') ? '.c-sly-slidee-small' : '.c-sly-slidee-medium';
			var paddingTop = $('body').data('isSmallOnly') ? 0 : $('body').data('topBarHeight');
			paddingTop = 0;
		
			$(selectorFullpage).fullpage({
				sectionSelector: 'li'
				,scrollingSpeed: 600	
				,anchors : []
				,verticalCentered : false
				,paddingTop: paddingTop
				,onLeave: function(index, nextIndex, direction){
	            	$('body').data('scrolled', true);
	            	var leavingSection = $(this);
	
					//after leaving section 1
					if(($('body').data('page') == 'index') && index == 1 && direction == 'down'){
	                	activateTopBar('Over mij');
	                	hideProfile();
	                	removeArrow();
	                //	loopColorSchemesContentSlideHomepage();					
					}
	
					else if(($('body').data('page') == 'index') && index == 2 && direction == 'up'){
	                	deactivateTopBar();
	                	showProfile();					
					}
					
					else if(($('body').data('page') == 'index') && index == 2 && direction == 'down'){
						activateTopBar('Projecten');				
					}
					
					else if(($('body').data('page') == 'index') && index == 3 && direction == 'up'){
						activateTopBar('Over mij');
					}
	        	}
	        	
				,afterLoad: function(anchorLink, index){
					var loadedSection = $(this);

					//using index
//					if(index == 3)
//						loopColorSchemesContentSlideHomepage();
				}	        	
	        	
	        	
			});
			$(selectorFullpage).find('li').each(function(){
				if(!$(this).hasClass('c-homepage') && !$(this).hasClass('fp-auto-height')){
					$(this).height(Math.round($('body').data('vh') - $('body').data('topBarHeight')) + 'px');
					if($('body').data('isMedium'))
						$(this).css('margin-top', '75px');
				}
			});
		}		
	}());


	// Story tale animation
	// --------------------
	$('[data-story-tale]').children().each(function(){
		if(!$(this).is("Img"))
			$(this).css({'opacity':0});
	});

	// header
	setTimeout(function(){
		$('[data-story-tale]').each(function(){
			$(this).children().each(function(){
				if(!$(this).is("Img"))
					$(this).css({'opacity':1});				
			});			

	    	var objectInstance = $.extend(1, {}, StoryTale),
	        	effects        = $(this).attr('data-story-tale');
	
			objectInstance.Init($(this), effects.split(','));		
		});
	}, v.animation_delay_storytale);


	// make it beautiful
	// -----------------
	if($('body').data('page') == 'index'){
		$('.c-homepage-right .c-written').addClass('c-deactive');	
		setTimeout(function(){
			$('.c-homepage-right .c-written').addClass('c-fadein');	
			setTimeout(function(){
				$('.c-homepage-right .c-written').removeClass('c-fadein');					
			}, 5000);
			$('.c-homepage-right .c-written').removeClass('c-deactive');			
		}, v.animation_delay_written);
	}
	
	
	// Arrow fadein
	// ------------	
	if($('body').data('page') == 'index'){
		var arrowAnimationTimeOut = setTimeout(function(){
			if(!$('body').data('scrolled')){
				$('.c-arrow').removeClass('c-deactive');
				
				setTimeout(function(){
					$('.c-arrow').addClass('c-deactive');
				}, 5000);				
			}
		}, v.animation_delay_arrow);	
	}
	function removeArrow(){
		$('.c-arrow').addClass('c-deactive');
	}

	
	// Topbar sticky
	// -------------
	function activateTopBar(setText){
		var st = setText ? setText : false;
		if($('body').data('isSmallOnly'))
			showTopBar();
		$('.c-topbar-sticky div.c-profile').addClass('c-active');
		
		if(st)
			$('.c-topbar-sticky .c-topbar-right p strong').html(st);	
		else
			$('.c-topbar-sticky .c-topbar-right p strong').html('');	
	}
	
	function deactivateTopBar(){
		setTimeout(function(){
			hideTopBar();
			$('.c-topbar-sticky div.c-profile').removeClass('c-active');
		}, 100);
	}
	
	function showTopBar(){
		$('.c-topbar-sticky').addClass('c-active');
	}
	
	function hideTopBar(){
		$('.c-topbar-sticky').removeClass('c-active');
		if($('body').data('isSmallOnly') && $('body').data('page') != 'index')
			showTopBar();
	}	
	
	if($('body').data('isSmallOnly') && $('body').data('page') == 'index')
		hideTopBar();
		
	if($('body').data('isSmallOnly') && $('body').data('page') == 'project')
		showTopBar();
		

		
	// Profile
	// -------
	if($('body').data('page') == 'index'){
		$('.c-profile Img').click(function(){
			$.fn.fullpage.moveTo(1);
			deactivateTopBar();
            showProfile();								
		});		
	}

	if($('body').data('page') != 'index'){
		$('.c-profile Img').click(function(){
			document.location.href="/";								
		});			
	}	
	
	if($('body').data('page') == 'index'){
		$('.c-profile Img').addClass('c-deactive');	
		setTimeout(function(){
			$('.c-profile Img').addClass('c-fadein');	
			setTimeout(function(){
				$('.c-profile Img').removeClass('c-fadein');					
			}, 5000);
			$('.c-profile Img').removeClass('c-deactive');			
		}, v.animation_delay_profile);
	}
	
	function hideProfile(){
		$('.c-profile, .c-homepage-right .c-written').addClass('c-deactive');		
		$('.c-topbar-right p').addClass('c-fadein');
	}
	
	function showProfile(){
		$('.c-profile, .c-homepage-right .c-written').removeClass('c-deactive');
		$('.c-topbar-right p').removeClass('c-fadein');		
	}
	
	// Menu
	// ----
	$('.c-menu').children().each(function(){
		if($(this).data('page') == $('body').data('page'))
			$(this).addClass('c-active');
	});
	
	// Project panel info
	// ------------------	
	function toggleProjectInfoPanel(clicked_el){
		if($('.c-project-info').hasClass('c-active')){
			
			// deactive it
			$(clicked_el).removeClass('c-active');
			$('.c-project-info').removeClass('c-active');

			var text = $(clicked_el).data('text');
			$(clicked_el).text(text);
			
			// The page can scroll again
			$.fn.fullpage.setAllowScrolling(true);

			$('.js-project-panel-exit').unbind("click").hide();
			
		} else {

			// activate is
			$(clicked_el).addClass('c-active');
			$('.c-project-info').addClass('c-active');
			
			$(clicked_el).text('x');
			
			// prevent the page from scrolling
			$.fn.fullpage.setAllowScrolling(false);
			
			$('.js-project-panel-exit').show().on('click', function(){
				toggleProjectInfoPanel(clicked_el);
			});			
		}
	}
	
	// Project title
	// -------------
	$('body').data('c-topbar-right', false);
	function clipTopbarTitle(){
		var width = $('.c-topbar-right').width();		
		var chars = Math.round(width / 10) - 10;
		
		if($('body').data('isLargeOnly'))
			chars -= 15;
		
		if($('body').data('isSmallOnly'))
			chars += 10;
		
		if($('body').data('page') == 'projecten')
	    	chars -= 5;
						
		var html = $('body').data('c-topbar-right-p-html') ? $('body').data('c-topbar-right-p-html') : $('.c-topbar-right p').html(),
			a_Values = html.split('</a>');
			
		if(!$('body').data('c-topbar-right-p-html'))	
			$('body').data('c-topbar-right-p-html', html);
		
		if(a_Values.length > 1)
			if(chars && a_Values[1].length > chars){
				var value = a_Values[0] + '</a>' + a_Values[1].substring(0, chars)+'...';
				$('.c-topbar-right p').html(value);
			}
	}
	clipTopbarTitle();
	
	// Handler
	$('a[data-project-info-panel]').on('click',function(){
		toggleProjectInfoPanel(this);
	});
	
	function setProjectPanelInfoHeight(){
		var height = Math.round($('body').data('vh') - $('body').data('topBarHeight'));
		$('.c-project-info').height(height +'px');
	}
	setProjectPanelInfoHeight();
	
	
	// Content panel heights
	// ---------------------
	function setContentPanelHeights(){
		if($('body').data('isSmallOnly')){
			$('div[data-fullheight]').each(function(){
				$(this).height(Math.round(($('body').data('vh') - $('body').data('topBarHeight')) / 2) +'px');
			}); 
		} else {
			$('div[data-fullheight]').each(function(){
				$(this).height(Math.round($('body').data('vh') - $('body').data('topBarHeight')) +'px');
			});
			$('.c-slidee-half').each(function(){				
				$(this).height(ath.round($('body').data('vh') - $('body').data('topBarHeight')) / 2 +'px');
			});		
		}		
	}
	setContentPanelHeights();
				
		
	// Form submit Ajax
	// ----------------
	var options = { 
       // target:        '#newsletter-medium',   // target element(s) to be updated with server response 
        beforeSubmit:  newsletterValidate  // pre-submit callback 
        ,success:       showResponse  // post-submit callback 
 
        // other available options: 
       // ,url:       'newsletter.php'         // override for form's 'action' attribute 
        ,type:      'post'        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        ,clearForm: true        // clear all form fields after successful submit 
        ,resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    };	
	
    $('#newsletter-medium, #newsletter-small').submit(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        $(this).ajaxSubmit(options); 
 
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    }); 	
	
    
    function showResponse(responseText, statusText, xhr, jqForm){
		$(jqForm).find('.c-input-loader').html(responseText);
		fbq('track', 'Lead');  
    }
    
    function newsletterValidate(formData, jqForm, options){	    
	    $(jqForm).find('input').hide();	    
	    $(jqForm).find('.c-input-loader').show();
	    
	    for (var i=0; i < formData.length; i++) {
		    if(formData[i].name == 'emailadres'){
			    if (!formData[i].value || !validateEmail(formData[i].value)) {
				    
					$(jqForm).find('input').show();
					$(jqForm).find('.c-input-loader').hide();				    
				    $(jqForm).find('input[name="'+formData[i].name+'"]').addClass('c-error');
				    
				    return false;
			    }
		    }
	    }
    }	
    
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}    
	
	
		
	// Window Resize
	// -------------
	$(window).resize(function(e) {
        setVars();
        imgInterchange();
        clipTopbarTitle();
        if($('body').data('page') == 'index'){
	        setSlidesHeight();
        } else {
	        if($('body').data('page') == 'projecten' && $('body').data('detail')){
		        setProjectPanelInfoHeight();
	        } else {
		       setContentPanelHeights(); 
	        }   
        }        
  	});		
});