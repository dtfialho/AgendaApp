"use strict";

app.directive('phoneMask', [function () {
	return {
		restrict: 'A',
		link: function (scope, el, att) {
			if(att.maskType == 'phone') {
				el.mask("(99) 9999-9999");
			} else if(att.maskType == 'cell') {
				el.mask("(99) 99999-9999");
			}
		}
	};
}]);