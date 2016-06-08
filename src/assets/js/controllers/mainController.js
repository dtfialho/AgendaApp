"use strict";

app.controller('MainCtrl', ['$scope', 'contactService', function ($scope, contactService) {
	$scope.contacts = [];

	$scope.$on("$viewContentLoaded", function(){
		loadContatos();
	});

	function loadContatos() {
		contactService.getContatos(
			function(res){
				$scope.contacts = res;
			}
		);
	}
}]);