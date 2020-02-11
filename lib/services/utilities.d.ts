import { HttpResponseBase, HttpResponse } from '@angular/common/http';
export declare class Utilities {
    static readonly captionAndMessageSeparator = ":";
    static readonly noNetworkMessageCaption = "No Network";
    static readonly noNetworkMessageDetail = "The server cannot be reached";
    static readonly accessDeniedMessageCaption = "Access Denied!";
    static readonly accessDeniedMessageDetail = "";
    static readonly notFoundMessageCaption = "Not Found";
    static readonly notFoundMessageDetail = "The target resource cannot be found";
    static cookies: {
        getItem: (sKey: any) => string;
        setItem: (sKey: any, sValue: any, vEnd: any, sPath: any, sDomain: any, bSecure: any) => boolean;
        removeItem: (sKey: any, sPath: any, sDomain: any) => boolean;
        hasItem: (sKey: any) => boolean;
        keys: () => string[];
    };
    static getHttpResponseMessages(data: HttpResponseBase | any): string[];
    static getHttpResponseMessage(data: HttpResponseBase | any): string;
    static findHttpResponseMessage(messageToFind: string, data: HttpResponse<any> | any, seachInCaptionOnly?: boolean, includeCaptionInResult?: boolean): string;
    static getResponseBody(response: HttpResponseBase): any;
    static checkNoNetwork(response: HttpResponseBase): boolean;
    static checkAccessDenied(response: HttpResponseBase): boolean;
    static checkNotFound(response: HttpResponseBase): boolean;
    static checkIsLocalHost(url: string, base?: string): boolean;
    static getQueryParamsFromString(paramString: string): {
        [key: string]: string;
    };
    static splitInTwo(text: string, separator: string): {
        firstPart: string;
        secondPart: string;
    };
    static safeStringify(object: any): string;
    static JsonTryParse(value: string): any;
    static TestIsObjectEmpty(obj: any): boolean;
    static TestIsUndefined(value: any): boolean;
    static TestIsString(value: any): boolean;
    static capitalizeFirstLetter(text: string): string;
    static toTitleCase(text: string): string;
    static toLowerCase(items: string): any;
    static toLowerCase(items: string[]): any;
    static uniqueId(): string;
    static randomNumber(min: number, max: number): number;
    static baseUrl(): string;
    static printDateOnly(date: Date): string;
    static printTimeOnly(date: Date): string;
    static printDate(date: Date, separator?: string): string;
    static printFriendlyDate(date: Date, separator?: string): string;
    static printShortDate(date: Date, separator?: string, dateTimeSeparator?: string): string;
    static parseDate(date: any): Date;
    static printDuration(start: Date, end: Date): string;
    static getAge(birthDate: any, otherDate: any): number;
    static searchArray(searchTerm: string, caseSensitive: boolean, ...values: any[]): boolean;
    static moveArrayItem(array: any[], oldIndex: any, newIndex: any): void;
    static expandCamelCase(text: string): string;
    static testIsAbsoluteUrl(url: string): boolean;
    static convertToAbsoluteUrl(url: string): string;
    static removeNulls(obj: any): any;
    static debounce(func: (...args: any[]) => any, wait: number, immediate?: boolean): () => void;
}
