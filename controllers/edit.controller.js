(function(){
	'use strict';

	angular.module('surveyApp').controller('editController',editController);

	editController.$inject = ['surveyDataService','$rootScope','allSurvey'];
	function editController(surveyDataService, $rootScope, allSurvey) {
		var editCtrl = this;
		editCtrl.allSurvey = allSurvey;
		console.log(editCtrl.allSurvey);

		editCtrl.deleteProposal = function(surveyId) {
			surveyDataService.deleteSurvey(surveyId).then(function(response){
				console.log('Survey successfully deleted and the response is\n',response);
			},function(error){
				alert("Error occured. Check console.");
				console.log(error);
			});
		};

		editCtrl.delete = function(surveyId, index){
			var agree = confirm("Survey once deleted will be gone forever, are you sure, can we delete ?");
			if(agree){
				editCtrl.deleteProposal(surveyId);
				editCtrl.allSurvey.splice(index, 1);
			}
		};
	}
})();