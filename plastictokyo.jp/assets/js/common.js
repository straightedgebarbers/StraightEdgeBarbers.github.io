
$(function() {
	var urlArray = ["men","women","collection","news","concept","contact"];
	var $dir = location.href.split("/");  
    var $dir2 = $dir[$dir.length -2];  
	
	var navX = $.inArray($dir2, urlArray);
	if(navX != -1 ) {
		$('header nav ul li').eq(navX).addClass("selected");
	} else {
		if(document.URL.match("/women/")) {
			$('header nav ul li').eq(1).addClass("selected");
		} else if(document.URL.match("/men/")) {
			$('header nav ul li').eq(0).addClass("selected");
		} else if(document.URL.match("/news/")) {
			$('header nav ul li').eq(3).addClass("selected");
		}
	}
	//SP menu
	
	$(".sp__icon").click(function(){
		if($(".sp__icon").hasClass("active")){
			$(".sp__icon").removeClass("active");
			$(".sp__menu").fadeOut();
		}else {
			$(".sp__icon").addClass("active");
			$(".sp__menu").fadeIn();
		}
	});
	
	//sns popup
	$("footer .footer__sns .footer__sns--share ul li").on({'click':function(){
		var snsID = $("footer .footer__sns .footer__sns--share ul li").index(this);
			if(snsID===0) {
				fullScreen('http://www.facebook.com/sharer.php?u='+location.href);
			}else if(snsID===1) {
				fullScreen('http://twitter.com/share?url='+location.href);
			}
			return false;
		}
	});
	function fullScreen(theURL) {
		 window.open(theURL,"newWin1",'width=600,height=600,scrollbars=yes');
	}
	
});
var _ua = (function(u){
	  return {
		Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
		  || u.indexOf("ipad") != -1
		  || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
		  || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
		  || u.indexOf("kindle") != -1
		  || u.indexOf("silk") != -1
		  || u.indexOf("playbook") != -1,
		Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
		  || u.indexOf("iphone") != -1
		  || u.indexOf("ipod") != -1
		  || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
		  || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
		  || u.indexOf("blackberry") != -1
	  }
	})(window.navigator.userAgent.toLowerCase());