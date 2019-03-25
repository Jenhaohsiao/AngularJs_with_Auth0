(function() {
    'use strict';

    angular.module('app')
        .run(run);

    run.$inject = ['authService']

    function run(authService) {

        console.log("Run")
        authService.handleAuthentication();

    }
})();