/*!zhangxiaotian2s  2016-06-17 */
/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelServiceModule = angular.module('travelServiceModule', []);

/*
* 获取旅游列表
* */
travelServiceModule.service('travelIndexListService', function ($http) {
    var self=this;
    var index_list_api='http://api.development.mastergolf.cn/v10/tourism/travels.json';
    this.traveListGet = function () {
      return  $http({
            url: index_list_api,
            method: 'GET'
        })
    }
});
/**
 * 旅游详情内容
 */

travelServiceModule.service('travelDetailsService', function ($http) {
    var self=this;
    var travel_details_api='http://api.development.mastergolf.cn/v10/tourism/travels/show.json?uuid='
    this.traveDetailsGet = function (uuid) {
        return  $http({
            url: travel_details_api+uuid,
            method: 'GET'
        })
    }
});
/*
* 订单创建
 */

travelServiceModule.service('orderCreatService', function ($http) {
    var ajax_submit_url='http://api.development.mastergolf.cn/v10/tourism/orders/create.json'
    this.ajaxSubmit= function (data) {
        return  $http({
            method  : 'POST',
            url : ajax_submit_url,
            data  : data
        })
    }
});

/*
* 页面跳转
* */
travelServiceModule.service('pageJumpService',['$state',function ($state) {

    this.statego=function(url,id){
        $state.go(url, {
            uuid: id
        })
    };
}]);

/*
* 表单验证
* */
travelServiceModule.factory('orderValidateService', ['$http',function ($http) {

    var validate= {
        name: function (str) {
            return  /^[\u4E00-\u9FA5A-Za-z]+$/.test(str);
        },
        phone: function (str) {
            return /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/.test(str);
        }

    };
    return validate
}]);

/*
* 信息提示
* */
travelServiceModule.service('promptService', ['$timeout',function ($timeout) {
    this.promit=function() {
        var _html = '<p class="pf" style="top:0px">xxxxxx</p>';
         document.body.innerHTML+=_html;
    }


}]);







/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelDirceitve = angular.module('travelDirectiveModule', ['travelListModule', 'travelDetailsModule', 'ngTouch']);

/*
 * 图片懒加载
 * */
travelDirceitve.directive("lazyimglist", ['$timeout', function ($timeout) {
    return {
        restrict: 'AE',
        replace: false,
        link: function (scope, element, attrs) {
            /*图片懒加载方法*/

            function loadimg () {
                this.img = document.querySelectorAll(".loadimg");
                this.w_h =document.documentElement.clientHeight ;
                this.datasrc = 'datalazysrc';
                this.imglength = this.img.length;
                this.nowi = 0;
            }
            loadimg.prototype.scrolladd = function () {
                var self = this;
                if (self.nowi >= self.img.length-1) {
                    return
                }
                var _s_t = document.body.scrollTop,
                    _img_t = _s_t + self.w_h + 20;
                for (i =self.nowi ; i < self.imglength; i++) {
                    var _this = self.img[i],
                        _datasrc = _this.getAttribute(self.datasrc),
                        _nowsrc = _this.getAttribute('src'),
                        _offtop = _this.parentNode.offsetTop;
                    if (_datasrc != _nowsrc && _img_t > _offtop) {
                        _this.setAttribute('src', _datasrc);
                        self.nowi = i;
                    }
                }
            };
            if(scope.$last == true){
                $timeout( function () {
                    var _loadnow = new loadimg();
                    _loadnow.scrolladd();
                    window.onscroll = function () {
                        _loadnow.scrolladd();
                    };
                })
            }
        }
    }
}]);
/*
 *详情页banner
 * */


travelDirceitve.directive("bannerli", ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
            function Banner(number) {
                this.bannerbox = $('#bannerbox');
                this.bannerid = '#bannerbox';
                this.li_width = this.bannerbox.width();
                this.banner_ul = $('#banner-ul');
                this.timer = '';
                this.index = 0;
                this.evx = 0;
                this.timer = null;
            };
            Banner.prototype.init = function () {
                var self = this;
                self.banner_li = self.banner_ul.children('li');
                self.li_length = self.banner_ul.children('li').length;
                self.banner_li.css('width', self.li_width + 'px');
                self.bannerAuto();
                touch.on(self.bannerid, 'touchstart', function (ev) {
                    ev.preventDefault();
                });
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

            Banner.prototype.bannerAction = function (offx) {
                var self = this;
                self.banner_ul.css({
                    '-webkit-transition': '0.5s  linear',
                    'transition': '0.5s  linear',
                    '-webkit-transform': 'translate3d(' + offx + 'px,0,0)',
                    'transform': 'translate3d(' + offx + 'px,0,0)'
                })
            };
            Banner.prototype.bannerAuto = function () {
                var self = this;
                self.timer = setInterval(function () {
                    self.index++;
                    if (self.index > self.li_length - 1) {
                        self.index = 0;
                    }
                    _offx = -self.index * self.li_width;
                    self.bannerAction(_offx)
                }, 3000)
            };
            if(scope.$last == true){
                $timeout( function () {
                    var banner = new Banner();
                    banner.init();
                })
            }
        }
    }

}]);





/**
 * Created by 50683 on 2016/6/13.
 */
var travelFilterModule = angular.module('travelFilterModule', [])

