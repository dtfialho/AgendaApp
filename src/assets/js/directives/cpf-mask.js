"use strict";

app.directive('cpfMask', [function () {
	return {
		restrict: 'A',
		link: function (scope, el) {
			$(el).mask("999.999.999-99");
		}
	};
}]);