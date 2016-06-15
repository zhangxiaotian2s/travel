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