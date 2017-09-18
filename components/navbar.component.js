(function() {
    'use strict';

    angular.module('surveyApp')
        .component('navigation', {
           templateUrl: 'templates/navbar.component.html',
            bindings: {
                navigation: '<'
            }
        });
})();
