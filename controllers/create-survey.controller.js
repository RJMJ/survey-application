(function(){
	'use strict';

	angular.module('surveyApp').controller('createController',createController);

	createController.$inject = ['surveyDataService','$location', '$rootScope'];

	function createController(surveyDataService, $location, $rootScope){
		var creCtrl = this;
		creCtrl.title = '';
		creCtrl.subtitle = '';
		creCtrl.instructions = '';

		creCtrl.createSurvey = function(){
			var data = {
				surveyTitle : creCtrl.title,
				surveySubtitle : creCtrl.subtitle,
				instructions : creCtrl.instructions
			};

			surveyDataService.postSurvey(data).then(function(response){
				console.log("survey is created successfully");
				console.log(response);
				$location.path('/loginPage');
			},function(error){
				alert('Error occured! Please check console.');
				console.log(error);
			});
		};console.log($rootScope.loggedIn);

		creCtrl.goBack = function(){
			if( main.title || main.subtitle || main.instructions){
				if(confirm("Do you want to continue? Data will not be saved!")){
					$location.path('/');
				}
			}
			else {
				$location.path('/');
			}
		
		}
	}
})();