travelFilterModule.filter('trustHtml',[ '$sce',function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}]);
/** * Created by 50683 on 2016/6/14. */var orderCreatModule = angular.module('orderCreatModule', ['travelServiceModule']);orderCreatModule.controller('orderCreatCtrl', ['$scope', '$state', '$stateParams', '$cookieStore', 'travelDetailsService', 'orderCreatService', 'orderValidateService','promptService', function ($scope, $state, $stateParams, $cookieStore, travelDetailsService, orderCreatService, orderValidateService,promptService) {    $scope.parseInt=parseInt;    $cookieStore.put('user_uuid', '5734fda9-61c6-42b4-82ce-b1314e291bbd');    $cookieStore.put('token', '63bae8001c7b61f6d14b5bed19c912be');    var user_uuid= $cookieStore.get('user_uuid'),           user_token=$cookieStore.get('token');     if(!user_token || !user_uuid){      var _location_url=window.location.href;       window.location.href='mastergolf://mastergolf.cn/user/login?url='+_location_url+'';     }    $scope.travleDetailsData ='';    $scope.adult_count = 1;    $scope.child_count = 0;    $scope.link_man = '';    $scope.phone = '';    $scope.insurance_count = 0;    $scope.all_people = 1;    travelDetailsService.traveDetailsGet($stateParams.uuid).success(function (data, header, config, status) {        $scope.travleDetailsData = data.data;        $scope.adult_price = parseInt($scope.travleDetailsData.adult_price)||0;        $scope.child_price =parseInt( $scope.travleDetailsData.child_price)||0;        $scope.assurance_price =parseInt($scope.travleDetailsData.assurance_price)||0;        $scope.total_price = $scope.adult_price * $scope.adult_count + $scope.child_price * $scope.child_count + $scope.assurance_price * $scope.insurance_count;    });    /*     * 计算     * */    var getTotalPric = function () {        $scope.all_people = $scope.adult_count + $scope.child_count;        $scope.insurance_count = $scope.insurance_count > $scope.all_people ? $scope.all_people : $scope.insurance_count;        $scope.total_price = $scope.adult_price * $scope.adult_count + $scope.child_price * $scope.child_count + $scope.assurance_price * $scope.insurance_count;    };    /**     *加法操作     */    $scope.addNumberFn = function (argtext) {        if (argtext === "adult_count") {            $scope.adult_count++;        }        if (argtext === "child_count") {            $scope.child_count++;        }        if (argtext === "insurance_count") {            $scope.insurance_count++;            $scope.insurance_count = $scope.insurance_count > $scope.all_people ? $scope.all_people : $scope.insurance_count;        }        getTotalPric();    };    /**     *减法操作     */    $scope.minusNumberFn = function (argtext) {        if (argtext === "adult_count") {            $scope.adult_count--;            $scope.adult_count = $scope.adult_count <= 1 ? 1 : $scope.adult_count;        }        if (argtext === "child_count") {            $scope.child_count--;            $scope.child_count = $scope.child_count < 0 ? 0 : $scope.child_count;        }        if (argtext === "insurance_count") {            $scope.insurance_count--;            $scope.insurance_count = $scope.insurance_count < 0 ? 0 : $scope.insurance_count;        }        getTotalPric()    };    /*     * 验证操作     * */    var _Vname = false, _Vphone = false;    $scope.bool_submit = false;    $scope.validate = {        Vphone: function (str) {            _Vphone = orderValidateService.phone(str);            $scope.bool_submit = (_Vname && _Vphone);            return _Vphone        },        Vname: function (str) {            _Vname = orderValidateService.name(str);            $scope.bool_submit = (_Vname && _Vphone);            return _Vname        }    };    /*    * 提交订单    * */    $scope.submitOrder= function () {           if(!$scope.bool_submit){                return           }        orderCreatService.ajaxSubmit({            uuid:$stateParams.uuid,            user_uuid:user_uuid,            token:user_token,            adult_count:$scope.adult_count,            child_count:$scope.child_count,            link_man:$scope.link_man,            phone:$scope.phone,            insurance_count:$scope.insurance_count        }).success(function (data, header, config, status) {             if(data.data.state==="OK"){             }else{             }        })    };    $scope.statego = function (url, id) {        pageJumpService.statego(url, id);    };}]);
/**
 * Created by 50683 on 2016/6/13.
 */
var travelDetailsModule = angular.module('travelDetailsModule', ['travelServiceModule','travelFilterModule']);

travelDetailsModule.controller('travelDetailsCtrl', ['$scope','$state' ,'$stateParams','travelDetailsService','pageJumpService', function ($scope,$state,$stateParams, travelDetailsService,pageJumpService) {

     travelDetailsService.traveDetailsGet($stateParams.uuid).success(function (data, header, config, status) {
         $scope.travleDetailsData=data.data;
    });

    $scope.statego=function(url,id){
        pageJumpService.statego(url,id);
    }
}])
/**
 * Created by 50683 on 2016/6/8.
 */
var travelListModule = angular.module('travelListModule', ['travelServiceModule']);

travelListModule.controller('travelIndexListCtrl', ['$scope', '$state', 'travelIndexListService', 'pageJumpService', function ($scope, $state, travelIndexListService, pageJumpService) {
    $scope.tab = 1;

    travelIndexListService.traveListGet().success(function (data, header, config, status) {
        $scope.traveListData = data.data;
    }).error(function (data, header, config, status) {

    });


    $scope.statego = function (url, id) {
        pageJumpService.statego(url, id);
    }

}]);
/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelApp = angular.module('travelApp', ['ui.router', 'ngTouch','ngAnimate','ngCookies','travelListModule','travelServiceModule','travelDirectiveModule','travelDetailsModule','travelFilterModule','orderCreatModule']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 */
travelApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.tab=1;

});
travelApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/travel_index_list.html',
            controller:'travelIndexListCtrl'
        })
        .state('details', {
            url: '/details/:uuid',
            templateUrl: 'views/travel_details.html',
            controller: 'travelDetailsCtrl'
        })
        .state('ordercreat', {
            url: '/ordercreat/:uuid',
            templateUrl: 'views/order_creat.html',
            controller: 'orderCreatCtrl'
        })
});
