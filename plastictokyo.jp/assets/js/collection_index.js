
$(function() {
	var collectionArray = [];
	
	//find a href
	$(".archive main .archive__top,.archive main .archive__list ul li").on({'click':function(){
		window.location=$(this).find("a").attr("href");
		return false;
		}
	});
	function initAnime() {
		$('.textAnime').children().andSelf().contents().each(function(n) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));

			 var hexagon = $('.textAnime:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
			  hexagon.sort(function(){return 0.5-Math.random()});
			  TweenMax.staggerTo(hexagon, 0.4, {delay:1, autoAlpha: 1, ease: Quad.easeInOut}, 0.1);
		});
		$('.archive__season').addClass('active');
	}
	
	function scrollAnime(num) {
		$('.archive main .archive__list ul li:eq('+ num +') .textAnimeSc').children().andSelf().contents().each(function(n) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));

			 var hexagon = $('.archive main .archive__list ul li:eq('+ num +') .textAnimeSc:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
			  hexagon.sort(function(){return 0.5-Math.random()});
			  TweenMax.staggerTo(hexagon, 0.4, {delay:1, autoAlpha: 1, ease: Quad.easeInOut}, 0.1);
		});
		$('.archive main .archive__list ul li:eq('+ num +') .archive__season').addClass('active');
	}
	$('.main__top').imagesLoaded( function() {
		TweenMax.to('.loader', .5, {delay:.5, x:winW, ease: Power2.easeInOut,onComplete: function(){
			$('.loader').remove();
			
		}});
		TweenMax.to('.loader--circular', .5, {delay:1, opacity:0, ease: Power2.easeInOut,onComplete: function(){
			$('.loader--circular').remove();
		}});
	  	initAnime();
	});

	var winW;
	var winH;
	var scY;
	function setStage() {}
	setStage.prototype.top = function() {
		winW = $(window).width();
		winH = $(window).height();
		var wh = 450 / 300;
		collectionArray = [];
		scY = $('.archive main .archive__top').height() + $('.archive main .archive__top').offset().top - winH;
		$('.archive main .archive__list ul li').each(function(n) {
			collectionArray[n] = $(this).offset().top - winH / 2 - 200;
		});
		var headH = 81;
		if(winW < 768) headH = 55;
		$('.archive main .archive__top').css({height: winH - headH});
	}
	
	var setSize = new setStage();
	setSize.top();
	var liLeng = $('.archive main .archive__list ul li').length;
	var current = 0;
	var scmoveY = 60;
	$(window).scroll(function () {
		var scrollY = $(this).scrollTop();
		/*if(scrollY > scY) {
			$('.archive__top--text').removeClass("fix");
		}else{
			$('.archive__top--text').addClass("fix");
		}*/
		if(scrollY > scmoveY) {
			$('.archive main .archive__top .archive__scroll').addClass("active");
		}else{
			$('.archive main .archive__top .archive__scroll').removeClass("active");
		}
		for (var i = liLeng - 1; i>=0; i--) {
				if (scrollY > collectionArray[i] ) {
					if (i != current) {
						current = i;
						if(!$('.archive main .archive__list ul li').eq(i).hasClass('active')) {
							scrollAnime(i);
						}
						$('.archive main .archive__list ul li').eq(i).addClass('active');
						
					}
				}
		}
	 });
	
	
	$(window).resize(function() {
		setSize.top();
	});
	
});