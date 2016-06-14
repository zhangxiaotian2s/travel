/**
 * Created by 50683 on 2016/6/14.
 */
var orderCreatModule=angular.module('orderCreatModule',['travelServiceModule'])

orderCreatModule.controller('orderCreatCtrl',['$scope','orderCreatService',function($scope,orderCreatService){

    $scope.adult_price=9980.0;
   $scope.child_price=4880.0;
    $scope.adult_num=1;
    $scope.child_num=0;
    $scope.name='';
    $scope.phone='';
    $scope.total_price=  $scope.adult_price* $scope.adult_num;
   var getTotalPric= function () {
       $scope.total_price=  $scope.adult_price* $scope.adult_num;
   }
    $scope.addNumberFn= function (arg) {
        if(arg==="adult_num") {
            $scope.adult_num++
        }
        getTotalPric()
    }
    $scope.minusNumberFn= function (arg) {
        if(arg==="adult_num") {
            $scope.adult_num--
            $scope.adult_num=  $scope.adult_num<=1?1: $scope.adult_num;
        }
        getTotalPric()
    }


    //Ìø×ª
    $scope.statego=function(url,id){
        pageJumpService.statego(url,id)
    }
}])