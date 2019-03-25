(function() {
    'use strict';

    angular
        .module('app')
        .directive('navbar', navbar);

    navbar.$inject = [];

    function navbar() {

        var directive = {
            templateUrl: 'app/navbar/navbar.html',
            controller: "navbarController",
            controllerAs: "vm",
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    /* @ngInject */
    function ControllerController() {

    }
})();


(function() {
    'use strict';

    angular
        .module('app')
        .controller('navbarController', navbarController);

    navbarController.$inject = [];

    function navbarController() {

    }
})();