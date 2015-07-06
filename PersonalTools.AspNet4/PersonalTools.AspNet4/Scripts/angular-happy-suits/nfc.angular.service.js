angular.
    module('nfc.service', []).

    /**
     * $http interceptor
     */
    config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope, $q) {
            return {
                //'request': function (config) {
                //    return config;
                //},

                //'requestError': function (rejection) {
                //    return $q.reject(rejection);
                //},

                //'response': function (response) {
                //    return response;
                //},

                'responseError': function (rejection) {

                    return $q.reject(rejection);
                }
            };
        });
    }).

    /**
     * Message Box
     */
    factory('messageBox', ["$document", "$compile", "$rootScope", '$sce', '$timeout', function ($document, $compile, $rootScope, $sce, $timeout) {
        var defaults = {
            title: null,
            content: null,
        };

        var body = $document.find('body');

        //#region Message Queues

        var messageQueues = [];
        var currentThread;
        
        var executeQueue = function () {
            if (angular.isUndefined(currentThread)) {
                if (messageQueues.length > 0) {
                    currentThread = messageQueues[0];
                    messageQueues.splice(0, 1);
                    currentThread();
                }
            }
        };

        var finishCurrentThread = function () {
            currentThread = undefined;
            $timeout(executeQueue, 100);
        };

        //#endregion

        return {
            show: function (options) {

                var executeFn = function () {
                    options = angular.extend({}, defaults, options);

                    // #region Build Html

                    var buttonHtml = '';
                    if (!angular.isUndefined(options.buttons)) {
                        angular.forEach(options.buttons, function (value, key) {
                            buttonHtml += '<button btn btn-default btn-sm botTempo ng-click="buttonFns[' + key + ']()">' + value.label + '</button>';
                        });
                    }

                    var containerEL = angular.element(
                        '<div class="divMessageBox" hidden>' +
                        '   <div class="MessageBoxContainer">' +
                        '       <div class="MessageBoxMiddle">' +
                        '           <span class="MsgTitle" ng-bind-html="title"></span>' +
                        '           <p class="pText" ng-bind-html="content"></p>' +
                        '           <div class="MessageBoxButtonSection">' +
                                        buttonHtml +
                        '           </div>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>');

                    // #endregion

                    var scope = $rootScope.$new(true);
                    scope.title = $sce.trustAsHtml(options.title);
                    scope.content = $sce.trustAsHtml(options.content);
                    scope.buttonFns = [];
                    angular.forEach(options.buttons, function (value, key) {
                        scope.buttonFns.push(function () {
                            if (!angular.isUndefined(value.fn) && angular.isFunction(value.fn)) {
                                value.fn();
                            }
                            closeFn();
                        });
                    });

                    var closeFn = function () {
                        containerEL.fadeOut('fast', function () {
                            containerEL.remove();
                            scope.$destroy();
                            finishCurrentThread();
                        });
                    }

                    $compile(containerEL)(scope);
                    body.append(containerEL);
                    containerEL.fadeIn('fast');
                }

                messageQueues.push(executeFn);
                executeQueue();
            },

            success: function (title, content, okFn) {
                this.show({
                    title: '<i class="fa fa-check" style="color:#008000"></i> Success: ' + title,
                    content: content,
                    buttons: [{ label: 'OK', fn: okFn }]
                });
            },

            confirm: function (title, content, yesFn, noFn) {
                this.show({
                    title: '<i class="fa fa-question-circle" style="color:#ed1c24"></i> Confirmation: ' + title,
                    content: content,
                    buttons: [
                        { label: 'No', fn: noFn },
                        { label: 'Yes', fn: yesFn }
                    ]
                });
            }
        };
    }]);