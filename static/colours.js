(function(){
	'use strict';
	function randomColor(){
		var r, g, b;
		r = Math.floor(Math.random() * (256));
		g = Math.floor(Math.random() * (256));
		b = Math.floor(Math.random() * (256));
		$('body').css('background-color','rgb('+r+','+g+','+b+')');
		// $('.button-primary').css('background-color','rgb('+r+','+g+','+b+')');
		$('label').css('color','rgb('+r+','+g+','+b+')');
	}

	$(document).ready(function(){
		var submitButton = $('.shake');
		var t = setInterval(randomColor,5000);
		randomColor();

		submitButton.mouseover(function(){
			submitButton.addClass('animated tada');
		});

		submitButton.mouseleave(function(){
			submitButton.removeClass('animated tada');
		});

		// load back to form after a few seconds on thanks page
		if(window.location.pathname === '/thanks.html'){
			setTimeout(function(){
				window.location.assign(window.location.origin);
			}, 5000);
		}

	});
})();