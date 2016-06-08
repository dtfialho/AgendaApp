"use strict";

app.controller('ContactCtrl', ['$scope', '$routeParams', 'contactService', '$location', function ($scope, $routeParams, contactService, $location) {
	$scope.contact = {};
	$scope.newData = {};

	$scope.$on("$viewContentLoaded", function(){
		if($routeParams.id) {
			getContato();
		}
	});

	function getContato() {
		contactService.getContato(
			$routeParams.id,
			function(res){
				if(!res) {
					$location.path("/");
				}
				$scope.contact = res;
			}
		);
	}

	$scope.saveContact = function(newData) {
		console.log(newData);
	};
}]);