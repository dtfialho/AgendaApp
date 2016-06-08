"use strict";

/**
* AgendaApp Module
*
* Description
*/
var app = angular.module('AgendaApp', ['ngRoute']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	}).
	when('/edit/:id', {
		templateUrl: 'views/contact.html',
		controller: 'ContactCtrl'
	}).
	otherwise({ redirectTo: '/' });
}]);