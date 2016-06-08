"use strict";

app.directive('contactModal', [function () {
	return {
		restrict: 'E',
		templateUrl: 'views/contactDetails.html',
		replace: true,
		scope: {
			contact: "="
		}
	};
}]);