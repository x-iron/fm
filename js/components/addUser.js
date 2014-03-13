define(['app', 'config'], function (app, config) {
    var cmpName = 'addUser';
    app.compileProvider.directive(cmpName, ['$q', '$compile','popupMsg', function ($q, $compile, popupMsg) {
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
                    popupMsg.confirm({
                        msg: 'sure?',
                        deferred: closeDeferred
                    });
                    win.close(closeDeferred.promise);
                };
                win.safeClose = ctrl.cancel;
                ctrl.confirmClose = function (doClose) {
                    if (closeDeferred == null) return;
                    doClose ? closeDeferred.resolve() : closeDeferred.reject();
                };
            },
            templateUrl: config.componentUrl + cmpName + '.html'
        };
    }]);
});
