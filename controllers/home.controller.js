(function() {
	'use strict';

	angular.module('surveyApp').controller('homeController',homeController);

	homeController.$inject = ['surveyDataService'];
	function homeController(surveyDataService) {
		var homeCtrl = this;
	}
})();