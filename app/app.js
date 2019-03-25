(function() {
    'use strict';
    angular.module('app', [
        'auth0.auth0',
        'ui.router',
    ])

    .config(config);

    config.$inject = [
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'angularAuth0Provider'
    ]

    function config(
        $stateProvider,
        $locationProvider,
        $urlRouterProvider,
        angularAuth0Provider
    ) {

        console.log("App loaded")

        $stateProvider
            .state("home", {
                url: "/",
                controller: "HomeController",
                templateUrl: 'app/home/home.html',
                controllerAs: "vm",
            })

        .state("callback", {
            url: "/callback",
            controller: "CallbackController",
            templateUrl: 'app/callback/callback.html',
            controllerAs: "vm",
        })


        angularAuth0Provider.init({
            clientID: 'W89785j7YPJJ8MO6HTvyIzxE5szdqIft',
            domain: 'jenhao.auth0.com',
            responseType: 'token id_token',
            redirectUri: 'http://localhost:3000/callback',
            scope: 'openid'
        });

        $urlRouterProvider.otherwise('/');


        // Remove the # from URL
        $locationProvider.hashPrefix('');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Remove the # from URL-end
    }



})();