"use strict";

app.directive('dateMask', [function () {
	return {
		restrict: 'A',
		link: function (scope, el) {
			el.mask("99/99/9999");
		}
	};
}]);