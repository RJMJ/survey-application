(function(){
	'use strict';

	angular.module('surveyApp').controller('allSurveyController',allSurveyController);

	allSurveyController.$inject = ['surveyDataService','allSurvey'];
	function allSurveyController(surveyDataService, allSurvey){
		var allSurCtrl = this;
		allSurCtrl.allSurvey = allSurvey;
		console.log(allSurCtrl.allSurvey);
		
	}
})();