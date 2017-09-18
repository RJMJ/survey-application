(function(){
	'use strict';

	angular.module('surveyApp').controller('singleSurveyEditController',singleSurveyEditController);

	singleSurveyEditController.$inject = ['surveyDataService', 'singleSurvey','$state'];
	function singleSurveyEditController(surveyDataService,singleSurvey,$state) {
		var edSCtrl = this;
		edSCtrl.singleSurvey = singleSurvey;
		console.log(edSCtrl.singleSurvey);
		edSCtrl.newQueDiaBox = false;
		edSCtrl.questionText = '';
		edSCtrl.showQuestionInput = [];
		edSCtrl.show = [];
		edSCtrl.option = [];
		edSCtrl.showHide = false;
		edSCtrl.statsResult = [];
		edSCtrl.surveyTaken = false;
		var result = [];

		edSCtrl.queDiaBox = function(){
			if(edSCtrl.newQueDiaBox === false){
				edSCtrl.newQueDiaBox = true;
			}else{
				edSCtrl.newQueDiaBox = false;
			}
		};

		edSCtrl.create = function() {
			var data = {questionText: edSCtrl.questionText};

			surveyDataService.postQuestion(edSCtrl.singleSurvey[0].surveyId, data).then(function(response){
				console.log('question successfully created\n',response);
				$state.reload();
			},function(error){
				alert("error occured, check console");
				console.log(error);
			});
		};

		edSCtrl.removeQuestionRequest = function(questionId) {
			surveyDataService.deleteQuestion(questionId).then(function(response){
				alert("Question Removed");
				console.log(response);
			},function(error){
				alert('Error occured, check console');
				console.log(error);
			});
		};

		edSCtrl.removeQuestion = function(questionId, id) {
			if(confirm("Do you really want to delete the question no." + (id) + "?")) {
				edSCtrl.removeQuestionRequest(questionId);
				$state.reload();
			}
		};

		edSCtrl.showQuestionForm = function(questionId,questionText,index) {
			edSCtrl.showQuestionInput[index] = true;
			//console.log(edSCtrl.showQuestionInput[index]);
		};

		edSCtrl.updateQuestion = function(questionId, question, id) {
			if(confirm("Do you really want to update Question ?")) {
				var data = {questionText: question};
				edSCtrl.updateQuestionRequest(questionId, data);
			}else{
				$state.reload();
			}
		};

		edSCtrl.updateQuestionRequest = function(questionId, data) {
			surveyDataService.editQuestion(questionId,data).then(function(response){
				console.log('question updation response', response);
				$state.reload();
			},function(error){
				alert("error occured in updating the question");
				console.log(error);
			});
		};

		edSCtrl.showForm = function(id) {
			edSCtrl.show[id] = true;
		};

		edSCtrl.createOption = function(questionId, id) {
			var data = {optionText: this.option[id]};
			surveyDataService.postOption(data, questionId).then(function(response){
				console.log('success response of option posted\n', response);
				$state.reload();
			},function(error){
				alert("some error occured");
				console.log(error);
			});
		};

		edSCtrl.removeOptions = function(questionId, id) {
			if(confirm("Do you really want to delete all options for the respective question no." + id)) {
				edSCtrl.removeOptionRequest(questionId, id);
				$state.reload();
			}
		};

		edSCtrl.removeOptionRequest = function(questionId, id) {
			surveyDataService.deleteOptions(questionId).then(function(response){
				console.log(response);
				edSCtrl.removeAnswers(questionId, id);
			}, function(error){
				alert('Error Occured, check console');
				console.log(error);
			});
		};

		edSCtrl.removeAnswers = function(questionId, id) {
			console.log(edSCtrl.singleSurvey[id-1].answers);
			if(confirm("Do you want to delete answers for question no." + id + "\nYou might want to look at stats before proceeding.")){
				edSCtrl.removeAnswersRequest(questionId);
				edSCtrl.singleSurvey[id-1].answers.splice(0);
				edSCtrl.calculateStats();
				$state.reload();
			}
		};

		edSCtrl.removeAnswersRequest = function(questionId) {
			surveyDataService.deleteAnswers(questionId).then(function(response){
				alert('answer deleted');
				console.log(response);
			}, function(error){
				alert('error occured, check console');
				console.log(error);
			});
		};

		edSCtrl.calculateStats = function() {
			edSCtrl.statsResult = [];
			//edSCtrl.singleSurvey.splice(0,1, );
			//console.log(edSCtrl.singleSurvey);
			for(var i=1 ; i < edSCtrl.singleSurvey.length ; i++) {
				var skipped = 0 ;
				for(var j=1 ; j <= edSCtrl.singleSurvey[i].questionOptions.length ; j++) {
					var count = 0;
					//console.log(edSCtrl.singleSurvey[i].questionOptions);
					for(var k in edSCtrl.singleSurvey[i].answers) {
						if(edSCtrl.singleSurvey[i].answers[k] == j) {
							count++ ;
						}else{
							if(j == 1 && edSCtrl.singleSurvey[i].answers[k] == 0) {
								skipped ++;
							}
						}
					}
					result.push(count);
				}
				result.unshift(skipped);
				edSCtrl.statsResult.push(result);//console.log(edSCtrl.statsResult);
				result = [];
			}
		};

		var countForShowHideStats = 0;

		edSCtrl.showHideStats = function() {
			edSCtrl.calculateStats();
			countForShowHideStats ++;
			if(countForShowHideStats % 2 == 0) {
				edSCtrl.showHide = false;
			}else{
				edSCtrl.showHide = true;
			}
			edSCtrl.isSurveyTaken();
		};

		edSCtrl.isSurveyTaken = function() {
			var test;
			edSCtrl.statsResult.forEach(function(element){
				element.forEach(function(ele){
					if(ele != 0) {
						test = 1;
					}
				});
			});
			if(test == 1) {
				edSCtrl.surveyTaken = true;
			}else{
				edSCtrl.surveyTaken = false;
			};
		};
	}
})();