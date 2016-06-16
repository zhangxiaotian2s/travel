/*!zhangxiaotian2s  2016-06-16 */
/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelServiceModule = angular.module('travelServiceModule', [])

/*
* 获取旅游列表
* */
travelServiceModule.service('travelIndexListService', function ($http) {
    var self=this
    this.index_list_api='http://192.168.3.130:9393/v10/tourism/travels/show.json?uuid='
    this.traveListGet = function (uuid) {
      return  $http({
            url: self.index_list_api+uuid,
            method: 'GET'
        })
    }
})
/**
 * 旅游详情内容
 */

travelServiceModule.service('travelDetailsService', function ($http) {
    var self=this
    this.travel_details_api='http://192.168.3.130:9393/v10/tourism/travels/show.json?uuid='
    this.traveListGet = function (uuid) {
        return  $http({
            url: self.travel_details_api+uuid,
            method: 'GET'
        })
    }
})
/*
* 订单创建
 */
travelServiceModule.service('orderCreatService', function ($http) {
    this.ajaxSubmit= function (url,data) {
        return  $http({
            method  : 'POST',
            url : url,
            data  : data
        })
    }

})

/*
* 页面跳转
* */
travelServiceModule.service('pageJumpService',['$state',function ($state) {

    this.statego=function(url,id){
        $state.go(url, {
            uuid: id
        })
    };
}])

/*
* 表单提交
* */
travelServiceModule.factory('orderValidateService', ['$http',function ($http) {

    var validate= {
        name: function (str) {
            return  /^[\u4E00-\u9FA5A-Za-z]+$/.test(str);
        },
        phone: function (str) {
            return /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(str);
        }

    }
    return validate
}])






/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelDirceitve = angular.module('travelDirectiveModule', ['travelListModule', 'travelDetailsModule', 'ngTouch']);

/*
 * 图片懒加载
 * */
travelDirceitve.directive("lazyimglist", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace: false,
        link: function (scope, element, attrs) {
            /*图片懒加载方法*/
            var loadimg = function () {
                this.img = document.querySelectorAll(".loadimg");
                this.w_h =document.documentElement.clientHeight ;
                this.datasrc = 'datalazysrc';
                this.imglength = this.img.length;
                this.nowi = 0;
            }
            loadimg.prototype.scrolladd = function () {
                var self = this
                if (self.nowi >= self.img.length-1) {
                    return
                }
                var _s_t = document.body.scrollTop,
                    _img_t = _s_t + self.w_h + 20
                for (i =self.nowi ; i < self.imglength; i++) {

                    var _this = self.img[i],
                        _datasrc = _this.getAttribute(self.datasrc),
                        _nowsrc = _this.getAttribute('src'),
                        _offtop = _this.parentNode.offsetTop;
                    if (_datasrc != _nowsrc && _img_t > _offtop) {
                        _this.setAttribute('src', _datasrc)
                        self.nowi = i
                    }
                }
            }
            $timeout(function () {
                var _loadnow = new loadimg();
                _loadnow.scrolladd();
                document.body.ontouchmove = function () {
                    _loadnow.scrolladd();
                }
                window.onscroll = function () {
                    _loadnow.scrolladd();
                }
            },1000)
        }
    }
}])
/*
 *详情页banner
 * */


travelDirceitve.directive("banner", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        replace: false,
        link: function (attrs, element, attrs) {
            function banner(number) {
                this.bannerbox = $('#bannerbox');
                this.bannerid = '#bannerbox';
                this.li_width = this.bannerbox.width();
                this.banner_ul = $('#banner-ul');
                this.timer = '';
                this.index = 0;
                this.evx = 0;
                this.timer = null;
            };
            banner.prototype.init = function () {
                var self = this
                self.banner_li = self.banner_ul.children('li')
                self.li_length = self.banner_ul.children('li').length;
                self.banner_li.css('width', self.li_width + 'px');
                //自动化
                self.bannerAuto()
                //清除掉默认事件
                touch.on(self.bannerid, 'touchstart', function (ev) {
                    ev.preventDefault();
                });
                //拖动状态处理
                touch.on(self.bannerid, 'drag', function (ev) {
                    clearInterval(self.timer);
                    var _offx = -self.index * self.li_width + ev.x;
                    self.evx = ev.x;
                    self.banner_ul.css({
                        '-webkit-transition': '0.0s  linear',
                        'transition': '0.0s  linear',
                        '-webkit-transform': 'translate3d(' + _offx + 'px,0,0)',
                        'transform': 'translate3d(' + _offx + 'px,0,0)'
                    })

                });

                touch.on(self.bannerid, 'dragend', function (ev) {
                    var _offx = 0;
                    if (self.evx > 0 && self.index !== 0) {
                        self.index--;
                    } else if (self.evx < 0 && self.index != self.li_length - 1) {
                        self.index++;
                    }
                    _offx = -self.index * self.li_width;
                    self.bannerAction(_offx);
                    self.bannerAuto()
                });

            };

            banner.prototype.bannerAction = function (offx) {
                var self = this;
                self.banner_ul.css({
                    '-webkit-transition': '0.5s  linear',
                    'transition': '0.5s  linear',
                    '-webkit-transform': 'translate3d(' + offx + 'px,0,0)',
                    'transform': 'translate3d(' + offx + 'px,0,0)'
                })
            };
            banner.prototype.bannerAuto = function () {
                var self = this;
                self.timer = setInterval(function () {
                    self.index++;
                    if (self.index > self.li_length - 1) {
                        self.index = 0;
                    }
                    _offx = -self.index * self.li_width;
                    self.bannerAction(_offx)
                }, 3000)
            }

            var banner = new banner()

            $timeout(function () {
                banner.init()
            });



        }
    }

}])





/**
 * Created by 50683 on 2016/6/13.
 */
var travelFilterModule = angular.module('travelFilterModule', [])

travelFilterModule.filter('trustHtml',[ '$sce',function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}]);
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