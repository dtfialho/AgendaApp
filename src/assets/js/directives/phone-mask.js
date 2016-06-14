"use strict";

app.directive('phoneMask', [function () {
	return {
		restrict: 'A',
		link: function (scope, el, att) {
			if(att.maskType == 'phone' || !att.maskType) {
				el.mask("(99) 9999-9999");
			} else if(att.maskType == 'cell') {
				el.mask("(99) 99999-999?9");
				el.on('focus',function(){
					el.unmask();
					el.mask("(99) 99999-999?9");
				}).on('focusout',function(){
					var phone = el.val().replace(/\D/g, '');

					if(phone.length > 10){
						el.mask("(99) 99999-9999");
					} else if(phone.length == 10){
						el.mask("(99) 9999-9999");
					}
				});
			}
		}
	};
}]);