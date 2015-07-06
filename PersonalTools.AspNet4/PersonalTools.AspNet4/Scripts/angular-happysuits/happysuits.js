var directiveApp = angular.module('hs.validate', []);

/**
 * Password Directive
 * Element Example: <input ng-model="user.Password" nfc-password />
 * Required Attributes:
 *      ng-model
 *      nfc-password
 */
var PASSWORD_REGEXP = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{6,}$/;
directiveApp.directive('hsPassword', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        replace: true,
        template: '<input type="password"></input>',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$validators.password = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (viewValue == '********' || PASSWORD_REGEXP.test(viewValue)) {
                    return true;
                }

                return false;
            };
        }
    }
});

/**
 * Phone Directive
 * Element Example: <input ng-model="user.Phone" />
 * Required Attributes: 
 *      ng-model
 *      nfc-phone
 */
var PHONE_REGEXP = /^04[0-9]{8}$/;
directiveApp.directive('hsPhone', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        replace: true,
        template: '<input maxlength="10"></input>',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$validators.phone = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (PHONE_REGEXP.test(viewValue)) {
                    return true;
                }

                return false;
            };
        }
    }
});

/**
 * Fax Directive
 * Element Example: <input ng-model="user.Fax" nfc-fax />
 * Required Attributes: 
 *      ng-model
 *      nfc-fax
 */
var FAX_REGEXP = /^04[0-9]{8}$/;
directiveApp.directive('hsFax', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        replace: true,
        template: '<input maxlength="10"></input>',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$validators.fax = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (FAX_REGEXP.test(viewValue)) {
                    return true;
                }

                return false;
            };
        }
    }
});

/**
 * Mobile Directive
 * Element Example: <input ng-model="user.Mobile" nfc-mobile />
 * Required Attributes:
 *      ng-model
 *      nfc-mobile
 */
var MOBILE_REGEXP = /^[0-9]{10}$/;
directiveApp.directive('hsMobile', function () {
    return {
        require: "ngModel",
        restrict: 'A',
        replace: true,
        template: '<input maxlength="10"></input>',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$validators.mobile = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                if (MOBILE_REGEXP.test(viewValue)) {
                    return true;
                }

                return false;
            };
        }
    }
});

/**
 * Compare To Directive
 * Element Example: <input ng-model="user.ConfirmPassword" nfc-compare-to="user.Password" />
 * Required Attributes: 
 *      ng-model
 *      nfc-confirm-password
 *      compareTo
 */
directiveApp.directive('hsCompareTo', function () {
    return {
        require: "^ngModel",
        restrict: 'A',
        replace: true,
        template: '<input type="password"></input>',
        scope: {
            compareToModelValue: '=nfcCompareTo'
        },
        link: function (scope, element, attrs, ctrl) {
            ctrl.$validators.compareTo = function (modelValue, viewValue) {
                return modelValue == scope.compareToModelValue;
            };

            scope.$watch("compareToModelValue", function () {
                ctrl.$validate();
            });
        }
    }
});

/**
 * Validate Result Directive
 * Element Example: <input name="elementName" nfc-validate-result />
 * Required Attributes: 
 *      name
 *      nfc-validate-result
 */
directiveApp.directive('hsValidateResult', function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {

            if (!angular.isUndefined(attrs.nfcValidateResult)) {
                // Define variables
                var formName = element.parents('form:first').attr('name');
                var tagetElementName = attrs.name;
                var insertInvalidMessageElement = function (formName, targetElementName, errorType, message) {
                    element.after('<div class="ng-invalid-message" ng-show="' + formName + '.' + targetElementName + '.$error.' + errorType + '">' + message + '</div>');
                }

                // Required
                if (!angular.isUndefined(attrs.ngRequired) || !angular.isUndefined(attrs.required)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'required', 'This field is required');
                }
                // Min Length
                if (!angular.isUndefined(attrs.ngMinlength)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'minlength', 'Min length is ' + attrs.ngMinlength);
                }
                // Max Length
                if (!angular.isUndefined(attrs.ngMaxlength)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'maxlength', 'Max length is ' + attrs.ngMaxlength);
                }
                // Pattern
                if (!angular.isUndefined(attrs.ngPattern)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'pattern', 'pattern error');
                }
                // Email
                if (attrs.type == 'email') {
                    insertInvalidMessageElement(formName, tagetElementName, 'email', 'email error');
                }
                // Password
                if (!angular.isUndefined(attrs.nfcPassword)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'password', 'Password must be minimum 6 characters, including at least one number, one lowercase and one uppercase letters');
                }
                // Phone
                if (!angular.isUndefined(attrs.nfcPhone)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'phone', 'Phone invalid.');
                }
                // Fax
                if (!angular.isUndefined(attrs.nfcFax)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'fax', 'Fax invalid.');
                }
                // Mobile
                if (!angular.isUndefined(attrs.nfcMobile)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'mobile', 'Mobile invalid.');
                }
                // Compare To
                if (!angular.isUndefined(attrs.nfcCompareTo)) {
                    insertInvalidMessageElement(formName, tagetElementName, 'compareTo', 'Must match the previous entry');
                }
            }
        }
    };
});