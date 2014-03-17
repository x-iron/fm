define(['app', 'config'], function (app, config) {
    app.compileProvider.directive('step1', [function () {
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope, $element, $attrs) {
                this.next = function() {
                     $scope.$emit('next', $attrs);
                };
            },
            controllerAs: 'ctrl',
            link: function() {

            },
            templateUrl: config.componentUrl + 'step1.html'
        };
    }]);
});
