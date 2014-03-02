define(['app', 'config', 'underscore'], function (app, config, _) {
    app.compileProvider.directive('fmPostLogin', ['user', '$q', '$location', '$timeout', function (user, $q, $location, $timeout) {
        return {
            restrict: 'E',
            scope: true,
            controller: function ($scope) {
                var userObj = user.getLoginUser();
                $scope.userName = userObj.name;
                $scope.logOut = function () {
                    user.logOut();
                    $scope.$destroy();
                };
                configRoute(['m1', 'manageUsers']);

                function configRoute(cmps) {
                    var serviceName = 'service';
                    _.forEach(cmps, function (cmp) {
                        console.log('config')
                        app.routeProvider.when('/' + cmp, {
                            templateUrl: config.componentUrl + cmp + 'Template.html',
                            controller: [serviceName, function (service) {
                                $scope.service = service;
                            }],
                            resolve: resolveFactory(serviceName, cmp)
                        });
                    });
                }

                function resolveFactory(serviceName, cmp) {
                    var resolve = {};
                    resolve[serviceName] = function () {
                        var deferred = $q.defer();
                        require([cmp], function (service) {
                            deferred.resolve(service);
                        });
                        return deferred.promise;
                    };
                    return resolve;
                }
            },
            templateUrl: config.componentUrl + 'postLoginTemplate.html',
            link: function (scope, el) {
                var path = $location.path();
                path == '/login' && (path = '/welcome');
                $location.path('/');
                el.ready(function () {
                    scope.$apply(function () {
                        $location.path(path);
                    });
                });
            }
        }
    }]);
});