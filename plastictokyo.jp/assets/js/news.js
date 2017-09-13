
$(function() {
	var collectionArray = [];
	$('.news__list li').each(function(i) {
	$('.news__list li:eq('+ i +') .textAnimeSc').children().andSelf().contents().each(function(n) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
 			var hexagon = $('.news__list li:eq('+ i +') .textAnimeSc:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
	});
	});
	//find a href
	$(".news__list li,.news__detail--container .news__detail--list li").on({'click':function(){
		window.location=$(this).find("a").attr("href");
		return false;
		}
	});
	
	
	function scrollAnime(num) {
		$('.news__list li:eq('+ num +') .textAnimeSc').children().andSelf().contents().each(function(n) {
			 var hexagon = $('.news__list li:eq('+ num +') .textAnimeSc:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
			  hexagon.sort(function(){return 0.5-Math.random()});
			  TweenMax.staggerTo(hexagon, 0.4, {delay:1, autoAlpha: 1, ease: Quad.easeInOut}, 0.1);
		});
		
	}
	$('main').imagesLoaded( function() {
		TweenMax.to('.loader', .5, {delay:.5, x:$(window).width(), ease: Power2.easeInOut,onComplete: function(){
			$('.loader').remove();
			for (var i = liLeng - 1; i>=0; i--) {
				if ($(window).scrollTop() > collectionArray[i] ) {
					if (i != current) {
						current = i;
						if(!$('.news__list li').eq(i).hasClass('active')) {
							scrollAnime(i);
						}
						$('.news__list li').eq(i).addClass('active');
						
					}
				}
			}
		}});
		TweenMax.to('.loader--circular', .5, {delay:1, opacity:0, ease: Power2.easeInOut,onComplete: function(){
			$('.loader--circular').remove();
		}});
	  	
	});
	function setStage() {}
	setStage.prototype.top = function() {
		winW = $(window).width();
		winH = $(window).height();
		var wh = 450 / 300;
		collectionArray = [];
		$('.news__list li').each(function(n) {
			collectionArray[n] = $(this).offset().top - winH / 2 - 200;
		});
		
	}
	
	var setSize = new setStage();
	setSize.top();
	
	var liLeng = $('.news__list li').length;
	var current = 0;
	var scmoveY = 60;
	$(window).scroll(function () {
		var scrollY = $(this).scrollTop();
		
		for (var i = liLeng - 1; i>=0; i--) {
				if (scrollY > collectionArray[i] ) {
					if (i != current) {
						current = i;
						if(!$('.news__list li').eq(i).hasClass('active')) {
							scrollAnime(i);
						}
						$('.news__list li').eq(i).addClass('active');
						
					}
				}
		}
	 });
	
	
});