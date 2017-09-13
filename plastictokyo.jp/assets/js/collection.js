
$(function() {
	var fileArray = [];
	var filethumArray = [];
	var filethumArray2 = [];
	var itemID = 0;
	var afterID = -1;
	var first = true;
	var collectionArray = [];
	$(".main__top").append('<p class="archive__scroll">scroll</p>');
	$(".main__all .main__all--look ul li").each(function(i){
		var file = $(this).data('detail');
		fileArray[i] = file;
		collectionArray[i] = i;
	});
	
	var $dir = location.href.split("/");  
	var $dir2 = $dir[$dir.length -2]; 
	
	if(document.URL.match("/women/")) {
		$dir2 = 'women/' + $dir2;
	} else {
		$dir2 = 'men/' + $dir2;
	}
	console.log($dir2)
	//shuffle
	function shuffle(array) {
	  var n = array.length, t, i;
		while (n) {
		i = Math.floor(Math.random() * n--);
		t = array[n];
		array[n] = array[i];
		array[i] = t;
	  }
	  return array;
	}
	//配列シャッフル
	shuffle(collectionArray);
	
	function initAnime() {
		$('.textAnime').children().andSelf().contents().each(function(n) {
			$(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));

			 var hexagon = $('.textAnime:eq('+ n +') span').toArray();
			  TweenMax.set(hexagon, {autoAlpha: 0});
			  hexagon.sort(function(){return 0.5-Math.random()});
			  TweenMax.staggerTo(hexagon, 0.4, {delay:1, autoAlpha: 1, ease: Quad.easeInOut}, 0.1);
		});
		$('.title__season').addClass('active');
	}
	
	function setCollection() {
		$(".main__top .main__top--container ul").each(function(i){
			$(this).append('<li></li>');
			$(".main__top .main__top--container ul:eq("+ i +") li").css('background-image', 'url(/assets/img/contents/collection/'+ $dir2 +'/'+ (collectionArray[i] + 1) +'.jpg)');
			
			var $target = $(".main__top .main__top--container ul:eq("+ i +")");
			TweenMax.set($target, {scale:.9,opacity:0});
			TweenMax.fromTo($target, 1.5, {scale:.9,opacity:0}, {delay:0.1*i, scale:1,opacity : 1, ease: Power2.easeOut,onComplete: function(){
					
			}});
		});
	}
	
	function setCollectionMove() {
		var leng = fileArray.length;
		$(".main__top .main__top--container ul").each(function(i){
			var slideID = i*(Math.floor(leng / 6));
			var rand = Math.floor(Math.random() * 5);
			function setCollectionMove2() {
				slideID++;
				if(slideID > fileArray.length-1 ) slideID = 0;
				
				$(".main__top .main__top--container ul").eq(i).append('<li></li>');
				$(".main__top .main__top--container ul:eq("+ i +") li").eq(1).css('background-image', 'url(/assets/img/contents/collection/'+ $dir2 +'/'+ (collectionArray[slideID] + 1) +'.jpg)');
				var $target = $(".main__top .main__top--container ul:eq("+ i +") li").eq(1);
				TweenMax.set($target, {scale:.9,opacity:0});
				TweenMax.fromTo($target, 1.5, {scale:.9,opacity:0}, {delay:rand, scale:1,opacity : 1, ease: Power2.easeOut,onComplete: function(){
					$(".main__top .main__top--container ul:eq("+ i +") li").eq(0).remove();
				}});
			}
			setInterval(setCollectionMove2,7000);
		});
	}
	
	
	//var slideInterval = setInterval(setCollectionMove,5000);
	
	
	$('.main__top').imagesLoaded( function() {
		TweenMax.to('.loader', .5, {delay:.5, x:winW, ease: Power2.easeInOut,onComplete: function(){
			$('.loader').remove();
			setCollectionMove();
			setCollection();
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
		var thumW = 0;
		if(winW > 767) {
			$('.main__top .main__top--container.middle').css({'height' : winW / 4 * wh});
			$('.main__top .main__top--container.small').css({'height' : winW / 6 * wh});
			$('.main__top .main__top--container.large').css({'height' : winW / 4 * wh + winW / 6 * wh});
		} else {
			$('.main__top .main__top--container.middle').css({'height' : winW / 2 * wh});
			$('.main__top .main__top--container.small').css({'height' : winW / 3 * wh});
			$('.main__top .main__top--container.large').css({'height' : winW * wh});
		}
		
		filethumArray2 = [];
		$(".collection__modal .collection__modal--list li").each(function(i){
			thumW += $(this).width();
			filethumArray2[i] = $(this).width();
		});
		
		if(winW <= 767) {
			$('.collection__modal .collection__modal--list ul').css({'width' : thumW,'height' : 69});
		} else {
			$('.collection__modal .collection__modal--list ul').css({'width' : 'auto','height' : 'auto'});
		}
		scY = $('.main__top').height() + $('.main__top').offset().top - winH;
		
	}
	
	var setSize = new setStage();
	setSize.top();
	var scmoveY = 60;
	$(window).scroll(function () {
		var scrollY = $(this).scrollTop();
		if(scrollY > scY) {
			$('.main__all--title').removeClass("fix");
		}else{
			$('.main__all--title').addClass("fix");
		}
		if(scrollY > scmoveY) {
			$('.archive__scroll').addClass("active");
		}else{
			$('.archive__scroll').removeClass("active");
		}
	 });
	
	//modal
	$(".main__all .main__all--look ul li").on({'click':function(){
		itemID = $(".main__all .main__all--look ul li").index(this);
		setModal();
		return false;
		}
	});
	$(".collection__modal--close").on({'click':function(){
		closeModal();
		return false;
		}
	});
	//live
	$(document).on('click', '.collection__modal .collection__modal--list ul li', function() {
	   itemID = $(".collection__modal .collection__modal--list ul li").index(this);
		modalMove();
	});
	$(".collection__modal .collection__modal--look .arrow").on({'click':function(){
		var index = $(".collection__modal .collection__modal--look .arrow").index(this);
		if(index === 0) {
			itemID--;
		} else if(index === 1) {
			itemID++;
		}
		if(itemID < 0) {
			itemID = fileArray.length - 1;
		} else if(itemID > fileArray.length - 1) {
			itemID = 0;
		}
		modalMove();
		}
	});
	function setModalList() {
		var $slideObj = $('.main__all .main__all--look ul li');
		$slideObj.clone().prependTo('.collection__modal .collection__modal--list ul');
		$('.collection__modal .collection__modal--list').imagesLoaded( function() {
			$(".collection__modal .collection__modal--list li").each(function(i){
				var thumH = $(this).height();
				filethumArray[i] = thumH;
			});
			
		});
		setSize.top();
	}
	function setModal() {
		if(first) setModalList();
		first = false;
		$("body").addClass('noscroll');
		$('.collection__modal').show();
		$('.collection__modal .collection__modal--look span').css({backgroundImage: 'url("'+ fileArray[itemID] +'")' });
		TweenMax.set('.collection__modal .collection__modal--look span', {scale : 1.1,opacity : 0});
		TweenMax.fromTo('.collection__modal', 1, {opacity : 0}, {opacity:1, ease: Power2.easeOut,onComplete: function(){
			TweenMax.to('.collection__modal .collection__modal--look span', 1, {scale:1,opacity : 1, ease: Power2.easeOut,onComplete: function(){
			
			}});
			modalThumMove();
			afterID = itemID;
		}});
	}
	function modalMove() {
		var distance = 1;
		if(itemID < afterID) distance = -1;
		TweenMax.to('.collection__modal .collection__modal--look span', .6, {x:-100 * distance, opacity:0, ease: Power2.easeOut,onComplete: function(){
			$('.collection__modal .collection__modal--look span').css({backgroundImage: 'url("'+ fileArray[itemID] +'")' });
			TweenMax.fromTo('.collection__modal .collection__modal--look span', 1, {x : 100 * distance}, {x:0, opacity:1, ease: Power2.easeOut,onComplete: function(){
				
			}});
			modalThumMove();
			afterID = itemID;
		}});
	}
	function modalThumMove() {
		var slideY = 0;
		var slideX = 0;
		for (var i = 0; i < itemID; i++){
		  slideY += filethumArray[i];
		}
		for (var i = 0; i < itemID; i++){
		  slideX += filethumArray2[i];
		}
		var thumH = $('.collection__modal .collection__modal--list ul').height();
		slideY = slideY - winH / 2 + filethumArray[itemID] / 2;
		slideX = slideX - winW / 2 + filethumArray2[itemID] / 2;
		if(slideY < 0) {
			slideY = 0;
		} else if(slideY >= thumH - winH) {
			slideY = thumH - winH;
		}
		console.log(slideY,-thumH + winH)
		if(slideX < 0) slideX = 0;
		$(".collection__modal .collection__modal--list li").removeClass('selected');
		TweenMax.to('.collection__modal .collection__modal--list ul', .5, {y:-slideY, ease: Power2.easeOut,onComplete: function(){
			$(".collection__modal .collection__modal--list li").eq(itemID).addClass('selected');
		}});
		
		if(winW < 768) $('.collection__modal .collection__modal--list').stop().animate({ scrollLeft : slideX },500,'easeOutQuart');
	}
	function closeModal() {
		TweenMax.to('.collection__modal', 1, {opacity:0, ease: Power2.easeOut,onComplete: function(){
			$('.collection__modal').hide();
			$("body").removeClass('noscroll');
		}});
	}
	//setGlitch('canvas-webgl-large',$('.main__top .main__top--container.large'),'/assets/img/sample.jpg');
	/*setTimeout(function(){
		setGlitch('canvas-webgl-middle',$('.main__top .main__top--container.middle'),'/assets/img/sample4.jpg');
		setGlitch('canvas-webgl-middle2',$('.main__top .main__top--container.middle'),'/assets/img/contents/collection/2017ss/3.jpg');
		setGlitch('canvas-webgl-small',$('.main__top .main__top--container.small'),'/assets/img/contents/collection/2017ss/2.jpg');
		setGlitch('canvas-webgl-small2',$('.main__top .main__top--container.small'),'/assets/img/contents/collection/2017ss/0.jpg');
		setGlitch('canvas-webgl-small3',$('.main__top .main__top--container.small'),'/assets/img/contents/collection/2017ss/1.jpg');
	},1000);*/
	
	/*var slideID = 0;
	function slideCount() {
		if(slideID >= 3 - 1) {
			slideID = 0;
		} else {
			slideID++;
		}
		slideInit();
	}
	function slideInit() {
		//cancelAnimationFrame( id );
		setGlitch('canvas-webgl-large',$('.main__top .main__top--container.large'),'/assets/img/contents/collection/2017ss/'+ slideID +'.jpg');
	}
	
	slideInterval = setInterval(slideCount,5000);
	slideInit();*/
	
	$(window).resize(function() {
		setSize.top();
	});
	
});