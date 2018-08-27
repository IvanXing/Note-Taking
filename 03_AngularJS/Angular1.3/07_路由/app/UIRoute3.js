var routerApp = angular.module('routerApp', ['ui.router']);
//ui-router要加$stateProvider和$urlRouterProvider
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                // 直接指向tpls3下的index.html
                '': {
                    templateUrl: 'tpls3/index.html'
                },
                // index下把页面分为两个
                // <div class="container">
                //     <div ui-view="topbar"></div>
                //     <div ui-view="main"></div>
                // </div>
                'topbar@index': {
                    templateUrl: 'tpls3/topbar.html'
                },
                'main@index': {
                    templateUrl: 'tpls3/home.html'
                }
            }
        })
        .state('index.usermng', {
            url: '/usermng',
            views: {
                'main@index': {
                    templateUrl: 'tpls3/usermng.html',
                    controller: function($scope, $state) {
                        $scope.addUserType = function() {
                            $state.go("index.usermng.addusertype");
                        }
                    }
                }
            }
        })
        .state('index.usermng.highendusers', {
            url: '/highendusers',
            templateUrl: 'tpls3/highendusers.html'
        })
        .state('index.usermng.normalusers', {
            url: '/normalusers',
            templateUrl: 'tpls3/normalusers.html'
        })
        .state('index.usermng.lowusers', {
            url: '/lowusers',
            templateUrl: 'tpls3/lowusers.html'
        })
        .state('index.usermng.addusertype', {
            url: '/addusertype',
            templateUrl: 'tpls3/addusertypeform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                }
            }
        })
        .state('index.permission', {
            url: '/permission',
            views: {
                'main@index': {
                    template: '这里是权限管理'
                }
            }
        })
        .state('index.report', {
            url: '/report',
            views: {
                'main@index': {
                    template: '这里是报表管理'
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    template: '这里是系统设置'
                }
            }
        })
});
