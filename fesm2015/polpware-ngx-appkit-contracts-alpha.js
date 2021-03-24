import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵgetInheritedFactory, ɵɵdefineNgModule, ɵɵdefineInjector, NgModule } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';

// ******************** Dialog ********************//
class AlertDialog {
    constructor(message, type, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel) {
        this.message = message;
        this.type = type;
        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;
        this.defaultValue = defaultValue;
        this.okLabel = okLabel;
        this.cancelLabel = cancelLabel;
    }
}
var DialogType;
(function (DialogType) {
    DialogType[DialogType["alert"] = 0] = "alert";
    DialogType[DialogType["confirm"] = 1] = "confirm";
    DialogType[DialogType["prompt"] = 2] = "prompt";
})(DialogType || (DialogType = {}));
// ******************** End ********************//
// ******************** Growls ********************//
class AlertCommand {
    constructor(operation, message, onRemove) {
        this.operation = operation;
        this.message = message;
        this.onRemove = onRemove;
    }
}
class AlertMessage {
    constructor(severity, summary, detail) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
}
var MessageSeverity;
(function (MessageSeverity) {
    MessageSeverity[MessageSeverity["default"] = 0] = "default";
    MessageSeverity[MessageSeverity["info"] = 1] = "info";
    MessageSeverity[MessageSeverity["success"] = 2] = "success";
    MessageSeverity[MessageSeverity["error"] = 3] = "error";
    MessageSeverity[MessageSeverity["warn"] = 4] = "warn";
    MessageSeverity[MessageSeverity["wait"] = 5] = "wait";
})(MessageSeverity || (MessageSeverity = {}));
// ******************** End ********************//

class StorageManagerConstants {
}
StorageManagerConstants.DBKEY_USER_DATA = 'user_data';

