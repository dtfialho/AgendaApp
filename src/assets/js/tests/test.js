"use strict";

// Testes do MainController
describe('MainCtrl', function(){
	// Define as variaveis globais para o teste do MainCtrl
	var $rootScope, $scope, $controller, MainCtrl, contactService;

	// Carrega o módulo e injeta os métodos do angularJS
	beforeEach(module("AgendaApp"));
	beforeEach(inject(function(_$rootScope_, _$controller_, _contactService_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;
		contactService = _contactService_;

		MainCtrl = $controller('MainCtrl', {'$rootScope' : $rootScope, $scope : $scope, contactService: contactService});
	}));

	// Teste para verificar se o MainController foi declarado
	it("Você deve declarar o MainCtrl", function(){
		expect(MainCtrl).toBeDefined();
	});

	// Teste para verificar se os contatos estão sendo retornados no service
	it("getContacts deve retornar um array", inject(function($httpBackend){
		// Verifica se o service está definido
		expect(contactService).toBeDefined();
		// O array deve iniciar vazio
		expect($scope.contacts.length).toEqual(0);
		// Mock para o retorno do service
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
		// Chama o método e armazena o retorno
		contactService.getContatos().then(function(res){
			$scope.contacts = res;
		});
		// Limpa as requisições do mock
		$httpBackend.flush();
		// Testa se foi retornado
		expect($scope.contacts.length).toEqual(2);
		// Testa o primeiro item do retorno
		expect($scope.contacts[0]).toEqual({
				contact_id: 1,
				name: 'Diego Teixeira Fialho',
				email: 'diego.tfialho@gmail.com',
				phone: '(24) 2280-6445',
				cellphone: '(24) 98858-8704',
				cpf: '142.770.907-61',
				nascimento: '21/04/1990'
			});
	}));
});

// Testes do ContactController
describe('ContactCtrl', function(){
	// Define as variaveis globais para o teste do ContactCtrl
	var $rootScope, $scope, $controller, ContactCtrl, contactService;

	// Carrega o módulo e injeta os métodos do angularJS
	beforeEach(module("AgendaApp"));
	beforeEach(inject(function(_$rootScope_, _$controller_, _contactService_){
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;
		contactService = _contactService_;

		ContactCtrl = $controller('ContactCtrl', {'$rootScope' : $rootScope, $scope : $scope, contactService: contactService});
	}));

	// Verifica se o controller foi declarado
	it("Você deve declarar o ContactCtrl", function(){
		expect(ContactCtrl).toBeDefined();
	});

	// Verifica se contact foi iniciado com um objeto vazio
	it("O contato deve ser um objeto vazio ao iniciar o controller", function(){
		expect($scope.contact).toEqual({});
	});

	it("contactService deve estar definido", function(){
		expect(contactService).toBeDefined();
	});
});