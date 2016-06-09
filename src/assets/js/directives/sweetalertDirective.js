"use strict";

app.directive('sweetAlert', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		scope: {
			action: '&alertAction'
		},
		link: function (scope, el, attr) {
			var title;
			var message;

			title = (attr.alertTitle) ? attr.alertTitle : "Oops...";
			message = (attr.alertMessage) ? attr.alertMessage : "Something went wrong!";

			switch (attr.alertType) {
			case "confirm":
				el.bind("click", function(){
					swal({
						title: title,
						text: message,
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						cancelButtonText: "Cancelar",
						confirmButtonText: "Sim",
						closeOnConfirm: true
					}, function(){
						scope.action();
					}
					);
				});
				break;

			default:
				el.bind("click", function(){
					swal(title, message, "error");
				});
			}
		}
	};
}]);