"use strict";

app.controller('MainCtrl', ['$scope', 'contactService', '$window', function ($scope, contactService, $window) {
	$scope.contacts = [];

	$scope.getContatos = function() {
		contactService.getContatos().then(function(res){
			$scope.contacts = res;
		});
	};

	$scope.deletarContato = function(id) {
		contactService.deletarContato(
			id,
			function(res){
				$window.location.reload();
			}
		);
	};

	$scope.getContatos();
}]);