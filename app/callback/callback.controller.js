(function() {
    'use strict';

    angular
        .module('app')
        .controller('CallbackController', CallbackController);

    CallbackController.$inject = [];

    function CallbackController() {

        console.log("CallbackController");

    }
})();