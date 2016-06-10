"use strict";

describe('MainCtrl', function(){
	var $rootScope, $scope, $controller, MainCtrl, contactMock;

	beforeEach(module("AgendaApp"));
	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;

		contactMock = {
			getContatos: function(){
				return ['lorem'];
			},
			getContato: function(){
				return {
					contact_id: 1,
					name: 'Diego Teixeira Fialho',
					email: 'diego.tfialho@gmail.com',
					phone: '(24) 2280-6445',
					cellphone: '(24) 98858-8704',
					cpf: '142.770.907-61',
					nascimento: '21/04/1990'
				};
			}
		};

		MainCtrl = $controller('MainCtrl', {'$rootScope' : $rootScope, $scope : $scope});
	}));

	it("Você deve declarar o MainCtrl", function(){
		expect(MainCtrl).toBeDefined();
	});

	it("Contacts deve iniciar com um array vazio", function(){
		expect($scope.contacts).toEqual(jasmine.any(Array));
	});

	it("contactService deve estar definido", inject(function(contactService){
		expect(contactService).toBeDefined();
	}));

	it("getContacts deve retornar um array", inject(function($controller){
		var scope = {};
		var ctrl = $controller('MainCtrl', {$scope: scope});
		scope.loadContatos();
		expect(scope.contacts.length).toEqual(0);
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