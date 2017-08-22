/* Theme Name: The Project - Responsive Website Template
 * Author: HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version: 2.0.0
 * Created: March 2015
 * License URI: http://support.wrapbootstrap.com/
 * File Description: Place here your custom scripts
 */

(function ($) {
	$(document).ready(function () {
		$.get("currencyExchange", (exchange) => {
			$("#exchange").text(exchange);
		});
		"use strict";

		// quicklink
		$(".quickbot").hide();
		$(".quickbox .wxcode").hide();

		$('.quickbox .quickwx').mouseenter(function () {
			$(this).find('.wxcode').stop(true, true).fadeIn("slow");
		}).mouseleave(function () {
			$(this).find('.wxcode').fadeOut("slow");
		});

		$(function () {
			//Detecting screen height  
			var scrtop = $(window).scrollTop();
			if (scrtop > 300) {
				$(".quickbot").show();
			}
			//scroll top()   
			$(".quickbot").click(function () {
				$('body,html').animate({ scrollTop: 0 }, 300);
				return false;
			});
		});

		$('.quickclose').click(function () {
			$(".quickbox").slideUp(300);
			$('.quickclose').hide();
			$('.quickopen').fadeIn(600);
			var scrtop = $(window).scrollTop();
			if (scrtop > 300) {
				$(".quickbot").show();
			} else {
				$(".quickbot").hide();
			}
		});
		$('.quickopen').click(function () {
			$(".quickbox").slideDown(300);
			$('.quickclose').fadeIn(600);
			$('.quickopen').hide();
			var scrtop = $(window).scrollTop();
			if (scrtop > 300) {
				$(".quickbot").show();
			} else {
				$(".quickbot").hide();
			}
		});

		//scroll()   
		$(window).scroll(function () {
			if ($('.quickopen').css("display") !== "block") {
				if ($(window).scrollTop() > 300) {
					$(".quickbox .quickbot").fadeIn(500);
					$(".quickclose").fadeIn();
				} else {
					$(".quickbox .quickbot").fadeOut(500);
					$(".quickclose").hide();
					$(".quickclose").fadeIn();
				}
			} else {
				if ($(window).scrollTop() > 300) {
					$(".quickon .quickbot").fadeIn(500);

				} else {
					$(".quickon .quickbot").fadeOut(500);
				}
			}
		});
	}); // End document ready

})(this.jQuery);




