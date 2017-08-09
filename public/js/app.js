'use strict';

/* App Module */
var app = angular.module('app', ['ngRoute', 'appServices', 'appTemplates', 'ngAnimate', 'ngCookies', 'appFilters']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/phone/A/index'
        });
        $locationProvider.html5Mode(true);
    }]).config(['$sceProvider', function ($sceProvider) {
    //For sport ie7
    $sceProvider.enabled(false);
}]).controller('appController', ['$scope', '$location', function ($scope, $location) {
}]);