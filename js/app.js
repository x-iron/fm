define(['angular', 'require', 'common', 'angular-route', 'angular-cookies'], function (angular, require) {
    'use strict';
    var app = angular.module('myApp', [
            'ngRoute',
            'ngCookies',
            'myApp.common'
        ]).config(function (userProvider, $compileProvider, $controllerProvider, $routeProvider) {
            userProvider.asAdmin();
            app.compileProvider = $compileProvider;
            app.controllerProvider = $controllerProvider;
            app.routeProvider = $routeProvider;

        }).directive('fmMain', function ($compile, user, $location) {
            return {
                restrict: 'E',
                controller: function ($scope) {
                    $scope.user = user; //used for watch
                },
                link: function (scope, elm, attrs) {
                    scope.$watch('user.hasLogin()', function (hasLogin) {
                        elm.empty();
                        if (!hasLogin) {
                            require(['loginDirective'], function () {
                                elm.append($compile('<fm-login/>')(scope));
                            });
                        } else {
                            require(['postLoginDirective'], function () {
                                elm.append($compile('<fm-post-login/>')(scope));
                            });
                        }
                        $location.path(hasLogin ? 'welcome' : 'login');
                    });
                }
            };
        }
    );
    return app;
});