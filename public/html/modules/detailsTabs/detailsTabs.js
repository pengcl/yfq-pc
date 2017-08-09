'use strict';

app.directive("detailsTabs", ['$location', function ($location) {
    return {
        restrict: 'C',
        templateUrl: "modules/detailsTabs/detailsTabs.html",
        link: function (scope, element, attrs) {
            //console.log("1");
            var $img = $(element).find("img");
            scope.fullDescription = scope.phone.phoneTypes[0].fullDescription;
            
            scope.getContent = function (obj){
            	var args=['_ProductDetails','_Specifications','_CommentsUser','_PurchaseNotes'];
                writebdLog(scope.category,args[obj], "渠道号", scope.gh);//商品详细
            };
        }
    };
    
}]);