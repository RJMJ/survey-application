(function(){
	'use strict';

	angular.module('data').service('surveyDataService',surveyDataService);

	surveyDataService.$inject = ['$q', '$http', 'ApiBasePath'];

	function surveyDataService($q, $http, ApiBasePath){
		var service = this;
		service.combinedSinSur = [];

		service.getAllSurvey = function(){
			return $http({
				method: 'GET',
				url: ApiBasePath
			}).then(function(response){
				return response.data.data;
			},function(error){
				console.log('Something went wrong in all survey recieving call');
			});
		};

		service.getSingleSurvey = function(surveyId){
			var deffered = $q.defer();
			var firstJson = $http({ method: 'GET', url: ApiBasePath + surveyId });
			var secondJson = $http({ method: 'GET',url: ApiBasePath + surveyId + '/questions/all'});
			$q.all([firstJson,secondJson]).then(function(response){
				var firstJsonData = [];
				var secondJsonData = [];
				firstJsonData = response[0].data.data;
				//console.log(firstJsonData);
				secondJsonData = response[1].data.data;
				//console.log(secondJsonData);
				secondJsonData.splice(0,0,firstJsonData);
				service.combinedSinSur = secondJsonData.slice();
				//console.log(service.combinedSinSur);
				//console.log(secondJsonData);
				//return service.combinedSinSur;
				deffered.resolve(service.combinedSinSur);
			},function(error){
				console.log('Something went wrong with single survey GET');
				deffered.reject(error);
			});
			return deffered.promise;
		};

		service.postAnswer = function(questionId, answer){
			return $http({
				method: 'POST',
				url: ApiBasePath + 'questions/' + questionId + "/answer/create",
				data: answer
			});
		};

		service.postSurvey = function(data) {
			return $http({
				method: 'POST',
				url: ApiBasePath + '/create',
				data: data
			});
		};

		service.deleteSurvey = function(surveyId) {
			return $http({
				method: 'POST',
				url: ApiBasePath + surveyId + '/delete'
			});	
		};

		service.updateSurvey = function(surveyId,data) {
			return $http({
				method: 'PUT',
				url: ApiBasePath + surveyId + '/edit',
				data: data
			});
		};

		service.postQuestion = function(surveyId,data) {
			return $http({
				method: 'POST',
				url: ApiBasePath + surveyId + '/question/create',
				data: data
			});
		};

		service.deleteQuestion = function(questionId) {
			return $http({
				method: 'POST',
				url: ApiBasePath + 'questions/' + questionId + '/delete'
			});
		};

		service.editQuestion = function(questionId, data) {
			return $http({
				method: 'PUT',
				url: ApiBasePath + 'questions/' + questionId + '/edit',
				data: data		
			});
		};

		service.postOption = function(data, questionId) {
			return $http({
				method: 'POST',
				url: ApiBasePath + 'questions/' + questionId + '/options/create',
				data: data
			});
		};

		service.deleteOptions = function(questionId) {
			return $http({
				method: 'POST',
				url: ApiBasePath + 'questions/' + questionId + '/options/delete'
			});
		};

		service.deleteAnswers = function(questionId) {
			return $http({
				method: 'POST',
				url: ApiBasePath + 'questions/' + questionId + '/answers/delete'
			});
		};
	}
})();