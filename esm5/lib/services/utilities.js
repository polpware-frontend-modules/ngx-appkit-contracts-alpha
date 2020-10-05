import { __values } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as i0 from "@angular/core";
// Supress angular complication error
// @dynamic
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    Utilities.getHttpResponseMessages = function (data) {
        var responses = [];
        if (data instanceof HttpResponseBase) {
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
        if (response instanceof HttpResponse) {
            return response.body;
        }
        if (response instanceof HttpErrorResponse) {
            return response.error || response.message || response.statusText;
        }
    };
    Utilities.checkNoNetwork = function (response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 0;
        }
        return false;
    };
    Utilities.checkAccessDenied = function (response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 403;
        }
        return false;
    };
    Utilities.checkNotFound = function (response) {
        if (response instanceof HttpResponseBase) {
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
    /** @nocollapse */ Utilities.ɵprov = i0.ɵɵdefineInjectable({ token: Utilities, factory: Utilities.ɵfac });
    return Utilities;
}());
export { Utilities };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Utilities, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3V0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBRXpGLHFDQUFxQztBQUNyQyxXQUFXO0FBRVg7SUFBQTtLQW9tQkM7SUE1aUJpQixpQ0FBdUIsR0FBckMsVUFBc0MsSUFBNEI7UUFDOUQsSUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDM0IsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFHLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLFNBQUksSUFBSSxDQUFDLHNCQUF3QixDQUFDLENBQUM7YUFDdEg7aUJBQU07Z0JBQ0gsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbEQsSUFBSSxjQUFjLElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRLElBQUksY0FBYyxZQUFZLE1BQU0sQ0FBQyxFQUFFO29CQUU1RixLQUFLLElBQU0sR0FBRyxJQUFJLGNBQWMsRUFBRTt3QkFDOUIsSUFBSSxHQUFHLEVBQUU7NEJBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLFNBQUksY0FBYyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7eUJBQ3JGOzZCQUFNLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUM1QixT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TyxDQUFDLHlEQUF5RCxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xJLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQ2xHLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7S0FDSixDQUFDO3lGQXJERyxTQUFTO3dFQUFULFNBQVMsV0FBVCxTQUFTO29CQVB0QjtDQTBtQkMsQUFwbUJELElBb21CQztTQW5tQlksU0FBUztrREFBVCxTQUFTO2NBRHJCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VCYXNlLCBIdHRwUmVzcG9uc2UsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vLyBTdXByZXNzIGFuZ3VsYXIgY29tcGxpY2F0aW9uIGVycm9yXG4vLyBAZHluYW1pY1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbGl0aWVzIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yID0gJzonO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm9OZXR3b3JrTWVzc2FnZUNhcHRpb24gPSAnTm8gTmV0d29yayc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub05ldHdvcmtNZXNzYWdlRGV0YWlsID0gJ1RoZSBzZXJ2ZXIgY2Fubm90IGJlIHJlYWNoZWQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWNjZXNzRGVuaWVkTWVzc2FnZUNhcHRpb24gPSAnQWNjZXNzIERlbmllZCEnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWNjZXNzRGVuaWVkTWVzc2FnZURldGFpbCA9ICcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90Rm91bmRNZXNzYWdlQ2FwdGlvbiA9ICdOb3QgRm91bmQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90Rm91bmRNZXNzYWdlRGV0YWlsID0gJ1RoZSB0YXJnZXQgcmVzb3VyY2UgY2Fubm90IGJlIGZvdW5kJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29va2llcyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldEl0ZW06IChzS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKCcoPzooPzpefC4qOylcXFxccyonICsgZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csICdcXFxcJCYnKSArICdcXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiQnKSwgJyQxJykpIHx8IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SXRlbTogKHNLZXksIHNWYWx1ZSwgdkVuZCwgc1BhdGgsIHNEb21haW4sIGJTZWN1cmUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXNLZXkgfHwgL14oPzpleHBpcmVzfG1heFxcLWFnZXxwYXRofGRvbWFpbnxzZWN1cmUpJC9pLnRlc3Qoc0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBzRXhwaXJlcyA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2RW5kLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRXhwaXJlcyA9IHZFbmQgPT09IEluZmluaXR5ID8gJzsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVCcgOiAnOyBtYXgtYWdlPScgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSAnOyBleHBpcmVzPScgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEYXRlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gJzsgZXhwaXJlcz0nICsgdkVuZC50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNWYWx1ZSkgKyBzRXhwaXJlcyArIChzRG9tYWluID8gJzsgZG9tYWluPScgKyBzRG9tYWluIDogJycpICsgKHNQYXRoID8gJzsgcGF0aD0nICsgc1BhdGggOiAnJykgKyAoYlNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbTogKHNLZXksIHNQYXRoLCBzRG9tYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgJz07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQnICsgKHNEb21haW4gPyAnOyBkb21haW49JyArIHNEb21haW4gOiAnJykgKyAoc1BhdGggPyAnOyBwYXRoPScgKyBzUGF0aCA6ICcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNJdGVtOiAoc0tleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFJlZ0V4cCgnKD86Xnw7XFxcXHMqKScgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgJ1xcXFwkJicpICsgJ1xcXFxzKlxcXFw9JykpLnRlc3QoZG9jdW1lbnQuY29va2llKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBrZXlzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYUtleXMgPSBkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKCg/Ol58XFxzKjspW15cXD1dKykoPz07fCQpfF5cXHMqfFxccyooPzpcXD1bXjtdKik/KD86XFwxfCQpL2csICcnKS5zcGxpdCgvXFxzKig/OlxcPVteO10qKT87XFxzKi8pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG5JZHggPSAwOyBuSWR4IDwgYUtleXMubGVuZ3RoOyBuSWR4KyspIHsgYUtleXNbbklkeF0gPSBkZWNvZGVVUklDb21wb25lbnQoYUtleXNbbklkeF0pOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFLZXlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhOiBIdHRwUmVzcG9uc2VCYXNlIHwgYW55KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNwb25zZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja05vTmV0d29yayhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGAke3RoaXMubm9OZXR3b3JrTWVzc2FnZUNhcHRpb259JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3RoaXMubm9OZXR3b3JrTWVzc2FnZURldGFpbH1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSB0aGlzLmdldFJlc3BvbnNlQm9keShkYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZU9iamVjdCAmJiAodHlwZW9mIHJlc3BvbnNlT2JqZWN0ID09PSAnb2JqZWN0JyB8fCByZXNwb25zZU9iamVjdCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXNwb25zZU9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGAke2tleX0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7cmVzcG9uc2VPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VPYmplY3Rba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlT2JqZWN0W2tleV0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICgoZGF0YSBhcyBhbnkpLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYGJvZHk6ICR7KGRhdGEgYXMgYW55KS5ib2R5fWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgoZGF0YSBhcyBhbnkpLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGBlcnJvcjogJHsoZGF0YSBhcyBhbnkpLmVycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVzcG9uc2VCb2R5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5nZXRSZXNwb25zZUJvZHkoZGF0YSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGRhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja0FjY2Vzc0RlbmllZChkYXRhKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VzLnNwbGljZSgwLCAwLCBgJHt0aGlzLmFjY2Vzc0RlbmllZE1lc3NhZ2VDYXB0aW9ufSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHt0aGlzLmFjY2Vzc0RlbmllZE1lc3NhZ2VEZXRhaWx9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja05vdEZvdW5kKGRhdGEpKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGAke3RoaXMubm90Rm91bmRNZXNzYWdlQ2FwdGlvbn0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7dGhpcy5ub3RGb3VuZE1lc3NhZ2VEZXRhaWx9YDtcbiAgICAgICAgICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYC4gJHtkYXRhLnVybH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZXMuc3BsaWNlKDAsIDAsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEh0dHBSZXNwb25zZU1lc3NhZ2UoZGF0YTogSHR0cFJlc3BvbnNlQmFzZSB8IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGh0dHBNZXNzYWdlID1cbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZShVdGlsaXRpZXMubm9OZXR3b3JrTWVzc2FnZUNhcHRpb24sIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoVXRpbGl0aWVzLm5vdEZvdW5kTWVzc2FnZUNhcHRpb24sIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoJ2Vycm9yX2Rlc2NyaXB0aW9uJywgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZSgnZXJyb3InLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpLmpvaW4oKTtcblxuICAgICAgICByZXR1cm4gaHR0cE1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSHR0cFJlc3BvbnNlTWVzc2FnZShtZXNzYWdlVG9GaW5kOiBzdHJpbmcsIGRhdGE6IEh0dHBSZXNwb25zZTxhbnk+IHwgYW55LCBzZWFjaEluQ2FwdGlvbk9ubHkgPSB0cnVlLCBpbmNsdWRlQ2FwdGlvbkluUmVzdWx0ID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZWFyY2hTdHJpbmcgPSBtZXNzYWdlVG9GaW5kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGh0dHBNZXNzYWdlcyA9IHRoaXMuZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGh0dHBNZXNzYWdlcykge1xuICAgICAgICAgICAgY29uc3QgZnVsbE1lc3NhZ2UgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCB0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgaWYgKGZ1bGxNZXNzYWdlLmZpcnN0UGFydCAmJiBmdWxsTWVzc2FnZS5maXJzdFBhcnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZUNhcHRpb25JblJlc3VsdCA/IG1lc3NhZ2UgOiBmdWxsTWVzc2FnZS5zZWNvbmRQYXJ0IHx8IGZ1bGxNZXNzYWdlLmZpcnN0UGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VhY2hJbkNhcHRpb25Pbmx5KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgaHR0cE1lc3NhZ2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZUNhcHRpb25JblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmdWxsTWVzc2FnZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKG1lc3NhZ2UsIHRoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bGxNZXNzYWdlLnNlY29uZFBhcnQgfHwgZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZXJyb3IgfHwgcmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja05vTmV0d29yayhyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0FjY2Vzc0RlbmllZChyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDQwMztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTm90Rm91bmQocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0lzTG9jYWxIb3N0KHVybDogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbmV3IFVSTCh1cmwsIGJhc2UpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJzEyNy4wLjAuMSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRRdWVyeVBhcmFtc0Zyb21TdHJpbmcocGFyYW1TdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXBhcmFtU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1TdHJpbmcuc3BsaXQoJyYnKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhwYXJhbSwgJz0nKTtcbiAgICAgICAgICAgIHBhcmFtc1trZXlWYWx1ZS5maXJzdFBhcnRdID0ga2V5VmFsdWUuc2Vjb25kUGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzcGxpdEluVHdvKHRleHQ6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcpOiB7IGZpcnN0UGFydDogc3RyaW5nLCBzZWNvbmRQYXJ0OiBzdHJpbmcgfSB7XG4gICAgICAgIGNvbnN0IHNlcGFyYXRvckluZGV4ID0gdGV4dC5pbmRleE9mKHNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4geyBmaXJzdFBhcnQ6IHRleHQsIHNlY29uZFBhcnQ6IG51bGwgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnQxID0gdGV4dC5zdWJzdHIoMCwgc2VwYXJhdG9ySW5kZXgpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgcGFydDIgPSB0ZXh0LnN1YnN0cihzZXBhcmF0b3JJbmRleCArIDEpLnRyaW0oKTtcblxuICAgICAgICByZXR1cm4geyBmaXJzdFBhcnQ6IHBhcnQxLCBzZWNvbmRQYXJ0OiBwYXJ0MiB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2FmZVN0cmluZ2lmeShvYmplY3QpIHtcblxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaW1wbGVPYmplY3QgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0W3Byb3BdKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0W3Byb3BdKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaW1wbGVPYmplY3RbcHJvcF0gPSBvYmplY3RbcHJvcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgPSAnWyoqKlNhbml0aXplZCBPYmplY3QqKipdOiAnICsgSlNPTi5zdHJpbmdpZnkoc2ltcGxlT2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSnNvblRyeVBhcnNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc09iamVjdEVtcHR5KG9iajogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc1VuZGVmaW5lZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICAvLyByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc1N0cmluZyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvVGl0bGVDYXNlKHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHdcXFMqL2csIChzdWJTdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdWJTdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdWJTdHJpbmcuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IHN0cmluZyk7XG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogc3RyaW5nW10pO1xuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IGFueSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcblxuICAgICAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJlZFJvbGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbG93ZXJlZFJvbGVzW2ldID0gaXRlbXNbaV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyZWRSb2xlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbXMgPT09ICdzdHJpbmcnIHx8IGl0ZW1zIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdW5pcXVlSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbU51bWJlcigxMDAwMDAwLCA5MDAwMDAwKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJhc2VVcmwoKSB7XG4gICAgICAgIGxldCBiYXNlID0gJyc7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgICAgICAgIGJhc2UgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCA6ICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiYXNlLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludERhdGVPbmx5KGRhdGU6IERhdGUpIHtcblxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgY29uc3QgZGF5TmFtZXMgPSBuZXcgQXJyYXkoJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5Jyk7XG4gICAgICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBuZXcgQXJyYXkoJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInKTtcblxuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgICAgICBjb25zdCBkYXlPZk1vbnRoID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGxldCBzdXAgPSAnJztcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgaWYgKGRheU9mTW9udGggPT0gMSB8fCBkYXlPZk1vbnRoID09IDIxIHx8IGRheU9mTW9udGggPT0gMzEpIHtcbiAgICAgICAgICAgIHN1cCA9ICdzdCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZNb250aCA9PSAyIHx8IGRheU9mTW9udGggPT0gMjIpIHtcbiAgICAgICAgICAgIHN1cCA9ICduZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZNb250aCA9PSAzIHx8IGRheU9mTW9udGggPT0gMjMpIHtcbiAgICAgICAgICAgIHN1cCA9ICdyZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXAgPSAndGgnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGRheU5hbWVzW2RheU9mV2Vla10gKyAnLCAnICsgZGF5T2ZNb250aCArIHN1cCArICcgJyArIG1vbnRoTmFtZXNbbW9udGhdICsgJyAnICsgeWVhcjtcblxuICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50VGltZU9ubHkoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblxuICAgICAgICBsZXQgcGVyaW9kID0gJyc7XG4gICAgICAgIGxldCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcblxuICAgICAgICBwZXJpb2QgPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcblxuICAgICAgICBpZiAoaG91ciA9PSAwKSB7XG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPiAxMikge1xuICAgICAgICAgICAgaG91ciA9IGhvdXIgLSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW51dGUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBob3VyICsgJzonICsgbWludXRlICsgJyAnICsgcGVyaW9kO1xuXG5cbiAgICAgICAgcmV0dXJuIHRpbWVTdHJpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludERhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJ2F0Jykge1xuICAgICAgICByZXR1cm4gYCR7VXRpbGl0aWVzLnByaW50RGF0ZU9ubHkoZGF0ZSl9ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludEZyaWVuZGx5RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnLScpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUodG9kYXkpOyB5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICAgIGNvbnN0IHRlc3QgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuXG4gICAgICAgIGlmICh0ZXN0LnRvRGF0ZVN0cmluZygpID09IHRvZGF5LnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRvZGF5ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QudG9EYXRlU3RyaW5nKCkgPT0geWVzdGVyZGF5LnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFllc3RlcmRheSAke3NlcGFyYXRvcn0gJHtVdGlsaXRpZXMucHJpbnRUaW1lT25seShkYXRlKX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxpdGllcy5wcmludERhdGUoZGF0ZSwgc2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnRTaG9ydERhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJy8nLCBkYXRlVGltZVNlcGFyYXRvciA9ICctJykge1xuXG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgbW9udGggPSAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAoZGF5Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBkYXkgPSAnMCcgKyBkYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9udGgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1vbnRoID0gJzAnICsgbW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7bW9udGh9JHtzZXBhcmF0b3J9JHtkYXl9JHtzZXBhcmF0b3J9JHt5ZWFyfSAke2RhdGVUaW1lU2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZURhdGUoZGF0ZSkge1xuXG4gICAgICAgIGlmIChkYXRlKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnIHx8IGRhdGUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5zZWFyY2goL1thLXN1LXorXS9pKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZSArICdaJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgfHwgZGF0ZSBpbnN0YW5jZW9mIE51bWJlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RHVyYXRpb24oc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkge1xuXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xuICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xuXG4gICAgICAgIC8vIGdldCB0b3RhbCBzZWNvbmRzIGJldHdlZW4gdGhlIHRpbWVzXG4gICAgICAgIGxldCBkZWx0YSA9IE1hdGguYWJzKHN0YXJ0LnZhbHVlT2YoKSAtIGVuZC52YWx1ZU9mKCkpIC8gMTAwMDtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgKGFuZCBzdWJ0cmFjdCkgd2hvbGUgZGF5c1xuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihkZWx0YSAvIDg2NDAwKTtcbiAgICAgICAgZGVsdGEgLT0gZGF5cyAqIDg2NDAwO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSAoYW5kIHN1YnRyYWN0KSB3aG9sZSBob3Vyc1xuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoZGVsdGEgLyAzNjAwKSAlIDI0O1xuICAgICAgICBkZWx0YSAtPSBob3VycyAqIDM2MDA7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIChhbmQgc3VidHJhY3QpIHdob2xlIG1pbnV0ZXNcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoZGVsdGEgLyA2MCkgJSA2MDtcbiAgICAgICAgZGVsdGEgLT0gbWludXRlcyAqIDYwO1xuXG4gICAgICAgIC8vIHdoYXQncyBsZWZ0IGlzIHNlY29uZHNcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IGRlbHRhICUgNjA7ICAvLyBpbiB0aGVvcnkgdGhlIG1vZHVsdXMgaXMgbm90IHJlcXVpcmVkXG5cblxuICAgICAgICBsZXQgcHJpbnRlZERheXMgPSAnJztcblxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgPSBgJHtkYXlzfSBkYXlzYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3Vycykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgLCAke2hvdXJzfSBob3Vyc2AgOiBgJHtob3Vyc30gaG91cnNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCwgJHttaW51dGVzfSBtaW51dGVzYCA6IGAke21pbnV0ZXN9IG1pbnV0ZXNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCBhbmQgJHtzZWNvbmRzfSBzZWNvbmRzYCA6IGAke3NlY29uZHN9IHNlY29uZHNgO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoIXByaW50ZWREYXlzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyA9ICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmludGVkRGF5cztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEFnZShiaXJ0aERhdGUsIG90aGVyRGF0ZSkge1xuICAgICAgICBiaXJ0aERhdGUgPSBuZXcgRGF0ZShiaXJ0aERhdGUpO1xuICAgICAgICBvdGhlckRhdGUgPSBuZXcgRGF0ZShvdGhlckRhdGUpO1xuXG4gICAgICAgIGxldCB5ZWFycyA9IChvdGhlckRhdGUuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICAgICAgICBpZiAob3RoZXJEYXRlLmdldE1vbnRoKCkgPCBiaXJ0aERhdGUuZ2V0TW9udGgoKSB8fFxuICAgICAgICAgICAgb3RoZXJEYXRlLmdldE1vbnRoKCkgPT0gYmlydGhEYXRlLmdldE1vbnRoKCkgJiYgb3RoZXJEYXRlLmdldERhdGUoKSA8IGJpcnRoRGF0ZS5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgIHllYXJzLS07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geWVhcnM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZWFyY2hBcnJheShzZWFyY2hUZXJtOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4sIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgaWYgKCFzZWFyY2hUZXJtKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmaWx0ZXIgPSBzZWFyY2hUZXJtLnRyaW0oKTtcbiAgICAgICAgbGV0IGRhdGEgPSB2YWx1ZXMuam9pbigpO1xuXG4gICAgICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgZmlsdGVyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGEuaW5kZXhPZihmaWx0ZXIpICE9IC0xO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZUFycmF5SXRlbShhcnJheTogYW55W10sIG9sZEluZGV4LCBuZXdJbmRleCkge1xuXG4gICAgICAgIGlmIChvbGRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5ld0luZGV4ICs9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBrID0gbmV3SW5kZXggLSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKGstLSkgKyAxKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXkuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnJheS5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV4cGFuZENhbWVsQ2FzZSh0ZXh0OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKFtBLVpdW2Etel0rKS9nLCAnICQxJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl1bQS1aXSspL2csICcgJDEnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbXkEtWmEteiBdKykvZywgJyAkMScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGVzdElzQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIHIudGVzdCh1cmwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydFRvQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpIHtcblxuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLnRlc3RJc0Fic29sdXRlVXJsKHVybCkgPyB1cmwgOiAnLy8nICsgdXJsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlTnVsbHMob2JqKSB7XG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSBvYmogaW5zdGFuY2VvZiBBcnJheTtcblxuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqW2tdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNBcnJheSA/IG9iai5zcGxpY2UoaywgMSkgOiBkZWxldGUgb2JqW2tdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgVXRpbGl0aWVzLnJlbW92ZU51bGxzKG9ialtrXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5ICYmIG9iai5sZW5ndGggPT0gaykge1xuICAgICAgICAgICAgICAgIFV0aWxpdGllcy5yZW1vdmVOdWxscyhvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlYm91bmNlKGZ1bmM6ICguLi5hcmdzKSA9PiBhbnksIHdhaXQ6IG51bWJlciwgaW1tZWRpYXRlPzogYm9vbGVhbikge1xuICAgICAgICBsZXQgdGltZW91dDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGFyZ3NfID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJnc18pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3NfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=