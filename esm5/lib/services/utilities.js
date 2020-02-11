/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/utilities.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// Supress angular complication error
// @dynamic
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    Utilities.getHttpResponseMessages = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var responses = [];
        if (data instanceof HttpResponseBase) {
            if (this.checkNoNetwork(data)) {
                responses.push("" + this.noNetworkMessageCaption + this.captionAndMessageSeparator + " " + this.noNetworkMessageDetail);
            }
            else {
                /** @type {?} */
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
                if (((/** @type {?} */ (data))).body) {
                    responses.push("body: " + ((/** @type {?} */ (data))).body);
                }
                if (((/** @type {?} */ (data))).error) {
                    responses.push("error: " + ((/** @type {?} */ (data))).error);
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
            /** @type {?} */
            var message = "" + this.notFoundMessageCaption + this.captionAndMessageSeparator + " " + this.notFoundMessageDetail;
            if (data.url) {
                message += ". " + data.url;
            }
            responses.splice(0, 0, message);
        }
        return responses;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Utilities.getHttpResponseMessage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var httpMessage = Utilities.findHttpResponseMessage(Utilities.noNetworkMessageCaption, data) ||
            Utilities.findHttpResponseMessage(Utilities.notFoundMessageCaption, data) ||
            Utilities.findHttpResponseMessage('error_description', data) ||
            Utilities.findHttpResponseMessage('error', data) ||
            Utilities.getHttpResponseMessages(data).join();
        return httpMessage;
    };
    /**
     * @param {?} messageToFind
     * @param {?} data
     * @param {?=} seachInCaptionOnly
     * @param {?=} includeCaptionInResult
     * @return {?}
     */
    Utilities.findHttpResponseMessage = /**
     * @param {?} messageToFind
     * @param {?} data
     * @param {?=} seachInCaptionOnly
     * @param {?=} includeCaptionInResult
     * @return {?}
     */
    function (messageToFind, data, seachInCaptionOnly, includeCaptionInResult) {
        var e_1, _a, e_2, _b;
        if (seachInCaptionOnly === void 0) { seachInCaptionOnly = true; }
        if (includeCaptionInResult === void 0) { includeCaptionInResult = false; }
        /** @type {?} */
        var searchString = messageToFind.toLowerCase();
        /** @type {?} */
        var httpMessages = this.getHttpResponseMessages(data);
        try {
            for (var httpMessages_1 = tslib_1.__values(httpMessages), httpMessages_1_1 = httpMessages_1.next(); !httpMessages_1_1.done; httpMessages_1_1 = httpMessages_1.next()) {
                var message = httpMessages_1_1.value;
                /** @type {?} */
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
                for (var httpMessages_2 = tslib_1.__values(httpMessages), httpMessages_2_1 = httpMessages_2.next(); !httpMessages_2_1.done; httpMessages_2_1 = httpMessages_2.next()) {
                    var message = httpMessages_2_1.value;
                    if (message.toLowerCase().indexOf(searchString) != -1) {
                        if (includeCaptionInResult) {
                            return message;
                        }
                        else {
                            /** @type {?} */
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
    /**
     * @param {?} response
     * @return {?}
     */
    Utilities.getResponseBody = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (response instanceof HttpResponse) {
            return response.body;
        }
        if (response instanceof HttpErrorResponse) {
            return response.error || response.message || response.statusText;
        }
    };
    /**
     * @param {?} response
     * @return {?}
     */
    Utilities.checkNoNetwork = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 0;
        }
        return false;
    };
    /**
     * @param {?} response
     * @return {?}
     */
    Utilities.checkAccessDenied = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 403;
        }
        return false;
    };
    /**
     * @param {?} response
     * @return {?}
     */
    Utilities.checkNotFound = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 404;
        }
        return false;
    };
    /**
     * @param {?} url
     * @param {?=} base
     * @return {?}
     */
    Utilities.checkIsLocalHost = /**
     * @param {?} url
     * @param {?=} base
     * @return {?}
     */
    function (url, base) {
        if (url) {
            /** @type {?} */
            var location_1 = new URL(url, base);
            return location_1.hostname === 'localhost' || location_1.hostname === '127.0.0.1';
        }
        return false;
    };
    /**
     * @param {?} paramString
     * @return {?}
     */
    Utilities.getQueryParamsFromString = /**
     * @param {?} paramString
     * @return {?}
     */
    function (paramString) {
        var e_3, _a;
        if (!paramString) {
            return null;
        }
        /** @type {?} */
        var params = {};
        try {
            for (var _b = tslib_1.__values(paramString.split('&')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var param = _c.value;
                /** @type {?} */
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
    /**
     * @param {?} text
     * @param {?} separator
     * @return {?}
     */
    Utilities.splitInTwo = /**
     * @param {?} text
     * @param {?} separator
     * @return {?}
     */
    function (text, separator) {
        /** @type {?} */
        var separatorIndex = text.indexOf(separator);
        if (separatorIndex == -1) {
            return { firstPart: text, secondPart: null };
        }
        /** @type {?} */
        var part1 = text.substr(0, separatorIndex).trim();
        /** @type {?} */
        var part2 = text.substr(separatorIndex + 1).trim();
        return { firstPart: part1, secondPart: part2 };
    };
    /**
     * @param {?} object
     * @return {?}
     */
    Utilities.safeStringify = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        /** @type {?} */
        var result;
        try {
            result = JSON.stringify(object);
            return result;
        }
        catch (error) {
        }
        /** @type {?} */
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
    /**
     * @param {?} value
     * @return {?}
     */
    Utilities.JsonTryParse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    /**
     * @param {?} obj
     * @return {?}
     */
    Utilities.TestIsObjectEmpty = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Utilities.TestIsUndefined = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'undefined';
        // return value === undefined;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Utilities.TestIsString = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'string' || value instanceof String;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    Utilities.capitalizeFirstLetter = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
        else {
            return text;
        }
    };
    /**
     * @param {?} text
     * @return {?}
     */
    Utilities.toTitleCase = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        return text.replace(/\w\S*/g, (/**
         * @param {?} subString
         * @return {?}
         */
        function (subString) {
            return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
        }));
    };
    /**
     * @param {?} items
     * @return {?}
     */
    Utilities.toLowerCase = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (items instanceof Array) {
            /** @type {?} */
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
    /**
     * @return {?}
     */
    Utilities.uniqueId = /**
     * @return {?}
     */
    function () {
        return this.randomNumber(1000000, 9000000).toString();
    };
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    Utilities.randomNumber = /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /**
     * @return {?}
     */
    Utilities.baseUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var base = '';
        if (window.location.origin) {
            base = window.location.origin;
        }
        else {
            base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        return base.replace(/\/$/, '');
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Utilities.printDateOnly = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        date = new Date(date);
        /** @type {?} */
        var dayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        /** @type {?} */
        var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        /** @type {?} */
        var dayOfWeek = date.getDay();
        /** @type {?} */
        var dayOfMonth = date.getDate();
        /** @type {?} */
        var sup = '';
        /** @type {?} */
        var month = date.getMonth();
        /** @type {?} */
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
        /** @type {?} */
        var dateString = dayNames[dayOfWeek] + ', ' + dayOfMonth + sup + ' ' + monthNames[month] + ' ' + year;
        return dateString;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Utilities.printTimeOnly = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        date = new Date(date);
        /** @type {?} */
        var period = '';
        /** @type {?} */
        var minute = date.getMinutes().toString();
        /** @type {?} */
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
        /** @type {?} */
        var timeString = hour + ':' + minute + ' ' + period;
        return timeString;
    };
    /**
     * @param {?} date
     * @param {?=} separator
     * @return {?}
     */
    Utilities.printDate = /**
     * @param {?} date
     * @param {?=} separator
     * @return {?}
     */
    function (date, separator) {
        if (separator === void 0) { separator = 'at'; }
        return Utilities.printDateOnly(date) + " " + separator + " " + Utilities.printTimeOnly(date);
    };
    /**
     * @param {?} date
     * @param {?=} separator
     * @return {?}
     */
    Utilities.printFriendlyDate = /**
     * @param {?} date
     * @param {?=} separator
     * @return {?}
     */
    function (date, separator) {
        if (separator === void 0) { separator = '-'; }
        /** @type {?} */
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        /** @type {?} */
        var yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        /** @type {?} */
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
    /**
     * @param {?} date
     * @param {?=} separator
     * @param {?=} dateTimeSeparator
     * @return {?}
     */
    Utilities.printShortDate = /**
     * @param {?} date
     * @param {?=} separator
     * @param {?=} dateTimeSeparator
     * @return {?}
     */
    function (date, separator, dateTimeSeparator) {
        if (separator === void 0) { separator = '/'; }
        if (dateTimeSeparator === void 0) { dateTimeSeparator = '-'; }
        /** @type {?} */
        var day = date.getDate().toString();
        /** @type {?} */
        var month = (date.getMonth() + 1).toString();
        /** @type {?} */
        var year = date.getFullYear();
        if (day.length == 1) {
            day = '0' + day;
        }
        if (month.length == 1) {
            month = '0' + month;
        }
        return "" + month + separator + day + separator + year + " " + dateTimeSeparator + " " + Utilities.printTimeOnly(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Utilities.parseDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
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
                return new Date((/** @type {?} */ (date)));
            }
        }
    };
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    Utilities.printDuration = /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
        start = new Date(start);
        end = new Date(end);
        // get total seconds between the times
        /** @type {?} */
        var delta = Math.abs(start.valueOf() - end.valueOf()) / 1000;
        // calculate (and subtract) whole days
        /** @type {?} */
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        /** @type {?} */
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        /** @type {?} */
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        /** @type {?} */
        var seconds = delta % 60;
        // in theory the modulus is not required
        /** @type {?} */
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
    /**
     * @param {?} birthDate
     * @param {?} otherDate
     * @return {?}
     */
    Utilities.getAge = /**
     * @param {?} birthDate
     * @param {?} otherDate
     * @return {?}
     */
    function (birthDate, otherDate) {
        birthDate = new Date(birthDate);
        otherDate = new Date(otherDate);
        /** @type {?} */
        var years = (otherDate.getFullYear() - birthDate.getFullYear());
        if (otherDate.getMonth() < birthDate.getMonth() ||
            otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--;
        }
        return years;
    };
    /**
     * @param {?} searchTerm
     * @param {?} caseSensitive
     * @param {...?} values
     * @return {?}
     */
    Utilities.searchArray = /**
     * @param {?} searchTerm
     * @param {?} caseSensitive
     * @param {...?} values
     * @return {?}
     */
    function (searchTerm, caseSensitive) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        if (!searchTerm) {
            return true;
        }
        /** @type {?} */
        var filter = searchTerm.trim();
        /** @type {?} */
        var data = values.join();
        if (!caseSensitive) {
            filter = filter.toLowerCase();
            data = data.toLowerCase();
        }
        return data.indexOf(filter) != -1;
    };
    /**
     * @param {?} array
     * @param {?} oldIndex
     * @param {?} newIndex
     * @return {?}
     */
    Utilities.moveArrayItem = /**
     * @param {?} array
     * @param {?} oldIndex
     * @param {?} newIndex
     * @return {?}
     */
    function (array, oldIndex, newIndex) {
        if (oldIndex < 0) {
            return;
        }
        if (newIndex < 0) {
            newIndex += array.length;
        }
        if (newIndex >= array.length) {
            /** @type {?} */
            var k = newIndex - array.length;
            while ((k--) + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    };
    /**
     * @param {?} text
     * @return {?}
     */
    Utilities.expandCamelCase = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (!text) {
            return text;
        }
        return text.replace(/([A-Z][a-z]+)/g, ' $1')
            .replace(/([A-Z][A-Z]+)/g, ' $1')
            .replace(/([^A-Za-z ]+)/g, ' $1');
    };
    /**
     * @param {?} url
     * @return {?}
     */
    Utilities.testIsAbsoluteUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var r = new RegExp('^(?:[a-z]+:)?//', 'i');
        return r.test(url);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    Utilities.convertToAbsoluteUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return Utilities.testIsAbsoluteUrl(url) ? url : '//' + url;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    Utilities.removeNulls = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
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
    /**
     * @param {?} func
     * @param {?} wait
     * @param {?=} immediate
     * @return {?}
     */
    Utilities.debounce = /**
     * @param {?} func
     * @param {?} wait
     * @param {?=} immediate
     * @return {?}
     */
    function (func, wait, immediate) {
        /** @type {?} */
        var timeout;
        return (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var context = this;
            /** @type {?} */
            var args_ = arguments;
            /** @type {?} */
            var later = (/**
             * @return {?}
             */
            function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args_);
                }
            });
            /** @type {?} */
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args_);
            }
        });
    };
    Utilities.captionAndMessageSeparator = ':';
    Utilities.noNetworkMessageCaption = 'No Network';
    Utilities.noNetworkMessageDetail = 'The server cannot be reached';
    Utilities.accessDeniedMessageCaption = 'Access Denied!';
    Utilities.accessDeniedMessageDetail = '';
    Utilities.notFoundMessageCaption = 'Not Found';
    Utilities.notFoundMessageDetail = 'The target resource cannot be found';
    Utilities.cookies = {
        getItem: (/**
         * @param {?} sKey
         * @return {?}
         */
        function (sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
        }),
        setItem: (/**
         * @param {?} sKey
         * @param {?} sValue
         * @param {?} vEnd
         * @param {?} sPath
         * @param {?} sDomain
         * @param {?} bSecure
         * @return {?}
         */
        function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            /** @type {?} */
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
        }),
        removeItem: (/**
         * @param {?} sKey
         * @param {?} sPath
         * @param {?} sDomain
         * @return {?}
         */
        function (sKey, sPath, sDomain) {
            if (!sKey) {
                return false;
            }
            document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
            return true;
        }),
        hasItem: (/**
         * @param {?} sKey
         * @return {?}
         */
        function (sKey) {
            return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
        }),
        keys: (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        })
    };
    Utilities.decorators = [
        { type: Injectable }
    ];
    return Utilities;
}());
export { Utilities };
if (false) {
    /** @type {?} */
    Utilities.captionAndMessageSeparator;
    /** @type {?} */
    Utilities.noNetworkMessageCaption;
    /** @type {?} */
    Utilities.noNetworkMessageDetail;
    /** @type {?} */
    Utilities.accessDeniedMessageCaption;
    /** @type {?} */
    Utilities.accessDeniedMessageDetail;
    /** @type {?} */
    Utilities.notFoundMessageCaption;
    /** @type {?} */
    Utilities.notFoundMessageDetail;
    /** @type {?} */
    Utilities.cookies;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3V0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBS3pGO0lBQUE7SUFvbUJBLENBQUM7Ozs7O0lBNWlCaUIsaUNBQXVCOzs7O0lBQXJDLFVBQXNDLElBQTRCOztZQUN4RCxTQUFTLEdBQWEsRUFBRTtRQUU5QixJQUFJLElBQUksWUFBWSxnQkFBZ0IsRUFBRTtZQUNsQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixTQUFJLElBQUksQ0FBQyxzQkFBd0IsQ0FBQyxDQUFDO2FBQ3RIO2lCQUFNOztvQkFDRyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBRWpELElBQUksY0FBYyxJQUFJLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxJQUFJLGNBQWMsWUFBWSxNQUFNLENBQUMsRUFBRTtvQkFFNUYsS0FBSyxJQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUU7d0JBQzlCLElBQUksR0FBRyxFQUFFOzRCQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixTQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO3lCQUNyRjs2QkFBTSxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDNUIsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFj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RSxFQUFFO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQ2xHLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtLQUNKLENBQUM7O2dCQXREVCxVQUFVOztJQW9tQlgsZ0JBQUM7Q0FBQSxBQXBtQkQsSUFvbUJDO1NBbm1CWSxTQUFTOzs7SUFDbEIscUNBQXdEOztJQUN4RCxrQ0FBOEQ7O0lBQzlELGlDQUErRTs7SUFDL0UscUNBQXFFOztJQUNyRSxvQ0FBc0Q7O0lBQ3RELGlDQUE0RDs7SUFDNUQsZ0NBQXFGOztJQUVyRixrQkE0Q00iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VCYXNlLCBIdHRwUmVzcG9uc2UsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vLyBTdXByZXNzIGFuZ3VsYXIgY29tcGxpY2F0aW9uIGVycm9yXG4vLyBAZHluYW1pY1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbGl0aWVzIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yID0gJzonO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm9OZXR3b3JrTWVzc2FnZUNhcHRpb24gPSAnTm8gTmV0d29yayc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub05ldHdvcmtNZXNzYWdlRGV0YWlsID0gJ1RoZSBzZXJ2ZXIgY2Fubm90IGJlIHJlYWNoZWQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWNjZXNzRGVuaWVkTWVzc2FnZUNhcHRpb24gPSAnQWNjZXNzIERlbmllZCEnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWNjZXNzRGVuaWVkTWVzc2FnZURldGFpbCA9ICcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90Rm91bmRNZXNzYWdlQ2FwdGlvbiA9ICdOb3QgRm91bmQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90Rm91bmRNZXNzYWdlRGV0YWlsID0gJ1RoZSB0YXJnZXQgcmVzb3VyY2UgY2Fubm90IGJlIGZvdW5kJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29va2llcyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldEl0ZW06IChzS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKCcoPzooPzpefC4qOylcXFxccyonICsgZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csICdcXFxcJCYnKSArICdcXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiQnKSwgJyQxJykpIHx8IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SXRlbTogKHNLZXksIHNWYWx1ZSwgdkVuZCwgc1BhdGgsIHNEb21haW4sIGJTZWN1cmUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXNLZXkgfHwgL14oPzpleHBpcmVzfG1heFxcLWFnZXxwYXRofGRvbWFpbnxzZWN1cmUpJC9pLnRlc3Qoc0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBzRXhwaXJlcyA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2RW5kLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRXhwaXJlcyA9IHZFbmQgPT09IEluZmluaXR5ID8gJzsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVCcgOiAnOyBtYXgtYWdlPScgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSAnOyBleHBpcmVzPScgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEYXRlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gJzsgZXhwaXJlcz0nICsgdkVuZC50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNWYWx1ZSkgKyBzRXhwaXJlcyArIChzRG9tYWluID8gJzsgZG9tYWluPScgKyBzRG9tYWluIDogJycpICsgKHNQYXRoID8gJzsgcGF0aD0nICsgc1BhdGggOiAnJykgKyAoYlNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbTogKHNLZXksIHNQYXRoLCBzRG9tYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgJz07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQnICsgKHNEb21haW4gPyAnOyBkb21haW49JyArIHNEb21haW4gOiAnJykgKyAoc1BhdGggPyAnOyBwYXRoPScgKyBzUGF0aCA6ICcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNJdGVtOiAoc0tleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFJlZ0V4cCgnKD86Xnw7XFxcXHMqKScgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgJ1xcXFwkJicpICsgJ1xcXFxzKlxcXFw9JykpLnRlc3QoZG9jdW1lbnQuY29va2llKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBrZXlzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYUtleXMgPSBkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKCg/Ol58XFxzKjspW15cXD1dKykoPz07fCQpfF5cXHMqfFxccyooPzpcXD1bXjtdKik/KD86XFwxfCQpL2csICcnKS5zcGxpdCgvXFxzKig/OlxcPVteO10qKT87XFxzKi8pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG5JZHggPSAwOyBuSWR4IDwgYUtleXMubGVuZ3RoOyBuSWR4KyspIHsgYUtleXNbbklkeF0gPSBkZWNvZGVVUklDb21wb25lbnQoYUtleXNbbklkeF0pOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFLZXlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhOiBIdHRwUmVzcG9uc2VCYXNlIHwgYW55KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNwb25zZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja05vTmV0d29yayhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGAke3RoaXMubm9OZXR3b3JrTWVzc2FnZUNhcHRpb259JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3RoaXMubm9OZXR3b3JrTWVzc2FnZURldGFpbH1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSB0aGlzLmdldFJlc3BvbnNlQm9keShkYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZU9iamVjdCAmJiAodHlwZW9mIHJlc3BvbnNlT2JqZWN0ID09PSAnb2JqZWN0JyB8fCByZXNwb25zZU9iamVjdCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXNwb25zZU9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGAke2tleX0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7cmVzcG9uc2VPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VPYmplY3Rba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlT2JqZWN0W2tleV0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICgoZGF0YSBhcyBhbnkpLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYGJvZHk6ICR7KGRhdGEgYXMgYW55KS5ib2R5fWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgoZGF0YSBhcyBhbnkpLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGBlcnJvcjogJHsoZGF0YSBhcyBhbnkpLmVycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVzcG9uc2VCb2R5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5nZXRSZXNwb25zZUJvZHkoZGF0YSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGRhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja0FjY2Vzc0RlbmllZChkYXRhKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VzLnNwbGljZSgwLCAwLCBgJHt0aGlzLmFjY2Vzc0RlbmllZE1lc3NhZ2VDYXB0aW9ufSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHt0aGlzLmFjY2Vzc0RlbmllZE1lc3NhZ2VEZXRhaWx9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja05vdEZvdW5kKGRhdGEpKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGAke3RoaXMubm90Rm91bmRNZXNzYWdlQ2FwdGlvbn0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7dGhpcy5ub3RGb3VuZE1lc3NhZ2VEZXRhaWx9YDtcbiAgICAgICAgICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYC4gJHtkYXRhLnVybH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZXMuc3BsaWNlKDAsIDAsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEh0dHBSZXNwb25zZU1lc3NhZ2UoZGF0YTogSHR0cFJlc3BvbnNlQmFzZSB8IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGh0dHBNZXNzYWdlID1cbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZShVdGlsaXRpZXMubm9OZXR3b3JrTWVzc2FnZUNhcHRpb24sIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoVXRpbGl0aWVzLm5vdEZvdW5kTWVzc2FnZUNhcHRpb24sIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoJ2Vycm9yX2Rlc2NyaXB0aW9uJywgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZSgnZXJyb3InLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpLmpvaW4oKTtcblxuICAgICAgICByZXR1cm4gaHR0cE1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSHR0cFJlc3BvbnNlTWVzc2FnZShtZXNzYWdlVG9GaW5kOiBzdHJpbmcsIGRhdGE6IEh0dHBSZXNwb25zZTxhbnk+IHwgYW55LCBzZWFjaEluQ2FwdGlvbk9ubHkgPSB0cnVlLCBpbmNsdWRlQ2FwdGlvbkluUmVzdWx0ID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZWFyY2hTdHJpbmcgPSBtZXNzYWdlVG9GaW5kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGh0dHBNZXNzYWdlcyA9IHRoaXMuZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGh0dHBNZXNzYWdlcykge1xuICAgICAgICAgICAgY29uc3QgZnVsbE1lc3NhZ2UgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCB0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgaWYgKGZ1bGxNZXNzYWdlLmZpcnN0UGFydCAmJiBmdWxsTWVzc2FnZS5maXJzdFBhcnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZUNhcHRpb25JblJlc3VsdCA/IG1lc3NhZ2UgOiBmdWxsTWVzc2FnZS5zZWNvbmRQYXJ0IHx8IGZ1bGxNZXNzYWdlLmZpcnN0UGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VhY2hJbkNhcHRpb25Pbmx5KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgaHR0cE1lc3NhZ2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZUNhcHRpb25JblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmdWxsTWVzc2FnZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKG1lc3NhZ2UsIHRoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bGxNZXNzYWdlLnNlY29uZFBhcnQgfHwgZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZXJyb3IgfHwgcmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja05vTmV0d29yayhyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0FjY2Vzc0RlbmllZChyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDQwMztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTm90Rm91bmQocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0lzTG9jYWxIb3N0KHVybDogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbmV3IFVSTCh1cmwsIGJhc2UpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJzEyNy4wLjAuMSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRRdWVyeVBhcmFtc0Zyb21TdHJpbmcocGFyYW1TdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXBhcmFtU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1TdHJpbmcuc3BsaXQoJyYnKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhwYXJhbSwgJz0nKTtcbiAgICAgICAgICAgIHBhcmFtc1trZXlWYWx1ZS5maXJzdFBhcnRdID0ga2V5VmFsdWUuc2Vjb25kUGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzcGxpdEluVHdvKHRleHQ6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcpOiB7IGZpcnN0UGFydDogc3RyaW5nLCBzZWNvbmRQYXJ0OiBzdHJpbmcgfSB7XG4gICAgICAgIGNvbnN0IHNlcGFyYXRvckluZGV4ID0gdGV4dC5pbmRleE9mKHNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4geyBmaXJzdFBhcnQ6IHRleHQsIHNlY29uZFBhcnQ6IG51bGwgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnQxID0gdGV4dC5zdWJzdHIoMCwgc2VwYXJhdG9ySW5kZXgpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgcGFydDIgPSB0ZXh0LnN1YnN0cihzZXBhcmF0b3JJbmRleCArIDEpLnRyaW0oKTtcblxuICAgICAgICByZXR1cm4geyBmaXJzdFBhcnQ6IHBhcnQxLCBzZWNvbmRQYXJ0OiBwYXJ0MiB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2FmZVN0cmluZ2lmeShvYmplY3QpIHtcblxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaW1wbGVPYmplY3QgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0W3Byb3BdKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0W3Byb3BdKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaW1wbGVPYmplY3RbcHJvcF0gPSBvYmplY3RbcHJvcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgPSAnWyoqKlNhbml0aXplZCBPYmplY3QqKipdOiAnICsgSlNPTi5zdHJpbmdpZnkoc2ltcGxlT2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSnNvblRyeVBhcnNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc09iamVjdEVtcHR5KG9iajogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc1VuZGVmaW5lZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICAvLyByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc1N0cmluZyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvVGl0bGVDYXNlKHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHdcXFMqL2csIChzdWJTdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdWJTdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdWJTdHJpbmcuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IHN0cmluZyk7XG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogc3RyaW5nW10pO1xuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IGFueSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcblxuICAgICAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJlZFJvbGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbG93ZXJlZFJvbGVzW2ldID0gaXRlbXNbaV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyZWRSb2xlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbXMgPT09ICdzdHJpbmcnIHx8IGl0ZW1zIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdW5pcXVlSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbU51bWJlcigxMDAwMDAwLCA5MDAwMDAwKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJhc2VVcmwoKSB7XG4gICAgICAgIGxldCBiYXNlID0gJyc7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgICAgICAgIGJhc2UgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCA6ICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiYXNlLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludERhdGVPbmx5KGRhdGU6IERhdGUpIHtcblxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgY29uc3QgZGF5TmFtZXMgPSBuZXcgQXJyYXkoJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5Jyk7XG4gICAgICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBuZXcgQXJyYXkoJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInKTtcblxuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgICAgICBjb25zdCBkYXlPZk1vbnRoID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGxldCBzdXAgPSAnJztcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgaWYgKGRheU9mTW9udGggPT0gMSB8fCBkYXlPZk1vbnRoID09IDIxIHx8IGRheU9mTW9udGggPT0gMzEpIHtcbiAgICAgICAgICAgIHN1cCA9ICdzdCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZNb250aCA9PSAyIHx8IGRheU9mTW9udGggPT0gMjIpIHtcbiAgICAgICAgICAgIHN1cCA9ICduZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZNb250aCA9PSAzIHx8IGRheU9mTW9udGggPT0gMjMpIHtcbiAgICAgICAgICAgIHN1cCA9ICdyZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXAgPSAndGgnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGRheU5hbWVzW2RheU9mV2Vla10gKyAnLCAnICsgZGF5T2ZNb250aCArIHN1cCArICcgJyArIG1vbnRoTmFtZXNbbW9udGhdICsgJyAnICsgeWVhcjtcblxuICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50VGltZU9ubHkoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblxuICAgICAgICBsZXQgcGVyaW9kID0gJyc7XG4gICAgICAgIGxldCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcblxuICAgICAgICBwZXJpb2QgPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcblxuICAgICAgICBpZiAoaG91ciA9PSAwKSB7XG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPiAxMikge1xuICAgICAgICAgICAgaG91ciA9IGhvdXIgLSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW51dGUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBob3VyICsgJzonICsgbWludXRlICsgJyAnICsgcGVyaW9kO1xuXG5cbiAgICAgICAgcmV0dXJuIHRpbWVTdHJpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludERhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJ2F0Jykge1xuICAgICAgICByZXR1cm4gYCR7VXRpbGl0aWVzLnByaW50RGF0ZU9ubHkoZGF0ZSl9ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludEZyaWVuZGx5RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnLScpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUodG9kYXkpOyB5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICAgIGNvbnN0IHRlc3QgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuXG4gICAgICAgIGlmICh0ZXN0LnRvRGF0ZVN0cmluZygpID09IHRvZGF5LnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRvZGF5ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QudG9EYXRlU3RyaW5nKCkgPT0geWVzdGVyZGF5LnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFllc3RlcmRheSAke3NlcGFyYXRvcn0gJHtVdGlsaXRpZXMucHJpbnRUaW1lT25seShkYXRlKX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxpdGllcy5wcmludERhdGUoZGF0ZSwgc2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnRTaG9ydERhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJy8nLCBkYXRlVGltZVNlcGFyYXRvciA9ICctJykge1xuXG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgbW9udGggPSAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAoZGF5Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBkYXkgPSAnMCcgKyBkYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9udGgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1vbnRoID0gJzAnICsgbW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7bW9udGh9JHtzZXBhcmF0b3J9JHtkYXl9JHtzZXBhcmF0b3J9JHt5ZWFyfSAke2RhdGVUaW1lU2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZURhdGUoZGF0ZSkge1xuXG4gICAgICAgIGlmIChkYXRlKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnIHx8IGRhdGUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5zZWFyY2goL1thLXN1LXorXS9pKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZSArICdaJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgfHwgZGF0ZSBpbnN0YW5jZW9mIE51bWJlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RHVyYXRpb24oc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkge1xuXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xuICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xuXG4gICAgICAgIC8vIGdldCB0b3RhbCBzZWNvbmRzIGJldHdlZW4gdGhlIHRpbWVzXG4gICAgICAgIGxldCBkZWx0YSA9IE1hdGguYWJzKHN0YXJ0LnZhbHVlT2YoKSAtIGVuZC52YWx1ZU9mKCkpIC8gMTAwMDtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgKGFuZCBzdWJ0cmFjdCkgd2hvbGUgZGF5c1xuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihkZWx0YSAvIDg2NDAwKTtcbiAgICAgICAgZGVsdGEgLT0gZGF5cyAqIDg2NDAwO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSAoYW5kIHN1YnRyYWN0KSB3aG9sZSBob3Vyc1xuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoZGVsdGEgLyAzNjAwKSAlIDI0O1xuICAgICAgICBkZWx0YSAtPSBob3VycyAqIDM2MDA7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIChhbmQgc3VidHJhY3QpIHdob2xlIG1pbnV0ZXNcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoZGVsdGEgLyA2MCkgJSA2MDtcbiAgICAgICAgZGVsdGEgLT0gbWludXRlcyAqIDYwO1xuXG4gICAgICAgIC8vIHdoYXQncyBsZWZ0IGlzIHNlY29uZHNcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IGRlbHRhICUgNjA7ICAvLyBpbiB0aGVvcnkgdGhlIG1vZHVsdXMgaXMgbm90IHJlcXVpcmVkXG5cblxuICAgICAgICBsZXQgcHJpbnRlZERheXMgPSAnJztcblxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgPSBgJHtkYXlzfSBkYXlzYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3Vycykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgLCAke2hvdXJzfSBob3Vyc2AgOiBgJHtob3Vyc30gaG91cnNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCwgJHttaW51dGVzfSBtaW51dGVzYCA6IGAke21pbnV0ZXN9IG1pbnV0ZXNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCBhbmQgJHtzZWNvbmRzfSBzZWNvbmRzYCA6IGAke3NlY29uZHN9IHNlY29uZHNgO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoIXByaW50ZWREYXlzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyA9ICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmludGVkRGF5cztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEFnZShiaXJ0aERhdGUsIG90aGVyRGF0ZSkge1xuICAgICAgICBiaXJ0aERhdGUgPSBuZXcgRGF0ZShiaXJ0aERhdGUpO1xuICAgICAgICBvdGhlckRhdGUgPSBuZXcgRGF0ZShvdGhlckRhdGUpO1xuXG4gICAgICAgIGxldCB5ZWFycyA9IChvdGhlckRhdGUuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICAgICAgICBpZiAob3RoZXJEYXRlLmdldE1vbnRoKCkgPCBiaXJ0aERhdGUuZ2V0TW9udGgoKSB8fFxuICAgICAgICAgICAgb3RoZXJEYXRlLmdldE1vbnRoKCkgPT0gYmlydGhEYXRlLmdldE1vbnRoKCkgJiYgb3RoZXJEYXRlLmdldERhdGUoKSA8IGJpcnRoRGF0ZS5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgIHllYXJzLS07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geWVhcnM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZWFyY2hBcnJheShzZWFyY2hUZXJtOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4sIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgaWYgKCFzZWFyY2hUZXJtKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmaWx0ZXIgPSBzZWFyY2hUZXJtLnRyaW0oKTtcbiAgICAgICAgbGV0IGRhdGEgPSB2YWx1ZXMuam9pbigpO1xuXG4gICAgICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgZmlsdGVyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGEuaW5kZXhPZihmaWx0ZXIpICE9IC0xO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZUFycmF5SXRlbShhcnJheTogYW55W10sIG9sZEluZGV4LCBuZXdJbmRleCkge1xuXG4gICAgICAgIGlmIChvbGRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5ld0luZGV4ICs9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBrID0gbmV3SW5kZXggLSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKGstLSkgKyAxKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXkuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnJheS5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV4cGFuZENhbWVsQ2FzZSh0ZXh0OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKFtBLVpdW2Etel0rKS9nLCAnICQxJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl1bQS1aXSspL2csICcgJDEnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbXkEtWmEteiBdKykvZywgJyAkMScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGVzdElzQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIHIudGVzdCh1cmwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydFRvQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpIHtcblxuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLnRlc3RJc0Fic29sdXRlVXJsKHVybCkgPyB1cmwgOiAnLy8nICsgdXJsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlTnVsbHMob2JqKSB7XG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSBvYmogaW5zdGFuY2VvZiBBcnJheTtcblxuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqW2tdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNBcnJheSA/IG9iai5zcGxpY2UoaywgMSkgOiBkZWxldGUgb2JqW2tdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgVXRpbGl0aWVzLnJlbW92ZU51bGxzKG9ialtrXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5ICYmIG9iai5sZW5ndGggPT0gaykge1xuICAgICAgICAgICAgICAgIFV0aWxpdGllcy5yZW1vdmVOdWxscyhvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlYm91bmNlKGZ1bmM6ICguLi5hcmdzKSA9PiBhbnksIHdhaXQ6IG51bWJlciwgaW1tZWRpYXRlPzogYm9vbGVhbikge1xuICAgICAgICBsZXQgdGltZW91dDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGFyZ3NfID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJnc18pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3NfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=