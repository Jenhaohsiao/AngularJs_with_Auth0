(function() {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = [
        '$state',
        'angularAuth0',
        '$timeout',
    ];

    function authService(
        $state,
        angularAuth0,
        $timeout,
    ) {

        function login() {
            console.log("authService login")
            angularAuth0.authorize();
        }

        function logout() {
            console.log("authService logout")

        }

        function handleAuthentication() {
            angularAuth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    setSession(authResult)
                    console.log("authResult:", authResult);
                }
            })
        }

        function setSession(authResult) {

            var expiresAt = JSON.stringify(
                (authResult.expiresIn * 1000) + new Date().getTime()
            );

            localStorage.setItem('access_token:', authResult.accessToken);
            localStorage.setItem('id_token:', authResult.idToken);
            localStorage.setItem('expiresAt:', expiresAt);



        }



        return {
            login: login,
            logout: logout,
            handleAuthentication: handleAuthentication,

        }



    }
})();