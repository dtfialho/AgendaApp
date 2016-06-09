"use strict";

app.factory('contactService', ['$http', function ($http) {
	return {
		getContatos: function(res, err) {
			$http.get("http://localhost:8000/contacts/")
			.success(res)
			.error(
				function(e) {
					if(err) {
						err(e);
					}
				}
			);
		},
		getContato: function(id, res, err) {
			$http.get("http://localhost:8000/contact/"+id)
			.success(res)
			.error(
				function(e) {
					if(err) {
						err(e);
					}
				}
			);
		},
		salvarContato: function(data, res, err) {
			var url = 'http://localhost:8000/';
			if(data.contact_id) {
				url += 'edit';
			} else {
				url += 'add';
			}
			$http.post(
				url,
				{contact: data}
			)
			.success(res)
			.error(
				function(e) {
					if(err) {
						err(e);
					}
				}
			);
		}
	};
}]);