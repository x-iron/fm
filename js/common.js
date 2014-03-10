define(['angular', 'config', 'underscore', 'require', 'api'], function (angular, config, _, require) {
    'use strict';
    angular.module('myApp.common', [])
        .provider('user', function () {
            var isAdmin = false;
            var loginUser = null;
            var hasLogin = undefined;
            this.asAdmin = function () {
                isAdmin = true;
            };
            this.getLoginUser = function () {
                return {
                    name: loginUser,
                    isAdmin: isAdmin
                }
            };

            this.$get = ['$cookies' , 'userApi', '$rootScope', function ($cookies, userApi, $rootScope) {
                return {
                    hasLogin: function () {
                        return hasLogin;
                    },
                    checkLogin: function () {
                        userApi.checkLogin().then(function (o) {
                            hasLogin = o.logined;
                            loginUser = o.name;
                            console.log('login state change', hasLogin)
                        });
                    },
                    isAdmin: function () {
                        return hasLogin && isAdmin;
                    },
                    login: function (user, pass) {
                        var promise = userApi.login(user, pass);
                        promise.then(function () {
                            hasLogin = true;
                            loginUser = user;
                            $cookies.user = user;
                        });
                        return promise;
                    },
                    logOut: function (remote) {
                        hasLogin = false;
                        loginUser = null;
                        if (false === remote) {
                            return;
                        }
                        userApi.logout();
                    },
                    getLoginUser: function () {
                        return {
                            name: loginUser,
                            isAdmin: isAdmin
                        };
                    }
                }
            }];
        })
        .provider('users', function () {
            var userlist = [
                {
                    name: 'aa',
                    isAdmin: true
                },
                {
                    name: 'bb',
                    isAdmin: false
                }
            ];
            this.$get = function () {
                return {
                    list: function () {
                        return userlist;
                    },
                    save: function (user) {

                    },
                    remove: function (user) {

                    }
                };
            }
        })
        .provider('loader', function () {
            this.$get = function () {
                var counter = 0;
                var dom = null;
                return {
                    show: function () {
                        counter++;
                        counter == 1 && showLoader();
                    },
                    hide: function () {
                        counter && counter--;
                        counter || hideLoader();
                    }
                };
                function hideLoader() {
                    dom && dom.remove();
                }

                function showLoader() {
                    dom = angular.element(document.createElement('div'));
                    dom.addClass('fm-loader');
                    angular.element(document.body).append(dom);
                }
            };
        })
        .provider('cssLoader', function () {
            this.$get = function ($log) {
                var loadedCss = [];

                function hasLoaded(css) {
                    return (loadedCss.indexOf(css) != -1);
                }

                return {
                    load: function (css) {
                        if (hasLoaded(css)) {
                            $log.info('css', css, 'has already loaded');
                            return;
                        }
                        var cssPath = config.componentUrl + css + '.css';
                        if (document.createStyleSheet) {
                            document.createStyleSheet(cssPath);
                        } else {
                            var link = document.createElement("link");
                            link.type = "text/css";
                            link.rel = "stylesheet";
                            link.href = cssPath;
                            document.getElementsByTagName("head")[0].appendChild(link);
                        }
                        loadedCss.push(css);
                    }
                };
            }
        })
        .directive('fmCss', function (cssLoader) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    cssLoader.load(attrs.fmCss);
                }
            }
        })
        .directive('fmOpen', function ($compile, loader) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    var cmp = attrs.fmOpen;
                    var target = attrs.fmOpenAt;
                    var windowWidth = attrs.fmWindowWidth || '400px';
                    var title = attrs.fmTitle || '';
                    var containers = {
                        'window': angular.element(document.body)
                    };
                    var openAtWindow = (target == 'window');
                    var container = containers[target] || angular.element(document.body).find(target);

                    loader.show();
                    require([cmp], function () {
                        loader.hide();
                        el.on('click', function () {
                            var template = angular.element('<div fm-container></div>');
                            template.append(angular.element('<div fm-cmp></div>').attr(cmp.replace(/([A-Z])/g, '-$1'), ''));
                            openAtWindow && template.attr('fm-window', '');
                            openAtWindow && template.attr('fm-window-width', windowWidth);
                            openAtWindow && template.attr('fm-window-title', title);
                            if (!openAtWindow) {
                                scope.title = title;
                                container.empty();
                            }
                            var cmpDom = $compile(template)(scope);
                            container.append(cmpDom);
                        });
                    });
                }
            }
        })
        .directive('fmWindow', function () {
            var zIndex = 10000;
            return {
                restrict: 'A',
                scope: true,
                replace: true,
                link: function (scope, el, attrs) {
                    increaseZIndex();
                    var win = el;
                    win.css('width', attrs.fmWindowWidth);
                    win.css('z-index', zIndex);

                    var maskLayer = angular.element('<div class="fm-ui-popup-maskLayer"></div>');
                    maskLayer.css('z-index', zIndex - 1);
                    angular.element(document.body).append(maskLayer);

                    scope.close = function () {
                        win.remove();
                        maskLayer.remove();
                        decreaseZIndex();
                        scope.$destroy();
                    };
                },
                template: function (el, attrs) {
                    return '<div class="fm-ui-popup-container panel panel-primary">' +
                        '<div class="panel-heading">' +
                        '<span class="panel-title">' + attrs.fmWindowTitle + '</span>' +
                        '<div class="fm-ui-popup-cross" ng-click="close()">✕</div>' +
                        '</div>' +
                        '<div class="panel-body" ng-transclude></div>' +
                        '</div>'
                },
                transclude: true
            };
            function increaseZIndex() {
                zIndex = zIndex + 2;
            }

            function decreaseZIndex() {
                zIndex = zIndex - 2;
            }
        })
        .directive('requireAdmin', function (user) {
            return {
                restrict: 'A',
                link: function (scope, el) {
                    if (user.isAdmin()) {
                        el.removeClass('ng-hide');
                    } else {
                        el.addClass('ng-hide');
                    }
                }
            };
        });
});
