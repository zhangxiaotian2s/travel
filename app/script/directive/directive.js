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




