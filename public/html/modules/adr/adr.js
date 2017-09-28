'use strict';

app.directive("adr", ["$timeout", "AddressSvc", function ($timeout, AddressSvc) {
    return {
        restrict: 'EA',
        templateUrl: "modules/adr/adr.html",
        link: function (scope, element, attrs) {

            scope.address = {};

            AddressSvc.getProvince().then(function success(data) {//页面载入时获取[{省}]数据
                /*scope.inputPickerData = {
                    tag: 'address',
                    data: data
                };*/

                scope.pickers = data;
            });

            scope.setPicker = function (picker) {//选定数据
                scope.picker = picker;

                console.log(picker);

                if (picker.name === 'province') {//监听picker控件传出的值{name<province>,value<string>}
                    scope.address.province = picker.value;
                    console.log(picker.value);
                    AddressSvc.getCity(picker.value).then(function success(data) {
                        scope.pickers = data;
                    });
                }
                if (picker.name === 'city') {//监听picker控件传出的值{name<city>,value<string>}
                    scope.address.city = picker.value;
                    AddressSvc.getDistrict(scope.address.province, picker.value).then(function success(data) {
                        scope.pickers = data;
                    });
                }
                if (picker.name === 'district') {//监听picker控件传出的值{name<district>,value<string>}
                    scope.isPickerShow = false;//隐藏picker空间
                    scope.address.district = picker.value;//设置district值
                    AddressSvc.getProvince().then(function success(data) {//初始化为[{省}]数据
                        scope.pickers = data;
                    });
                }
            };

            scope.setPickerShow = function () {//设置是否显示picker控件
                scope.isPickerShow = true;
            };

            scope.setPickerHide = function (state) {//设置隐藏显示picker状态
                scope.$root.isPickerShow = false;
            };

            /*scope.$watch('outputPickerData', function (n, o, scope) {//监听picker控件传出的值{name<string>,value<string>}
                if (n !== o && n != undefined) {

                    if (n.tag !== 'address') {
                        return false;
                    }

                    if (n.data.name === 'province') {//监听picker控件传出的值{name<province>,value<string>}
                        scope.userInfo.address.province = n.data.value;
                        AddressSvc.getCity(n.data.value).then(function success(data) {
                            scope.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'city') {//监听picker控件传出的值{name<city>,value<string>}
                        scope.userInfo.address.city = n.data.value;
                        AddressSvc.getDistrict(scope.userInfo.address.province, n.data.value).then(function success(data) {
                            scope.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                    if (n.data.name === 'district') {//监听picker控件传出的值{name<district>,value<string>}
                        scope.isPickerShow = false;//隐藏picker空间
                        scope.userInfo.address.district = n.data.value;//设置district值
                        AddressSvc.getProvince().then(function success(data) {//初始化为[{省}]数据
                            scope.inputPickerData = {
                                tag: 'address',
                                data: data
                            };
                        });
                    }
                }
            }, true);*/

            /*scope.$watch('userInfo.address', function (n, o, scope) {
                $timeout(function () {
                    if (scope.newAddressForm.receiverProvince.$valid && scope.newAddressForm.receiverCity.$valid && scope.newAddressForm.receiverDistrict.$valid) {
                        scope.receiverAddress = scope.userInfo.address.province + scope.userInfo.address.city + scope.userInfo.address.district;
                    }
                });
            }, true);*/
        }
    };
}]);