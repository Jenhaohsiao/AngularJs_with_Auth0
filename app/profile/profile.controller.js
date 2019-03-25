(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [];

    function ProfileController() {

        console.log("ProfileController")

        var vm = this;

        vm.profile = JSON.parse(localStorage.getItem('profile'))

    }
})();