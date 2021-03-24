(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-appkit-contracts-alpha', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-appkit-contracts-alpha'] = {}), global.ng.core, global.ng.common.http));
}(this, (function (exports, core, http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    // ******************** Dialog ********************//
    var AlertDialog = /** @class */ (function () {
        function AlertDialog(message, type, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel) {
            this.message = message;
            this.type = type;
            this.okCallback = okCallback;
            this.cancelCallback = cancelCallback;
            this.defaultValue = defaultValue;
            this.okLabel = okLabel;
            this.cancelLabel = cancelLabel;
        }
        return AlertDialog;
    }());

    (function (DialogType) {
        DialogType[DialogType["alert"] = 0] = "alert";
        DialogType[DialogType["confirm"] = 1] = "confirm";
        DialogType[DialogType["prompt"] = 2] = "prompt";
    })(exports.DialogType || (exports.DialogType = {}));
    // ******************** End ********************//
    // ******************** Growls ********************//
    var AlertCommand = /** @class */ (function () {
        function AlertCommand(operation, message, onRemove) {
            this.operation = operation;
            this.message = message;
            this.onRemove = onRemove;
        }
        return AlertCommand;
    }());
    var AlertMessage = /** @class */ (function () {
        function AlertMessage(severity, summary, detail) {
            this.severity = severity;
            this.summary = summary;
            this.detail = detail;
        }
        return AlertMessage;
    }());

    (function (MessageSeverity) {
        MessageSeverity[MessageSeverity["default"] = 0] = "default";
        MessageSeverity[MessageSeverity["info"] = 1] = "info";
        MessageSeverity[MessageSeverity["success"] = 2] = "success";
        MessageSeverity[MessageSeverity["error"] = 3] = "error";
        MessageSeverity[MessageSeverity["warn"] = 4] = "warn";
        MessageSeverity[MessageSeverity["wait"] = 5] = "wait";
    })(exports.MessageSeverity || (exports.MessageSeverity = {}));
    // ******************** End ********************//

    var StorageManagerConstants = /** @class */ (function () {
        function StorageManagerConstants() {
        }
        StorageManagerConstants.DBKEY_USER_DATA = 'user_data';
        return StorageManagerConstants;
    }());

    var ConfigurationServiceConstants = /** @class */ (function () {
        function ConfigurationServiceConstants() {
        }
        ConfigurationServiceConstants.appVersion = '3.1.0';
        // ***Specify default configurations here***
        ConfigurationServiceConstants.defaultLanguage = 'en';
        ConfigurationServiceConstants.defaultHomeUrl = '/home';
        ConfigurationServiceConstants.defaultThemeId = 1;
        ConfigurationServiceConstants.defaultShowDashboardStatistics = true;
        ConfigurationServiceConstants.defaultShowDashboardNotifications = true;
        ConfigurationServiceConstants.defaultShowDashboardTodo = false;
        ConfigurationServiceConstants.defaultShowDashboardBanner = true;
        return ConfigurationServiceConstants;
    }());

    var DBkeys = /** @class */ (function () {
        function DBkeys() {
        }
        DBkeys.CURRENT_USER = 'current_user';
        DBkeys.USER_PERMISSIONS = 'user_permissions';
        DBkeys.ACCESS_TOKEN = 'access_token';
        DBkeys.REFRESH_TOKEN = 'refresh_token';
        DBkeys.TOKEN_EXPIRES_IN = 'expires_in';
        DBkeys.REMEMBER_ME = 'remember_me';
        DBkeys.LANGUAGE = 'language';
        DBkeys.HOME_URL = 'home_url';
        DBkeys.THEME_ID = 'themeId';
        DBkeys.SHOW_DASHBOARD_STATISTICS = 'show_dashboard_statistics';
        DBkeys.SHOW_DASHBOARD_NOTIFICATIONS = 'show_dashboard_notifications';
        DBkeys.SHOW_DASHBOARD_TODO = 'show_dashboard_todo';
        DBkeys.SHOW_DASHBOARD_BANNER = 'show_dashboard_banner';
        /** @nocollapse */ DBkeys.ɵfac = function DBkeys_Factory(t) { return new (t || DBkeys)(); };
        /** @nocollapse */ DBkeys.ɵprov = core.ɵɵdefineInjectable({ token: DBkeys, factory: DBkeys.ɵfac, providedIn: 'root' });
        return DBkeys;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(DBkeys, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], null, null); })();

    var Utilities = /** @class */ (function () {
        function Utilities() {
        }
        Utilities.getHttpResponseMessages = function (data) {
            var responses = [];
            if (data instanceof http.HttpResponseBase) {
                if (this.checkNoNetwork(data)) {
                    responses.push("" + this.noNetworkMessageCaption + this.captionAndMessageSeparator + " " + this.noNetworkMessageDetail);
                }
                else {
                    var responseObject = this.getResponseBody(data);
                    if (responseObject && (typeof responseObject === 'object' || responseObject instanceof Object)) {
                        for (var key in responseObject) {
                            if (key) {
                                responses.push("" + key + this.captionAndMessageSeparator + " " + responseObject[key]);
                            }
                            else if (responseObject[key]) {
                                responses.push(responseObject[key].toString());
                            }
                        }
                    }
                }
                if (!responses.length) {
                    if (data.body) {
                        responses.push("body: " + data.body);
                    }
                    if (data.error) {
                        responses.push("error: " + data.error);
                    }
                }
            }
            if (!responses.length) {
                if (this.getResponseBody(data)) {
                    responses.push(this.getResponseBody(data).toString());
                }
                else {
                    responses.push(data.toString());
                }
            }
            if (this.checkAccessDenied(data)) {
                responses.splice(0, 0, "" + this.accessDeniedMessageCaption + this.captionAndMessageSeparator + " " + this.accessDeniedMessageDetail);
            }
            if (this.checkNotFound(data)) {
                var message = "" + this.notFoundMessageCaption + this.captionAndMessageSeparator + " " + this.notFoundMessageDetail;
                if (data.url) {
                    message += ". " + data.url;
                }
                responses.splice(0, 0, message);
            }
            return responses;
        };
        Utilities.getHttpResponseMessage = function (data) {
            var httpMessage = Utilities.findHttpResponseMessage(Utilities.noNetworkMessageCaption, data) ||
                Utilities.findHttpResponseMessage(Utilities.notFoundMessageCaption, data) ||
                Utilities.findHttpResponseMessage('error_description', data) ||
                Utilities.findHttpResponseMessage('error', data) ||
                Utilities.getHttpResponseMessages(data).join();
            return httpMessage;
        };
        Utilities.findHttpResponseMessage = function (messageToFind, data, seachInCaptionOnly, includeCaptionInResult) {
            var e_1, _a, e_2, _b;
            if (seachInCaptionOnly === void 0) { seachInCaptionOnly = true; }
            if (includeCaptionInResult === void 0) { includeCaptionInResult = false; }
            var searchString = messageToFind.toLowerCase();
            var httpMessages = this.getHttpResponseMessages(data);
            try {
                for (var httpMessages_1 = __values(httpMessages), httpMessages_1_1 = httpMessages_1.next(); !httpMessages_1_1.done; httpMessages_1_1 = httpMessages_1.next()) {
                    var message = httpMessages_1_1.value;
                    var fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
                    if (fullMessage.firstPart && fullMessage.firstPart.toLowerCase().indexOf(searchString) != -1) {
                        return includeCaptionInResult ? message : fullMessage.secondPart || fullMessage.firstPart;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (httpMessages_1_1 && !httpMessages_1_1.done && (_a = httpMessages_1.return)) _a.call(httpMessages_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (!seachInCaptionOnly) {
                try {
                    for (var httpMessages_2 = __values(httpMessages), httpMessages_2_1 = httpMessages_2.next(); !httpMessages_2_1.done; httpMessages_2_1 = httpMessages_2.next()) {
                        var message = httpMessages_2_1.value;
                        if (message.toLowerCase().indexOf(searchString) != -1) {
                            if (includeCaptionInResult) {
                                return message;
                            }
                            else {
                                var fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
                                return fullMessage.secondPart || fullMessage.firstPart;
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (httpMessages_2_1 && !httpMessages_2_1.done && (_b = httpMessages_2.return)) _b.call(httpMessages_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return null;
        };
        Utilities.getResponseBody = function (response) {
            if (response instanceof http.HttpResponse) {
                return response.body;
            }
            if (response instanceof http.HttpErrorResponse) {
                return response.error || response.message || response.statusText;
            }
        };
        Utilities.checkNoNetwork = function (response) {
            if (response instanceof http.HttpResponseBase) {
                return response.status == 0;
            }
            return false;
        };
        Utilities.checkAccessDenied = function (response) {
            if (response instanceof http.HttpResponseBase) {
                return response.status == 403;
            }
            return false;
        };
        Utilities.checkNotFound = function (response) {
            if (response instanceof http.HttpResponseBase) {
                return response.status == 404;
            }
            return false;
        };
        Utilities.checkIsLocalHost = function (url, base) {
            if (url) {
                var location_1 = new URL(url, base);
                return location_1.hostname === 'localhost' || location_1.hostname === '127.0.0.1';
            }
            return false;
        };
        Utilities.getQueryParamsFromString = function (paramString) {
            var e_3, _a;
            if (!paramString) {
                return null;
            }
            var params = {};
            try {
                for (var _b = __values(paramString.split('&')), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var param = _c.value;
                    var keyValue = Utilities.splitInTwo(param, '=');
                    params[keyValue.firstPart] = keyValue.secondPart;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return params;
        };
        Utilities.splitInTwo = function (text, separator) {
            var separatorIndex = text.indexOf(separator);
            if (separatorIndex == -1) {
                return { firstPart: text, secondPart: null };
            }
            var part1 = text.substr(0, separatorIndex).trim();
            var part2 = text.substr(separatorIndex + 1).trim();
            return { firstPart: part1, secondPart: part2 };
        };
        Utilities.safeStringify = function (object) {
            var result;
            try {
                result = JSON.stringify(object);
                return result;
            }
            catch (error) {
            }
            var simpleObject = {};
            for (var prop in object) {
                if (!object.hasOwnProperty(prop)) {
                    continue;
                }
                if (typeof (object[prop]) == 'object') {
                    continue;
                }
                if (typeof (object[prop]) == 'function') {
                    continue;
                }
                simpleObject[prop] = object[prop];
            }
            result = '[***Sanitized Object***]: ' + JSON.stringify(simpleObject);
            return result;
        };
        Utilities.JsonTryParse = function (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                if (value === 'undefined') {
                    return void 0;
                }
                return value;
            }
        };
        Utilities.TestIsObjectEmpty = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        };
        Utilities.TestIsUndefined = function (value) {
            return typeof value === 'undefined';
            // return value === undefined;
        };
        Utilities.TestIsString = function (value) {
            return typeof value === 'string' || value instanceof String;
        };
        Utilities.capitalizeFirstLetter = function (text) {
            if (text) {
                return text.charAt(0).toUpperCase() + text.slice(1);
            }
            else {
                return text;
            }
        };
        Utilities.toTitleCase = function (text) {
            return text.replace(/\w\S*/g, function (subString) {
                return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
            });
        };
        Utilities.toLowerCase = function (items) {
            if (items instanceof Array) {
                var loweredRoles = [];
                for (var i = 0; i < items.length; i++) {
                    loweredRoles[i] = items[i].toLowerCase();
                }
                return loweredRoles;
            }
            else if (typeof items === 'string' || items instanceof String) {
                return items.toLowerCase();
            }
        };
        Utilities.uniqueId = function () {
            return this.randomNumber(1000000, 9000000).toString();
        };
        Utilities.randomNumber = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        Utilities.baseUrl = function () {
            var base = '';
            if (window.location.origin) {
                base = window.location.origin;
            }
            else {
                base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            return base.replace(/\/$/, '');
        };
        Utilities.printDateOnly = function (date) {
            date = new Date(date);
            var dayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
            var dayOfWeek = date.getDay();
            var dayOfMonth = date.getDate();
            var sup = '';
            var month = date.getMonth();
            var year = date.getFullYear();
            if (dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) {
                sup = 'st';
            }
            else if (dayOfMonth == 2 || dayOfMonth == 22) {
                sup = 'nd';
            }
            else if (dayOfMonth == 3 || dayOfMonth == 23) {
                sup = 'rd';
            }
            else {
                sup = 'th';
            }
            var dateString = dayNames[dayOfWeek] + ', ' + dayOfMonth + sup + ' ' + monthNames[month] + ' ' + year;
            return dateString;
        };
        Utilities.printTimeOnly = function (date) {
            date = new Date(date);
            var period = '';
            var minute = date.getMinutes().toString();
            var hour = date.getHours();
            period = hour < 12 ? 'AM' : 'PM';
            if (hour == 0) {
                hour = 12;
            }
            if (hour > 12) {
                hour = hour - 12;
            }
            if (minute.length == 1) {
                minute = '0' + minute;
            }
            var timeString = hour + ':' + minute + ' ' + period;
            return timeString;
        };
        Utilities.printDate = function (date, separator) {
            if (separator === void 0) { separator = 'at'; }
            return Utilities.printDateOnly(date) + " " + separator + " " + Utilities.printTimeOnly(date);
        };
        Utilities.printFriendlyDate = function (date, separator) {
            if (separator === void 0) { separator = '-'; }
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            var test = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            if (test.toDateString() == today.toDateString()) {
                return "Today " + separator + " " + Utilities.printTimeOnly(date);
            }
            if (test.toDateString() == yesterday.toDateString()) {
                return "Yesterday " + separator + " " + Utilities.printTimeOnly(date);
            }
            else {
                return Utilities.printDate(date, separator);
            }
        };
        Utilities.printShortDate = function (date, separator, dateTimeSeparator) {
            if (separator === void 0) { separator = '/'; }
            if (dateTimeSeparator === void 0) { dateTimeSeparator = '-'; }
            var day = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();
            var year = date.getFullYear();
            if (day.length == 1) {
                day = '0' + day;
            }
            if (month.length == 1) {
                month = '0' + month;
            }
            return "" + month + separator + day + separator + year + " " + dateTimeSeparator + " " + Utilities.printTimeOnly(date);
        };
        Utilities.parseDate = function (date) {
            if (date) {
                if (date instanceof Date) {
                    return date;
                }
                if (typeof date === 'string' || date instanceof String) {
                    if (date.search(/[a-su-z+]/i) == -1) {
                        date = date + 'Z';
                    }
                    return new Date(date);
                }
                if (typeof date === 'number' || date instanceof Number) {
                    return new Date(date);
                }
            }
        };
        Utilities.printDuration = function (start, end) {
            start = new Date(start);
            end = new Date(end);
            // get total seconds between the times
            var delta = Math.abs(start.valueOf() - end.valueOf()) / 1000;
            // calculate (and subtract) whole days
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;
            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            // what's left is seconds
            var seconds = delta % 60; // in theory the modulus is not required
            var printedDays = '';
            if (days) {
                printedDays = days + " days";
            }
            if (hours) {
                printedDays += printedDays ? ", " + hours + " hours" : hours + " hours";
            }
            if (minutes) {
                printedDays += printedDays ? ", " + minutes + " minutes" : minutes + " minutes";
            }
            if (seconds) {
                printedDays += printedDays ? " and " + seconds + " seconds" : seconds + " seconds";
            }
            if (!printedDays) {
                printedDays = '0';
            }
            return printedDays;
        };
        Utilities.getAge = function (birthDate, otherDate) {
            birthDate = new Date(birthDate);
            otherDate = new Date(otherDate);
            var years = (otherDate.getFullYear() - birthDate.getFullYear());
            if (otherDate.getMonth() < birthDate.getMonth() ||
                otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
                years--;
            }
            return years;
        };
        Utilities.searchArray = function (searchTerm, caseSensitive) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (!searchTerm) {
                return true;
            }
            var filter = searchTerm.trim();
            var data = values.join();
            if (!caseSensitive) {
                filter = filter.toLowerCase();
                data = data.toLowerCase();
            }
            return data.indexOf(filter) != -1;
        };
        Utilities.moveArrayItem = function (array, oldIndex, newIndex) {
            if (oldIndex < 0) {
                return;
            }
            if (newIndex < 0) {
                newIndex += array.length;
            }
            if (newIndex >= array.length) {
                var k = newIndex - array.length;
                while ((k--) + 1) {
                    array.push(undefined);
                }
            }
            array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        };
        Utilities.expandCamelCase = function (text) {
            if (!text) {
                return text;
            }
            return text.replace(/([A-Z][a-z]+)/g, ' $1')
                .replace(/([A-Z][A-Z]+)/g, ' $1')
                .replace(/([^A-Za-z ]+)/g, ' $1');
        };
        Utilities.testIsAbsoluteUrl = function (url) {
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            return r.test(url);
        };
        Utilities.convertToAbsoluteUrl = function (url) {
            return Utilities.testIsAbsoluteUrl(url) ? url : '//' + url;
        };
        Utilities.removeNulls = function (obj) {
            var isArray = obj instanceof Array;
            for (var k in obj) {
                if (obj[k] === null) {
                    isArray ? obj.splice(k, 1) : delete obj[k];
                }
                else if (typeof obj[k] == 'object') {
                    Utilities.removeNulls(obj[k]);
                }
                if (isArray && obj.length == k) {
                    Utilities.removeNulls(obj);
                }
            }
            return obj;
        };
        Utilities.debounce = function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this;
                var args_ = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) {
                        func.apply(context, args_);
                    }
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args_);
                }
            };
        };
        Utilities.captionAndMessageSeparator = ':';
        Utilities.noNetworkMessageCaption = 'No Network';
        Utilities.noNetworkMessageDetail = 'The server cannot be reached';
        Utilities.accessDeniedMessageCaption = 'Access Denied!';
        Utilities.accessDeniedMessageDetail = '';
        Utilities.notFoundMessageCaption = 'Not Found';
        Utilities.notFoundMessageDetail = 'The target resource cannot be found';
        Utilities.cookies = {
            getItem: function (sKey) {
                return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
            },
            setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
                if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                    return false;
                }
                var sExpires = '';
                if (vEnd) {
                    switch (vEnd.constructor) {
                        case Number:
                            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
                            break;
                        case String:
                            sExpires = '; expires=' + vEnd;
                            break;
                        case Date:
                            sExpires = '; expires=' + vEnd.toUTCString();
                            break;
                    }
                }
                document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
                return true;
            },
            removeItem: function (sKey, sPath, sDomain) {
                if (!sKey) {
                    return false;
                }
                document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
                return true;
            },
            hasItem: function (sKey) {
                return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
            },
            keys: function () {
                var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
                for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
                }
                return aKeys;
            }
        };
        /** @nocollapse */ Utilities.ɵfac = function Utilities_Factory(t) { return new (t || Utilities)(); };
        /** @nocollapse */ Utilities.ɵprov = core.ɵɵdefineInjectable({ token: Utilities, factory: Utilities.ɵfac, providedIn: 'root' });
        return Utilities;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(Utilities, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], null, null); })();

    // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.
    var environment = {
        production: false,
        baseUrl: null,
        tokenUrl: null,
        loginUrl: '/login'
    };

    var ServiceProviderBase = /** @class */ (function () {
        function ServiceProviderBase() {
        }
        return ServiceProviderBase;
    }());

    var AlertServiceAbstractProvider = /** @class */ (function (_super) {
        __extends(AlertServiceAbstractProvider, _super);
        function AlertServiceAbstractProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** @nocollapse */ AlertServiceAbstractProvider.ɵfac = function AlertServiceAbstractProvider_Factory(t) { return ɵAlertServiceAbstractProvider_BaseFactory(t || AlertServiceAbstractProvider); };
        /** @nocollapse */ AlertServiceAbstractProvider.ɵprov = core.ɵɵdefineInjectable({ token: AlertServiceAbstractProvider, factory: AlertServiceAbstractProvider.ɵfac });
        return AlertServiceAbstractProvider;
    }(ServiceProviderBase));
    var ɵAlertServiceAbstractProvider_BaseFactory = core.ɵɵgetInheritedFactory(AlertServiceAbstractProvider);
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AlertServiceAbstractProvider, [{
            type: core.Injectable
        }], null, null); })();

    var TranslationServiceAbstractProvider = /** @class */ (function (_super) {
        __extends(TranslationServiceAbstractProvider, _super);
        function TranslationServiceAbstractProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** @nocollapse */ TranslationServiceAbstractProvider.ɵfac = function TranslationServiceAbstractProvider_Factory(t) { return ɵTranslationServiceAbstractProvider_BaseFactory(t || TranslationServiceAbstractProvider); };
        /** @nocollapse */ TranslationServiceAbstractProvider.ɵprov = core.ɵɵdefineInjectable({ token: TranslationServiceAbstractProvider, factory: TranslationServiceAbstractProvider.ɵfac });
        return TranslationServiceAbstractProvider;
    }(ServiceProviderBase));
    var ɵTranslationServiceAbstractProvider_BaseFactory = core.ɵɵgetInheritedFactory(TranslationServiceAbstractProvider);
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(TranslationServiceAbstractProvider, [{
            type: core.Injectable
        }], null, null); })();

    var ConfigurationServiceAbstractProvider = /** @class */ (function (_super) {
        __extends(ConfigurationServiceAbstractProvider, _super);
        function ConfigurationServiceAbstractProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** @nocollapse */ ConfigurationServiceAbstractProvider.ɵfac = function ConfigurationServiceAbstractProvider_Factory(t) { return ɵConfigurationServiceAbstractProvider_BaseFactory(t || ConfigurationServiceAbstractProvider); };
        /** @nocollapse */ ConfigurationServiceAbstractProvider.ɵprov = core.ɵɵdefineInjectable({ token: ConfigurationServiceAbstractProvider, factory: ConfigurationServiceAbstractProvider.ɵfac });
        return ConfigurationServiceAbstractProvider;
    }(ServiceProviderBase));
    var ɵConfigurationServiceAbstractProvider_BaseFactory = core.ɵɵgetInheritedFactory(ConfigurationServiceAbstractProvider);
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(ConfigurationServiceAbstractProvider, [{
            type: core.Injectable
        }], null, null); })();

    var LocalStoreManagerServiceAbstractProvider = /** @class */ (function (_super) {
        __extends(LocalStoreManagerServiceAbstractProvider, _super);
        function LocalStoreManagerServiceAbstractProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** @nocollapse */ LocalStoreManagerServiceAbstractProvider.ɵfac = function LocalStoreManagerServiceAbstractProvider_Factory(t) { return ɵLocalStoreManagerServiceAbstractProvider_BaseFactory(t || LocalStoreManagerServiceAbstractProvider); };
        /** @nocollapse */ LocalStoreManagerServiceAbstractProvider.ɵprov = core.ɵɵdefineInjectable({ token: LocalStoreManagerServiceAbstractProvider, factory: LocalStoreManagerServiceAbstractProvider.ɵfac });
        return LocalStoreManagerServiceAbstractProvider;
    }(ServiceProviderBase));
    var ɵLocalStoreManagerServiceAbstractProvider_BaseFactory = core.ɵɵgetInheritedFactory(LocalStoreManagerServiceAbstractProvider);
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LocalStoreManagerServiceAbstractProvider, [{
            type: core.Injectable
        }], null, null); })();

    var ThemeManagerAbstractProvider = /** @class */ (function (_super) {
        __extends(ThemeManagerAbstractProvider, _super);
        function ThemeManagerAbstractProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** @nocollapse */ ThemeManagerAbstractProvider.ɵfac = function ThemeManagerAbstractProvider_Factory(t) { return ɵThemeManagerAbstractProvider_BaseFactory(t || ThemeManagerAbstractProvider); };
        /** @nocollapse */ ThemeManagerAbstractProvider.ɵprov = core.ɵɵdefineInjectable({ token: ThemeManagerAbstractProvider, factory: ThemeManagerAbstractProvider.ɵfac });
        return ThemeManagerAbstractProvider;
    }(ServiceProviderBase));
    var ɵThemeManagerAbstractProvider_BaseFactory = core.ɵɵgetInheritedFactory(ThemeManagerAbstractProvider);
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(ThemeManagerAbstractProvider, [{
            type: core.Injectable
        }], null, null); })();

    var NgxAppkitContractsAlphaModule = /** @class */ (function () {
        function NgxAppkitContractsAlphaModule() {
        }
        /** @nocollapse */ NgxAppkitContractsAlphaModule.ɵmod = core.ɵɵdefineNgModule({ type: NgxAppkitContractsAlphaModule });
        /** @nocollapse */ NgxAppkitContractsAlphaModule.ɵinj = core.ɵɵdefineInjector({ factory: function NgxAppkitContractsAlphaModule_Factory(t) { return new (t || NgxAppkitContractsAlphaModule)(); }, providers: [], imports: [[]] });
        return NgxAppkitContractsAlphaModule;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgxAppkitContractsAlphaModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                    providers: []
                }]
        }], null, null); })();

    exports.AlertCommand = AlertCommand;
    exports.AlertDialog = AlertDialog;
    exports.AlertMessage = AlertMessage;
    exports.AlertServiceAbstractProvider = AlertServiceAbstractProvider;
    exports.ConfigurationServiceAbstractProvider = ConfigurationServiceAbstractProvider;
    exports.ConfigurationServiceConstants = ConfigurationServiceConstants;
    exports.DBkeys = DBkeys;
    exports.LocalStoreManagerServiceAbstractProvider = LocalStoreManagerServiceAbstractProvider;
    exports.NgxAppkitContractsAlphaModule = NgxAppkitContractsAlphaModule;
    exports.ServiceProviderBase = ServiceProviderBase;
    exports.StorageManagerConstants = StorageManagerConstants;
    exports.ThemeManagerAbstractProvider = ThemeManagerAbstractProvider;
    exports.TranslationServiceAbstractProvider = TranslationServiceAbstractProvider;
    exports.Utilities = Utilities;
    exports.environment = environment;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-appkit-contracts-alpha.umd.js.map
