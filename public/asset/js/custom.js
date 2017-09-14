/* Theme Name: The Project - Responsive Website Template
 * Author: HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version: 2.0.0
 * Created: March 2015
 * License URI: http://support.wrapbootstrap.com/
 * File Description: Place here your custom scripts
 */
var transfertype = "";

(function ($) {
	$(document).ready(function () {
		$.get("/currencyExchange", (exchange) => {
			$("#exchange").text(exchange);
		});
		"use strict";

		$("#tracking-form").submit((e) => {
			doTrack();
			return false;
		});

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

		var $grid = $('.grid').isotope({
			itemSelector: '.element-item',
			layoutMode: 'fitRows'
		});

		// bind filter button click
		$('.filters-button-group').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			// use filterFn if matches value
			$grid.isotope({ filter: filterValue });
		});
	}); // End document ready
})(this.jQuery);


function setTrack(type) {
	transfertype = type;
	$("#transfer-type").text(type == "MST" ? "美速通速运" : type == "Euro" ? "欧洲段物流" : "国内段物流");
}

function doTrack() {
	if (document.getElementById("YQNum").value === "") {
		alert("请输入运单号");
		return;
	}
	$(".trDialog").remove();
	$("#YQContainer").html("");
	if (transfertype == "MST" || transfertype == "") {
		$("#YQContainer").append('<div class="loader"></div>');
		$.ajax({
			url: '/track',
			type: 'POST',
			timeout: 20000,
			dataType: 'json',
			data: {
				'MfcISAPICommand': 'EmsApiTrack',
				'cno': document.getElementById("YQNum").value,
				'ntype': "10010000",
				'cp': '65001'
			},
			success: (data) => {
				var statusCode = {
					'-9': '错误',
					'-5': '错误',
					'-4': '错误',
					'-3': '不支持的运单号',
					'-2': '没有结果',
					'0': '处理中',
					'1': '已发出',
					'2': '运输中',
					'3': '已抵达',
					'4': '错误',
					'5': '进入海关',
					'6': '地址错误',
					'7': '包裹丢失',
					'8': '包裹寄回发送地',
					'9': '错误',
					'10': '错误',
				}
				var template = {};
				if (data) {
					if (data.ReturnValue == 100) {
						data.Response_Info.statusDetails = statusCode[data.Response_Info.status];
						template = _.template('<div class="container" style="text-align: left">' +
							'    <h4>包裹状态</h4>' +
							'    <table class="table table-bordered table-colored table-hover">' +
							'        <tbody>' +
							'            <tr>' +
							'                <td>运单号</td>' +
							'                <td><%= data.Response_Info.Number %></td>' +
							'            </tr>' +
							'            <tr>' +
							'                <td>发出地</td>' +
							'                <td><%= data.Response_Info.From %></td>' +
							'            </tr>' +
							'            <tr>' +
							'                <td>目的地</td>' +
							'                <td><%= data.Response_Info.Destination %></td>' +
							'            </tr>' +
							'            <tr>' +
							'                <td>包裹数量</td>' +
							'                <td><%= data.Response_Info.totalPieces %></td>' +
							'            </tr>' +
							'            <tr>' +
							'                <td>发送状态</td>' +
							'                <td><%= data.Response_Info.statusDetails %></td>' +
							'            </tr>' +
							'            <tr>' +
							'                <td>送达日期</td>' +
							'                <td><%= data.Response_Info.deliveryDate %></td>' +
							'            </tr>' +
							'        </tbody>' +
							'    </table>' +
							'	 <br/>' +
							'    <h4>包裹追踪</h4>' +
							'    <table class="table table-bordered table-colored table-hover">' +
							'        <tbody>' +
							'            <thead>' +
							'                <tr>' +
							'                    <th>国家</th>' +
							'                    <th>状态</th>' +
							'                    <th>日期</th>' +
							'                </tr>' +
							'            </thead>' +
							'            <% data.trackingEventList.forEach((event, index)=>{ %>' +
							'            <tr>' +
							'                <td><%= event.place %></td>' +
							'                <td><%= event.details %></td>' +
							'                <td><%= event.date %></td>' +
							'            </tr>' +
							'            <% }) %>' +
							'        </tbody>' +
							'    </table>' +
							'<br/>' +
							'<% if (data.ChinaPart.info) { %>' +
							'<h4>国内<b><%= data.ChinaPart.carrier %></b>段包裹查询 - 运单号：<%= data.ChinaPart.trackingnumber %></h4>' +
							'<table class="table table-bordered table-colored table-hover">' +
							'    <tbody>' +
							'        <thead>' +
							'            <tr>' +
							'                <th>状态</th>' +
							'                <th>日期</th>' +
							'                <th>详情</th>' +
							'            </tr>' +
							'        </thead>' +
							'        <% data.ChinaPart.info.origin_info.trackinfo.forEach((event, index)=>{ %>' +
							'        <tr>' +
							'            <td><%= event.StatusDescription %></td>' +
							'            <td><%= event.Date %></td>' +
							'            <td><%= event.Details %></td>' +
							'        </tr>' +
							'        <% }) %>' +
							'    </tbody>' +
							'</table>' +
							'<% } else { %>' +
							'<h4>国内<b><%= data.ChinaPart.carrier %></b>段包裹查询</h4>' +
							'<p>国内<b><%= data.ChinaPart.carrier %></b>段包裹查询失败，请手动查询国内段物流！追踪码：<%= data.ChinaPart.trackingnumber %></p>' +
							'<% } %>' +
							'</div>');
					} else if (data.ReturnValue == -102) {
						template = _.template('<div class="container alert alert-danger">' +
							'	<strong>运单号错误</strong>' +
							'</div>');
					} else if (data.ReturnValue == -9) {
						template = _.template('<div class="container alert alert-danger">' +
							'	<strong>未知错误</strong>' +
							'</div>');
					} else {
						template = _.template('<div class="container alert alert-danger">' +
							'	<strong>未知错误</strong>' +
							'</div>');
					}
				} else {
					template = _.template('<div class="container alert alert-danger">' +
						'	<strong>未知错误</strong>' +
						'</div>');
				}
				$("#YQContainer").html(template({ data: data }));
			},
			error: function (xhr, status, error) {
				console.log(xhr.status);
				console.log(xhr.responseText);
			},
		});
	} else if (transfertype == "Euro") {
		let num = document.getElementById("YQNum").value;
		YQV5.trackSingle({
			//必须，指定承载内容的容器ID。
			YQ_ContainerId: "YQContainer",
			//可选，指定查询结果高度，最大高度为800px，默认撑满容器。
			YQ_Height: 800,
			//可选，指定UI语言，默认根据浏览器自动识别。
			YQ_Lang: "zh-CN",
			//必须，指定要查询的单号。
			YQ_Num: num
		});
	} else if (transfertype == "China") {
		let num = document.getElementById("YQNum").value;
		TRACKINGMORE.trackMynumber({
			TR_ElementId: "YQContainer",      //必须，指定悬浮位置的元素ID。
			TR_Height: 800,       //可选，指定查询结果高度，最大高度为800px，默认撑满容器。
			TR_ExpressCode: "0",
			TR_Lang: "cn",       //可选，指定UI语言，默认根据浏览器自动识别。
			TR_Num: num       //必须，指定要查询的单号。
		});
	}

}