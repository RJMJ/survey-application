(function () {
	'use strict';

	angular.module('surveyApp').controller('loginController',loginController);

	loginController.$inject = ['$rootScope'];
	function loginController($rootScope) {
		var logCtrl = this;console.log('controller is executed');
		logCtrl.userName = '';
		logCtrl.password = '';
		var userData = [{userName: 'humDo',password: 'humareDo'},{userName: 'melowScreen',password: 'rangerTed'},
						{userName: 'lalDupatta',password: 'uddGaya'},{userName: 'AwesomeUno',password: 'liabilityAwe'},
						{userName: 'crackDown',password: 'surreal'},{userName: 'samar123',password: 'samar'}];

		logCtrl.logIn = function() {
			userData.forEach(function(element){
				if( element.userName == logCtrl.userName && element.password == logCtrl.password ){
					$rootScope.loggedIn = true ;
				}
			});

			if(!$rootScope.loggedIn) {
				alert("Incorrect UserName or Password\n Please Try Again\n");
			}
		};console.log('controller is executed');
	}
})();