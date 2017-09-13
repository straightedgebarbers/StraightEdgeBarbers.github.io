$(function() {
	var slideID = 0;
	var slideZindex = 0;
	var slideInterval;
	var ringW = 122;
	var bgLeng = 4;
	var dir = "2017aw";
	//txt anime
	function initAnime() {
		$('.textAnime').children().andSelf().contents().each(function(n) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));

			 var hexagon = $('.textAnime:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
			  hexagon.sort(function(){return 0.5-Math.random()});
			  TweenMax.staggerTo(hexagon, 0.4, {delay:1, autoAlpha: 1, ease: Quad.easeInOut}, 0.1);
		});
		$('.top__menu nav .nav__list,.footer__copyright').css({opacity:1});
		TweenMax.to('.top__menu h1', 1, {delay:.5, opacity:1, ease: Power2.easeOut,onComplete: function(){
			
		}});
		TweenMax.to('.top footer .footer__sns', 1, {delay:1.5, opacity:1, ease: Power2.easeOut,onComplete: function(){
			TweenMax.fromTo('.number__circle', 1, {scale:1.3}, {scale:1, opacity:1, ease: Power2.easeOut,onComplete: function(){
				
			}});
			slideInterval = setInterval(slideCount,5000);
			slideInit();
		}});
		
		//hover
		$('a.textAnime').on({
			'mouseenter':function(){
				var $target = $('span',this);
				TweenMax.staggerTo($target, .3, {opacity: .5, ease: Quad.easeInOut}, 0.05);
			},
			'mouseleave':function(){
				var $target = $('span',this);
				TweenMax.staggerTo($target, .3, {opacity: 1, ease: Quad.easeInOut}, 0.05);
			}
		});
	}
	function slideCount() {
		if(slideID >= bgLeng - 1) {
			slideID = 0;
		} else {
			slideID++;
		}
		slideInit();
		$('.number__circle').removeClass('loadanime');
	}
	function slideInit() {
		$('body').addClass('white');
		if(slideID === 0) {
			$('body').removeClass('white');
		}
		var $obj = $('.top__bg li').eq(slideID);
		var $ringobj = $('.number__circle span');
		cancelAnimationFrame( id );
		init(slideID);
		var file = "";
		if(window.innerWidth <= 767) file = "--sp";
		$('.top__bg').css('background-image', 'url(assets/img/top/'+ dir + '/top' + slideID + file + '.jpg)')
		TweenMax.to('#canvas-webgl', .1, {opacity:1, ease: Power2.easeIn,onComplete: function(){
			TweenMax.to('#canvas-webgl', 1, {delay:2, opacity:0, ease: Power2.easeOut,onComplete: function(){
			
			}});
		}});
		
		TweenMax.to($ringobj, .3, {width : 0, height : 0, ease: Power2.easeIn,onComplete: function(){
			TweenMax.to($ringobj, .6, {x : 0, y: 0, ease: Power2.easeOut,onComplete: function(){
					$('.number__circle').addClass('loadanime');
				}});
		}});
		//number
		$('.number__circle--text .imgnum').html(slideID + 1);
		
	}
	
	function setStage() {}
	setStage.prototype.top = function() {
		winW = $(window).width();
		if(winW <= 767) {
			ringW = 61;
		} else {
			ringW = 84;
		}
	}
	
	var setSize = new setStage();
	setSize.top();
	$(window).resize(function() {
		setSize.top();
	});
	$('.number__circle--text .totalnum').html('/' + bgLeng);
	
	
	//live
	$(document).on('click', 'h1', function() {
		deleteCanvas();
	   
		return false;
	});
	function deleteCanvas() {
		
	}
	 //glicth('#canvas-logo', 'assets/img/logo.png');
	initAnime();
});