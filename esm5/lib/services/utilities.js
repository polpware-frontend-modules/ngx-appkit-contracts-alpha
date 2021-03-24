import { __values } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ Utilities.ɵprov = i0.ɵɵdefineInjectable({ token: Utilities, factory: Utilities.ɵfac, providedIn: 'root' });
    return Utilities;
}());
export { Utilities };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Utilities, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3V0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBRXpGO0lBQUE7S0FzbUJDO0lBNWlCaUIsaUNBQXVCLEdBQXJDLFVBQXNDLElBQTRCO1FBQzlELElBQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUUvQixJQUFJLElBQUksWUFBWSxnQkFBZ0IsRUFBRTtZQUNsQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixTQUFJLElBQUksQ0FBQyxzQkFBd0IsQ0FBQyxDQUFDO2FBQ3RIO2lCQUFNO2dCQUNILElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWxELElBQUksY0FBYyxJQUFJLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxJQUFJLGNBQWMsWUFBWSxNQUFNLENBQUMsRUFBRTtvQkFFNUYsS0FBSyxJQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUU7d0JBQzlCLElBQUksR0FBRyxFQUFFOzRCQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixTQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO3lCQUNyRjs2QkFBTSxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDNUIsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDbEQ7cUJBQ0o7aUJBQ0o7YUFDSjtZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFLLElBQVksQ0FBQyxJQUFJLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVSxJQUFZLENBQUMsSUFBTSxDQUFDLENBQUM7aUJBQ2pEO2dCQUVELElBQUssSUFBWSxDQUFDLEtBQUssRUFBRTtvQkFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFXLElBQVksQ0FBQyxLQUFPLENBQUMsQ0FBQztpQkFDbkQ7YUFDSjtTQUNKO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ25DO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBRyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixTQUFJLElBQUksQ0FBQyx5QkFBMkIsQ0FBQyxDQUFDO1NBQ3BJO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksT0FBTyxHQUFHLEtBQUcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQywwQkFBMEIsU0FBSSxJQUFJLENBQUMscUJBQXVCLENBQUM7WUFDL0csSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNWLE9BQU8sSUFBSSxPQUFLLElBQUksQ0FBQyxHQUFLLENBQUM7YUFDOUI7WUFFRCxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRWEsZ0NBQXNCLEdBQXBDLFVBQXFDLElBQTRCO1FBQzdELElBQU0sV0FBVyxHQUNiLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDO1lBQzFFLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDO1lBQ3pFLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUM7WUFDNUQsU0FBUyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7WUFDaEQsU0FBUyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5ELE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFYSxpQ0FBdUIsR0FBckMsVUFBc0MsYUFBcUIsRUFBRSxJQUE2QixFQUFFLGtCQUF5QixFQUFFLHNCQUE4Qjs7UUFBekQsbUNBQUEsRUFBQSx5QkFBeUI7UUFBRSx1Q0FBQSxFQUFBLDhCQUE4QjtRQUNqSixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDOztZQUV4RCxLQUFzQixJQUFBLGlCQUFBLFNBQUEsWUFBWSxDQUFBLDBDQUFBLG9FQUFFO2dCQUEvQixJQUFNLE9BQU8seUJBQUE7Z0JBQ2QsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBRW5GLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDMUYsT0FBTyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7aUJBQzdGO2FBQ0o7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxrQkFBa0IsRUFBRTs7Z0JBQ3JCLEtBQXNCLElBQUEsaUJBQUEsU0FBQSxZQUFZLENBQUEsMENBQUEsb0VBQUU7b0JBQS9CLElBQU0sT0FBTyx5QkFBQTtvQkFFZCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7d0JBQ25ELElBQUksc0JBQXNCLEVBQUU7NEJBQ3hCLE9BQU8sT0FBTyxDQUFDO3lCQUNsQjs2QkFBTTs0QkFDSCxJQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs0QkFDbkYsT0FBTyxXQUFXLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7eUJBQzFEO3FCQUNKO2lCQUNKOzs7Ozs7Ozs7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFYSx5QkFBZSxHQUE3QixVQUE4QixRQUEwQjtRQUNwRCxJQUFJLFFBQVEsWUFBWSxZQUFZLEVBQUU7WUFDbEMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxRQUFRLFlBQVksaUJBQWlCLEVBQUU7WUFDdkMsT0FBTyxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFFYSx3QkFBYyxHQUE1QixVQUE2QixRQUEwQjtRQUNuRCxJQUFJLFFBQVEsWUFBWSxnQkFBZ0IsRUFBRTtZQUN0QyxPQUFPLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1NBQy9CO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVhLDJCQUFpQixHQUEvQixVQUFnQyxRQUEwQjtRQUN0RCxJQUFJLFFBQVEsWUFBWSxnQkFBZ0IsRUFBRTtZQUN0QyxPQUFPLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVhLHVCQUFhLEdBQTNCLFVBQTRCLFFBQTBCO1FBQ2xELElBQUksUUFBUSxZQUFZLGdCQUFnQixFQUFFO1lBQ3RDLE9BQU8sUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7U0FDakM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRWEsMEJBQWdCLEdBQTlCLFVBQStCLEdBQVcsRUFBRSxJQUFhO1FBQ3JELElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBTSxVQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sVUFBUSxDQUFDLFFBQVEsS0FBSyxXQUFXLElBQUksVUFBUSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUM7U0FDakY7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRWEsa0NBQXdCLEdBQXRDLFVBQXVDLFdBQW1COztRQUN0RCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7O1lBRTdDLEtBQW9CLElBQUEsS0FBQSxTQUFBLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXZDLElBQU0sS0FBSyxXQUFBO2dCQUNaLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7YUFDcEQ7Ozs7Ozs7OztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFYSxvQkFBVSxHQUF4QixVQUF5QixJQUFZLEVBQUUsU0FBaUI7UUFDcEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvQyxJQUFJLGNBQWMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUN0QixPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDaEQ7UUFFRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVhLHVCQUFhLEdBQTNCLFVBQTRCLE1BQU07UUFFOUIsSUFBSSxNQUFjLENBQUM7UUFFbkIsSUFBSTtZQUNBLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO1FBQUMsT0FBTyxLQUFLLEVBQUU7U0FFZjtRQUVELElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixLQUFLLElBQU0sSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsU0FBUzthQUNaO1lBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFO2dCQUNuQyxTQUFTO2FBQ1o7WUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ3JDLFNBQVM7YUFDWjtZQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckM7UUFFRCxNQUFNLEdBQUcsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVyRSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRWEsc0JBQVksR0FBMUIsVUFBMkIsS0FBYTtRQUNwQyxJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLEtBQUssS0FBSyxXQUFXLEVBQUU7Z0JBQ3ZCLE9BQU8sS0FBSyxDQUFDLENBQUM7YUFDakI7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFYSwyQkFBaUIsR0FBL0IsVUFBZ0MsR0FBUTtRQUNwQyxLQUFLLElBQU0sSUFBSSxJQUFJLEdBQUcsRUFBRTtZQUNwQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRWEseUJBQWUsR0FBN0IsVUFBOEIsS0FBVTtRQUNwQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQztRQUNwQyw4QkFBOEI7SUFDbEMsQ0FBQztJQUVhLHNCQUFZLEdBQTFCLFVBQTJCLEtBQVU7UUFDakMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLE1BQU0sQ0FBQztJQUNoRSxDQUFDO0lBRWEsK0JBQXFCLEdBQW5DLFVBQW9DLElBQVk7UUFDNUMsSUFBSSxJQUFJLEVBQUU7WUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFYSxxQkFBVyxHQUF6QixVQUEwQixJQUFZO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxTQUFTO1lBQ3BDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUlhLHFCQUFXLEdBQXpCLFVBQTBCLEtBQVU7UUFFaEMsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1lBQ3hCLElBQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztZQUVsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM1QztZQUVELE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUM3RCxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFYSxrQkFBUSxHQUF0QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVhLHNCQUFZLEdBQTFCLFVBQTJCLEdBQVcsRUFBRSxHQUFXO1FBQy9DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFYSxpQkFBTyxHQUFyQjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDeEIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEk7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFYSx1QkFBYSxHQUEzQixVQUE0QixJQUFVO1FBRWxDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6RyxJQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXZKLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVoQyxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxFQUFFO1lBQ3pELEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNLElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksRUFBRSxFQUFFO1lBQzVDLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNLElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksRUFBRSxFQUFFO1lBQzVDLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNkO1FBRUQsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUV4RyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRWEsdUJBQWEsR0FBM0IsVUFBNEIsSUFBVTtRQUVsQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFM0IsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRWpDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksR0FBRyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNYLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNwQixNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztTQUN6QjtRQUVELElBQU0sVUFBVSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFHdEQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVhLG1CQUFTLEdBQXZCLFVBQXdCLElBQVUsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjtRQUNoRCxPQUFVLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQUksU0FBUyxTQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFHLENBQUM7SUFDNUYsQ0FBQztJQUVhLDJCQUFpQixHQUEvQixVQUFnQyxJQUFVLEVBQUUsU0FBZTtRQUFmLDBCQUFBLEVBQUEsZUFBZTtRQUN2RCxJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFM0UsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQzdDLE9BQU8sV0FBUyxTQUFTLFNBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUcsQ0FBQztTQUNoRTtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNqRCxPQUFPLGVBQWEsU0FBUyxTQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFHLENBQUM7U0FDcEU7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0M7SUFDTCxDQUFDO0lBRWEsd0JBQWMsR0FBNUIsVUFBNkIsSUFBVSxFQUFFLFNBQWUsRUFBRSxpQkFBdUI7UUFBeEMsMEJBQUEsRUFBQSxlQUFlO1FBQUUsa0NBQUEsRUFBQSx1QkFBdUI7UUFFN0UsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVoQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2pCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ25CO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuQixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUVELE9BQU8sS0FBRyxLQUFLLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxTQUFJLGlCQUFpQixTQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFHLENBQUM7SUFDakgsQ0FBQztJQUVhLG1CQUFTLEdBQXZCLFVBQXdCLElBQUk7UUFFeEIsSUFBSSxJQUFJLEVBQUU7WUFFTixJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFO2dCQUNwRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ2pDLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2lCQUNyQjtnQkFFRCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1lBRUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxZQUFZLE1BQU0sRUFBRTtnQkFDcEQsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFXLENBQUMsQ0FBQzthQUNoQztTQUNKO0lBQ0wsQ0FBQztJQUVhLHVCQUFhLEdBQTNCLFVBQTRCLEtBQVcsRUFBRSxHQUFTO1FBRTlDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEIsc0NBQXNDO1FBQ3RDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3RCxzQ0FBc0M7UUFDdEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdkMsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFFdEIsdUNBQXVDO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QyxLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUV0Qix5Q0FBeUM7UUFDekMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVDLEtBQUssSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRXRCLHlCQUF5QjtRQUN6QixJQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUUsd0NBQXdDO1FBR3JFLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLElBQUksRUFBRTtZQUNOLFdBQVcsR0FBTSxJQUFJLFVBQU8sQ0FBQztTQUNoQztRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsV0FBVyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBSyxLQUFLLFdBQVEsQ0FBQyxDQUFDLENBQUksS0FBSyxXQUFRLENBQUM7U0FDdEU7UUFFRCxJQUFJLE9BQU8sRUFBRTtZQUNULFdBQVcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQUssT0FBTyxhQUFVLENBQUMsQ0FBQyxDQUFJLE9BQU8sYUFBVSxDQUFDO1NBQzlFO1FBRUQsSUFBSSxPQUFPLEVBQUU7WUFDVCxXQUFXLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFRLE9BQU8sYUFBVSxDQUFDLENBQUMsQ0FBSSxPQUFPLGFBQVUsQ0FBQztTQUNqRjtRQUdELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxXQUFXLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVhLGdCQUFNLEdBQXBCLFVBQXFCLFNBQVMsRUFBRSxTQUFTO1FBQ3JDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFaEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFaEUsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUMzQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0YsS0FBSyxFQUFFLENBQUM7U0FDWDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFYSxxQkFBVyxHQUF6QixVQUEwQixVQUFrQixFQUFFLGFBQXNCO1FBQUUsZ0JBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQiwrQkFBZ0I7O1FBQ2xGLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRWEsdUJBQWEsR0FBM0IsVUFBNEIsS0FBWSxFQUFFLFFBQVEsRUFBRSxRQUFRO1FBRXhELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNkLE9BQU87U0FDVjtRQUVELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNkLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6QjtTQUNKO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVhLHlCQUFlLEdBQTdCLFVBQThCLElBQVk7UUFFdEMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO2FBQ3ZDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7YUFDaEMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFYSwyQkFBaUIsR0FBL0IsVUFBZ0MsR0FBVztRQUV2QyxJQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVhLDhCQUFvQixHQUFsQyxVQUFtQyxHQUFXO1FBRTFDLE9BQU8sU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDL0QsQ0FBQztJQUVhLHFCQUFXLEdBQXpCLFVBQTBCLEdBQUc7UUFDekIsSUFBTSxPQUFPLEdBQUcsR0FBRyxZQUFZLEtBQUssQ0FBQztRQUVyQyxLQUFLLElBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlDO2lCQUFNLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFO2dCQUNsQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVhLGtCQUFRLEdBQXRCLFVBQXVCLElBQXNCLEVBQUUsSUFBWSxFQUFFLFNBQW1CO1FBQzVFLElBQUksT0FBTyxDQUFDO1FBRVosT0FBTztZQUNILElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUM7WUFFeEIsSUFBTSxLQUFLLEdBQUc7Z0JBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUM5QjtZQUNMLENBQUMsQ0FBQztZQUVGLElBQU0sT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUV0QyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0lBam1Cc0Isb0NBQTBCLEdBQUcsR0FBRyxDQUFDO0lBQ2pDLGlDQUF1QixHQUFHLFlBQVksQ0FBQztJQUN2QyxnQ0FBc0IsR0FBRyw4QkFBOEIsQ0FBQztJQUN4RCxvQ0FBMEIsR0FBRyxnQkFBZ0IsQ0FBQztJQUM5QyxtQ0FBeUIsR0FBRyxFQUFFLENBQUM7SUFDL0IsZ0NBQXNCLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLCtCQUFxQixHQUFHLHFDQUFxQyxDQUFDO0lBRXZFLGlCQUFPLEdBQ2pCO1FBQ0ksT0FBTyxFQUFFLFVBQUMsSUFBSTtZQUNWLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsR0FBRyw2QkFBNkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQy9MLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU87WUFDakQsSUFBSSxDQUFDLElBQUksSUFBSSw0Q0FBNEMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xFLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQUksSUFBSSxFQUFFO2dCQUNOLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDdEIsS0FBSyxNQUFNO3dCQUNQLFFBQVEsR0FBRyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDL0YsTUFBTTtvQkFDVixLQUFLLE1BQU07d0JBQ1AsUUFBUSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQy9CLE1BQU07b0JBQ1YsS0FBSyxJQUFJO3dCQUNMLFFBQVEsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUM3QyxNQUFNO2lCQUNiO2FBQ0o7WUFFRCxRQUFRLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuTSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsVUFBVSxFQUFFLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPO1lBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxRQUFRLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLDBDQUEwQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEssT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU8sRUFBRSxVQUFDLElBQUk7WUFDVixPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsYUFBYSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25JLENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyx5REFBeUQsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNsSSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFBRTtZQUNsRyxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO0tBQ0osQ0FBQzt5RkFyREcsU0FBUzt3RUFBVCxTQUFTLFdBQVQsU0FBUyxtQkFGTixNQUFNO29CQUp0QjtDQXltQkMsQUF0bUJELElBc21CQztTQW5tQlksU0FBUztrREFBVCxTQUFTO2NBSHJCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZUJhc2UsIEh0dHBSZXNwb25zZSwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXRpbGl0aWVzIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yID0gJzonO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm9OZXR3b3JrTWVzc2FnZUNhcHRpb24gPSAnTm8gTmV0d29yayc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub05ldHdvcmtNZXNzYWdlRGV0YWlsID0gJ1RoZSBzZXJ2ZXIgY2Fubm90IGJlIHJlYWNoZWQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWNjZXNzRGVuaWVkTWVzc2FnZUNhcHRpb24gPSAnQWNjZXNzIERlbmllZCEnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYWNjZXNzRGVuaWVkTWVzc2FnZURldGFpbCA9ICcnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90Rm91bmRNZXNzYWdlQ2FwdGlvbiA9ICdOb3QgRm91bmQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm90Rm91bmRNZXNzYWdlRGV0YWlsID0gJ1RoZSB0YXJnZXQgcmVzb3VyY2UgY2Fubm90IGJlIGZvdW5kJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29va2llcyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIGdldEl0ZW06IChzS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKCcoPzooPzpefC4qOylcXFxccyonICsgZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csICdcXFxcJCYnKSArICdcXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiQnKSwgJyQxJykpIHx8IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SXRlbTogKHNLZXksIHNWYWx1ZSwgdkVuZCwgc1BhdGgsIHNEb21haW4sIGJTZWN1cmUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXNLZXkgfHwgL14oPzpleHBpcmVzfG1heFxcLWFnZXxwYXRofGRvbWFpbnxzZWN1cmUpJC9pLnRlc3Qoc0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBzRXhwaXJlcyA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2RW5kLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRXhwaXJlcyA9IHZFbmQgPT09IEluZmluaXR5ID8gJzsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVCcgOiAnOyBtYXgtYWdlPScgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSAnOyBleHBpcmVzPScgKyB2RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEYXRlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gJzsgZXhwaXJlcz0nICsgdkVuZC50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNWYWx1ZSkgKyBzRXhwaXJlcyArIChzRG9tYWluID8gJzsgZG9tYWluPScgKyBzRG9tYWluIDogJycpICsgKHNQYXRoID8gJzsgcGF0aD0nICsgc1BhdGggOiAnJykgKyAoYlNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbTogKHNLZXksIHNQYXRoLCBzRG9tYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpICsgJz07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQnICsgKHNEb21haW4gPyAnOyBkb21haW49JyArIHNEb21haW4gOiAnJykgKyAoc1BhdGggPyAnOyBwYXRoPScgKyBzUGF0aCA6ICcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNJdGVtOiAoc0tleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IFJlZ0V4cCgnKD86Xnw7XFxcXHMqKScgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgJ1xcXFwkJicpICsgJ1xcXFxzKlxcXFw9JykpLnRlc3QoZG9jdW1lbnQuY29va2llKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBrZXlzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYUtleXMgPSBkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKCg/Ol58XFxzKjspW15cXD1dKykoPz07fCQpfF5cXHMqfFxccyooPzpcXD1bXjtdKik/KD86XFwxfCQpL2csICcnKS5zcGxpdCgvXFxzKig/OlxcPVteO10qKT87XFxzKi8pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG5JZHggPSAwOyBuSWR4IDwgYUtleXMubGVuZ3RoOyBuSWR4KyspIHsgYUtleXNbbklkeF0gPSBkZWNvZGVVUklDb21wb25lbnQoYUtleXNbbklkeF0pOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFLZXlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhOiBIdHRwUmVzcG9uc2VCYXNlIHwgYW55KTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCByZXNwb25zZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja05vTmV0d29yayhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGAke3RoaXMubm9OZXR3b3JrTWVzc2FnZUNhcHRpb259JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3RoaXMubm9OZXR3b3JrTWVzc2FnZURldGFpbH1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSB0aGlzLmdldFJlc3BvbnNlQm9keShkYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZU9iamVjdCAmJiAodHlwZW9mIHJlc3BvbnNlT2JqZWN0ID09PSAnb2JqZWN0JyB8fCByZXNwb25zZU9iamVjdCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXNwb25zZU9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGAke2tleX0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7cmVzcG9uc2VPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2VPYmplY3Rba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlT2JqZWN0W2tleV0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICgoZGF0YSBhcyBhbnkpLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYGJvZHk6ICR7KGRhdGEgYXMgYW55KS5ib2R5fWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgoZGF0YSBhcyBhbnkpLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGBlcnJvcjogJHsoZGF0YSBhcyBhbnkpLmVycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVzcG9uc2VCb2R5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5nZXRSZXNwb25zZUJvZHkoZGF0YSkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGRhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja0FjY2Vzc0RlbmllZChkYXRhKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VzLnNwbGljZSgwLCAwLCBgJHt0aGlzLmFjY2Vzc0RlbmllZE1lc3NhZ2VDYXB0aW9ufSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHt0aGlzLmFjY2Vzc0RlbmllZE1lc3NhZ2VEZXRhaWx9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja05vdEZvdW5kKGRhdGEpKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IGAke3RoaXMubm90Rm91bmRNZXNzYWdlQ2FwdGlvbn0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7dGhpcy5ub3RGb3VuZE1lc3NhZ2VEZXRhaWx9YDtcbiAgICAgICAgICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYC4gJHtkYXRhLnVybH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNwb25zZXMuc3BsaWNlKDAsIDAsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEh0dHBSZXNwb25zZU1lc3NhZ2UoZGF0YTogSHR0cFJlc3BvbnNlQmFzZSB8IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGh0dHBNZXNzYWdlID1cbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZShVdGlsaXRpZXMubm9OZXR3b3JrTWVzc2FnZUNhcHRpb24sIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoVXRpbGl0aWVzLm5vdEZvdW5kTWVzc2FnZUNhcHRpb24sIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoJ2Vycm9yX2Rlc2NyaXB0aW9uJywgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZSgnZXJyb3InLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpLmpvaW4oKTtcblxuICAgICAgICByZXR1cm4gaHR0cE1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSHR0cFJlc3BvbnNlTWVzc2FnZShtZXNzYWdlVG9GaW5kOiBzdHJpbmcsIGRhdGE6IEh0dHBSZXNwb25zZTxhbnk+IHwgYW55LCBzZWFjaEluQ2FwdGlvbk9ubHkgPSB0cnVlLCBpbmNsdWRlQ2FwdGlvbkluUmVzdWx0ID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzZWFyY2hTdHJpbmcgPSBtZXNzYWdlVG9GaW5kLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGh0dHBNZXNzYWdlcyA9IHRoaXMuZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGh0dHBNZXNzYWdlcykge1xuICAgICAgICAgICAgY29uc3QgZnVsbE1lc3NhZ2UgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCB0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgaWYgKGZ1bGxNZXNzYWdlLmZpcnN0UGFydCAmJiBmdWxsTWVzc2FnZS5maXJzdFBhcnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZUNhcHRpb25JblJlc3VsdCA/IG1lc3NhZ2UgOiBmdWxsTWVzc2FnZS5zZWNvbmRQYXJ0IHx8IGZ1bGxNZXNzYWdlLmZpcnN0UGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VhY2hJbkNhcHRpb25Pbmx5KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgaHR0cE1lc3NhZ2VzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZUNhcHRpb25JblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmdWxsTWVzc2FnZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKG1lc3NhZ2UsIHRoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bGxNZXNzYWdlLnNlY29uZFBhcnQgfHwgZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZXJyb3IgfHwgcmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja05vTmV0d29yayhyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0FjY2Vzc0RlbmllZChyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDQwMztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTm90Rm91bmQocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0lzTG9jYWxIb3N0KHVybDogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbmV3IFVSTCh1cmwsIGJhc2UpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJzEyNy4wLjAuMSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRRdWVyeVBhcmFtc0Zyb21TdHJpbmcocGFyYW1TdHJpbmc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXBhcmFtU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1TdHJpbmcuc3BsaXQoJyYnKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhwYXJhbSwgJz0nKTtcbiAgICAgICAgICAgIHBhcmFtc1trZXlWYWx1ZS5maXJzdFBhcnRdID0ga2V5VmFsdWUuc2Vjb25kUGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzcGxpdEluVHdvKHRleHQ6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcpOiB7IGZpcnN0UGFydDogc3RyaW5nLCBzZWNvbmRQYXJ0OiBzdHJpbmcgfSB7XG4gICAgICAgIGNvbnN0IHNlcGFyYXRvckluZGV4ID0gdGV4dC5pbmRleE9mKHNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4geyBmaXJzdFBhcnQ6IHRleHQsIHNlY29uZFBhcnQ6IG51bGwgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnQxID0gdGV4dC5zdWJzdHIoMCwgc2VwYXJhdG9ySW5kZXgpLnRyaW0oKTtcbiAgICAgICAgY29uc3QgcGFydDIgPSB0ZXh0LnN1YnN0cihzZXBhcmF0b3JJbmRleCArIDEpLnRyaW0oKTtcblxuICAgICAgICByZXR1cm4geyBmaXJzdFBhcnQ6IHBhcnQxLCBzZWNvbmRQYXJ0OiBwYXJ0MiB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2FmZVN0cmluZ2lmeShvYmplY3QpIHtcblxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaW1wbGVPYmplY3QgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0W3Byb3BdKSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0W3Byb3BdKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaW1wbGVPYmplY3RbcHJvcF0gPSBvYmplY3RbcHJvcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgPSAnWyoqKlNhbml0aXplZCBPYmplY3QqKipdOiAnICsgSlNPTi5zdHJpbmdpZnkoc2ltcGxlT2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgSnNvblRyeVBhcnNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc09iamVjdEVtcHR5KG9iajogYW55KSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc1VuZGVmaW5lZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICAvLyByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIFRlc3RJc1N0cmluZyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRleHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvVGl0bGVDYXNlKHRleHQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHdcXFMqL2csIChzdWJTdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdWJTdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdWJTdHJpbmcuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IHN0cmluZyk7XG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogc3RyaW5nW10pO1xuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IGFueSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcblxuICAgICAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgbG93ZXJlZFJvbGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbG93ZXJlZFJvbGVzW2ldID0gaXRlbXNbaV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyZWRSb2xlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbXMgPT09ICdzdHJpbmcnIHx8IGl0ZW1zIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdW5pcXVlSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbU51bWJlcigxMDAwMDAwLCA5MDAwMDAwKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJhc2VVcmwoKSB7XG4gICAgICAgIGxldCBiYXNlID0gJyc7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgICAgICAgIGJhc2UgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCA6ICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiYXNlLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludERhdGVPbmx5KGRhdGU6IERhdGUpIHtcblxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgY29uc3QgZGF5TmFtZXMgPSBuZXcgQXJyYXkoJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5Jyk7XG4gICAgICAgIGNvbnN0IG1vbnRoTmFtZXMgPSBuZXcgQXJyYXkoJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInKTtcblxuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgICAgICBjb25zdCBkYXlPZk1vbnRoID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGxldCBzdXAgPSAnJztcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgaWYgKGRheU9mTW9udGggPT0gMSB8fCBkYXlPZk1vbnRoID09IDIxIHx8IGRheU9mTW9udGggPT0gMzEpIHtcbiAgICAgICAgICAgIHN1cCA9ICdzdCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZNb250aCA9PSAyIHx8IGRheU9mTW9udGggPT0gMjIpIHtcbiAgICAgICAgICAgIHN1cCA9ICduZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZNb250aCA9PSAzIHx8IGRheU9mTW9udGggPT0gMjMpIHtcbiAgICAgICAgICAgIHN1cCA9ICdyZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXAgPSAndGgnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGRheU5hbWVzW2RheU9mV2Vla10gKyAnLCAnICsgZGF5T2ZNb250aCArIHN1cCArICcgJyArIG1vbnRoTmFtZXNbbW9udGhdICsgJyAnICsgeWVhcjtcblxuICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50VGltZU9ubHkoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblxuICAgICAgICBsZXQgcGVyaW9kID0gJyc7XG4gICAgICAgIGxldCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcblxuICAgICAgICBwZXJpb2QgPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcblxuICAgICAgICBpZiAoaG91ciA9PSAwKSB7XG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPiAxMikge1xuICAgICAgICAgICAgaG91ciA9IGhvdXIgLSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW51dGUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpbWVTdHJpbmcgPSBob3VyICsgJzonICsgbWludXRlICsgJyAnICsgcGVyaW9kO1xuXG5cbiAgICAgICAgcmV0dXJuIHRpbWVTdHJpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludERhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJ2F0Jykge1xuICAgICAgICByZXR1cm4gYCR7VXRpbGl0aWVzLnByaW50RGF0ZU9ubHkoZGF0ZSl9ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludEZyaWVuZGx5RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnLScpIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgY29uc3QgeWVzdGVyZGF5ID0gbmV3IERhdGUodG9kYXkpOyB5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXkuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICAgIGNvbnN0IHRlc3QgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuXG4gICAgICAgIGlmICh0ZXN0LnRvRGF0ZVN0cmluZygpID09IHRvZGF5LnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFRvZGF5ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlc3QudG9EYXRlU3RyaW5nKCkgPT0geWVzdGVyZGF5LnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYFllc3RlcmRheSAke3NlcGFyYXRvcn0gJHtVdGlsaXRpZXMucHJpbnRUaW1lT25seShkYXRlKX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxpdGllcy5wcmludERhdGUoZGF0ZSwgc2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnRTaG9ydERhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJy8nLCBkYXRlVGltZVNlcGFyYXRvciA9ICctJykge1xuXG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgbW9udGggPSAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAoZGF5Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBkYXkgPSAnMCcgKyBkYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9udGgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1vbnRoID0gJzAnICsgbW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7bW9udGh9JHtzZXBhcmF0b3J9JHtkYXl9JHtzZXBhcmF0b3J9JHt5ZWFyfSAke2RhdGVUaW1lU2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZURhdGUoZGF0ZSkge1xuXG4gICAgICAgIGlmIChkYXRlKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnIHx8IGRhdGUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5zZWFyY2goL1thLXN1LXorXS9pKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlID0gZGF0ZSArICdaJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgfHwgZGF0ZSBpbnN0YW5jZW9mIE51bWJlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RHVyYXRpb24oc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSkge1xuXG4gICAgICAgIHN0YXJ0ID0gbmV3IERhdGUoc3RhcnQpO1xuICAgICAgICBlbmQgPSBuZXcgRGF0ZShlbmQpO1xuXG4gICAgICAgIC8vIGdldCB0b3RhbCBzZWNvbmRzIGJldHdlZW4gdGhlIHRpbWVzXG4gICAgICAgIGxldCBkZWx0YSA9IE1hdGguYWJzKHN0YXJ0LnZhbHVlT2YoKSAtIGVuZC52YWx1ZU9mKCkpIC8gMTAwMDtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgKGFuZCBzdWJ0cmFjdCkgd2hvbGUgZGF5c1xuICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihkZWx0YSAvIDg2NDAwKTtcbiAgICAgICAgZGVsdGEgLT0gZGF5cyAqIDg2NDAwO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSAoYW5kIHN1YnRyYWN0KSB3aG9sZSBob3Vyc1xuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoZGVsdGEgLyAzNjAwKSAlIDI0O1xuICAgICAgICBkZWx0YSAtPSBob3VycyAqIDM2MDA7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIChhbmQgc3VidHJhY3QpIHdob2xlIG1pbnV0ZXNcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoZGVsdGEgLyA2MCkgJSA2MDtcbiAgICAgICAgZGVsdGEgLT0gbWludXRlcyAqIDYwO1xuXG4gICAgICAgIC8vIHdoYXQncyBsZWZ0IGlzIHNlY29uZHNcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IGRlbHRhICUgNjA7ICAvLyBpbiB0aGVvcnkgdGhlIG1vZHVsdXMgaXMgbm90IHJlcXVpcmVkXG5cblxuICAgICAgICBsZXQgcHJpbnRlZERheXMgPSAnJztcblxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgPSBgJHtkYXlzfSBkYXlzYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3Vycykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgLCAke2hvdXJzfSBob3Vyc2AgOiBgJHtob3Vyc30gaG91cnNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCwgJHttaW51dGVzfSBtaW51dGVzYCA6IGAke21pbnV0ZXN9IG1pbnV0ZXNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCBhbmQgJHtzZWNvbmRzfSBzZWNvbmRzYCA6IGAke3NlY29uZHN9IHNlY29uZHNgO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoIXByaW50ZWREYXlzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyA9ICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmludGVkRGF5cztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEFnZShiaXJ0aERhdGUsIG90aGVyRGF0ZSkge1xuICAgICAgICBiaXJ0aERhdGUgPSBuZXcgRGF0ZShiaXJ0aERhdGUpO1xuICAgICAgICBvdGhlckRhdGUgPSBuZXcgRGF0ZShvdGhlckRhdGUpO1xuXG4gICAgICAgIGxldCB5ZWFycyA9IChvdGhlckRhdGUuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICAgICAgICBpZiAob3RoZXJEYXRlLmdldE1vbnRoKCkgPCBiaXJ0aERhdGUuZ2V0TW9udGgoKSB8fFxuICAgICAgICAgICAgb3RoZXJEYXRlLmdldE1vbnRoKCkgPT0gYmlydGhEYXRlLmdldE1vbnRoKCkgJiYgb3RoZXJEYXRlLmdldERhdGUoKSA8IGJpcnRoRGF0ZS5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgIHllYXJzLS07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geWVhcnM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZWFyY2hBcnJheShzZWFyY2hUZXJtOiBzdHJpbmcsIGNhc2VTZW5zaXRpdmU6IGJvb2xlYW4sIC4uLnZhbHVlczogYW55W10pIHtcbiAgICAgICAgaWYgKCFzZWFyY2hUZXJtKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmaWx0ZXIgPSBzZWFyY2hUZXJtLnRyaW0oKTtcbiAgICAgICAgbGV0IGRhdGEgPSB2YWx1ZXMuam9pbigpO1xuXG4gICAgICAgIGlmICghY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgZmlsdGVyID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGEuaW5kZXhPZihmaWx0ZXIpICE9IC0xO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZUFycmF5SXRlbShhcnJheTogYW55W10sIG9sZEluZGV4LCBuZXdJbmRleCkge1xuXG4gICAgICAgIGlmIChvbGRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgIG5ld0luZGV4ICs9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdJbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBrID0gbmV3SW5kZXggLSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKGstLSkgKyAxKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXkuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnJheS5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV4cGFuZENhbWVsQ2FzZSh0ZXh0OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvKFtBLVpdW2Etel0rKS9nLCAnICQxJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl1bQS1aXSspL2csICcgJDEnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbXkEtWmEteiBdKykvZywgJyAkMScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGVzdElzQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCByID0gbmV3IFJlZ0V4cCgnXig/OlthLXpdKzopPy8vJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIHIudGVzdCh1cmwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydFRvQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpIHtcblxuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLnRlc3RJc0Fic29sdXRlVXJsKHVybCkgPyB1cmwgOiAnLy8nICsgdXJsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlTnVsbHMob2JqKSB7XG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSBvYmogaW5zdGFuY2VvZiBBcnJheTtcblxuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqW2tdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNBcnJheSA/IG9iai5zcGxpY2UoaywgMSkgOiBkZWxldGUgb2JqW2tdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW2tdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgVXRpbGl0aWVzLnJlbW92ZU51bGxzKG9ialtrXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0FycmF5ICYmIG9iai5sZW5ndGggPT0gaykge1xuICAgICAgICAgICAgICAgIFV0aWxpdGllcy5yZW1vdmVOdWxscyhvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlYm91bmNlKGZ1bmM6ICguLi5hcmdzKSA9PiBhbnksIHdhaXQ6IG51bWJlciwgaW1tZWRpYXRlPzogYm9vbGVhbikge1xuICAgICAgICBsZXQgdGltZW91dDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGFyZ3NfID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgICBjb25zdCBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJnc18pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3NfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=