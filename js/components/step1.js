define(['app', 'config', 'underscore'], function (app, config, _) {
    var cmp = 'step1';
    app.compileProvider.directive(cmp, [function () {
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope, $element, $attrs) {
                this.next = function() {
                    $scope.$emit('next',
                        _.extend($attrs, {
                            actionConfig: {  //override rules
                                name: 'step2',    // can be function
                                restore: false    // can be function
                            }
                        })
                    );
                };
            },
            controllerAs:'ctrl',
            link:function(scope, el, attrs) {
            },
            templateUrl: config.componentUrl + cmp + '.html'
        };
    }]);
});
