"use strict";

describe('MainCtrl',function(){
	var $rootScope, $scope, $controller, MainCtrl;

	beforeEach(module("AgendaApp"));
	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		MainCtrl = $controller('MainCtrl', {'$rootScope' : $rootScope, $scope : $scope});
	}));

	it("Você deve declarar o MainCtrl", function(){
		expect(MainCtrl).toBeDefined();
	});
});