"use strict";

app.directive('dateMask', [function () {
	return {
		restrict: 'A',
		link: function (scope, el) {
			$.mask.definitions['1'] = "[0-1]{1}";
			$.mask.definitions['3'] = "[0-3]{1}";
			el.mask("39/19/9999");
		}
	};
}]);