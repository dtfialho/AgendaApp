"use strict";

describe('MainCtrl', function(){
	var $rootScope, $scope, $controller, MainCtrl, contactService;

	beforeEach(module("AgendaApp"));
	beforeEach(inject(function(_$rootScope_, _$controller_, _contactService_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;
		contactService = _contactService_;

		MainCtrl = $controller('MainCtrl', {'$rootScope' : $rootScope, $scope : $scope});
	}));

	it("Você deve declarar o MainCtrl", function(){
		expect(MainCtrl).toBeDefined();
	});

	it("Contacts deve iniciar com um array vazio", function(){
		expect($scope.contacts).toEqual(jasmine.any(Array));
	});

	it("getContacts deve retornar um array", inject(function($httpBackend){
		expect(contactService).toBeDefined();
		expect($scope.contacts.length).toEqual(0);
		$httpBackend.whenGET('http://localhost:8000/contacts/').respond([
			{
				contact_id: 1,
				name: 'Diego Teixeira Fialho',
				email: 'diego.tfialho@gmail.com',
				phone: '(24) 2280-6445',
				cellphone: '(24) 98858-8704',
				cpf: '142.770.907-61',
				nascimento: '21/04/1990'
			},
			{
				contact_id: 2,
				name: 'Diego T. Fialho',
				email: 'diego.tfialho@gmail.com',
				phone: '(24) 2222-2222',
				cellphone: '(24) 99999-9999',
				cpf: '142.770.907-61',
				nascimento: '21/04/1990'
			}
		]);
		contactService.getContatos().then(function(res){
			$scope.contacts = res;
		});
		$httpBackend.flush();
		expect($scope.contacts.length).toEqual(2);
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