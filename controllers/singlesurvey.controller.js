(function(){
	'use strict';

	angular.module('surveyApp').controller('singleSurveyController', singleSurveyController);
	
	singleSurveyController.$inject = ['surveyDataService','singleSurvey'];
	function singleSurveyController(surveyDataService, singleSurvey){
		var sinSurCtrl = this;
		var data;
		sinSurCtrl.answer = null;
		sinSurCtrl.questionId = null;
		sinSurCtrl.singleSurvey = singleSurvey;
		//console.log(singleSurvey);
		console.log(sinSurCtrl.singleSurvey);

		sinSurCtrl.onOptionButtonClicked = function(question, index) {
			sinSurCtrl.questionId = question.questionId; 
  			sinSurCtrl.answer=index; 
  			sinSurCtrl.createAnswer();
  			question.disabled = true; 
		}
		
		sinSurCtrl.createAnswer = function(){
			data = {selectedOptionNumber: sinSurCtrl.answer}
			surveyDataService.postAnswer(sinSurCtrl.questionId, data).then(function(response){
				console.log('Response-answer of createAnswer\n', sinSurCtrl.answer);
				console.log('Response-questionId of createAnswer\n', sinSurCtrl.questionId);
				console.log(response);
			},function(error){
				alert("Error occured! Check console.");
				console.log(error);
			});
		};
	}
})();