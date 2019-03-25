(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$http',
        'authService',
    ];

    function HomeController(
        $http,
        authService,
    ) {

        var vm = this;
        vm.auth = authService;

        vm.getMessage = function() {
            $http.get('http://localhost:8080/authorized')
                .then(
                    function(result) {
                        vm.message = result.data.message;
                    },
                    function(err) {
                        console.log("getMessage Error:", err);
                    }
                )
        }

    }
})();