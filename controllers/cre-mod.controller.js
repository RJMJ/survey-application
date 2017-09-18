(function(){
	'use strict';

	angular.module('surveyApp').controller('modifyCredentialsController',modifyCredentialsController);

	modifyCredentialsController.$inject = ['surveyDataService', 'survey','$location'];
	function modifyCredentialsController(surveyDataService,survey,$location){
		var modCtrl = this;
		modCtrl.survey = survey;
		console.log(modCtrl.survey);
		modCtrl.title = modCtrl.survey[0].surveyTitle;
		modCtrl.subtitle = modCtrl.survey[0].surveySubtitle;
		modCtrl.instructions = modCtrl.survey[0].instructions;

		modCtrl.update = function(){
			var data = {
				surveyTitle : modCtrl.title ,
				surveySubtitle : modCtrl.subtitle ,
				instructions : modCtrl.instructions
			};

			if(confirm("you are about to update this survey.")){
				modCtrl.putProposal(data);
			}
		};

		modCtrl.putProposal = function(data){
			surveyDataService.updateSurvey(modCtrl.survey[0].surveyId, data).then(function(response){
				console.log('survey updated successfully \n',response);
				$location.path('/singleSurvey/' + modCtrl.survey[0].surveyId);
			},function(error){
				alert("Error occured, check console.");
				console.log(error);
			});
		}
	}
})();