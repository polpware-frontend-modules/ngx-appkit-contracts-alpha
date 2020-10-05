import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as i0 from "@angular/core";
// Supress angular complication error
// @dynamic
export class Utilities {
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
/** @nocollapse */ Utilities.ɵprov = i0.ɵɵdefineInjectable({ token: Utilities, factory: Utilities.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Utilities, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3V0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFekYscUNBQXFDO0FBQ3JDLFdBQVc7QUFHWCxNQUFNLE9BQU8sU0FBUztJQXVEWCxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBNEI7UUFDOUQsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDM0IsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQzthQUN0SDtpQkFBTTtnQkFDSCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVsRCxJQUFJLGNBQWMsSUFBSSxDQUFDLE9BQU8sY0FBYyxLQUFLLFFBQVEsSUFBSSxjQUFjLFlBQVksTUFBTSxDQUFDLEVBQUU7b0JBRTVGLEtBQUssTUFBTSxHQUFHLElBQUksY0FBYyxFQUFFO3dCQUM5QixJQUFJLEdBQUcsRUFBRTs0QkFDTCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQywwQkFBMEIsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNyRjs2QkFBTSxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMs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cUJBQXFCLENBQUMsQ0FBQztRQUNsSSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUFFO1FBQ2xHLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFDO3FGQXJERyxTQUFTO29FQUFULFNBQVMsV0FBVCxTQUFTO2tEQUFULFNBQVM7Y0FEckIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZUJhc2UsIEh0dHBSZXNwb25zZSwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8vIFN1cHJlc3MgYW5ndWxhciBjb21wbGljYXRpb24gZXJyb3Jcbi8vIEBkeW5hbWljXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlsaXRpZXMge1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IgPSAnOic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub05ldHdvcmtNZXNzYWdlQ2FwdGlvbiA9ICdObyBOZXR3b3JrJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5vTmV0d29ya01lc3NhZ2VEZXRhaWwgPSAnVGhlIHNlcnZlciBjYW5ub3QgYmUgcmVhY2hlZCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhY2Nlc3NEZW5pZWRNZXNzYWdlQ2FwdGlvbiA9ICdBY2Nlc3MgRGVuaWVkISc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhY2Nlc3NEZW5pZWRNZXNzYWdlRGV0YWlsID0gJyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub3RGb3VuZE1lc3NhZ2VDYXB0aW9uID0gJ05vdCBGb3VuZCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub3RGb3VuZE1lc3NhZ2VEZXRhaWwgPSAnVGhlIHRhcmdldCByZXNvdXJjZSBjYW5ub3QgYmUgZm91bmQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb29raWVzID1cbiAgICAgICAge1xuICAgICAgICAgICAgZ2V0SXRlbTogKHNLZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyg/Oig/Ol58Lio7KVxcXFxzKicgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgJ1xcXFwkJicpICsgJ1xcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJCcpLCAnJDEnKSkgfHwgbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJdGVtOiAoc0tleSwgc1ZhbHVlLCB2RW5kLCBzUGF0aCwgc0RvbWFpbiwgYlNlY3VyZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc0tleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChzS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHNFeHBpcmVzID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAodkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZFbmQuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTnVtYmVyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gdkVuZCA9PT0gSW5maW5pdHkgPyAnOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UJyA6ICc7IG1heC1hZ2U9JyArIHZFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIHZFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIERhdGU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSAnOyBleHBpcmVzPScgKyB2RW5kLnRvVVRDU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQoc0tleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoc1ZhbHVlKSArIHNFeHBpcmVzICsgKHNEb21haW4gPyAnOyBkb21haW49JyArIHNEb21haW4gOiAnJykgKyAoc1BhdGggPyAnOyBwYXRoPScgKyBzUGF0aCA6ICcnKSArIChiU2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtOiAoc0tleSwgc1BhdGgsIHNEb21haW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQoc0tleSkgKyAnPTsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVCcgKyAoc0RvbWFpbiA/ICc7IGRvbWFpbj0nICsgc0RvbWFpbiA6ICcnKSArIChzUGF0aCA/ICc7IHBhdGg9JyArIHNQYXRoIDogJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0l0ZW06IChzS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgUmVnRXhwKCcoPzpefDtcXFxccyopJyArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCAnXFxcXCQmJykgKyAnXFxcXHMqXFxcXD0nKSkudGVzdChkb2N1bWVudC5jb29raWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleXM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhS2V5cyA9IGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oKD86XnxcXHMqOylbXlxcPV0rKSg/PTt8JCl8Xlxccyp8XFxzKig/OlxcPVteO10qKT8oPzpcXDF8JCkvZywgJycpLnNwbGl0KC9cXHMqKD86XFw9W147XSopPztcXHMqLyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbklkeCA9IDA7IG5JZHggPCBhS2V5cy5sZW5ndGg7IG5JZHgrKykgeyBhS2V5c1tuSWR4XSA9IGRlY29kZVVSSUNvbXBvbmVudChhS2V5c1tuSWR4XSk7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYUtleXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGE6IEh0dHBSZXNwb25zZUJhc2UgfCBhbnkpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTm9OZXR3b3JrKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYCR7dGhpcy5ub05ldHdvcmtNZXNzYWdlQ2FwdGlvbn0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7dGhpcy5ub05ldHdvcmtNZXNzYWdlRGV0YWlsfWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlT2JqZWN0ICYmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QgPT09ICdvYmplY3QnIHx8IHJlc3BvbnNlT2JqZWN0IGluc3RhbmNlb2YgT2JqZWN0KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3BvbnNlT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYCR7a2V5fSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHtyZXNwb25zZU9iamVjdFtrZXldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZU9iamVjdFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2gocmVzcG9uc2VPYmplY3Rba2V5XS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKChkYXRhIGFzIGFueSkuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChgYm9keTogJHsoZGF0YSBhcyBhbnkpLmJvZHl9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChkYXRhIGFzIGFueSkuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYGVycm9yOiAkeyhkYXRhIGFzIGFueSkuZXJyb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRSZXNwb25zZUJvZHkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaCh0aGlzLmdldFJlc3BvbnNlQm9keShkYXRhKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goZGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWNjZXNzRGVuaWVkKGRhdGEpKSB7XG4gICAgICAgICAgICByZXNwb25zZXMuc3BsaWNlKDAsIDAsIGAke3RoaXMuYWNjZXNzRGVuaWVkTWVzc2FnZUNhcHRpb259JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3RoaXMuYWNjZXNzRGVuaWVkTWVzc2FnZURldGFpbH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrTm90Rm91bmQoZGF0YSkpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gYCR7dGhpcy5ub3RGb3VuZE1lc3NhZ2VDYXB0aW9ufSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHt0aGlzLm5vdEZvdW5kTWVzc2FnZURldGFpbH1gO1xuICAgICAgICAgICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBgLiAke2RhdGEudXJsfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3BvbnNlcy5zcGxpY2UoMCwgMCwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZShkYXRhOiBIdHRwUmVzcG9uc2VCYXNlIHwgYW55KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaHR0cE1lc3NhZ2UgPVxuICAgICAgICAgICAgVXRpbGl0aWVzLmZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKFV0aWxpdGllcy5ub05ldHdvcmtNZXNzYWdlQ2FwdGlvbiwgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZShVdGlsaXRpZXMubm90Rm91bmRNZXNzYWdlQ2FwdGlvbiwgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZSgnZXJyb3JfZGVzY3JpcHRpb24nLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKCdlcnJvcicsIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YSkuam9pbigpO1xuXG4gICAgICAgIHJldHVybiBodHRwTWVzc2FnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKG1lc3NhZ2VUb0ZpbmQ6IHN0cmluZywgZGF0YTogSHR0cFJlc3BvbnNlPGFueT4gfCBhbnksIHNlYWNoSW5DYXB0aW9uT25seSA9IHRydWUsIGluY2x1ZGVDYXB0aW9uSW5SZXN1bHQgPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFN0cmluZyA9IG1lc3NhZ2VUb0ZpbmQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaHR0cE1lc3NhZ2VzID0gdGhpcy5nZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhKTtcblxuICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgaHR0cE1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsTWVzc2FnZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKG1lc3NhZ2UsIHRoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICBpZiAoZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0ICYmIGZ1bGxNZXNzYWdlLmZpcnN0UGFydC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlQ2FwdGlvbkluUmVzdWx0ID8gbWVzc2FnZSA6IGZ1bGxNZXNzYWdlLnNlY29uZFBhcnQgfHwgZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWFjaEluQ2FwdGlvbk9ubHkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBodHRwTWVzc2FnZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hTdHJpbmcpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlQ2FwdGlvbkluUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZ1bGxNZXNzYWdlID0gVXRpbGl0aWVzLnNwbGl0SW5Ud28obWVzc2FnZSwgdGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVsbE1lc3NhZ2Uuc2Vjb25kUGFydCB8fCBmdWxsTWVzc2FnZS5maXJzdFBhcnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFJlc3BvbnNlQm9keShyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5lcnJvciB8fCByZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTm9OZXR3b3JrKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXMgPT0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrQWNjZXNzRGVuaWVkKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXMgPT0gNDAzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tOb3RGb3VuZChyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDQwNDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrSXNMb2NhbEhvc3QodXJsOiBzdHJpbmcsIGJhc2U/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBuZXcgVVJMKHVybCwgYmFzZSk7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFF1ZXJ5UGFyYW1zRnJvbVN0cmluZyhwYXJhbVN0cmluZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghcGFyYW1TdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbVN0cmluZy5zcGxpdCgnJicpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKHBhcmFtLCAnPScpO1xuICAgICAgICAgICAgcGFyYW1zW2tleVZhbHVlLmZpcnN0UGFydF0gPSBrZXlWYWx1ZS5zZWNvbmRQYXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNwbGl0SW5Ud28odGV4dDogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyk6IHsgZmlyc3RQYXJ0OiBzdHJpbmcsIHNlY29uZFBhcnQ6IHN0cmluZyB9IHtcbiAgICAgICAgY29uc3Qgc2VwYXJhdG9ySW5kZXggPSB0ZXh0LmluZGV4T2Yoc2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGZpcnN0UGFydDogdGV4dCwgc2Vjb25kUGFydDogbnVsbCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFydDEgPSB0ZXh0LnN1YnN0cigwLCBzZXBhcmF0b3JJbmRleCkudHJpbSgpO1xuICAgICAgICBjb25zdCBwYXJ0MiA9IHRleHQuc3Vic3RyKHNlcGFyYXRvckluZGV4ICsgMSkudHJpbSgpO1xuXG4gICAgICAgIHJldHVybiB7IGZpcnN0UGFydDogcGFydDEsIHNlY29uZFBhcnQ6IHBhcnQyIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYWZlU3RyaW5naWZ5KG9iamVjdCkge1xuXG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpbXBsZU9iamVjdCA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIChvYmplY3RbcHJvcF0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIChvYmplY3RbcHJvcF0pID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNpbXBsZU9iamVjdFtwcm9wXSA9IG9iamVjdFtwcm9wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9ICdbKioqU2FuaXRpemVkIE9iamVjdCoqKl06ICcgKyBKU09OLnN0cmluZ2lmeShzaW1wbGVPYmplY3QpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKc29uVHJ5UGFyc2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgVGVzdElzT2JqZWN0RW1wdHkob2JqOiBhbnkpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgVGVzdElzVW5kZWZpbmVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIC8vIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgVGVzdElzU3RyaW5nKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9UaXRsZUNhc2UodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcd1xcUyovZywgKHN1YlN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1YlN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN1YlN0cmluZy5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogc3RyaW5nKTtcbiAgICBwdWJsaWMgc3RhdGljIHRvTG93ZXJDYXNlKGl0ZW1zOiBzdHJpbmdbXSk7XG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogYW55KTogc3RyaW5nIHwgc3RyaW5nW10ge1xuXG4gICAgICAgIGlmIChpdGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlcmVkUm9sZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsb3dlcmVkUm9sZXNbaV0gPSBpdGVtc1tpXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJlZFJvbGVzO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtcyA9PT0gJ3N0cmluZycgfHwgaXRlbXMgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB1bmlxdWVJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZG9tTnVtYmVyKDEwMDAwMDAsIDkwMDAwMDApLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByYW5kb21OdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYmFzZVVybCgpIHtcbiAgICAgICAgbGV0IGJhc2UgPSAnJztcblxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgICAgICAgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RGF0ZU9ubHkoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblxuICAgICAgICBjb25zdCBkYXlOYW1lcyA9IG5ldyBBcnJheSgnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknKTtcbiAgICAgICAgY29uc3QgbW9udGhOYW1lcyA9IG5ldyBBcnJheSgnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcicpO1xuXG4gICAgICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgIGNvbnN0IGRheU9mTW9udGggPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgbGV0IHN1cCA9ICcnO1xuICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAoZGF5T2ZNb250aCA9PSAxIHx8IGRheU9mTW9udGggPT0gMjEgfHwgZGF5T2ZNb250aCA9PSAzMSkge1xuICAgICAgICAgICAgc3VwID0gJ3N0JztcbiAgICAgICAgfSBlbHNlIGlmIChkYXlPZk1vbnRoID09IDIgfHwgZGF5T2ZNb250aCA9PSAyMikge1xuICAgICAgICAgICAgc3VwID0gJ25kJztcbiAgICAgICAgfSBlbHNlIGlmIChkYXlPZk1vbnRoID09IDMgfHwgZGF5T2ZNb250aCA9PSAyMykge1xuICAgICAgICAgICAgc3VwID0gJ3JkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cCA9ICd0aCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZGF5TmFtZXNbZGF5T2ZXZWVrXSArICcsICcgKyBkYXlPZk1vbnRoICsgc3VwICsgJyAnICsgbW9udGhOYW1lc1ttb250aF0gKyAnICcgKyB5ZWFyO1xuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnRUaW1lT25seShkYXRlOiBEYXRlKSB7XG5cbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXG4gICAgICAgIGxldCBwZXJpb2QgPSAnJztcbiAgICAgICAgbGV0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBob3VyID0gZGF0ZS5nZXRIb3VycygpO1xuXG4gICAgICAgIHBlcmlvZCA9IGhvdXIgPCAxMiA/ICdBTScgOiAnUE0nO1xuXG4gICAgICAgIGlmIChob3VyID09IDApIHtcbiAgICAgICAgICAgIGhvdXIgPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgICBob3VyID0gaG91ciAtIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWludXRlID0gJzAnICsgbWludXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IGhvdXIgKyAnOicgKyBtaW51dGUgKyAnICcgKyBwZXJpb2Q7XG5cblxuICAgICAgICByZXR1cm4gdGltZVN0cmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnYXQnKSB7XG4gICAgICAgIHJldHVybiBgJHtVdGlsaXRpZXMucHJpbnREYXRlT25seShkYXRlKX0gJHtzZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RnJpZW5kbHlEYXRlKGRhdGU6IERhdGUsIHNlcGFyYXRvciA9ICctJykge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7IHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSh0b2RheSk7IHllc3RlcmRheS5zZXREYXRlKHllc3RlcmRheS5nZXREYXRlKCkgLSAxKTtcbiAgICAgICAgY29uc3QgdGVzdCA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG5cbiAgICAgICAgaWYgKHRlc3QudG9EYXRlU3RyaW5nKCkgPT0gdG9kYXkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBgVG9kYXkgJHtzZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVzdC50b0RhdGVTdHJpbmcoKSA9PSB5ZXN0ZXJkYXkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBgWWVzdGVyZGF5ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbGl0aWVzLnByaW50RGF0ZShkYXRlLCBzZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludFNob3J0RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnLycsIGRhdGVUaW1lU2VwYXJhdG9yID0gJy0nKSB7XG5cbiAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBtb250aCA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGlmIChkYXkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGRheSA9ICcwJyArIGRheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb250aC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbW9udGggPSAnMCcgKyBtb250aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHttb250aH0ke3NlcGFyYXRvcn0ke2RheX0ke3NlcGFyYXRvcn0ke3llYXJ9ICR7ZGF0ZVRpbWVTZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlRGF0ZShkYXRlKSB7XG5cbiAgICAgICAgaWYgKGRhdGUpIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgfHwgZGF0ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLnNlYXJjaCgvW2Etc3UteitdL2kpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlICsgJ1onO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJyB8fCBkYXRlIGluc3RhbmNlb2YgTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUgYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnREdXJhdGlvbihzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSB7XG5cbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XG5cbiAgICAgICAgLy8gZ2V0IHRvdGFsIHNlY29uZHMgYmV0d2VlbiB0aGUgdGltZXNcbiAgICAgICAgbGV0IGRlbHRhID0gTWF0aC5hYnMoc3RhcnQudmFsdWVPZigpIC0gZW5kLnZhbHVlT2YoKSkgLyAxMDAwO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSAoYW5kIHN1YnRyYWN0KSB3aG9sZSBkYXlzXG4gICAgICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKGRlbHRhIC8gODY0MDApO1xuICAgICAgICBkZWx0YSAtPSBkYXlzICogODY0MDA7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIChhbmQgc3VidHJhY3QpIHdob2xlIGhvdXJzXG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihkZWx0YSAvIDM2MDApICUgMjQ7XG4gICAgICAgIGRlbHRhIC09IGhvdXJzICogMzYwMDtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgKGFuZCBzdWJ0cmFjdCkgd2hvbGUgbWludXRlc1xuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihkZWx0YSAvIDYwKSAlIDYwO1xuICAgICAgICBkZWx0YSAtPSBtaW51dGVzICogNjA7XG5cbiAgICAgICAgLy8gd2hhdCdzIGxlZnQgaXMgc2Vjb25kc1xuICAgICAgICBjb25zdCBzZWNvbmRzID0gZGVsdGEgJSA2MDsgIC8vIGluIHRoZW9yeSB0aGUgbW9kdWx1cyBpcyBub3QgcmVxdWlyZWRcblxuXG4gICAgICAgIGxldCBwcmludGVkRGF5cyA9ICcnO1xuXG4gICAgICAgIGlmIChkYXlzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyA9IGAke2RheXN9IGRheXNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXJzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyArPSBwcmludGVkRGF5cyA/IGAsICR7aG91cnN9IGhvdXJzYCA6IGAke2hvdXJzfSBob3Vyc2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlcykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgLCAke21pbnV0ZXN9IG1pbnV0ZXNgIDogYCR7bWludXRlc30gbWludXRlc2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgIGFuZCAke3NlY29uZHN9IHNlY29uZHNgIDogYCR7c2Vjb25kc30gc2Vjb25kc2A7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICghcHJpbnRlZERheXMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzID0gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByaW50ZWREYXlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QWdlKGJpcnRoRGF0ZSwgb3RoZXJEYXRlKSB7XG4gICAgICAgIGJpcnRoRGF0ZSA9IG5ldyBEYXRlKGJpcnRoRGF0ZSk7XG4gICAgICAgIG90aGVyRGF0ZSA9IG5ldyBEYXRlKG90aGVyRGF0ZSk7XG5cbiAgICAgICAgbGV0IHllYXJzID0gKG90aGVyRGF0ZS5nZXRGdWxsWWVhcigpIC0gYmlydGhEYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgICAgIGlmIChvdGhlckRhdGUuZ2V0TW9udGgoKSA8IGJpcnRoRGF0ZS5nZXRNb250aCgpIHx8XG4gICAgICAgICAgICBvdGhlckRhdGUuZ2V0TW9udGgoKSA9PSBiaXJ0aERhdGUuZ2V0TW9udGgoKSAmJiBvdGhlckRhdGUuZ2V0RGF0ZSgpIDwgYmlydGhEYXRlLmdldERhdGUoKSkge1xuICAgICAgICAgICAgeWVhcnMtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB5ZWFycztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNlYXJjaEFycmF5KHNlYXJjaFRlcm06IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbiwgLi4udmFsdWVzOiBhbnlbXSkge1xuICAgICAgICBpZiAoIXNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbHRlciA9IHNlYXJjaFRlcm0udHJpbSgpO1xuICAgICAgICBsZXQgZGF0YSA9IHZhbHVlcy5qb2luKCk7XG5cbiAgICAgICAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICBmaWx0ZXIgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YS5pbmRleE9mKGZpbHRlcikgIT0gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlQXJyYXlJdGVtKGFycmF5OiBhbnlbXSwgb2xkSW5kZXgsIG5ld0luZGV4KSB7XG5cbiAgICAgICAgaWYgKG9sZEluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV3SW5kZXggKz0gYXJyYXkubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0luZGV4ID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGsgPSBuZXdJbmRleCAtIGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgoay0tKSArIDEpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhcnJheS5zcGxpY2UobmV3SW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXhwYW5kQ2FtZWxDYXNlKHRleHQ6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC8oW0EtWl1bYS16XSspL2csICcgJDEnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXVtBLVpdKykvZywgJyAkMScpXG4gICAgICAgICAgICAucmVwbGFjZSgvKFteQS1aYS16IF0rKS9nLCAnICQxJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0SXNBYnNvbHV0ZVVybCh1cmw6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICByZXR1cm4gci50ZXN0KHVybCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0VG9BYnNvbHV0ZVVybCh1cmw6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiBVdGlsaXRpZXMudGVzdElzQWJzb2x1dGVVcmwodXJsKSA/IHVybCA6ICcvLycgKyB1cmw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVOdWxscyhvYmopIHtcbiAgICAgICAgY29uc3QgaXNBcnJheSA9IG9iaiBpbnN0YW5jZW9mIEFycmF5O1xuXG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmpba10gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpc0FycmF5ID8gb2JqLnNwbGljZShrLCAxKSA6IGRlbGV0ZSBvYmpba107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpba10gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBVdGlsaXRpZXMucmVtb3ZlTnVsbHMob2JqW2tdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkgJiYgb2JqLmxlbmd0aCA9PSBrKSB7XG4gICAgICAgICAgICAgICAgVXRpbGl0aWVzLnJlbW92ZU51bGxzKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGVib3VuY2UoZnVuYzogKC4uLmFyZ3MpID0+IGFueSwgd2FpdDogbnVtYmVyLCBpbW1lZGlhdGU/OiBib29sZWFuKSB7XG4gICAgICAgIGxldCB0aW1lb3V0O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgYXJnc18gPSBhcmd1bWVudHM7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzXyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcblxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJnc18pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==