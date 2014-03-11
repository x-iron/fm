define(['app', 'config'], function (app, config) {
    var cmpName = 'addUser';
    app.compileProvider.directive(cmpName, ['$q', function ($q) {
        return {
            restrict: 'A',
            scope: true,
            controller: ['$scope', function ($scope) {

            }],
            require: ['?^fmWindow', cmpName],
            controllerAs: 'ctrl',
            link: function (scope, el, attrs, ctrls) {
                var closeDeferred;
                var win = ctrls[0];
                var ctrl = ctrls[1];
                ctrl.add = function () {
                    win.close();
                };
                ctrl.cancel = function () {
                    closeDeferred = $q.defer();
                    //show confirm window
                    win.close(closeDeferred.promise);
                };
                win.safeClose = ctrl.cancel;
                ctrl.confirmClose = function (doClose) {
                    if (closeDeferred == null) return;
                    doClose ? closeDeferred.resolve() : closeDeferred.reject();
                    console.log(closeDeferred);
                };
            },
            templateUrl: config.componentUrl + cmpName + '.html'
        };
    }]);
});
