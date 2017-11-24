"use strict";

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // 设定路由
    $routeProvider
        .when('/form/resume', { //app首页
            templateUrl: function ($routeParams) {
                return "pages/form/form.html";
            },
            controller: "resumeController"
        });
}]).controller('resumeController', ['$scope', function ($scope) {


}]);
