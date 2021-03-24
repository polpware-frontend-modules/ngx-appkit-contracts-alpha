import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as i0 from "@angular/core";
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
/** @nocollapse */ Utilities.ɵprov = i0.ɵɵdefineInjectable({ token: Utilities, factory: Utilities.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Utilities, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3V0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFLekYsTUFBTSxPQUFPLFNBQVM7SUF1RFgsTUFBTSxDQUFDLHVCQUF1QixDQUFDLElBQTRCO1FBQzlELE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUUvQixJQUFJLElBQUksWUFBWSxnQkFBZ0IsRUFBRTtZQUNsQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7YUFDdEg7aUJBQU07Z0JBQ0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbEQsSUFBSSxjQUFjLElBQUksQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRLElBQUksY0FBYyxZQUFZLE1BQU0sQ0FBQyxFQUFFO29CQUU1RixLQUFLLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBRTt3QkFDOUIsSUFBSSxHQUFHLEVBQUU7NEJBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5QkFDckY7NkJBQU0sSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQzVCLFNBQVMsQ0FBQyxJ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S0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUNsRyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQztxRkFyREcsU0FBUztvRUFBVCxTQUFTLFdBQVQsU0FBUyxtQkFGTixNQUFNO2tEQUVULFNBQVM7Y0FIckIsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlQmFzZSwgSHR0cFJlc3BvbnNlLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVdGlsaXRpZXMge1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IgPSAnOic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub05ldHdvcmtNZXNzYWdlQ2FwdGlvbiA9ICdObyBOZXR3b3JrJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG5vTmV0d29ya01lc3NhZ2VEZXRhaWwgPSAnVGhlIHNlcnZlciBjYW5ub3QgYmUgcmVhY2hlZCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhY2Nlc3NEZW5pZWRNZXNzYWdlQ2FwdGlvbiA9ICdBY2Nlc3MgRGVuaWVkISc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhY2Nlc3NEZW5pZWRNZXNzYWdlRGV0YWlsID0gJyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub3RGb3VuZE1lc3NhZ2VDYXB0aW9uID0gJ05vdCBGb3VuZCc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBub3RGb3VuZE1lc3NhZ2VEZXRhaWwgPSAnVGhlIHRhcmdldCByZXNvdXJjZSBjYW5ub3QgYmUgZm91bmQnO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb29raWVzID1cbiAgICAgICAge1xuICAgICAgICAgICAgZ2V0SXRlbTogKHNLZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyg/Oig/Ol58Lio7KVxcXFxzKicgKyBlbmNvZGVVUklDb21wb25lbnQoc0tleSkucmVwbGFjZSgvW1xcLVxcLlxcK1xcKl0vZywgJ1xcXFwkJicpICsgJ1xcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJCcpLCAnJDEnKSkgfHwgbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJdGVtOiAoc0tleSwgc1ZhbHVlLCB2RW5kLCBzUGF0aCwgc0RvbWFpbiwgYlNlY3VyZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc0tleSB8fCAvXig/OmV4cGlyZXN8bWF4XFwtYWdlfHBhdGh8ZG9tYWlufHNlY3VyZSkkL2kudGVzdChzS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHNFeHBpcmVzID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAodkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZFbmQuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTnVtYmVyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNFeHBpcmVzID0gdkVuZCA9PT0gSW5maW5pdHkgPyAnOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UJyA6ICc7IG1heC1hZ2U9JyArIHZFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIHZFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIERhdGU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc0V4cGlyZXMgPSAnOyBleHBpcmVzPScgKyB2RW5kLnRvVVRDU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQoc0tleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoc1ZhbHVlKSArIHNFeHBpcmVzICsgKHNEb21haW4gPyAnOyBkb21haW49JyArIHNEb21haW4gOiAnJykgKyAoc1BhdGggPyAnOyBwYXRoPScgKyBzUGF0aCA6ICcnKSArIChiU2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtOiAoc0tleSwgc1BhdGgsIHNEb21haW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQoc0tleSkgKyAnPTsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVCcgKyAoc0RvbWFpbiA/ICc7IGRvbWFpbj0nICsgc0RvbWFpbiA6ICcnKSArIChzUGF0aCA/ICc7IHBhdGg9JyArIHNQYXRoIDogJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0l0ZW06IChzS2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgUmVnRXhwKCcoPzpefDtcXFxccyopJyArIGVuY29kZVVSSUNvbXBvbmVudChzS2V5KS5yZXBsYWNlKC9bXFwtXFwuXFwrXFwqXS9nLCAnXFxcXCQmJykgKyAnXFxcXHMqXFxcXD0nKSkudGVzdChkb2N1bWVudC5jb29raWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleXM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhS2V5cyA9IGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oKD86XnxcXHMqOylbXlxcPV0rKSg/PTt8JCl8Xlxccyp8XFxzKig/OlxcPVteO10qKT8oPzpcXDF8JCkvZywgJycpLnNwbGl0KC9cXHMqKD86XFw9W147XSopPztcXHMqLyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbklkeCA9IDA7IG5JZHggPCBhS2V5cy5sZW5ndGg7IG5JZHgrKykgeyBhS2V5c1tuSWR4XSA9IGRlY29kZVVSSUNvbXBvbmVudChhS2V5c1tuSWR4XSk7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYUtleXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGE6IEh0dHBSZXNwb25zZUJhc2UgfCBhbnkpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTm9OZXR3b3JrKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYCR7dGhpcy5ub05ldHdvcmtNZXNzYWdlQ2FwdGlvbn0ke3RoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3J9ICR7dGhpcy5ub05ldHdvcmtNZXNzYWdlRGV0YWlsfWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlT2JqZWN0ICYmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QgPT09ICdvYmplY3QnIHx8IHJlc3BvbnNlT2JqZWN0IGluc3RhbmNlb2YgT2JqZWN0KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3BvbnNlT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYCR7a2V5fSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHtyZXNwb25zZU9iamVjdFtrZXldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZU9iamVjdFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2gocmVzcG9uc2VPYmplY3Rba2V5XS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKChkYXRhIGFzIGFueSkuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaChgYm9keTogJHsoZGF0YSBhcyBhbnkpLmJvZHl9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChkYXRhIGFzIGFueSkuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goYGVycm9yOiAkeyhkYXRhIGFzIGFueSkuZXJyb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRSZXNwb25zZUJvZHkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZXMucHVzaCh0aGlzLmdldFJlc3BvbnNlQm9keShkYXRhKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2goZGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWNjZXNzRGVuaWVkKGRhdGEpKSB7XG4gICAgICAgICAgICByZXNwb25zZXMuc3BsaWNlKDAsIDAsIGAke3RoaXMuYWNjZXNzRGVuaWVkTWVzc2FnZUNhcHRpb259JHt0aGlzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yfSAke3RoaXMuYWNjZXNzRGVuaWVkTWVzc2FnZURldGFpbH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrTm90Rm91bmQoZGF0YSkpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gYCR7dGhpcy5ub3RGb3VuZE1lc3NhZ2VDYXB0aW9ufSR7dGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcn0gJHt0aGlzLm5vdEZvdW5kTWVzc2FnZURldGFpbH1gO1xuICAgICAgICAgICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBgLiAke2RhdGEudXJsfWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3BvbnNlcy5zcGxpY2UoMCwgMCwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZShkYXRhOiBIdHRwUmVzcG9uc2VCYXNlIHwgYW55KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaHR0cE1lc3NhZ2UgPVxuICAgICAgICAgICAgVXRpbGl0aWVzLmZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKFV0aWxpdGllcy5ub05ldHdvcmtNZXNzYWdlQ2FwdGlvbiwgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZShVdGlsaXRpZXMubm90Rm91bmRNZXNzYWdlQ2FwdGlvbiwgZGF0YSkgfHxcbiAgICAgICAgICAgIFV0aWxpdGllcy5maW5kSHR0cFJlc3BvbnNlTWVzc2FnZSgnZXJyb3JfZGVzY3JpcHRpb24nLCBkYXRhKSB8fFxuICAgICAgICAgICAgVXRpbGl0aWVzLmZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKCdlcnJvcicsIGRhdGEpIHx8XG4gICAgICAgICAgICBVdGlsaXRpZXMuZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YSkuam9pbigpO1xuXG4gICAgICAgIHJldHVybiBodHRwTWVzc2FnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbmRIdHRwUmVzcG9uc2VNZXNzYWdlKG1lc3NhZ2VUb0ZpbmQ6IHN0cmluZywgZGF0YTogSHR0cFJlc3BvbnNlPGFueT4gfCBhbnksIHNlYWNoSW5DYXB0aW9uT25seSA9IHRydWUsIGluY2x1ZGVDYXB0aW9uSW5SZXN1bHQgPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFN0cmluZyA9IG1lc3NhZ2VUb0ZpbmQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgaHR0cE1lc3NhZ2VzID0gdGhpcy5nZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhKTtcblxuICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgaHR0cE1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsTWVzc2FnZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKG1lc3NhZ2UsIHRoaXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICBpZiAoZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0ICYmIGZ1bGxNZXNzYWdlLmZpcnN0UGFydC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoU3RyaW5nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlQ2FwdGlvbkluUmVzdWx0ID8gbWVzc2FnZSA6IGZ1bGxNZXNzYWdlLnNlY29uZFBhcnQgfHwgZnVsbE1lc3NhZ2UuZmlyc3RQYXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWFjaEluQ2FwdGlvbk9ubHkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBodHRwTWVzc2FnZXMpIHtcblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hTdHJpbmcpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlQ2FwdGlvbkluUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZ1bGxNZXNzYWdlID0gVXRpbGl0aWVzLnNwbGl0SW5Ud28obWVzc2FnZSwgdGhpcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVsbE1lc3NhZ2Uuc2Vjb25kUGFydCB8fCBmdWxsTWVzc2FnZS5maXJzdFBhcnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFJlc3BvbnNlQm9keShyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5lcnJvciB8fCByZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTm9OZXR3b3JrKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXMgPT0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrQWNjZXNzRGVuaWVkKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXMgPT0gNDAzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tOb3RGb3VuZChyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09IDQwNDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrSXNMb2NhbEhvc3QodXJsOiBzdHJpbmcsIGJhc2U/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBuZXcgVVJMKHVybCwgYmFzZSk7XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSAnMTI3LjAuMC4xJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFF1ZXJ5UGFyYW1zRnJvbVN0cmluZyhwYXJhbVN0cmluZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghcGFyYW1TdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbVN0cmluZy5zcGxpdCgnJicpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IFV0aWxpdGllcy5zcGxpdEluVHdvKHBhcmFtLCAnPScpO1xuICAgICAgICAgICAgcGFyYW1zW2tleVZhbHVlLmZpcnN0UGFydF0gPSBrZXlWYWx1ZS5zZWNvbmRQYXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNwbGl0SW5Ud28odGV4dDogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyk6IHsgZmlyc3RQYXJ0OiBzdHJpbmcsIHNlY29uZFBhcnQ6IHN0cmluZyB9IHtcbiAgICAgICAgY29uc3Qgc2VwYXJhdG9ySW5kZXggPSB0ZXh0LmluZGV4T2Yoc2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGZpcnN0UGFydDogdGV4dCwgc2Vjb25kUGFydDogbnVsbCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFydDEgPSB0ZXh0LnN1YnN0cigwLCBzZXBhcmF0b3JJbmRleCkudHJpbSgpO1xuICAgICAgICBjb25zdCBwYXJ0MiA9IHRleHQuc3Vic3RyKHNlcGFyYXRvckluZGV4ICsgMSkudHJpbSgpO1xuXG4gICAgICAgIHJldHVybiB7IGZpcnN0UGFydDogcGFydDEsIHNlY29uZFBhcnQ6IHBhcnQyIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYWZlU3RyaW5naWZ5KG9iamVjdCkge1xuXG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkob2JqZWN0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpbXBsZU9iamVjdCA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIChvYmplY3RbcHJvcF0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIChvYmplY3RbcHJvcF0pID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNpbXBsZU9iamVjdFtwcm9wXSA9IG9iamVjdFtwcm9wXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9ICdbKioqU2FuaXRpemVkIE9iamVjdCoqKl06ICcgKyBKU09OLnN0cmluZ2lmeShzaW1wbGVPYmplY3QpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBKc29uVHJ5UGFyc2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgVGVzdElzT2JqZWN0RW1wdHkob2JqOiBhbnkpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgVGVzdElzVW5kZWZpbmVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIC8vIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgVGVzdElzU3RyaW5nKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9UaXRsZUNhc2UodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcd1xcUyovZywgKHN1YlN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN1YlN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN1YlN0cmluZy5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogc3RyaW5nKTtcbiAgICBwdWJsaWMgc3RhdGljIHRvTG93ZXJDYXNlKGl0ZW1zOiBzdHJpbmdbXSk7XG4gICAgcHVibGljIHN0YXRpYyB0b0xvd2VyQ2FzZShpdGVtczogYW55KTogc3RyaW5nIHwgc3RyaW5nW10ge1xuXG4gICAgICAgIGlmIChpdGVtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlcmVkUm9sZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsb3dlcmVkUm9sZXNbaV0gPSBpdGVtc1tpXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbG93ZXJlZFJvbGVzO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtcyA9PT0gJ3N0cmluZycgfHwgaXRlbXMgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB1bmlxdWVJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZG9tTnVtYmVyKDEwMDAwMDAsIDkwMDAwMDApLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByYW5kb21OdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYmFzZVVybCgpIHtcbiAgICAgICAgbGV0IGJhc2UgPSAnJztcblxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgICAgICAgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RGF0ZU9ubHkoZGF0ZTogRGF0ZSkge1xuXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblxuICAgICAgICBjb25zdCBkYXlOYW1lcyA9IG5ldyBBcnJheSgnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknKTtcbiAgICAgICAgY29uc3QgbW9udGhOYW1lcyA9IG5ldyBBcnJheSgnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcicpO1xuXG4gICAgICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgIGNvbnN0IGRheU9mTW9udGggPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgbGV0IHN1cCA9ICcnO1xuICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAoZGF5T2ZNb250aCA9PSAxIHx8IGRheU9mTW9udGggPT0gMjEgfHwgZGF5T2ZNb250aCA9PSAzMSkge1xuICAgICAgICAgICAgc3VwID0gJ3N0JztcbiAgICAgICAgfSBlbHNlIGlmIChkYXlPZk1vbnRoID09IDIgfHwgZGF5T2ZNb250aCA9PSAyMikge1xuICAgICAgICAgICAgc3VwID0gJ25kJztcbiAgICAgICAgfSBlbHNlIGlmIChkYXlPZk1vbnRoID09IDMgfHwgZGF5T2ZNb250aCA9PSAyMykge1xuICAgICAgICAgICAgc3VwID0gJ3JkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cCA9ICd0aCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZGF5TmFtZXNbZGF5T2ZXZWVrXSArICcsICcgKyBkYXlPZk1vbnRoICsgc3VwICsgJyAnICsgbW9udGhOYW1lc1ttb250aF0gKyAnICcgKyB5ZWFyO1xuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnRUaW1lT25seShkYXRlOiBEYXRlKSB7XG5cbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXG4gICAgICAgIGxldCBwZXJpb2QgPSAnJztcbiAgICAgICAgbGV0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBob3VyID0gZGF0ZS5nZXRIb3VycygpO1xuXG4gICAgICAgIHBlcmlvZCA9IGhvdXIgPCAxMiA/ICdBTScgOiAnUE0nO1xuXG4gICAgICAgIGlmIChob3VyID09IDApIHtcbiAgICAgICAgICAgIGhvdXIgPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgICBob3VyID0gaG91ciAtIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWludXRlID0gJzAnICsgbWludXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IGhvdXIgKyAnOicgKyBtaW51dGUgKyAnICcgKyBwZXJpb2Q7XG5cblxuICAgICAgICByZXR1cm4gdGltZVN0cmluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnYXQnKSB7XG4gICAgICAgIHJldHVybiBgJHtVdGlsaXRpZXMucHJpbnREYXRlT25seShkYXRlKX0gJHtzZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RnJpZW5kbHlEYXRlKGRhdGU6IERhdGUsIHNlcGFyYXRvciA9ICctJykge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7IHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSh0b2RheSk7IHllc3RlcmRheS5zZXREYXRlKHllc3RlcmRheS5nZXREYXRlKCkgLSAxKTtcbiAgICAgICAgY29uc3QgdGVzdCA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG5cbiAgICAgICAgaWYgKHRlc3QudG9EYXRlU3RyaW5nKCkgPT0gdG9kYXkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBgVG9kYXkgJHtzZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVzdC50b0RhdGVTdHJpbmcoKSA9PSB5ZXN0ZXJkYXkudG9EYXRlU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBgWWVzdGVyZGF5ICR7c2VwYXJhdG9yfSAke1V0aWxpdGllcy5wcmludFRpbWVPbmx5KGRhdGUpfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbGl0aWVzLnByaW50RGF0ZShkYXRlLCBzZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwcmludFNob3J0RGF0ZShkYXRlOiBEYXRlLCBzZXBhcmF0b3IgPSAnLycsIGRhdGVUaW1lU2VwYXJhdG9yID0gJy0nKSB7XG5cbiAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBtb250aCA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGlmIChkYXkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGRheSA9ICcwJyArIGRheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb250aC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbW9udGggPSAnMCcgKyBtb250aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHttb250aH0ke3NlcGFyYXRvcn0ke2RheX0ke3NlcGFyYXRvcn0ke3llYXJ9ICR7ZGF0ZVRpbWVTZXBhcmF0b3J9ICR7VXRpbGl0aWVzLnByaW50VGltZU9ubHkoZGF0ZSl9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlRGF0ZShkYXRlKSB7XG5cbiAgICAgICAgaWYgKGRhdGUpIHtcblxuICAgICAgICAgICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgfHwgZGF0ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLnNlYXJjaCgvW2Etc3UteitdL2kpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlICsgJ1onO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJyB8fCBkYXRlIGluc3RhbmNlb2YgTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUgYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnREdXJhdGlvbihzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSB7XG5cbiAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZShzdGFydCk7XG4gICAgICAgIGVuZCA9IG5ldyBEYXRlKGVuZCk7XG5cbiAgICAgICAgLy8gZ2V0IHRvdGFsIHNlY29uZHMgYmV0d2VlbiB0aGUgdGltZXNcbiAgICAgICAgbGV0IGRlbHRhID0gTWF0aC5hYnMoc3RhcnQudmFsdWVPZigpIC0gZW5kLnZhbHVlT2YoKSkgLyAxMDAwO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSAoYW5kIHN1YnRyYWN0KSB3aG9sZSBkYXlzXG4gICAgICAgIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKGRlbHRhIC8gODY0MDApO1xuICAgICAgICBkZWx0YSAtPSBkYXlzICogODY0MDA7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIChhbmQgc3VidHJhY3QpIHdob2xlIGhvdXJzXG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihkZWx0YSAvIDM2MDApICUgMjQ7XG4gICAgICAgIGRlbHRhIC09IGhvdXJzICogMzYwMDtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgKGFuZCBzdWJ0cmFjdCkgd2hvbGUgbWludXRlc1xuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihkZWx0YSAvIDYwKSAlIDYwO1xuICAgICAgICBkZWx0YSAtPSBtaW51dGVzICogNjA7XG5cbiAgICAgICAgLy8gd2hhdCdzIGxlZnQgaXMgc2Vjb25kc1xuICAgICAgICBjb25zdCBzZWNvbmRzID0gZGVsdGEgJSA2MDsgIC8vIGluIHRoZW9yeSB0aGUgbW9kdWx1cyBpcyBub3QgcmVxdWlyZWRcblxuXG4gICAgICAgIGxldCBwcmludGVkRGF5cyA9ICcnO1xuXG4gICAgICAgIGlmIChkYXlzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyA9IGAke2RheXN9IGRheXNgO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXJzKSB7XG4gICAgICAgICAgICBwcmludGVkRGF5cyArPSBwcmludGVkRGF5cyA/IGAsICR7aG91cnN9IGhvdXJzYCA6IGAke2hvdXJzfSBob3Vyc2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlcykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgLCAke21pbnV0ZXN9IG1pbnV0ZXNgIDogYCR7bWludXRlc30gbWludXRlc2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcykge1xuICAgICAgICAgICAgcHJpbnRlZERheXMgKz0gcHJpbnRlZERheXMgPyBgIGFuZCAke3NlY29uZHN9IHNlY29uZHNgIDogYCR7c2Vjb25kc30gc2Vjb25kc2A7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICghcHJpbnRlZERheXMpIHtcbiAgICAgICAgICAgIHByaW50ZWREYXlzID0gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByaW50ZWREYXlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QWdlKGJpcnRoRGF0ZSwgb3RoZXJEYXRlKSB7XG4gICAgICAgIGJpcnRoRGF0ZSA9IG5ldyBEYXRlKGJpcnRoRGF0ZSk7XG4gICAgICAgIG90aGVyRGF0ZSA9IG5ldyBEYXRlKG90aGVyRGF0ZSk7XG5cbiAgICAgICAgbGV0IHllYXJzID0gKG90aGVyRGF0ZS5nZXRGdWxsWWVhcigpIC0gYmlydGhEYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgICAgIGlmIChvdGhlckRhdGUuZ2V0TW9udGgoKSA8IGJpcnRoRGF0ZS5nZXRNb250aCgpIHx8XG4gICAgICAgICAgICBvdGhlckRhdGUuZ2V0TW9udGgoKSA9PSBiaXJ0aERhdGUuZ2V0TW9udGgoKSAmJiBvdGhlckRhdGUuZ2V0RGF0ZSgpIDwgYmlydGhEYXRlLmdldERhdGUoKSkge1xuICAgICAgICAgICAgeWVhcnMtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB5ZWFycztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNlYXJjaEFycmF5KHNlYXJjaFRlcm06IHN0cmluZywgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbiwgLi4udmFsdWVzOiBhbnlbXSkge1xuICAgICAgICBpZiAoIXNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbHRlciA9IHNlYXJjaFRlcm0udHJpbSgpO1xuICAgICAgICBsZXQgZGF0YSA9IHZhbHVlcy5qb2luKCk7XG5cbiAgICAgICAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICBmaWx0ZXIgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YS5pbmRleE9mKGZpbHRlcikgIT0gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlQXJyYXlJdGVtKGFycmF5OiBhbnlbXSwgb2xkSW5kZXgsIG5ld0luZGV4KSB7XG5cbiAgICAgICAgaWYgKG9sZEluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgICAgICAgICAgbmV3SW5kZXggKz0gYXJyYXkubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0luZGV4ID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGsgPSBuZXdJbmRleCAtIGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgoay0tKSArIDEpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhcnJheS5zcGxpY2UobmV3SW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXhwYW5kQ2FtZWxDYXNlKHRleHQ6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC8oW0EtWl1bYS16XSspL2csICcgJDEnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXVtBLVpdKykvZywgJyAkMScpXG4gICAgICAgICAgICAucmVwbGFjZSgvKFteQS1aYS16IF0rKS9nLCAnICQxJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0SXNBYnNvbHV0ZVVybCh1cmw6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IHIgPSBuZXcgUmVnRXhwKCdeKD86W2Etel0rOik/Ly8nLCAnaScpO1xuICAgICAgICByZXR1cm4gci50ZXN0KHVybCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0VG9BYnNvbHV0ZVVybCh1cmw6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiBVdGlsaXRpZXMudGVzdElzQWJzb2x1dGVVcmwodXJsKSA/IHVybCA6ICcvLycgKyB1cmw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVOdWxscyhvYmopIHtcbiAgICAgICAgY29uc3QgaXNBcnJheSA9IG9iaiBpbnN0YW5jZW9mIEFycmF5O1xuXG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmpba10gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpc0FycmF5ID8gb2JqLnNwbGljZShrLCAxKSA6IGRlbGV0ZSBvYmpba107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpba10gPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBVdGlsaXRpZXMucmVtb3ZlTnVsbHMob2JqW2tdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQXJyYXkgJiYgb2JqLmxlbmd0aCA9PSBrKSB7XG4gICAgICAgICAgICAgICAgVXRpbGl0aWVzLnJlbW92ZU51bGxzKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGVib3VuY2UoZnVuYzogKC4uLmFyZ3MpID0+IGFueSwgd2FpdDogbnVtYmVyLCBpbW1lZGlhdGU/OiBib29sZWFuKSB7XG4gICAgICAgIGxldCB0aW1lb3V0O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgYXJnc18gPSBhcmd1bWVudHM7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzXyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcblxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJnc18pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==