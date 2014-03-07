define(['app', 'config'], function (app, config) {
    app.compileProvider.directive('addUser', [function () {
        return {
            restrict: 'A',
            controller: function ($scope) {
                console.log('xxxxxxxxxxxxxx')
            },
            templateUrl: config.componentUrl + 'addUser.html'
        };
    }]);
});
