$(function () {
	$(document).ready(function () {
		$(window).on('resize', function () {
			resizePortfolioTile();
		});
	});

	function resizePortfolioTile () {
		var cw = $('.portfolio .tile img').width();
		$('.portfolio .tile').height(cw-3);
	}

	/*
	* Replace all SVG images with inline SVG
	*/
	jQuery('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		var $svg = jQuery(data).find('svg');

		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');

		// Check if the viewport is set, else we gonna set it if we can.
		if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
			$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
		}

		// Replace image with new SVG
		$img.replaceWith($svg);

		}, 'xml');

	});
});
/*

*/


app.directive('resizePortfolioTile', ['$timeout', function ($timeout) {
	return {
		link: function ($scope, el, attr) {
			$timeout(function () {				
				//Resize tile
				var cw = $(el).find('img').outerWidth();
				$(el).height(cw-3);

				var link = $(el).find('a.portfolio-link');
				//Add fancybox
				if (link.attr('ng-class') == 'zoom') {
					link.fancybox();
				}

			}, 0, false);
		}
	};
}])
.controller('PortfolioController',['$scope', function ($scope) {
	$scope.items = [{
		'title': 'Red Queen',
		'imagex1': 'portfolio/redqueen.jpg',
		'link': 'portfolio/redqueen-groot.jpg',
		'linktype': 'zoom'
	},{
		'title': 'Bennoe',
		'imagex1': 'portfolio/bennoe.jpg',
		'link': 'https://github.com/timenengwerda/bennoe',
		'linktype': 'git'
	},{
		'title': 'Meisje',
		'imagex1': 'portfolio/meisje.jpg',
		'link': 'portfolio/meisje-groot.png',
		'linktype': 'zoom'
	},{
		'title': 'Bullethell game',
		'imagex1': 'portfolio/bullethell.jpg',
		'link': 'https://github.com/timenengwerda/wasd_score/',
		'linktype': 'git'
	}
	,{
		'title': 'Auti app',
		'imagex1': 'portfolio/auti-app.jpg',
		'link': 'https://github.com/timenengwerda/auti_app',
		'linktype': 'git'
	}];

	//$scope.$broadcast('tilesLoaded');
}])
.controller('HomeController', ['$scope', function ($scope) {
	$scope.age = 0;

	var date1 = new Date("9/12/1986");
	var date2 = new Date();
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	
	$scope.age = Math.round(diffDays/365);
}]);
