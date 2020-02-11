/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/utilities.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// Supress angular complication error
// @dynamic
export class Utilities {
    /**
     * @param {?} data
     * @return {?}
     */
    static getHttpResponseMessages(data) {
        /** @type {?} */
        const responses = [];
        if (data instanceof HttpResponseBase) {
            if (this.checkNoNetwork(data)) {
                responses.push(`${this.noNetworkMessageCaption}${this.captionAndMessageSeparator} ${this.noNetworkMessageDetail}`);
            }
            else {
                /** @type {?} */
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
                if (((/** @type {?} */ (data))).body) {
                    responses.push(`body: ${((/** @type {?} */ (data))).body}`);
                }
                if (((/** @type {?} */ (data))).error) {
                    responses.push(`error: ${((/** @type {?} */ (data))).error}`);
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
            /** @type {?} */
            let message = `${this.notFoundMessageCaption}${this.captionAndMessageSeparator} ${this.notFoundMessageDetail}`;
            if (data.url) {
                message += `. ${data.url}`;
            }
            responses.splice(0, 0, message);
        }
        return responses;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static getHttpResponseMessage(data) {
        /** @type {?} */
        const httpMessage = Utilities.findHttpResponseMessage(Utilities.noNetworkMessageCaption, data) ||
            Utilities.findHttpResponseMessage(Utilities.notFoundMessageCaption, data) ||
            Utilities.findHttpResponseMessage('error_description', data) ||
            Utilities.findHttpResponseMessage('error', data) ||
            Utilities.getHttpResponseMessages(data).join();
        return httpMessage;
    }
    /**
     * @param {?} messageToFind
     * @param {?} data
     * @param {?=} seachInCaptionOnly
     * @param {?=} includeCaptionInResult
     * @return {?}
     */
    static findHttpResponseMessage(messageToFind, data, seachInCaptionOnly = true, includeCaptionInResult = false) {
        /** @type {?} */
        const searchString = messageToFind.toLowerCase();
        /** @type {?} */
        const httpMessages = this.getHttpResponseMessages(data);
        for (const message of httpMessages) {
            /** @type {?} */
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
                        /** @type {?} */
                        const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
                        return fullMessage.secondPart || fullMessage.firstPart;
                    }
                }
            }
        }
        return null;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    static getResponseBody(response) {
        if (response instanceof HttpResponse) {
            return response.body;
        }
        if (response instanceof HttpErrorResponse) {
            return response.error || response.message || response.statusText;
        }
    }
    /**
     * @param {?} response
     * @return {?}
     */
    static checkNoNetwork(response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 0;
        }
        return false;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    static checkAccessDenied(response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 403;
        }
        return false;
    }
    /**
     * @param {?} response
     * @return {?}
     */
    static checkNotFound(response) {
        if (response instanceof HttpResponseBase) {
            return response.status == 404;
        }
        return false;
    }
    /**
     * @param {?} url
     * @param {?=} base
     * @return {?}
     */
    static checkIsLocalHost(url, base) {
        if (url) {
            /** @type {?} */
            const location = new URL(url, base);
            return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        }
        return false;
    }
    /**
     * @param {?} paramString
     * @return {?}
     */
    static getQueryParamsFromString(paramString) {
        if (!paramString) {
            return null;
        }
        /** @type {?} */
        const params = {};
        for (const param of paramString.split('&')) {
            /** @type {?} */
            const keyValue = Utilities.splitInTwo(param, '=');
            params[keyValue.firstPart] = keyValue.secondPart;
        }
        return params;
    }
    /**
     * @param {?} text
     * @param {?} separator
     * @return {?}
     */
    static splitInTwo(text, separator) {
        /** @type {?} */
        const separatorIndex = text.indexOf(separator);
        if (separatorIndex == -1) {
            return { firstPart: text, secondPart: null };
        }
        /** @type {?} */
        const part1 = text.substr(0, separatorIndex).trim();
        /** @type {?} */
        const part2 = text.substr(separatorIndex + 1).trim();
        return { firstPart: part1, secondPart: part2 };
    }
    /**
     * @param {?} object
     * @return {?}
     */
    static safeStringify(object) {
        /** @type {?} */
        let result;
        try {
            result = JSON.stringify(object);
            return result;
        }
        catch (error) {
        }
        /** @type {?} */
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
    /**
     * @param {?} value
     * @return {?}
     */
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
    /**
     * @param {?} obj
     * @return {?}
     */
    static TestIsObjectEmpty(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static TestIsUndefined(value) {
        return typeof value === 'undefined';
        // return value === undefined;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static TestIsString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    static capitalizeFirstLetter(text) {
        if (text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
        else {
            return text;
        }
    }
    /**
     * @param {?} text
     * @return {?}
     */
    static toTitleCase(text) {
        return text.replace(/\w\S*/g, (/**
         * @param {?} subString
         * @return {?}
         */
        (subString) => {
            return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
        }));
    }
    /**
     * @param {?} items
     * @return {?}
     */
    static toLowerCase(items) {
        if (items instanceof Array) {
            /** @type {?} */
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
    /**
     * @return {?}
     */
    static uniqueId() {
        return this.randomNumber(1000000, 9000000).toString();
    }
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**
     * @return {?}
     */
    static baseUrl() {
        /** @type {?} */
        let base = '';
        if (window.location.origin) {
            base = window.location.origin;
        }
        else {
            base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        return base.replace(/\/$/, '');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static printDateOnly(date) {
        date = new Date(date);
        /** @type {?} */
        const dayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        /** @type {?} */
        const monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
        /** @type {?} */
        const dayOfWeek = date.getDay();
        /** @type {?} */
        const dayOfMonth = date.getDate();
        /** @type {?} */
        let sup = '';
        /** @type {?} */
        const month = date.getMonth();
        /** @type {?} */
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
        /** @type {?} */
        const dateString = dayNames[dayOfWeek] + ', ' + dayOfMonth + sup + ' ' + monthNames[month] + ' ' + year;
        return dateString;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static printTimeOnly(date) {
        date = new Date(date);
        /** @type {?} */
        let period = '';
        /** @type {?} */
        let minute = date.getMinutes().toString();
        /** @type {?} */
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
        /** @type {?} */
        const timeString = hour + ':' + minute + ' ' + period;
        return timeString;
    }
    /**
     * @param {?} date
     * @param {?=} separator
     * @return {?}
     */
    static printDate(date, separator = 'at') {
        return `${Utilities.printDateOnly(date)} ${separator} ${Utilities.printTimeOnly(date)}`;
    }
    /**
     * @param {?} date
     * @param {?=} separator
     * @return {?}
     */
    static printFriendlyDate(date, separator = '-') {
        /** @type {?} */
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        /** @type {?} */
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        /** @type {?} */
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
    /**
     * @param {?} date
     * @param {?=} separator
     * @param {?=} dateTimeSeparator
     * @return {?}
     */
    static printShortDate(date, separator = '/', dateTimeSeparator = '-') {
        /** @type {?} */
        let day = date.getDate().toString();
        /** @type {?} */
        let month = (date.getMonth() + 1).toString();
        /** @type {?} */
        const year = date.getFullYear();
        if (day.length == 1) {
            day = '0' + day;
        }
        if (month.length == 1) {
            month = '0' + month;
        }
        return `${month}${separator}${day}${separator}${year} ${dateTimeSeparator} ${Utilities.printTimeOnly(date)}`;
    }
    /**
     * @param {?} date
     * @return {?}
     */
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
                return new Date((/** @type {?} */ (date)));
            }
        }
    }
    /**
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    static printDuration(start, end) {
        start = new Date(start);
        end = new Date(end);
        // get total seconds between the times
        /** @type {?} */
        let delta = Math.abs(start.valueOf() - end.valueOf()) / 1000;
        // calculate (and subtract) whole days
        /** @type {?} */
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        /** @type {?} */
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        /** @type {?} */
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        /** @type {?} */
        const seconds = delta % 60;
        // in theory the modulus is not required
        /** @type {?} */
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
    /**
     * @param {?} birthDate
     * @param {?} otherDate
     * @return {?}
     */
    static getAge(birthDate, otherDate) {
        birthDate = new Date(birthDate);
        otherDate = new Date(otherDate);
        /** @type {?} */
        let years = (otherDate.getFullYear() - birthDate.getFullYear());
        if (otherDate.getMonth() < birthDate.getMonth() ||
            otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--;
        }
        return years;
    }
    /**
     * @param {?} searchTerm
     * @param {?} caseSensitive
     * @param {...?} values
     * @return {?}
     */
    static searchArray(searchTerm, caseSensitive, ...values) {
        if (!searchTerm) {
            return true;
        }
        /** @type {?} */
        let filter = searchTerm.trim();
        /** @type {?} */
        let data = values.join();
        if (!caseSensitive) {
            filter = filter.toLowerCase();
            data = data.toLowerCase();
        }
        return data.indexOf(filter) != -1;
    }
    /**
     * @param {?} array
     * @param {?} oldIndex
     * @param {?} newIndex
     * @return {?}
     */
    static moveArrayItem(array, oldIndex, newIndex) {
        if (oldIndex < 0) {
            return;
        }
        if (newIndex < 0) {
            newIndex += array.length;
        }
        if (newIndex >= array.length) {
            /** @type {?} */
            let k = newIndex - array.length;
            while ((k--) + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    static expandCamelCase(text) {
        if (!text) {
            return text;
        }
        return text.replace(/([A-Z][a-z]+)/g, ' $1')
            .replace(/([A-Z][A-Z]+)/g, ' $1')
            .replace(/([^A-Za-z ]+)/g, ' $1');
    }
    /**
     * @param {?} url
     * @return {?}
     */
    static testIsAbsoluteUrl(url) {
        /** @type {?} */
        const r = new RegExp('^(?:[a-z]+:)?//', 'i');
        return r.test(url);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    static convertToAbsoluteUrl(url) {
        return Utilities.testIsAbsoluteUrl(url) ? url : '//' + url;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static removeNulls(obj) {
        /** @type {?} */
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
    /**
     * @param {?} func
     * @param {?} wait
     * @param {?=} immediate
     * @return {?}
     */
    static debounce(func, wait, immediate) {
        /** @type {?} */
        let timeout;
        return (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const context = this;
            /** @type {?} */
            const args_ = arguments;
            /** @type {?} */
            const later = (/**
             * @return {?}
             */
            function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args_);
                }
            });
            /** @type {?} */
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args_);
            }
        });
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
    getItem: (/**
     * @param {?} sKey
     * @return {?}
     */
    (sKey) => {
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
    (sKey, sValue, vEnd, sPath, sDomain, bSecure) => {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        /** @type {?} */
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
    }),
    removeItem: (/**
     * @param {?} sKey
     * @param {?} sPath
     * @param {?} sDomain
     * @return {?}
     */
    (sKey, sPath, sDomain) => {
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
    (sKey) => {
        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    }),
    keys: (/**
     * @return {?}
     */
    () => {
        /** @type {?} */
        const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    })
};
Utilities.decorators = [
    { type: Injectable }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3V0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFNekYsTUFBTSxPQUFPLFNBQVM7Ozs7O0lBdURYLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUE0Qjs7Y0FDeEQsU0FBUyxHQUFhLEVBQUU7UUFFOUIsSUFBSSxJQUFJLFlBQVksZ0JBQWdCLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQywwQkFBMEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2FBQ3RIO2lCQUFNOztzQkFDRyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBRWpELElBQUksY0FBYyxJQUFJLENBQUMsT0FBTyxjQUFjLEtBQUssUUFBUSxJQUFJLGNBQWMsWUFBWSxNQUFNLENBQUMsRUFBRTtvQkFFNUYsS0FBSyxNQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUU7d0JBQzlCLElBQUksR0FBRyxFQUFFOzRCQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7eUJBQ3JGOzZCQUFNLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUM1QixTQUFTLENBQUMsSUFBSSxDQUFD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RCxpQ0FBK0U7O0lBQy9FLHFDQUFxRTs7SUFDckUsb0NBQXNEOztJQUN0RCxpQ0FBNEQ7O0lBQzVELGdDQUFxRjs7SUFFckYsa0JBNENNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlQmFzZSwgSHR0cFJlc3BvbnNlLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLy8gU3VwcmVzcyBhbmd1bGFyIGNvbXBsaWNhdGlvbiBlcnJvclxuLy8gQGR5bmFtaWNcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxpdGllcyB7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvciA9ICc6JztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5vTmV0d29ya01lc3NhZ2VDYXB0aW9uID0gJ05vIE5ldHdvcmsnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbm9OZXR3b3JrTWVzc2FnZURldGFpbCA9ICdUaGUgc2VydmVyIGNhbm5vdCBiZSByZWFjaGVkJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGFjY2Vzc0RlbmllZE1lc3NhZ2VDYXB0aW9uID0gJ0FjY2VzcyBEZW5pZWQhJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGFjY2Vzc0RlbmllZE1lc3NhZ2VEZXRhaWwgPSAnJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5vdEZvdW5kTWVzc2FnZUNhcHRpb24gPSAnTm90IEZvdW5kJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5vdEZvdW5kTWVzc2FnZURldGFpbCA9ICdUaGUgdGFyZ2V0IHJlc291cmNlIGNhbm5vdCBiZSBmb3VuZCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvb2tpZXMgPVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXRJdGVtOiAoc0tleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cCgnKD86KD86XnwuKjspXFxcXHMqJyArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCAnXFxcXCQmJykgKyAnXFxcXHMqXFxcXD1cXFxccyooW147XSopLiokKXxeLiokJyksICckMScpKSB8fCBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEl0ZW06IChzS2V5LCBzVmFsdWUsIHZFbmQsIHNQYXRoLCBzRG9tYWluLCBiU2VjdXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzS2V5IHx8IC9eKD86ZXhwaXJlc3xtYXhcXC1hZ2V8cGF0aHxkb21haW58c2VjdXJlKSQvaS50ZXN0KHNLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgc0V4cGlyZXMgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmICh2RW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodkVuZC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSB2RW5kID09PSBJbmZpbml0eSA/ICc7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVQnIDogJzsgbWF4LWFnZT0nICsgdkVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU3RyaW5nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gJzsgZXhwaXJlcz0nICsgdkVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIHZFbmQudG9VVENTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChzS2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChzVmFsdWUpICsgc0V4cGlyZXMgKyAoc0RvbWFpbiA/ICc7IGRvbWFpbj0nICsgc0RvbWFpbiA6ICcnKSArIChzUGF0aCA/ICc7IHBhdGg9JyArIHNQYXRoIDogJycpICsgKGJTZWN1cmUgPyAnOyBzZWN1cmUnIDogJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW06IChzS2V5LCBzUGF0aCwgc0RvbWFpbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc0tleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChzS2V5KSArICc9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UJyArIChzRG9tYWluID8gJzsgZG9tYWluPScgKyBzRG9tYWluIDogJycpICsgKHNQYXRoID8gJzsgcGF0aD0nICsgc1BhdGggOiAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzSXRlbTogKHNLZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG5ldyBSZWdFeHAoJyg/Ol58O1xcXFxzKiknICsgZW5jb2RlVVJJQ29tcG9uZW50KHNLZXkpLnJlcGxhY2UoL1tcXC1cXC5cXCtcXCpdL2csICdcXFxcJCYnKSArICdcXFxccypcXFxcPScpKS50ZXN0KGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAga2V5czogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFLZXlzID0gZG9jdW1lbnQuY29va2llLnJlcGxhY2UoLygoPzpefFxccyo7KVteXFw9XSspKD89O3wkKXxeXFxzKnxcXHMqKD86XFw9W147XSopPyg/OlxcMXwkKS9nLCAnJykuc3BsaXQoL1xccyooPzpcXD1bXjtdKik/O1xccyovKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuSWR4ID0gMDsgbklkeCA8IGFLZXlzLmxlbmd0aDsgbklkeCsrKSB7IGFLZXlzW25JZHhdID0gZGVjb2RlVVJJQ29tcG9uZW50KGFLZXlzW25JZHhdKTsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhS2V5cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YTogSHR0cFJlc3BvbnNlQmFzZSB8IGFueSk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tOb05ldHdvcmsoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChgJHt0aGlzLm5vTmV0d29ya01lc3NhZ2VDYXB0aW9ufSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHt0aGlzLm5vTmV0d29ya01lc3NhZ2VEZXRhaWx9YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlT2JqZWN0ID0gdGhpcy5nZXRSZXNwb25zZUJvZHkoZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VPYmplY3QgJiYgKHR5cGVvZiByZXNwb25zZU9iamVjdCA9PT0gJ29iamVjdCcgfHwgcmVzcG9uc2VPYmplY3QgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcmVzcG9uc2VPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChgJHtrZXl9JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3Jlc3BvbnNlT2JqZWN0W2tleV19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlT2JqZWN0W2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChyZXNwb25zZU9iamVjdFtrZXldLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoKGRhdGEgYXMgYW55KS5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKGBib2R5OiAkeyhkYXRhIGFzIGFueSkuYm9keX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKGRhdGEgYXMgYW55KS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChgZXJyb3I6ICR7KGRhdGEgYXMgYW55KS5lcnJvcn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFJlc3BvbnNlQm9keShkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHRoaXMuZ2V0UmVzcG9uc2VCb2R5KGRhdGEpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChkYXRhLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tBY2Nlc3NEZW5pZWQoZGF0YSkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlcy5zcGxpY2UoMCwgMCwgYCR7dGhpcy5hY2Nlc3NEZW5pZWRNZXNzYWdlQ2FwdGlvbn0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7dGhpcy5hY2Nlc3NEZW5pZWRNZXNzYWdlRGV0YWlsfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tOb3RGb3VuZChkYXRhKSkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBgJHt0aGlzLm5vdEZvdW5kTWVzc2FnZUNhcHRpb259JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3RoaXMubm90Rm91bmRNZXNzYWdlRGV0YWlsfWA7XG4gICAgICAgICAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGAuICR7ZGF0YS51cmx9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzcG9uc2VzLnNwbGljZSgwLCAwLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIdHRwUmVzcG9uc2VNZXNzYWdlKGRhdGE6IEh0dHBSZXNwb25zZUJhc2UgfCBhbnkpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBodHRwTWVzc2FnZSA9XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoVXRpbGl0aWVzLm5vTmV0d29ya01lc3NhZ2VDYXB0aW9uLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKFV0aWxpdGllcy5ub3RGb3VuZE1lc3NhZ2VDYXB0aW9uLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKCdlcnJvcl9kZXNjcmlwdGlvbicsIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UoJ2Vycm9yJywgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5nZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhKS5qb2luKCk7XG5cbiAgICAgICAgcmV0dXJuIGh0dHBNZXNzYWdlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEh0dHBSZXNwb25zZU1lc3NhZ2UobWVzc2FnZVRvRmluZDogc3RyaW5nLCBkYXRhOiBIdHRwUmVzcG9uc2U8YW55PiB8IGFueSwgc2VhY2hJbkNhcHRpb25Pbmx5ID0gdHJ1ZSwgaW5jbHVkZUNhcHRpb25JblJlc3VsdCA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoU3RyaW5nID0gbWVzc2FnZVRvRmluZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBodHRwTWVzc2FnZXMgPSB0aGlzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpO1xuXG4gICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBodHRwTWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxNZXNzYWdlID0gVXRpbGl0aWVzLnNwbGl0SW5Ud28obWVzc2FnZSwgdGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIGlmIChmdWxsTWVzc2FnZS5maXJzdFBhcnQgJiYgZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hTdHJpbmcpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVDYXB0aW9uSW5SZXN1bHQgPyBtZXNzYWdlIDogZnVsbE1lc3NhZ2Uuc2Vjb25kUGFydCB8fCBmdWxsTWVzc2FnZS5maXJzdFBhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlYWNoSW5DYXB0aW9uT25seSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGh0dHBNZXNzYWdlcykge1xuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFN0cmluZykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVDYXB0aW9uSW5SZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZnVsbE1lc3NhZ2UgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCB0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdWxsTWVzc2FnZS5zZWNvbmRQYXJ0IHx8IGZ1bGxNZXNzYWdlLmZpcnN0UGFydDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmVycm9yIHx8IHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tOb05ldHdvcmsocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tBY2Nlc3NEZW5pZWQocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PSA0MDM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja05vdEZvdW5kKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXMgPT0gNDA0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tJc0xvY2FsSG9zdCh1cmw6IHN0cmluZywgYmFzZT86IHN0cmluZykge1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG5ldyBVUkwodXJsLCBiYXNlKTtcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09ICcxMjcuMC4wLjEnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UXVlcnlQYXJhbXNGcm9tU3RyaW5nKHBhcmFtU3RyaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFwYXJhbVN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtU3RyaW5nLnNwbGl0KCcmJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleVZhbHVlID0gVXRpbGl0aWVzLnNwbGl0SW5Ud28ocGFyYW0sICc9Jyk7XG4gICAgICAgICAgICBwYXJhbXNba2V5VmFsdWUuZmlyc3RQYXJ0XSA9IGtleVZhbHVlLnNlY29uZFBhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc3BsaXRJblR3byh0ZXh0OiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nKTogeyBmaXJzdFBhcnQ6IHN0cmluZywgc2Vjb25kUGFydDogc3RyaW5nIH0ge1xuICAgICAgICBjb25zdCBzZXBhcmF0b3JJbmRleCA9IHRleHQuaW5kZXhPZihzZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZXBhcmF0b3JJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZmlyc3RQYXJ0OiB0ZXh0LCBzZWNvbmRQYXJ0OiBudWxsIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJ0MSA9IHRleHQuc3Vic3RyKDAsIHNlcGFyYXRvckluZGV4KS50cmltKCk7XG4gICAgICAgIGNvbnN0IHBhcnQyID0gdGV4dC5zdWJzdHIoc2VwYXJhdG9ySW5kZXggKyAxKS50cmltKCk7XG5cbiAgICAgICAgcmV0dXJuIHsgZmlyc3RQYXJ0OiBwYXJ0MSwgc2Vjb25kUGFydDogcGFydDIgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNhZmVTdHJpbmdpZnkob2JqZWN0KSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2ltcGxlT2JqZWN0ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG9iamVjdFtwcm9wXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG9iamVjdFtwcm9wXSkgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2ltcGxlT2JqZWN0W3Byb3BdID0gb2JqZWN0W3Byb3BdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ID0gJ1sqKipTYW5pdGl6ZWQgT2JqZWN0KioqXTogJyArIEpTT04uc3RyaW5naWZ5KHNpbXBsZU9iamVjdCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIEpzb25UcnlQYXJzZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBUZXN0SXNPYmplY3RFbXB0eShvYmo6IGFueSkge1xuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBUZXN0SXNVbmRlZmluZWQodmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgLy8gcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBUZXN0SXNTdHJpbmcodmFsdWU6IGFueSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNhcGl0YWxpemVGaXJzdExldHRlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGV4dC5zbGljZSgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0b1RpdGxlQ2FzZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFx3XFxTKi9nLCAoc3ViU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3ViU3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3ViU3RyaW5nLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvTG93ZXJDYXNlKGl0ZW1zOiBzdHJpbmcpO1xuICAgIHB1YmxpYyBzdGF0aWMgdG9Mb3dlckNhc2UoaXRlbXM6IHN0cmluZ1tdKTtcbiAgICBwdWJsaWMgc3RhdGljIHRvTG93ZXJDYXNlKGl0ZW1zOiBhbnkpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XG5cbiAgICAgICAgaWYgKGl0ZW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvd2VyZWRSb2xlczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxvd2VyZWRSb2xlc1tpXSA9IGl0ZW1zW2ldLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBsb3dlcmVkUm9sZXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1zID09PSAnc3RyaW5nJyB8fCBpdGVtcyBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHVuaXF1ZUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21OdW1iZXIoMTAwMDAwMCwgOTAwMDAwMCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbU51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBiYXNlVXJsKCkge1xuICAgICAgICBsZXQgYmFzZSA9ICcnO1xuXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG4gICAgICAgICAgICBiYXNlID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhc2UgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgKHdpbmRvdy5sb2NhdGlvbi5wb3J0ID8gJzonICsgd2luZG93LmxvY2F0aW9uLnBvcnQgOiAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmFzZS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnREYXRlT25seShkYXRlOiBEYXRlKSB7XG5cbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXG4gICAgICAgIGNvbnN0IGRheU5hbWVzID0gbmV3IEFycmF5KCdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScpO1xuICAgICAgICBjb25zdCBtb250aE5hbWVzID0gbmV3IEFycmF5KCdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJyk7XG5cbiAgICAgICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgY29uc3QgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgc3VwID0gJyc7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGlmIChkYXlPZk1vbnRoID09IDEgfHwgZGF5T2ZNb250aCA9PSAyMSB8fCBkYXlPZk1vbnRoID09IDMxKSB7XG4gICAgICAgICAgICBzdXAgPSAnc3QnO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mTW9udGggPT0gMiB8fCBkYXlPZk1vbnRoID09IDIyKSB7XG4gICAgICAgICAgICBzdXAgPSAnbmQnO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mTW9udGggPT0gMyB8fCBkYXlPZk1vbnRoID09IDIzKSB7XG4gICAgICAgICAgICBzdXAgPSAncmQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwID0gJ3RoJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBkYXlOYW1lc1tkYXlPZldlZWtdICsgJywgJyArIGRheU9mTW9udGggKyBzdXAgKyAnICcgKyBtb250aE5hbWVzW21vbnRoXSArICcgJyArIHllYXI7XG5cbiAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludFRpbWVPbmx5KGRhdGU6IERhdGUpIHtcblxuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgbGV0IHBlcmlvZCA9ICcnO1xuICAgICAgICBsZXQgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG5cbiAgICAgICAgcGVyaW9kID0gaG91ciA8IDEyID8gJ0FNJyA6ICdQTSc7XG5cbiAgICAgICAgaWYgKGhvdXIgPT0gMCkge1xuICAgICAgICAgICAgaG91ciA9IDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyID4gMTIpIHtcbiAgICAgICAgICAgIGhvdXIgPSBob3VyIC0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBtaW51dGUgPSAnMCcgKyBtaW51dGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0aW1lU3RyaW5nID0gaG91ciArICc6JyArIG1pbnV0ZSArICcgJyArIHBlcmlvZDtcblxuXG4gICAgICAgIHJldHVybiB0aW1lU3RyaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnREYXRlKGRhdGU6IERhdGUsIHNlcGFyYXRvciA9ICdhdCcpIHtcbiAgICAgICAgcmV0dXJuIGAke1V0aWxpdGllcy5wcmludERhdGVPbmx5KGRhdGUpfSAke3NlcGFyYXRvcn0gJHtVdGlsaXRpZXMucHJpbnRUaW1lT25seShkYXRlKX1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnRGcmllbmRseURhdGUoZGF0ZTogRGF0ZSwgc2VwYXJhdG9yID0gJy0nKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTsgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKHRvZGF5KTsgeWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5LmdldERhdGUoKSAtIDEpO1xuICAgICAgICBjb25zdCB0ZXN0ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcblxuICAgICAgICBpZiAodGVzdC50b0RhdGVTdHJpbmcoKSA9PSB0b2RheS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGBUb2RheSAke3NlcGFyYXRvcn0gJHtVdGlsaXRpZXMucHJpbnRUaW1lT25seShkYXRlKX1gO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXN0LnRvRGF0ZVN0cmluZygpID09IHllc3RlcmRheS50b0RhdGVTdHJpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGBZZXN0ZXJkYXkgJHtzZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlsaXRpZXMucHJpbnREYXRlKGRhdGUsIHNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50U2hvcnREYXRlKGRhdGU6IERhdGUsIHNlcGFyYXRvciA9ICcvJywgZGF0ZVRpbWVTZXBhcmF0b3IgPSAnLScpIHtcblxuICAgICAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IG1vbnRoID0gKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgaWYgKGRheS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgZGF5ID0gJzAnICsgZGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vbnRoLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke21vbnRofSR7c2VwYXJhdG9yfSR7ZGF5fSR7c2VwYXJhdG9yfSR7eWVhcn0gJHtkYXRlVGltZVNlcGFyYXRvcn0gJHtVdGlsaXRpZXMucHJpbnRUaW1lT25seShkYXRlKX1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VEYXRlKGRhdGUpIHtcblxuICAgICAgICBpZiAoZGF0ZSkge1xuXG4gICAgICAgICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyB8fCBkYXRlIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuc2VhcmNoKC9bYS1zdS16K10vaSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGRhdGUgKyAnWic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdudW1iZXInIHx8IGRhdGUgaW5zdGFuY2VvZiBOdW1iZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSBhcyBhbnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludER1cmF0aW9uKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpIHtcblxuICAgICAgICBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0KTtcbiAgICAgICAgZW5kID0gbmV3IERhdGUoZW5kKTtcblxuICAgICAgICAvLyBnZXQgdG90YWwgc2Vjb25kcyBiZXR3ZWVuIHRoZSB0aW1lc1xuICAgICAgICBsZXQgZGVsdGEgPSBNYXRoLmFicyhzdGFydC52YWx1ZU9mKCkgLSBlbmQudmFsdWVPZigpKSAvIDEwMDA7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIChhbmQgc3VidHJhY3QpIHdob2xlIGRheXNcbiAgICAgICAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IoZGVsdGEgLyA4NjQwMCk7XG4gICAgICAgIGRlbHRhIC09IGRheXMgKiA4NjQwMDtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgKGFuZCBzdWJ0cmFjdCkgd2hvbGUgaG91cnNcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKGRlbHRhIC8gMzYwMCkgJSAyNDtcbiAgICAgICAgZGVsdGEgLT0gaG91cnMgKiAzNjAwO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSAoYW5kIHN1YnRyYWN0KSB3aG9sZSBtaW51dGVzXG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKGRlbHRhIC8gNjApICUgNjA7XG4gICAgICAgIGRlbHRhIC09IG1pbnV0ZXMgKiA2MDtcblxuICAgICAgICAvLyB3aGF0J3MgbGVmdCBpcyBzZWNvbmRzXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBkZWx0YSAlIDYwOyAgLy8gaW4gdGhlb3J5IHRoZSBtb2R1bHVzIGlzIG5vdCByZXF1aXJlZFxuXG5cbiAgICAgICAgbGV0IHByaW50ZWREYXlzID0gJyc7XG5cbiAgICAgICAgaWYgKGRheXMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzID0gYCR7ZGF5c30gZGF5c2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG91cnMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzICs9IHByaW50ZWREYXlzID8gYCwgJHtob3Vyc30gaG91cnNgIDogYCR7aG91cnN9IGhvdXJzYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW51dGVzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyArPSBwcmludGVkRGF5cyA/IGAsICR7bWludXRlc30gbWludXRlc2AgOiBgJHttaW51dGVzfSBtaW51dGVzYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyArPSBwcmludGVkRGF5cyA/IGAgYW5kICR7c2Vjb25kc30gc2Vjb25kc2AgOiBgJHtzZWNvbmRzfSBzZWNvbmRzYDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCFwcmludGVkRGF5cykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgPSAnMCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJpbnRlZERheXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRBZ2UoYmlydGhEYXRlLCBvdGhlckRhdGUpIHtcbiAgICAgICAgYmlydGhEYXRlID0gbmV3IERhdGUoYmlydGhEYXRlKTtcbiAgICAgICAgb3RoZXJEYXRlID0gbmV3IERhdGUob3RoZXJEYXRlKTtcblxuICAgICAgICBsZXQgeWVhcnMgPSAob3RoZXJEYXRlLmdldEZ1bGxZZWFyKCkgLSBiaXJ0aERhdGUuZ2V0RnVsbFllYXIoKSk7XG5cbiAgICAgICAgaWYgKG90aGVyRGF0ZS5nZXRNb250aCgpIDwgYmlydGhEYXRlLmdldE1vbnRoKCkgfHxcbiAgICAgICAgICAgIG90aGVyRGF0ZS5nZXRNb250aCgpID09IGJpcnRoRGF0ZS5nZXRNb250aCgpICYmIG90aGVyRGF0ZS5nZXREYXRlKCkgPCBiaXJ0aERhdGUuZ2V0RGF0ZSgpKSB7XG4gICAgICAgICAgICB5ZWFycy0tO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHllYXJzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2VhcmNoQXJyYXkoc2VhcmNoVGVybTogc3RyaW5nLCBjYXNlU2Vuc2l0aXZlOiBib29sZWFuLCAuLi52YWx1ZXM6IGFueVtdKSB7XG4gICAgICAgIGlmICghc2VhcmNoVGVybSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmlsdGVyID0gc2VhcmNoVGVybS50cmltKCk7XG4gICAgICAgIGxldCBkYXRhID0gdmFsdWVzLmpvaW4oKTtcblxuICAgICAgICBpZiAoIWNhc2VTZW5zaXRpdmUpIHtcbiAgICAgICAgICAgIGZpbHRlciA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhLmluZGV4T2YoZmlsdGVyKSAhPSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG1vdmVBcnJheUl0ZW0oYXJyYXk6IGFueVtdLCBvbGRJbmRleCwgbmV3SW5kZXgpIHtcblxuICAgICAgICBpZiAob2xkSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBuZXdJbmRleCArPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3SW5kZXggPj0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgayA9IG5ld0luZGV4IC0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKChrLS0pICsgMSkge1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5LnNwbGljZShuZXdJbmRleCwgMCwgYXJyYXkuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBleHBhbmRDYW1lbENhc2UodGV4dDogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoLyhbQS1aXVthLXpdKykvZywgJyAkMScpXG4gICAgICAgICAgICAucmVwbGFjZSgvKFtBLVpdW0EtWl0rKS9nLCAnICQxJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW15BLVphLXogXSspL2csICcgJDEnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRlc3RJc0Fic29sdXRlVXJsKHVybDogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgciA9IG5ldyBSZWdFeHAoJ14oPzpbYS16XSs6KT8vLycsICdpJyk7XG4gICAgICAgIHJldHVybiByLnRlc3QodXJsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnRUb0Fic29sdXRlVXJsKHVybDogc3RyaW5nKSB7XG5cbiAgICAgICAgcmV0dXJuIFV0aWxpdGllcy50ZXN0SXNBYnNvbHV0ZVVybCh1cmwpID8gdXJsIDogJy8vJyArIHVybDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZU51bGxzKG9iaikge1xuICAgICAgICBjb25zdCBpc0FycmF5ID0gb2JqIGluc3RhbmNlb2YgQXJyYXk7XG5cbiAgICAgICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9ialtrXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlzQXJyYXkgPyBvYmouc3BsaWNlKGssIDEpIDogZGVsZXRlIG9ialtrXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtrXSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIFV0aWxpdGllcy5yZW1vdmVOdWxscyhvYmpba10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNBcnJheSAmJiBvYmoubGVuZ3RoID09IGspIHtcbiAgICAgICAgICAgICAgICBVdGlsaXRpZXMucmVtb3ZlTnVsbHMob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkZWJvdW5jZShmdW5jOiAoLi4uYXJncykgPT4gYW55LCB3YWl0OiBudW1iZXIsIGltbWVkaWF0ZT86IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHRpbWVvdXQ7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBhcmdzXyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgICAgY29uc3QgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3NfKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuIl19