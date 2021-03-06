(function() {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = [
        '$state',
        'angularAuth0',
        '$timeout',
        '$window',

    ];

    function authService(
        $state,
        angularAuth0,
        $timeout,
        $window,

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
            localStorage.removeItem('profile');


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

            function parseJwt(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            }

            var _id_token = parseJwt(authResult.idToken);
            var _accessToken = parseJwt(authResult.accessToken);

            console.log("id_token:", _id_token)
            console.log("_accessToken:", _accessToken)

            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('profile', JSON.stringify(profile));



        }

        function isAuthenticated() {

            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));

            var result = (new Date().getTime() < expiresAt)

            // console.log("isAuthenticated:", result);f

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