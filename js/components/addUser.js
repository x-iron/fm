define(['app', 'config'], function (app, config) {
    var cmpName = 'addUser';
    app.compileProvider.directive(cmpName, [function () {
        return {
            restrict: 'A',
            scope: true,
            controller: ['$scope', function ($scope) {
                this.add = function() {
                    console.log($scope.name, 'added');
                };
                $scope.$on('going2Close', function() {
                   console.log('going2Close')
                });
            }],
            require: ['?^fmWindow', cmpName],
            controllerAs: 'ctrl',
            link: function(scope, el, attrs, ctrls) {
                var window = ctrls[0];
                var ctrl = ctrls[1];
                ctrl.cancel = function() {
                    window.close();
                };
            },
            templateUrl: config.componentUrl + cmpName + '.html'
        };
    }]);
});
