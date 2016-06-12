/**
 * Created by 50683 on 2016/6/8.
 */
var travelListModule = angular.module('travelListModule', ['travelServiceModule']);

travelListModule.controller('travelIndexListCtrl', ['$scope', 'travelIndexListService', function ($scope, travelIndexListService) {
    $scope.traveListData = [{
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "tags": ["暑期特卖", "暑期特卖", "暑期特卖", "暑期特卖"],
        "ordernum":22,
        "image": "http://image-staging.mastergolf.cn/assets/3fffc05903c29faaf6410f61a952418a@1e_720w_405h_1c_0i_1o_80Q_1x.jpg"
    },{
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "tags": ["暑期特卖", "暑期特卖", "暑期特卖", "暑期特卖"],
        "ordernum": 0,
        "image": "http://7xl619.com1.z0.glb.clouddn.com/4.jpg"
    }]
    // travelIndexListService.traveListGet('1cc6172e-304c-11e6-9f65-7736acbdaf33').success(function(data,header,config,status){
    //     console.log(header)
    //      $scope.traveListData=data.data;
    //}).error(function(data,header,config,status){
    //
    // })
}])