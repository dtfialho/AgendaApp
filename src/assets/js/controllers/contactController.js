"use strict";

app.controller('ContactCtrl', ['$scope', '$routeParams', 'contactService', '$location', '$filter', function ($scope, $routeParams, contactService, $location, $filter) {
	$scope.contact = {};
	$scope.newData = {};
	$scope.required = "required";

	$scope.$on("$viewContentLoaded", function(){
		if($routeParams.id) {
			$scope.required = false;
			$scope.getContato();
		}
	});

	$scope.getContato = function() {
		contactService.getContato($routeParams.id).then(function(res){
			$scope.newData = $scope.contact = res;
		}, function(err) {
			$location.path("/");
		});
	};

	$scope.saveContact = function(newData) {
		contactService.salvarContato(
			newData,
			function(res){
				if(res == 'OK') {
					$location.path("/");
				}
			}
		);
	};
}]);