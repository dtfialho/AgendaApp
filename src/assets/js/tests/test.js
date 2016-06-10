"use strict";

describe('MainCtrl', function(){
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

	it("contactService deve estar definido", inject(function(contactService){
		expect(contactService).toBeDefined();
	}));
});

describe('ContactCtrl', function(){
	var $rootScope, $scope, $controller, ContactCtrl;

	beforeEach(module("AgendaApp"));
	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		ContactCtrl = $controller('ContactCtrl', {'$rootScope' : $rootScope, $scope : $scope});
	}));

	it("Você deve declarar o ContactCtrl", function(){
		expect(ContactCtrl).toBeDefined();
	});

	it("O contato deve ser um objeto vazio ao iniciar o controller", function(){
		expect($scope.contact).toEqual({});
	});

	it("contactService deve estar definido", inject(function(contactService){
		expect(contactService).toBeDefined();
	}));
});