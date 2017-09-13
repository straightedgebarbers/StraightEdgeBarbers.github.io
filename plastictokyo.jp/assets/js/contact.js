
$(function() {
	
	$('main').imagesLoaded( function() {
		TweenMax.to('.loader', .5, {delay:.5, x:$(window).width(), ease: Power2.easeInOut,onComplete: function(){
			$('.loader').remove();
			
			
		}});
		TweenMax.to('.loader--circular', .5, {delay:1, opacity:0, ease: Power2.easeInOut,onComplete: function(){
			$('.loader--circular').remove();
		}});
	  	
	});
	
	
});