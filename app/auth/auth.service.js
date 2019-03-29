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
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');


        }

        function handleAuthentication() {
            angularAuth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    setSession(authResult)
                    console.log("authResult:", authResult);
                    $timeout(function() {
                        $state.go('home');
                    })
                }
            })
        }

        function setSession(authResult) {

            var expiresAt = JSON.stringify(
                (authResult.expiresIn * 1000) + new Date().getTime()
            );

            var profile = {
                name: authResult.idTokenPayload.name,
                nickname: authResult.idTokenPayload.nickname,
                picture: authResult.idTokenPayload.picture,
            }

            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('profile', JSON.stringify(profile));

        }

        function isAuthenticated() {

            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));

            var result = (new Date().getTime() < expiresAt)

            console.log("isAuthenticated:", result);

            return result;

        }



        return {
            login: login,
            logout: logout,
            handleAuthentication: handleAuthentication,
            isAuthenticated: isAuthenticated,

        }



    }
})();