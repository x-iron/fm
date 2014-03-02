define(['angular', 'config'], function (angular, config) {
    'use strict';
    angular.module('myApp.api', [])
        .provider('userApi', function () {
            this.$get = ['$cookies', '$http', '$q', '$timeout', function ($cookies, $http, $q, $timeout) {
                return {
                    login: function (name, pass) {
                        var deferred = $q.defer();
                        $timeout(function () {
                            console.log('api login', name, pass, $cookies);
                            $cookies.sessid = '' + Math.random();
                            deferred.resolve();
                        }, 1000);
                        return deferred.promise;
                    },
                    checkLogin: function () {
                        var deferred = $q.defer();
                        $timeout(function () {
                            console.log('api check login', $cookies.sessid);
                            deferred.resolve(
                                {
                                    logined: $cookies.sessid != null,
                                    name: $cookies.user
                                }
                            );
                        }, 1000);
                        return deferred.promise;
                    }
                };
            }];
        })
});
