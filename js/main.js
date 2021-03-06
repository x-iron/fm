require.config({
    baseUrl: 'js/components',
    paths: {
        text: '../../lib/requireJs/text',
        app: '../app',
        angular: '../../lib/angular/angular',
        'angular-route': '../../lib/angular/angular-route.min',
        'angular-cookies': '../../lib/angular/angular-cookies.min',
        underscore: '../../lib/underscore/underscore-min',
        common: '../common',
        api: '../api',
        config: '../config'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'underscore': {'exports': '_'},
        'angular-route': { deps: ['angular']},
        'angular-cookies': { deps: ['angular']}
    },
    urlArgs: 'v=0.1'
});
require(['angular','config', 'app'], function (angular, config) {
    angular.element(document).ready(
        function () {
            angular.bootstrap(document, [config.appName]);
        }
    );
});