class ConfigurationServiceConstants {
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

class DBkeys {
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
/** @nocollapse */ DBkeys.ɵprov = ɵɵdefineInjectable({ token: DBkeys, factory: DBkeys.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DBkeys, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

class Utilities {
    static getHttpResponseMessages(data) {
        const responses = [];
        if (data instanceof HttpResponseBase) {
            if (this.checkNoNetwork(data)) {
                responses.push(`${this.noNetworkMessageCaption}${this.captionAndMessageSeparator} ${this.noNetworkMessageDetail}`);
            }
            else {
                const responseObject = this.getResponseBody(data);
                if (responseObject && (typeof responseObject === 'object' || responseObject instanceof Object)) {
                    for (const key in responseObject) {
                        if (key) {
                            responses.push(`${key}${this.captionAndMessageSeparator} ${responseObject[key]}`);
                        }
                        else if (responseObject[key]) {
                            responses.push(responseObject[key].toString());
                        }
                    }
                }
            }
            if (!responses.length) {
                if (data.body) {
                    responses.push(`body: ${data.body}`);
                }
                if (data.error) {
                    responses.push(`error: ${data.error}`);
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
            responses.splice(0, 0, `${this.accessDeniedMessageCaption}${this.captionAndMessageSeparator} ${this.accessDeniedMessageDetail}`);
        }
        if (this.checkNotFound(data)) {
            let message = `${this.notFoundMessageCaption}${this.captionAndMessageSeparator} ${this.notFoundMessageDetail}`;
            if (data.url) {
                message += `. ${data.url}`;
            }
            responses.splice(0, 0, message);
        }
        return responses;
    }
    static getHttpResponseMessage(data) {
        const httpMessage = Utilities.findHttpResponseMessage(Utilities.noNetworkMessageCaption, data) ||
            Utilities.findHttpResponseMessage(Utilities.notFoundMessageCaption, data) ||
            Utilities.findHttpResponseMessage('error_description', data) ||
            Utilities.findHttpResponseMessage('error', data) ||
            Utilities.getHttpResponseMessages(data).join();
        return httpMessage;
    }
    static findHttpResponseMessage(messageToFind, data, seachInCaptionOnly = true, includeCaptionInResult = false) {
        const searchString = messageToFind.toLowerCase();
        const httpMessages = this.getHttpResponseMessages(data);
        for (const message of httpMessages) {
            const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
            if (fullMessage.firstPart && fullMessage.firstPart.toLowerCase().indexOf(searchString) != -1) {
                return includeCaptionInResult ? message : fullMessage.secondPart || fullMessage.firstPart;
            }
        }
        if (!seachInCaptionOnly) {
            for (const message of httpMessages) {
                if (message.toLowerCase().indexOf(searchString) != -1) {
                    if (includeCaptionInResult) {
                        return message;
                    }
                    else {
                        const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
                        return fullMessage.secondPart || fullMessage.firstPart;
                    }
                }
            }
        }
        return null;
    }
    static getResponseBody(response) {
        if (response instanceof HttpResponse) {
            return response.body;
        }
        if (response instanceof HttpErrorResponse) {
            return response.error || response.message || response.statusText;
        }
    }
    static checkNoNetwork(response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 0;
        }
        return false;
    }
    static checkAccessDenied(response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 403;
        }
        return false;
    }
    static checkNotFound(response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 404;
        }
        return false;
    }
    static checkIsLocalHost(url, base) {
        if (url) {
            const location = new URL(url, base);
            return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        }
        return false;
    }
    static getQueryParamsFromString(paramString) {
        if (!paramString) {
            return null;
        }
        const params = {};
        for (const param of paramString.split('&')) {
            const keyValue = Utilities.splitInTwo(param, '=');
            params[keyValue.firstPart] = keyValue.secondPart;
        }
        return params;
    }
    static splitInTwo(text, separator) {
        const separatorIndex = text.indexOf(separator);
        if (separatorIndex == -1) {
            return { firstPart: text, secondPart: null };
        }
        const part1 = text.substr(0, separatorIndex).trim();
        const part2 = text.substr(separatorIndex + 1).trim();
        return { firstPart: part1, secondPart: part2 };
    }
    static safeStringify(object) {
        let result;
        try {
            result = JSON.stringify(object);
            return result;
        }
        catch (error) {
        }
        const simpleObject = {};
        for (const prop in object) {
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
    }
    static JsonTryParse(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            if (value === 'undefined') {
                return void 0;
            }
            return value;
        }
    }
    static TestIsObjectEmpty(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }
    static TestIsUndefined(value) {
        return typeof value === 'undefined';
        // return value === undefined;
    }
    static TestIsString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    static capitalizeFirstLetter(text) {
        if (text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
        else {
            return text;
        }
    }
    static toTitleCase(text) {
        return text.replace(/\w\S*/g, (subString) => {
            return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
        });
    }
    static toLowerCase(items) {
        if (items instanceof Array) {
            const loweredRoles = [];
            for (let i = 0; i < items.length; i++) {
                loweredRoles[i] = items[i].toLowerCase();
            }
            return loweredRoles;
        }
        else if (typeof items === 'string' || items instanceof String) {
            return items.toLowerCase();
        }
    }
    static uniqueId() {
        return this.randomNumber(1000000, 9000000).toString();
    }
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static baseUrl() {
        let base = '';
        if (window.location.origin) {
            base = window.location.origin;
        }
        else {
            base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        return base.replace(/\/$/, '');
    }
    static printDateOnly(date) {
        date = new Date(date);
        const dayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        const monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        const dayOfWeek = date.getDay();
        const dayOfMonth = date.getDate();
        let sup = '';
        const month = date.getMonth();
        const year = date.getFullYear();
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
        const dateString = dayNames[dayOfWeek] + ', ' + dayOfMonth + sup + ' ' + monthNames[month] + ' ' + year;
        return dateString;
    }
    static printTimeOnly(date) {
        date = new Date(date);
        let period = '';
        let minute = date.getMinutes().toString();
        let hour = date.getHours();
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
        const timeString = hour + ':' + minute + ' ' + period;
        return timeString;
    }
    static printDate(date, separator = 'at') {
        return `${Utilities.printDateOnly(date)} ${separator} ${Utilities.printTimeOnly(date)}`;
    }
    static printFriendlyDate(date, separator = '-') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const test = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (test.toDateString() == today.toDateString()) {
            return `Today ${separator} ${Utilities.printTimeOnly(date)}`;
        }
        if (test.toDateString() == yesterday.toDateString()) {
            return `Yesterday ${separator} ${Utilities.printTimeOnly(date)}`;
        }
        else {
            return Utilities.printDate(date, separator);
        }
    }
    static printShortDate(date, separator = '/', dateTimeSeparator = '-') {
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        if (day.length == 1) {
            day = '0' + day;
        }
        if (month.length == 1) {
            month = '0' + month;
        }
        return `${month}${separator}${day}${separator}${year} ${dateTimeSeparator} ${Utilities.printTimeOnly(date)}`;
    }
    static parseDate(date) {
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
    }
    static printDuration(start, end) {
        start = new Date(start);
        end = new Date(end);
        // get total seconds between the times
        let delta = Math.abs(start.valueOf() - end.valueOf()) / 1000;
        // calculate (and subtract) whole days
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        const seconds = delta % 60; // in theory the modulus is not required
        let printedDays = '';
        if (days) {
            printedDays = `${days} days`;
        }
        if (hours) {
            printedDays += printedDays ? `, ${hours} hours` : `${hours} hours`;
        }
        if (minutes) {
            printedDays += printedDays ? `, ${minutes} minutes` : `${minutes} minutes`;
        }
        if (seconds) {
            printedDays += printedDays ? ` and ${seconds} seconds` : `${seconds} seconds`;
        }
        if (!printedDays) {
            printedDays = '0';
        }
        return printedDays;
    }
    static getAge(birthDate, otherDate) {
        birthDate = new Date(birthDate);
        otherDate = new Date(otherDate);
        let years = (otherDate.getFullYear() - birthDate.getFullYear());
        if (otherDate.getMonth() < birthDate.getMonth() ||
            otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--;
        }
        return years;
    }
    static searchArray(searchTerm, caseSensitive, ...values) {
        if (!searchTerm) {
            return true;
        }
        let filter = searchTerm.trim();
        let data = values.join();
        if (!caseSensitive) {
            filter = filter.toLowerCase();
            data = data.toLowerCase();
        }
        return data.indexOf(filter) != -1;
    }
    static moveArrayItem(array, oldIndex, newIndex) {
        if (oldIndex < 0) {
            return;
        }
        if (newIndex < 0) {
            newIndex += array.length;
        }
        if (newIndex >= array.length) {
            let k = newIndex - array.length;
            while ((k--) + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    }
    static expandCamelCase(text) {
        if (!text) {
            return text;
        }
        return text.replace(/([A-Z][a-z]+)/g, ' $1')
            .replace(/([A-Z][A-Z]+)/g, ' $1')
            .replace(/([^A-Za-z ]+)/g, ' $1');
    }
    static testIsAbsoluteUrl(url) {
        const r = new RegExp('^(?:[a-z]+:)?//', 'i');
        return r.test(url);
    }
    static convertToAbsoluteUrl(url) {
        return Utilities.testIsAbsoluteUrl(url) ? url : '//' + url;
    }
    static removeNulls(obj) {
        const isArray = obj instanceof Array;
        for (const k in obj) {
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
    }
    static debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this;
            const args_ = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args_);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args_);
            }
        };
    }
}
Utilities.captionAndMessageSeparator = ':';
Utilities.noNetworkMessageCaption = 'No Network';
Utilities.noNetworkMessageDetail = 'The server cannot be reached';
Utilities.accessDeniedMessageCaption = 'Access Denied!';
Utilities.accessDeniedMessageDetail = '';
Utilities.notFoundMessageCaption = 'Not Found';
Utilities.notFoundMessageDetail = 'The target resource cannot be found';
Utilities.cookies = {
    getItem: (sKey) => {
        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    },
    setItem: (sKey, sValue, vEnd, sPath, sDomain, bSecure) => {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        let sExpires = '';
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
    removeItem: (sKey, sPath, sDomain) => {
        if (!sKey) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
        return true;
    },
    hasItem: (sKey) => {
        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    },
    keys: () => {
        const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};
/** @nocollapse */ Utilities.ɵfac = function Utilities_Factory(t) { return new (t || Utilities)(); };
/** @nocollapse */ Utilities.ɵprov = ɵɵdefineInjectable({ token: Utilities, factory: Utilities.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Utilities, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    baseUrl: null,
    tokenUrl: null,
    loginUrl: '/login'
};

class ServiceProviderBase {
}

class AlertServiceAbstractProvider extends ServiceProviderBase {
}
/** @nocollapse */ AlertServiceAbstractProvider.ɵfac = function AlertServiceAbstractProvider_Factory(t) { return ɵAlertServiceAbstractProvider_BaseFactory(t || AlertServiceAbstractProvider); };
/** @nocollapse */ AlertServiceAbstractProvider.ɵprov = ɵɵdefineInjectable({ token: AlertServiceAbstractProvider, factory: AlertServiceAbstractProvider.ɵfac });
const ɵAlertServiceAbstractProvider_BaseFactory = ɵɵgetInheritedFactory(AlertServiceAbstractProvider);
/*@__PURE__*/ (function () { ɵsetClassMetadata(AlertServiceAbstractProvider, [{
        type: Injectable
    }], null, null); })();

class TranslationServiceAbstractProvider extends ServiceProviderBase {
}
/** @nocollapse */ TranslationServiceAbstractProvider.ɵfac = function TranslationServiceAbstractProvider_Factory(t) { return ɵTranslationServiceAbstractProvider_BaseFactory(t || TranslationServiceAbstractProvider); };
/** @nocollapse */ TranslationServiceAbstractProvider.ɵprov = ɵɵdefineInjectable({ token: TranslationServiceAbstractProvider, factory: TranslationServiceAbstractProvider.ɵfac });
const ɵTranslationServiceAbstractProvider_BaseFactory = ɵɵgetInheritedFactory(TranslationServiceAbstractProvider);
/*@__PURE__*/ (function () { ɵsetClassMetadata(TranslationServiceAbstractProvider, [{
        type: Injectable
    }], null, null); })();

class ConfigurationServiceAbstractProvider extends ServiceProviderBase {
}
/** @nocollapse */ ConfigurationServiceAbstractProvider.ɵfac = function ConfigurationServiceAbstractProvider_Factory(t) { return ɵConfigurationServiceAbstractProvider_BaseFactory(t || ConfigurationServiceAbstractProvider); };
/** @nocollapse */ ConfigurationServiceAbstractProvider.ɵprov = ɵɵdefineInjectable({ token: ConfigurationServiceAbstractProvider, factory: ConfigurationServiceAbstractProvider.ɵfac });
const ɵConfigurationServiceAbstractProvider_BaseFactory = ɵɵgetInheritedFactory(ConfigurationServiceAbstractProvider);
/*@__PURE__*/ (function () { ɵsetClassMetadata(ConfigurationServiceAbstractProvider, [{
        type: Injectable
    }], null, null); })();

class LocalStoreManagerServiceAbstractProvider extends ServiceProviderBase {
}
/** @nocollapse */ LocalStoreManagerServiceAbstractProvider.ɵfac = function LocalStoreManagerServiceAbstractProvider_Factory(t) { return ɵLocalStoreManagerServiceAbstractProvider_BaseFactory(t || LocalStoreManagerServiceAbstractProvider); };
/** @nocollapse */ LocalStoreManagerServiceAbstractProvider.ɵprov = ɵɵdefineInjectable({ token: LocalStoreManagerServiceAbstractProvider, factory: LocalStoreManagerServiceAbstractProvider.ɵfac });
const ɵLocalStoreManagerServiceAbstractProvider_BaseFactory = ɵɵgetInheritedFactory(LocalStoreManagerServiceAbstractProvider);
/*@__PURE__*/ (function () { ɵsetClassMetadata(LocalStoreManagerServiceAbstractProvider, [{
        type: Injectable
    }], null, null); })();

class ThemeManagerAbstractProvider extends ServiceProviderBase {
}
/** @nocollapse */ ThemeManagerAbstractProvider.ɵfac = function ThemeManagerAbstractProvider_Factory(t) { return ɵThemeManagerAbstractProvider_BaseFactory(t || ThemeManagerAbstractProvider); };
/** @nocollapse */ ThemeManagerAbstractProvider.ɵprov = ɵɵdefineInjectable({ token: ThemeManagerAbstractProvider, factory: ThemeManagerAbstractProvider.ɵfac });
const ɵThemeManagerAbstractProvider_BaseFactory = ɵɵgetInheritedFactory(ThemeManagerAbstractProvider);
/*@__PURE__*/ (function () { ɵsetClassMetadata(ThemeManagerAbstractProvider, [{
        type: Injectable
    }], null, null); })();

class NgxAppkitContractsAlphaModule {
}
/** @nocollapse */ NgxAppkitContractsAlphaModule.ɵmod = ɵɵdefineNgModule({ type: NgxAppkitContractsAlphaModule });
/** @nocollapse */ NgxAppkitContractsAlphaModule.ɵinj = ɵɵdefineInjector({ factory: function NgxAppkitContractsAlphaModule_Factory(t) { return new (t || NgxAppkitContractsAlphaModule)(); }, providers: [], imports: [[]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxAppkitContractsAlphaModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [],
                exports: [],
                providers: []
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-appkit-contracts-alpha
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AlertCommand, AlertDialog, AlertMessage, AlertServiceAbstractProvider, ConfigurationServiceAbstractProvider, ConfigurationServiceConstants, DBkeys, DialogType, LocalStoreManagerServiceAbstractProvider, MessageSeverity, NgxAppkitContractsAlphaModule, ServiceProviderBase, StorageManagerConstants, ThemeManagerAbstractProvider, TranslationServiceAbstractProvider, Utilities, environment };
//# sourceMappingURL=polpware-ngx-appkit-contracts-alpha.js.map
