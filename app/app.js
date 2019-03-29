(function() {
    'use strict';
    angular.module('app', [
        'auth0.auth0',
        'ui.router',
        'angular-jwt',
        'angular-storage',
        'ngMaterial',

    ])

    .config(config);

    config.$inject = [
        '$provide',
        // 'authProvider',
        '$urlRouterProvider',
        '$stateProvider',
        '$httpProvider',
        '$locationProvider',
        'angularAuth0Provider',
        'jwtOptionsProvider',
    ]

    function config(
        $provide,
        // authProvider,
        $urlRouterProvider,
        $stateProvider,
        $httpProvider,
        $locationProvider,
        angularAuth0Provider,
        jwtOptionsProvider,
    ) {

        console.log("App loaded")

        $stateProvider
            .state("home", {
                url: "/",
                controller: "HomeController",
                templateUrl: 'app/home/home.html',
                controllerAs: "vm",
            })

        .state("profile", {
            url: "/profile",
            controller: "ProfileController",
            templateUrl: 'app/profile/profile.html',
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
            scope: 'openid profile',
            audience: 'https://angularjs-auth0/api'
        });

        jwtOptionsProvider.config({

            tokenGetter: function() {
                return localStorage.getItem('access_token')
            },
            whiteListedDomains: ['localhost'],

        })

        $httpProvider.interceptors.push('jwtInterceptor');

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