/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelListModule=angular.module('travelListModule',['travelServiceModule']);
/*
 *首页list
 * */
travelListModule.controller('travelListCtrl', ['$scope','travelListService',function ($scope,travelListService) {
   travelListService.traveListGet('9602c0fe-1daa-4698-ba8d-adf21ca5f1df').success(function (data) {
       console.log(data.data)
        $scope.travelLists=data.data
      });
    $scope.ngTouchFN = function () {
       alert('xxx')
    }
    /*
    *详情页
    * */
}])
/*
 *详情页
 * */
travelListModule.controller('travelDetailCtrl',['$scope', function ($scope) {

}])
