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
				phone: '(22) 2222-2222',
				cellphone: '(99) 99999-9999',
				cpf: '123.456.789-12',
				nascimento: '21/04/1990'
			},
			{
				contact_id: 2,
				name: 'Diego T. Fialho',
				email: 'diego.tfialho@gmail.com',
				phone: '(24) 2222-2222',
				cellphone: '(24) 99999-9999',
				cpf: '123.456.789-12',
				nascimento: '21/04/1990'
			}
		]);
		// Chama o método e armazena o retorno
		$scope.getContatos();
		// Limpa as requisições do mock
		$httpBackend.flush();
		// Testa se foi retornado
		expect($scope.contacts.length).toEqual(2);
		// Testa o primeiro item do retorno
		expect($scope.contacts[0]).toEqual({
				contact_id: 1,
				name: 'Diego Teixeira Fialho',
				email: 'diego.tfialho@gmail.com',
				phone: '(22) 2222-2222',
				cellphone: '(99) 99999-9999',
				cpf: '123.456.789-12',
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

	// Verifica se o service esta definido
	it("contactService deve estar definido", function(){
		expect(contactService).toBeDefined();
	});

	// Teste para verificar o o funcionamento da função getContato
	it("Testando se a função getContato está funcionando corretamente", inject(function($location, $route, $httpBackend){
		// Inicialmente não tem nenhuma rota setada
		expect($route.current).toBeUndefined();
		// Seta a rota para /edit/1
		$location.path('/edit/1');
		// Método para simular o load do template
		$httpBackend.whenGET("views/contact.html").respond(200);
		// Carrega o escopo com a view e os dados do escopo
		$rootScope.$digest();

		// Verifica o template e o controller atual
		expect($route.current.templateUrl).toBe('views/contact.html');
		expect($route.current.controller).toBe('ContactCtrl');

		// Limpa as requisições do mock
		$httpBackend.flush();

		// Seta o mock para retornar os dados
		$httpBackend.whenGET("http://localhost:8000/contact/1").respond({
			contact_id: 1,
			name: 'Diego Teixeira Fialho',
			email: 'diego.tfialho@gmail.com',
			phone: '(22) 2222-2222',
			cellphone: '(99) 99999-9999',
			cpf: '123.456.789-12',
			nascimento: '21/04/1990'
		});
		// Chama o método getContato e limpa as requisições
		$scope.getContato();
		$httpBackend.flush();

		// Verifica se os dados foram retornados corretamente
		expect($scope.contact).toEqual({
			contact_id: 1,
			name: 'Diego Teixeira Fialho',
			email: 'diego.tfialho@gmail.com',
			phone: '(22) 2222-2222',
			cellphone: '(99) 99999-9999',
			cpf: '123.456.789-12',
			nascimento: '21/04/1990'
		});

		// Inicialmente não tem nenhuma rota setada
		$location.path('/edit/2');
		$httpBackend.whenGET("views/main.html").respond(200);
		$rootScope.$digest();

		// Seta o mock para retornar os dados (dessa vez retornará um erro)
		$httpBackend.whenGET("http://localhost:8000/contact/2").respond(403, {'error':'invalid id'});
		$scope.getContato();
		$httpBackend.flush();

		// Verifica o template e o controller atual
		expect($route.current.templateUrl).toBe('views/main.html');
		expect($route.current.controller).toBe('MainCtrl');
	}));
});

describe("Teste das diretivas", function(){
	beforeEach(module("AgendaApp"));
	
	it("Verifica a diretiva cpfMask", inject(function($compile, $rootScope){
		// Inicia as variáveis globais
		var element, scope;
		scope = $rootScope.$new();
		// Cria o elemento e compila
		element = angular.element('<div><input type="text" value="" ng-model="newData.cpf" cpf-mask /></div>');
		$compile(element)(scope);
		// Insere o valor no input e dispara o evento blur para aplicar a máscara
		element.find("input").val("99999999999").triggerHandler("blur");
		scope.$digest();
		scope.$apply();
		// Testa se o retorno foi o certo
		expect(element.find("input").val()).toEqual("999.999.999-99");
	}));

	it("Verifica a diretiva dateMask", inject(function($compile, $rootScope){
		// Inicia as variáveis globais
		var element, scope;
		scope = $rootScope.$new();
		// Cria o elemento e compila
		element = angular.element('<div><input type="text" value="" ng-model="newData.nascimento" date-mask /></div>');
		$compile(element)(scope);
		// Insere o valor no input e dispara o evento blur para aplicar a máscara
		element.find("input").val("21041990").triggerHandler("blur");
		scope.$digest();
		scope.$apply();
		// Testa se o retorno foi o certo
		expect(element.find("input").val()).toEqual("21/04/1990");

		// Passa um valor não aceito para verificar se vai retornar algo
		element.find("input").val("99999999").triggerHandler("blur");
		scope.$digest();
		scope.$apply();
		expect(element.find("input").val()).toEqual("");
	}));

	it("Verifica a diretiva phoneMask", inject(function($compile, $rootScope){
		// Inicia as variáveis globais
		var element, scope;
		scope = $rootScope.$new();
		// Cria o elemento e compila
		element = angular.element('<div><input type="text" value="" ng-model="newData.phone" phone-mask /></div>');
		$compile(element)(scope);
		// Insere o valor no input e dispara o evento blur para aplicar a máscara
		element.find("input").val("9999999999").triggerHandler("blur");
		scope.$digest();
		scope.$apply();
		expect(element.find("input").val()).toEqual("(99) 9999-9999");

		// Cria o elemento passando o tipo da máscara e compila
		element = angular.element('<div><input type="text" value="" ng-model="newData.phone" phone-mask mask-type="phone" /></div>');
		$compile(element)(scope);
		// Insere o valor no input e dispara o evento blur para aplicar a máscara
		element.find("input").val("9999999999").triggerHandler("blur");
		scope.$digest();
		scope.$apply();
		expect(element.find("input").val()).toEqual("(99) 9999-9999");

		// Cria o elemento passando o tipo da máscara como celular e compila
		element = angular.element('<div><input type="text" value="" ng-model="newData.cellphone" phone-mask mask-type="cell" /></div>');
		$compile(element)(scope);
		// Insere o valor no input e dispara o evento focus para aplicar a máscara
		element.find("input").val("9999999999").triggerHandler("blur");
		element.find("input").triggerHandler("focusout");
		scope.$digest();
		scope.$apply();
		expect(element.find("input").val()).toEqual("(99) 9999-9999");

		// Passa um número com 11 dígitos
		element.find("input").triggerHandler("focus");
		element.find("input").val("99999999999").triggerHandler("blur");
		element.find("input").triggerHandler("focusout");
		scope.$digest();
		scope.$apply();
		expect(element.find("input").val()).toEqual("(99) 99999-9999");

		// Passa um número com menos de 10 dígitos e testa
		element.find("input").triggerHandler("focus");
		element.find("input").val("99999999").triggerHandler("blur");
		element.find("input").triggerHandler("focusout");
		scope.$digest();
		scope.$apply();
		expect(element.find("input").val()).toEqual("");
	}));

	it("Verifica se a diretiva do contactModal está funcionando", inject(function($compile, $rootScope, $controller, $httpBackend){
		var element, scope, MainCtrl;
		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {$rootScope: $rootScope, $scope: scope});

		console.log(scope);
	}));
});