(function() {
    'use strict';

    angular
        .module('app')
        .directive('navbar', navbar);

    navbar.$inject = [

    ];

    function navbar(

    ) {

        var directive = {
            templateUrl: 'app/navbar/navbar.html',
            controller: "navbarController",
            controllerAs: "vm",
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    /* @ngInject */
    function ControllerController(authService) {

    }
})();


(function() {
    'use strict';

    angular
        .module('app')
        .controller('navbarController', navbarController);

    navbarController.$inject = [
        'authService',
    ];

    function navbarController(
        authService,
    ) {
        var vm = this;
        vm.auth = authService;

    }
})();