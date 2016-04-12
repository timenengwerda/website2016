//var app = angular.module('tengwerda');
app.controller('NavigationController', ['$scope', '$route', function ($scope, $route) {
	$scope.$route = $route;
	this.activeTab = 1;

	this.setActiveTab = function (tab) {
		this.activeTab = tab;
	};

	this.isActive = function (tab) {
		if ($route.current && $route.current.activeTab) {
			return $route.current.activeTab === tab;
		}
		
		return false;
	};
}]);




app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/contact', {
		templateUrl: 'partials/contact.html',
		controller: 'NavigationController',
		activeTab: 3
	}).
	when('/portfolio', {
		templateUrl: 'partials/portfolio.html',
		controller: 'NavigationController',
		activeTab: 2
	}).
	when('/curriculum-vitae', {
		templateUrl: 'partials/cv.html',
		controller: 'NavigationController',
		activeTab: 0
	}).
	otherwise({
		redirectTo: '/',
		controller: 'NavigationController',
		templateUrl: 'partials/home.html',
		activeTab: 1
	});
}]);