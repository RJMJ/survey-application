(function(){
	'use strict';

	angular.module('surveyApp').config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

	function RoutesConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.template.html',
				controller: 'homeController as homeCtrl'
			})
			.state('viewAllSurvey', {
				url: '/allSurveyView',
				templateUrl: 'templates/all-survey-view.html',
				controller: 'allSurveyController as allSurCtrl',
				resolve: {
					allSurvey: ['surveyDataService', function(surveyDataService){
						return surveyDataService.getAllSurvey();
					}]
				}
			})
			.state('singleSurvey', {
				url: '/singleSurvey/{surveyId}',
				templateUrl: 'templates/single-survey-view.html',
				controller: 'singleSurveyController as sinSurCtrl',
				params: {
					surveyId: null
				},
				resolve: {
					singleSurvey: ['$stateParams','surveyDataService',function($stateParams,surveyDataService){
						return surveyDataService.getSingleSurvey($stateParams.surveyId);
					}]
				}
			})
			.state('loginPage', {
				url: '/loginPage',
				templateUrl: 'templates/login-page.html',
				controller: 'loginController as logCtrl'
			})
			.state('create', {
				url: '/create',
				templateUrl: 'templates/create-page.html',
				controller: 'createController as creCtrl'
			})
			.state('edit', {
				url: '/editSurveys',
				templateUrl: 'templates/survey-edit-view.html',
				controller: 'editController as editCtrl',
				resolve: {
					allSurvey: ['surveyDataService', function(surveyDataService){
						return surveyDataService.getAllSurvey();
					}]
				}
			})
			.state('modify', {
				url: '/modify/{surveyId}',
				templateUrl: 'templates/survey-modify.html',
				controller: 'modifyCredentialsController as modCtrl',
				params: {
					surveyId: null
				},
				resolve: {
					survey: ['$stateParams','surveyDataService', function($stateParams,surveyDataService){
						return surveyDataService.getSingleSurvey($stateParams.surveyId);
					}]
				}
			})
			.state('edSinSur', {
				url: '/edSinSur/{{surveyId}}',
				templateUrl: 'templates/single-survey-edit.html',
				controller: 'singleSurveyEditController as edSCtrl',
				params: {
					surveyId: null
				},
				resolve: {
					singleSurvey: ['$stateParams','surveyDataService',function($stateParams,surveyDataService){
						return surveyDataService.getSingleSurvey($stateParams.surveyId);
					}]
				}
			});
			// .state('createQuestion', {
			// 	url: '/newQuestion/{{surveyId}}',
			// 	templateUrl: 'templates/new-que.html',
			// 	controller: 'newQController as QCtrl',
			// 	params: {
			// 		surveyId: null
			// 	}
			// });
	}
})();