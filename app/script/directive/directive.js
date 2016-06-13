/**
 * Created by zhangxiaotian on 16/6/5.
 */
var travelDirceitve = angular.module('travelDirectiveModule', ['travelListModule', 'travelDetailsModule','ngTouch']);

/*
 * 图片懒加载
 * */
travelDirceitve.directive("imglazyload", function () {
    return {
        restrict: 'A',
        replace: false,
        scope: {},
        //template: '<img ng-src={{travellist.image}}   class="lazyimg img-responsive" >',
        link: function (scope, element, attrs) {
            var lazyimg = angular.element(element)

            //for(var i=0;i<lazyimg.length;i++){
            lazyimg.attr('src', attrs.datalazysrc)
            //}
            console.log(attrs.datalazysrc)
        }
    }
})
/*
 *详情页banner
 * */


travelDirceitve.directive("banner", function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            images: '='
        },
        template: '<li ng-repeat="image in images">' +
        '<img ng-src={{image.image}} class="img-responsive">' +
        '</li>',
        link:function(attrs,element,attrs){
            function banner(number) {
                this.banner_ul = $('#banner-ul');
                this.banner_li = this.banner_ul.children('li')
                this.li_length = this.banner_ul.children('li').length || number;
                this.li_width = $(window).width() > 640 ? 640 : $(window).width();
                this.timer = '';
                this.banner_dian = $('#banner-dian');
                this.banner_dian_li = this.banner_dian.children('li');
                this.index = 0;
            };
            var banner=new  banner()
            touch.on('#banner-ul','swiperight', function () {
                console.log(scope.images.length)
            })

        }
    }

})




