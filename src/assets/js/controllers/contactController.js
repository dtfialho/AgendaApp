"use strict";

app.controller('ContactCtrl', ['$scope', '$routeParams', 'contactService', '$location', '$filter', function ($scope, $routeParams, contactService, $location, $filter) {
	$scope.contact = {};
	$scope.newData = {};
	$scope.required = "required";

	$scope.$on("$viewContentLoaded", function(){
		if($routeParams.id) {
			$scope.required = false;
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
				$scope.newData = $scope.contact = res;
				$scope.newData.nascimento = $filter('date')($scope.newData.nascimento, 'dd/MM/yyyy');
			}
		);
	}

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