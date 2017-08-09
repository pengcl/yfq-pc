"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/yfq/:pageType/abs', { //app首页
                templateUrl: 'pages/aboutUs/index.html',
                controller: "aboutUsController"
            }
        );
}]).controller('aboutUsController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.$root.pageType = $routeParams.pageType;
    $scope.$root.params = window.location.search;
}]);