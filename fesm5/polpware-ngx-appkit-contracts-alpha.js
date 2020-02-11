import { Injectable, NgModule } from '@angular/core';
import { __values, __extends } from 'tslib';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/alert.service-contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IAlertServiceContract() { }
if (false) {
    /**
     * @param {?} message
     * @return {?}
     */
    IAlertServiceContract.prototype.showDialog = function (message) { };
    /**
     * @param {?} message
     * @param {?} type
     * @param {?} okCallback
     * @return {?}
     */
    IAlertServiceContract.prototype.showDialog = function (message, type, okCallback) { };
    /**
     * @param {?} message
     * @param {?} type
     * @param {?=} okCallback
     * @param {?=} cancelCallback
     * @param {?=} okLabel
     * @param {?=} cancelLabel
     * @param {?=} defaultValue
     * @return {?}
     */
    IAlertServiceContract.prototype.showDialog = function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) { };
    /**
     * @param {?} message
     * @param {?=} type
     * @param {?=} okCallback
     * @param {?=} cancelCallback
     * @param {?=} okLabel
     * @param {?=} cancelLabel
     * @param {?=} defaultValue
     * @return {?}
     */
    IAlertServiceContract.prototype.showDialog = function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) { };
    /**
     * @param {?} summary
     * @return {?}
     */
    IAlertServiceContract.prototype.showMessage = function (summary) { };
    /**
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @return {?}
     */
    IAlertServiceContract.prototype.showMessage = function (summary, detail, severity) { };
    /**
     * @param {?} summaryAndDetails
     * @param {?} summaryAndDetailsSeparator
     * @param {?} severity
     * @return {?}
     */
    IAlertServiceContract.prototype.showMessage = function (summaryAndDetails, summaryAndDetailsSeparator, severity) { };
    /**
     * @param {?} response
     * @param {?} ignoreValue_useNull
     * @param {?} severity
     * @return {?}
     */
    IAlertServiceContract.prototype.showMessage = function (response, ignoreValue_useNull, severity) { };
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    IAlertServiceContract.prototype.showMessage = function (data, separatorOrDetail, severity) { };
    /**
     * @param {?} summary
     * @return {?}
     */
    IAlertServiceContract.prototype.showStickyMessage = function (summary) { };
    /**
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?=} error
     * @return {?}
     */
    IAlertServiceContract.prototype.showStickyMessage = function (summary, detail, severity, error) { };
    /**
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    IAlertServiceContract.prototype.showStickyMessage = function (summary, detail, severity, error, onRemove) { };
    /**
     * @param {?} summaryAndDetails
     * @param {?} summaryAndDetailsSeparator
     * @param {?} severity
     * @return {?}
     */
    IAlertServiceContract.prototype.showStickyMessage = function (summaryAndDetails, summaryAndDetailsSeparator, severity) { };
    /**
     * @param {?} response
     * @param {?} ignoreValue_useNull
     * @param {?} severity
     * @return {?}
     */
    IAlertServiceContract.prototype.showStickyMessage = function (response, ignoreValue_useNull, severity) { };
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    IAlertServiceContract.prototype.showStickyMessage = function (data, separatorOrDetail, severity, error, onRemove) { };
    /**
     * @return {?}
     */
    IAlertServiceContract.prototype.resetStickyMessage = function () { };
    /**
     * @param {?} message
     * @param {?} caption
     * @return {?}
     */
    IAlertServiceContract.prototype.startLoadingMessage = function (message, caption) { };
    /**
     * @return {?}
     */
    IAlertServiceContract.prototype.stopLoadingMessage = function () { };
    /**
     * @param {?} msg
     * @return {?}
     */
    IAlertServiceContract.prototype.logDebug = function (msg) { };
    /**
     * @param {?} msg
     * @return {?}
     */
    IAlertServiceContract.prototype.logError = function (msg) { };
    /**
     * @param {?} msg
     * @return {?}
     */
    IAlertServiceContract.prototype.logInfo = function (msg) { };
    /**
     * @param {?} msg
     * @return {?}
     */
    IAlertServiceContract.prototype.logMessage = function (msg) { };
    /**
     * @param {?} msg
     * @return {?}
     */
    IAlertServiceContract.prototype.logTrace = function (msg) { };
    /**
     * @param {?} msg
     * @return {?}
     */
    IAlertServiceContract.prototype.logWarning = function (msg) { };
    /**
     * @return {?}
     */
    IAlertServiceContract.prototype.getDialogEvent = function () { };
    /**
     * @return {?}
     */
    IAlertServiceContract.prototype.getMessageEvent = function () { };
}
// ******************** Dialog ********************//
var  
// ******************** Dialog ********************//
AlertDialog = /** @class */ (function () {
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
if (false) {
    /** @type {?} */
    AlertDialog.prototype.message;
    /** @type {?} */
    AlertDialog.prototype.type;
    /** @type {?} */
    AlertDialog.prototype.okCallback;
    /** @type {?} */
    AlertDialog.prototype.cancelCallback;
    /** @type {?} */
    AlertDialog.prototype.defaultValue;
    /** @type {?} */
    AlertDialog.prototype.okLabel;
    /** @type {?} */
    AlertDialog.prototype.cancelLabel;
}
/** @enum {number} */
var DialogType = {
    alert: 0,
    confirm: 1,
    prompt: 2,
};
DialogType[DialogType.alert] = 'alert';
DialogType[DialogType.confirm] = 'confirm';
DialogType[DialogType.prompt] = 'prompt';
// ******************** End ********************//
// ******************** Growls ********************//
var  
// ******************** End ********************//
// ******************** Growls ********************//
AlertCommand = /** @class */ (function () {
    function AlertCommand(operation, message, onRemove) {
        this.operation = operation;
        this.message = message;
        this.onRemove = onRemove;
    }
    return AlertCommand;
}());
if (false) {
    /** @type {?} */
    AlertCommand.prototype.operation;
    /** @type {?} */
    AlertCommand.prototype.message;
    /** @type {?} */
    AlertCommand.prototype.onRemove;
}
var AlertMessage = /** @class */ (function () {
    function AlertMessage(severity, summary, detail) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
    return AlertMessage;
}());
if (false) {
    /** @type {?} */
    AlertMessage.prototype.severity;
    /** @type {?} */
    AlertMessage.prototype.summary;
    /** @type {?} */
    AlertMessage.prototype.detail;
}
/** @enum {number} */
var MessageSeverity = {
    default: 0,
    info: 1,
    success: 2,
    error: 3,
    warn: 4,
    wait: 5,
};
MessageSeverity[MessageSeverity.default] = 'default';
MessageSeverity[MessageSeverity.info] = 'info';
MessageSeverity[MessageSeverity.success] = 'success';
MessageSeverity[MessageSeverity.error] = 'error';
MessageSeverity[MessageSeverity.warn] = 'warn';
MessageSeverity[MessageSeverity.wait] = 'wait';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/translation.service-contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ITranslationServiceContract() { }
if (false) {
    /** @type {?} */
    ITranslationServiceContract.prototype.languageChanged$;
    /**
     * @param {?} lang
     * @return {?}
     */
    ITranslationServiceContract.prototype.addLanguages = function (lang) { };
    /**
     * @param {?} lang
     * @return {?}
     */
    ITranslationServiceContract.prototype.setDefaultLanguage = function (lang) { };
    /**
     * @return {?}
     */
    ITranslationServiceContract.prototype.getDefaultLanguage = function () { };
    /**
     * @return {?}
     */
    ITranslationServiceContract.prototype.getBrowserLanguage = function () { };
    /**
     * @return {?}
     */
    ITranslationServiceContract.prototype.getCurrentLanguage = function () { };
    /**
     * @return {?}
     */
    ITranslationServiceContract.prototype.getLoadedLanguages = function () { };
    /**
     * @return {?}
     */
    ITranslationServiceContract.prototype.useBrowserLanguage = function () { };
    /**
     * @return {?}
     */
    ITranslationServiceContract.prototype.useDefaultLangage = function () { };
    /**
     * @param {?} language
     * @return {?}
     */
    ITranslationServiceContract.prototype.changeLanguage = function (language) { };
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    ITranslationServiceContract.prototype.getTranslation = function (key, interpolateParams) { };
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    ITranslationServiceContract.prototype.getTranslationAsync = function (key, interpolateParams) { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models/app-theme.model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
/**
 * @record
 */
function AppTheme() { }
if (false) {
    /** @type {?} */
    AppTheme.prototype.id;
    /** @type {?} */
    AppTheme.prototype.name;
    /** @type {?} */
    AppTheme.prototype.href;
    /** @type {?|undefined} */
    AppTheme.prototype.isDefault;
    /** @type {?} */
    AppTheme.prototype.background;
    /** @type {?} */
    AppTheme.prototype.color;
    /** @type {?|undefined} */
    AppTheme.prototype.isDark;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/theme-manager.contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
/**
 * @record
 */
function IThemeManagerContract() { }
if (false) {
    /** @type {?} */
    IThemeManagerContract.prototype.themes;
    /**
     * @param {?=} theme
     * @return {?}
     */
    IThemeManagerContract.prototype.installTheme = function (theme) { };
    /**
     * @return {?}
     */
    IThemeManagerContract.prototype.getDefaultTheme = function () { };
    /**
     * @param {?} id
     * @return {?}
     */
    IThemeManagerContract.prototype.getThemeByID = function (id) { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/local-store-manager.service-contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
 * @record
 */
function ILocalStoreManagerContract() { }
if (false) {
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.initialiseStorageSyncListener = function () { };
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.deinitialiseStorageSyncListener = function () { };
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.clearAllStorage = function () { };
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.clearAllSessionsStorage = function () { };
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.clearInstanceSessionStorage = function () { };
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.clearLocalStorage = function () { };
    /**
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.saveSessionData = function (data, key) { };
    /**
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.saveSyncedSessionData = function (data, key) { };
    /**
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.savePermanentData = function (data, key) { };
    /**
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.moveDataToSessionStorage = function (key) { };
    /**
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.moveDataToSyncedSessionStorage = function (key) { };
    /**
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.moveDataToPermanentStorage = function (key) { };
    /**
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.exists = function (key) { };
    /**
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.getData = function (key) { };
    /**
     * @template T
     * @param {?} key
     * @param {?} isDateType
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.getDataObject = function (key, isDateType) { };
    /**
     * @param {?} key
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.deleteData = function (key) { };
    /**
     * @return {?}
     */
    ILocalStoreManagerContract.prototype.getInitEvent = function () { };
}
var StorageManagerConstants = /** @class */ (function () {
    function StorageManagerConstants() {
    }
    StorageManagerConstants.DBKEY_USER_DATA = 'user_data';
    return StorageManagerConstants;
}());
if (false) {
    /** @type {?} */
    StorageManagerConstants.DBKEY_USER_DATA;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/configuration.service-contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
/**
 * @record
 */
function UserConfiguration() { }
if (false) {
    /** @type {?} */
    UserConfiguration.prototype.language;
    /** @type {?} */
    UserConfiguration.prototype.homeUrl;
    /** @type {?} */
    UserConfiguration.prototype.themeId;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardStatistics;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardNotifications;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardTodo;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardBanner;
}
/**
 * @record
 */
function IConfigurationServiceContract() { }
if (false) {
    /** @type {?} */
    IConfigurationServiceContract.prototype.language;
    /** @type {?} */
    IConfigurationServiceContract.prototype.themeId;
    /** @type {?} */
    IConfigurationServiceContract.prototype.homeUrl;
    /** @type {?} */
    IConfigurationServiceContract.prototype.showDashboardStatistics;
    /** @type {?} */
    IConfigurationServiceContract.prototype.showDashboardNotifications;
    /** @type {?} */
    IConfigurationServiceContract.prototype.showDashboardTodo;
    /** @type {?} */
    IConfigurationServiceContract.prototype.showDashboardBanner;
    /** @type {?} */
    IConfigurationServiceContract.prototype.baseUrl;
    /** @type {?} */
    IConfigurationServiceContract.prototype.tokenUrl;
    /** @type {?} */
    IConfigurationServiceContract.prototype.loginUrl;
    /** @type {?} */
    IConfigurationServiceContract.prototype.fallbackBaseUrl;
    /** @type {?} */
    IConfigurationServiceContract.prototype.configurationImported$;
    /**
     * @param {?} jsonValue
     * @return {?}
     */
    IConfigurationServiceContract.prototype.import = function (jsonValue) { };
    /**
     * @param {?} changesOnly
     * @return {?}
     */
    IConfigurationServiceContract.prototype.export = function (changesOnly) { };
    /**
     * @return {?}
     */
    IConfigurationServiceContract.prototype.clearLocalChanges = function () { };
}
var ConfigurationServiceConstants = /** @class */ (function () {
    function ConfigurationServiceConstants() {
    }
    ConfigurationServiceConstants.appVersion = '3.1.0';
    // ***Specify default configurations here***
    ConfigurationServiceConstants.defaultLanguage = 'en';
    ConfigurationServiceConstants.defaultHomeUrl = '/';
    ConfigurationServiceConstants.defaultThemeId = 1;
    ConfigurationServiceConstants.defaultShowDashboardStatistics = true;
    ConfigurationServiceConstants.defaultShowDashboardNotifications = true;
    ConfigurationServiceConstants.defaultShowDashboardTodo = false;
    ConfigurationServiceConstants.defaultShowDashboardBanner = true;
    return ConfigurationServiceConstants;
}());
if (false) {
    /** @type {?} */
    ConfigurationServiceConstants.appVersion;
    /** @type {?} */
    ConfigurationServiceConstants.defaultLanguage;
    /** @type {?} */
    ConfigurationServiceConstants.defaultHomeUrl;
    /** @type {?} */
    ConfigurationServiceConstants.defaultThemeId;
    /** @type {?} */
    ConfigurationServiceConstants.defaultShowDashboardStatistics;
    /** @type {?} */
    ConfigurationServiceConstants.defaultShowDashboardNotifications;
    /** @type {?} */
    ConfigurationServiceConstants.defaultShowDashboardTodo;
    /** @type {?} */
    ConfigurationServiceConstants.defaultShowDashboardBanner;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/db-keys.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    DBkeys.decorators = [
        { type: Injectable }
    ];
    return DBkeys;
}());
if (false) {
    /** @type {?} */
    DBkeys.CURRENT_USER;
    /** @type {?} */
    DBkeys.USER_PERMISSIONS;
    /** @type {?} */
    DBkeys.ACCESS_TOKEN;
    /** @type {?} */
    DBkeys.REFRESH_TOKEN;
    /** @type {?} */
    DBkeys.TOKEN_EXPIRES_IN;
    /** @type {?} */
    DBkeys.REMEMBER_ME;
    /** @type {?} */
    DBkeys.LANGUAGE;
    /** @type {?} */
    DBkeys.HOME_URL;
    /** @type {?} */
    DBkeys.THEME_ID;
    /** @type {?} */
    DBkeys.SHOW_DASHBOARD_STATISTICS;
    /** @type {?} */
    DBkeys.SHOW_DASHBOARD_NOTIFICATIONS;
    /** @type {?} */
    DBkeys.SHOW_DASHBOARD_TODO;
    /** @type {?} */
    DBkeys.SHOW_DASHBOARD_BANNER;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/utilities.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            for (var httpMessages_1 = __values(httpMessages), httpMessages_1_1 = httpMessages_1.next(); !httpMessages_1_1.done; httpMessages_1_1 = httpMessages_1.next()) {
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
                for (var httpMessages_2 = __values(httpMessages), httpMessages_2_1 = httpMessages_2.next(); !httpMessages_2_1.done; httpMessages_2_1 = httpMessages_2.next()) {
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
            for (var _b = __values(paramString.split('&')), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/environments/environment.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/** @type {?} */
var environment = {
    production: false,
    baseUrl: null,
    // Change this to the address of your backend API if different from frontend address
    tokenUrl: null,
    // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
    loginUrl: '/login'
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/service-provider-base.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
ServiceProviderBase = /** @class */ (function () {
    function ServiceProviderBase() {
    }
    return ServiceProviderBase;
}());
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    ServiceProviderBase.prototype.get = function () { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/alert.service-abstract-provider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var AlertServiceAbstractProvider = /** @class */ (function (_super) {
    __extends(AlertServiceAbstractProvider, _super);
    function AlertServiceAbstractProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertServiceAbstractProvider.decorators = [
        { type: Injectable }
    ];
    return AlertServiceAbstractProvider;
}(ServiceProviderBase));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/translation.service-abstract-provider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var TranslationServiceAbstractProvider = /** @class */ (function (_super) {
    __extends(TranslationServiceAbstractProvider, _super);
    function TranslationServiceAbstractProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslationServiceAbstractProvider.decorators = [
        { type: Injectable }
    ];
    return TranslationServiceAbstractProvider;
}(ServiceProviderBase));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/configuration.service-abstract-provider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var ConfigurationServiceAbstractProvider = /** @class */ (function (_super) {
    __extends(ConfigurationServiceAbstractProvider, _super);
    function ConfigurationServiceAbstractProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigurationServiceAbstractProvider.decorators = [
        { type: Injectable }
    ];
    return ConfigurationServiceAbstractProvider;
}(ServiceProviderBase));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/local-store-manager.service-abstract-provider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var LocalStoreManagerServiceAbstractProvider = /** @class */ (function (_super) {
    __extends(LocalStoreManagerServiceAbstractProvider, _super);
    function LocalStoreManagerServiceAbstractProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalStoreManagerServiceAbstractProvider.decorators = [
        { type: Injectable }
    ];
    return LocalStoreManagerServiceAbstractProvider;
}(ServiceProviderBase));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/theme-manager.abstract-provider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var ThemeManagerAbstractProvider = /** @class */ (function (_super) {
    __extends(ThemeManagerAbstractProvider, _super);
    function ThemeManagerAbstractProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemeManagerAbstractProvider.decorators = [
        { type: Injectable }
    ];
    return ThemeManagerAbstractProvider;
}(ServiceProviderBase));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-appkit-contracts-alpha.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxAppkitContractsAlphaModule = /** @class */ (function () {
    function NgxAppkitContractsAlphaModule() {
    }
    NgxAppkitContractsAlphaModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                    providers: [
                        Utilities,
                        DBkeys
                    ]
                },] }
    ];
    return NgxAppkitContractsAlphaModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: polpware-ngx-appkit-contracts-alpha.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AlertCommand, AlertDialog, AlertMessage, AlertServiceAbstractProvider, ConfigurationServiceAbstractProvider, ConfigurationServiceConstants, DBkeys, DialogType, LocalStoreManagerServiceAbstractProvider, MessageSeverity, NgxAppkitContractsAlphaModule, ServiceProviderBase, StorageManagerConstants, ThemeManagerAbstractProvider, TranslationServiceAbstractProvider, Utilities, environment };
//# sourceMappingURL=polpware-ngx-appkit-contracts-alpha.js.map
