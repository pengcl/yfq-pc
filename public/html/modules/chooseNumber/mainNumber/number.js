'use strict';

app.directive("mainNumber", ["$compile", function ($compile) {
    return {
        restrict: 'C',
        templateUrl: "modules/chooseNumber/mainNumber/number.html",
        controller: "chooseNumberController",
        link: function (scope, element, attrs) {
            //scope.pageClass = "hide-checkbox";
            scope.$root.checkMainNumber = function () {
                if (!scope.productDetailsForm.mainNumber.$valid) {//原本应该用!scope.checkoutForm.phoneNumber.$valid
                    scope.onclickSpan(1, 3);
                    return false;
                }
                return true;
            };
        }
    };
}]).controller('chooseNumberController', ['$scope', '$cookieStore', '$http', '$compile', function ($scope, $cookieStore, $http, $compile) {
    //var deferred = $q.defer();
    $scope.phoneData = new Array();

    var curr;

    $scope.onclickSpan = function (parenIndex, pos) {
        $("#idNumDiv").attr("class", "tooltip bottom t-" + parenIndex + " l" + pos);
        var i, numNow, selectSpan;
        numNow = "";
        selectSpan = $("#choose-nums" + parenIndex + " li");
        curr = pos;
        selectSpan.eq(pos).nextAll().attr("class", "none");
        selectSpan.eq(pos).attr("data-value", "");
        selectSpan.eq(pos).nextAll().attr("data-value", "");
        for (i = 0; i < curr; i++) {
            numNow = numNow + selectSpan.eq(i).attr("data-value");
        }
        var jsonDs = getNumArr(numNow);
        $("#idNumDiv .numberContent ul").html("");
        if (selectSpan.eq(i - 1).attr("data-value") == "") {
            $("#idNumDiv .numberContent ul")
                .append(
                    "<li class='alert' style='background:none; color:#000; font-size:14px;'>请先选择上一位号码，谢谢：）</li>");
        } else {
            selectSpan.eq(pos).attr("class", "wnone");
            $.each(eval(jsonDs), function (v, k) {
                var el = $compile("<li ng-click='onclickLi(" + parenIndex + "," + k + ")' class='n" + k + "' value=" + k + ">" + k + "</li>")($scope);
                $("#idNumDiv .numberContent ul").append(el);
            });
            tooltipShow("#idNumDiv");
        }
        $(".i-package-info").find("hr").hide();
        $(".i-package-info").find(".more").hide();
    };

    $scope.onclickLi = function (p, k) {
        var j, numLast, number1, number2, number3;
        $("#choose-nums" + p + " li").eq(curr).attr("data-value", k);
        $("#choose-nums" + p + " li").eq(curr).attr("class", "s" + k);
        $("#idNumDiv").css("display", "none");
        $("#idNumDiv").attr("class", "tooltip bottom t-" + p + " l" + curr);
        if (curr < 10) {
            $scope.onclickSpan(p, curr + 1);
            return;
        }
        if (p == 1 && curr == 10) {
            $("#idNumDiv .tooltip-arrow").css("class", "l10");
            numLast = "";
            for (j = 0; j < 11; j++) {
                numLast = numLast + $("#choose-nums" + p + " li").eq(j).attr("data-value");
            }
            if (numLast == $("#number2").val()) {
                alert("您选择的号码重复，请重新选择！");
                $scope.onclickSpan(1, 10);
            } else {
                $scope.mainNumber = numLast;
            }
        }
        if (p == 2 && curr == 10) {
            $("#idNumDiv .tooltip-arrow").css("class", "l10");
            numLast = "";
            for (j = 0; j < 11; j++) {
                numLast = numLast + $("#choose-nums" + p + " li").eq(j).attr("data-value");
            }
            //console.log($("#number").val());
            if (numLast == $scope.mainNumber) {
                alert("您选择的号码重复，请重新选择！");
                $scope.onclickSpan(2, 3);
            } else {
                $scope.subNumber = numLast;
            }

        }

        if($("#idNumDiv").is(':visible')) return;
        if(p==2)
            writebdLog($scope.category, "_subSelectNumber", "渠道号", $scope.gh);//副卡选择号码
        else
        	writebdLog($scope.category, "_mainSelectNumber", "渠道号", $scope.gh);//主卡选择号码
    }

}]);