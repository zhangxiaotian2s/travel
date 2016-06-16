/*!zhangxiaotian2s  2016-06-16 */
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

/** * Created by 50683 on 2016/6/14. */var orderCreatModule = angular.module('orderCreatModule', ['travelServiceModule'])orderCreatModule.controller('orderCreatCtrl', ['$scope', 'orderCreatService', 'orderValidateService', function ($scope, orderCreatService, orderValidateService) {    $scope.adult_price = 9980.0;    $scope.child_price = 4880.0;    $scope.adult_num = 1;    $scope.child_num = 0;    $scope.name = '';    $scope.phone = '';    $scope.assurance_price = 80;    $scope.assurance_num = 0;    $scope.all_people = 1;    $scope.total_price = $scope.adult_price * $scope.adult_num + $scope.child_price * $scope.child_num + $scope.assurance_price * $scope.assurance_num;    /*     * 计算     * */    var getTotalPric = function () {        $scope.all_people = $scope.adult_num + $scope.child_num;        $scope.assurance_num = $scope.assurance_num > $scope.all_people ? $scope.all_people : $scope.assurance_num;        $scope.total_price = $scope.adult_price * $scope.adult_num + $scope.child_price * $scope.child_num + $scope.assurance_price * $scope.assurance_num;    }    /**     *加法操作     */    $scope.addNumberFn = function (arg) {        if (arg === "adult_num") {            $scope.adult_num++        }        if (arg === "child_num") {            $scope.child_num++;        }        if (arg === "assurance_num") {            $scope.assurance_num++;            $scope.assurance_num = $scope.assurance_num > $scope.all_people ? $scope.all_people : $scope.assurance_num;        }        getTotalPric()    }    /**     *减法操作     */    $scope.minusNumberFn = function (arg) {        if (arg === "adult_num") {            $scope.adult_num--            $scope.adult_num = $scope.adult_num <= 1 ? 1 : $scope.adult_num;        }        if (arg === "child_num") {            $scope.child_num--;            $scope.child_num = $scope.child_num < 0 ? 0 : $scope.child_num;        }        if (arg === "assurance_num") {            $scope.assurance_num--;            $scope.assurance_num = $scope.assurance_num < 0 ? 0 : $scope.assurance_num;        }        getTotalPric()    }    /*     * 验证操作     * */    //alert(orderValidateService.phone($scope.phone))    var _Vname=false,_Vphone=false    $scope.bool_submit=false;    $scope.validate = {        Vphone: function (str) {             _Vphone= orderValidateService.phone(str);             $scope.bool_submit=(_Vname&&_Vphone)            return _Vphone        },        Vname: function (str) {            _Vname= orderValidateService.name(str);            $scope.bool_submit=(_Vname&&_Vphone)            return _Vname        }    }    //跳转    $scope.statego = function (url, id) {        pageJumpService.statego(url, id)    }}])
/**
 * Created by 50683 on 2016/6/13.
 */
var travelDetailsModule = angular.module('travelDetailsModule', ['travelServiceModule','travelFilterModule']);

travelDetailsModule.controller('travelDetailsCtrl', ['$scope', 'travelDetailsService','pageJumpService', function ($scope, travelDetailsService,pageJumpService) {
    $scope.travleDetailsData = {
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "country": "中国",
        "city": null,
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "child_price": "99.0",
        "ordernum": 0,
        "content_characteristic": "<p>\r\n\t有公主你懂得！\r\n</p>\r\n<p>\r\n\t晚上逛夜市、早晨看日出\r\n</p>",
        "content_plan": "第一天早晨5点东直门集合，9点到住宿地安排住宿，10点到达金沙湾海滨公园（可以叫公主（可以带走）一起）玩水，中午午餐自理（泡面30元一桶）",
        "content_fee": "包含车费，门票晚饭自理<br />",
        "content_notice": "买二赠一公主，买三赠两公主，买的多送得多",
        "tags": [
            "皮皮虾",
            "金沙湾",
            "滑沙",
            "日出"
        ],
        "images": [
            {
                "image": "http://image-staging.mastergolf.cn/assets/3fffc05903c29faaf6410f61a952418a@1e_720w_405h_1c_0i_1o_80Q_1x.jpg"
            },
            {
                "image": "http://7xl619.com1.z0.glb.clouddn.com/1.jpg"
            },
            {
                "image": "http://7xl619.com1.z0.glb.clouddn.com/2.jpg"
            },
            {
                "image": "http://7xl619.com1.z0.glb.clouddn.com/3.jpg"
            }
        ]
    }


    $scope.statego=function(url,id){
        pageJumpService.statego(url,id)
    }



}])
/**
 * Created by 50683 on 2016/6/8.
 */
var travelListModule = angular.module('travelListModule', ['travelServiceModule']);

travelListModule.controller('travelIndexListCtrl', ['$scope', '$state','travelIndexListService','pageJumpService', function ($scope, $state,travelIndexListService,pageJumpService) {
    $scope.tab=1;
    $scope.traveListData = [ {
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "country": "中国",
        "city": null,
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "insurance": null,
        "ordernum": 0,
        "tags": [
            "皮皮虾",
            "金沙湾",
            "滑沙",
            "日出"
        ],
        "image": "http://image-staging.mastergolf.cn/assets/3fffc05903c29faaf6410f61a952418a@1e_720w_405h_1c_0i_1o_80Q_1x.jpg"
    }, {
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "country": "中国",
        "city": null,
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "insurance": null,
        "ordernum": 0,
        "tags": [
            "皮皮虾",
            "金沙湾",
            "滑沙",
            "日出"
        ],
        "image": "http://7xl619.com1.z0.glb.clouddn.com/1.jpg"
    },{
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "country": "中国",
        "city": null,
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "insurance": null,
        "ordernum": 0,
        "tags": [
            "皮皮虾",
            "金沙湾",
            "滑沙",
            "日出"
        ],
        "image": "http://7xl619.com1.z0.glb.clouddn.com/2.jpg"
    },{
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "country": "中国",
        "city": null,
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "insurance": null,
        "ordernum": 0,
        "tags": [
            "皮皮虾",
            "金沙湾",
            "滑沙",
            "日出"
        ],
        "image": "http://7xl619.com1.z0.glb.clouddn.com/3.jpg"
    },{
        "uuid": "1cc6172e-304c-11e6-9f65-7736acbdaf33",
        "country": "中国",
        "city": null,
        "title": "秦皇岛",
        "desc": "吃(keng)~喝(meng)~玩(guai)~乐(pian)",
        "adult_price": "10000.0",
        "insurance": null,
        "ordernum": 0,
        "tags": [
            "皮皮虾",
            "金沙湾",
            "滑沙",
            "日出"
        ],
        "image": "http://7xl619.com1.z0.glb.clouddn.com/4.jpg"
    }]
    // travelIndexListService.traveListGet('1cc6172e-304c-11e6-9f65-7736acbdaf33').success(function(data,header,config,status){
    //     console.log(header)
    //      $scope.traveListData=data.data;
    //}).error(function(data,header,config,status){
    //
    // })
    $scope.statego=function(url,id){
        pageJumpService.statego(url,id)
    }

}])