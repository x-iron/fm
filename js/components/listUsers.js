define(['app', 'config'], function (app, config) {
    app.compileProvider.directive('listUsers', [function () {
        return {
            restrict: 'A',
            controller: function ($scope) {
                console.log('xxxxxxxxxxxxxx')
            },
            templateUrl: config.componentUrl + 'listUsers.html'
        };
    }]);
});
