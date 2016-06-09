"use strict";

app.controller('MainCtrl', ['$scope', 'contactService', '$window', function ($scope, contactService, $window) {
	$scope.contacts = [];

	$scope.$on("$viewContentLoaded", function(){
		loadContatos();
	});

	$scope.deletarContato = function(id) {
		contactService.deletarContato(
			id,
			function(res){
				$window.location.reload();
			}
		);
	};

	function loadContatos() {
		contactService.getContatos(
			function(res){
				$scope.contacts = res;
			}
		);
	}
}]);