
$(function() {
	var collectionArray = [];
	
	$('.textAnime').children().andSelf().contents().each(function(n) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
 			var hexagon = $('.textAnime:eq('+ n +') span').toArray();
			TweenMax.set(hexagon, {autoAlpha: 0});
			
	});
	
	$('main').imagesLoaded( function() {
		TweenMax.to('.loader', .5, {delay:.5, x:$(window).width(), ease: Power2.easeInOut,onComplete: function(){
			$('.loader').remove();
			$('.textAnime').children().andSelf().contents().each(function(n) {
			 var hexagon = $('.textAnime:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
			  hexagon.sort(function(){return 0.5-Math.random()});
			  TweenMax.staggerTo(hexagon, 0.3, {delay:1, autoAlpha: 1, ease: Quad.easeInOut}, 0.05);
			});
			
		}});
		TweenMax.to('.loader--circular', .5, {delay:1, opacity:0, ease: Power2.easeInOut,onComplete: function(){
			$('.loader--circular').remove();
		}});
	  	
	});
	
	
});