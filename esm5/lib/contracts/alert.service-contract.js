/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/alert.service-contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IAlertServiceContract() { }
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
// ******************** Dialog ********************//
export { AlertDialog };
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
export { DialogType };
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
// ******************** End ********************//
// ******************** Growls ********************//
export { AlertCommand };
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
export { AlertMessage };
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
export { MessageSeverity };
MessageSeverity[MessageSeverity.default] = 'default';
MessageSeverity[MessageSeverity.info] = 'info';
MessageSeverity[MessageSeverity.success] = 'success';
MessageSeverity[MessageSeverity.error] = 'error';
MessageSeverity[MessageSeverity.warn] = 'warn';
MessageSeverity[MessageSeverity.wait] = 'wait';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS1jb250cmFjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9jb250cmFjdHMvYWxlcnQuc2VydmljZS1jb250cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLDJDQTZDQzs7Ozs7O0lBMUNHLG9FQUE0Qjs7Ozs7OztJQUM1QixzRkFBOEU7Ozs7Ozs7Ozs7O0lBQzlFLDBJQUEwSzs7Ozs7Ozs7Ozs7SUFDMUssMElBQTJLOzs7OztJQUczSyxxRUFBNkI7Ozs7Ozs7SUFDN0IsdUZBQXdFOzs7Ozs7O0lBQ3hFLHFIQUF3Rzs7Ozs7OztJQUN4RyxxR0FBZ0c7Ozs7Ozs7SUFDaEcsK0ZBQStFOzs7OztJQUUvRSwyRUFBbUM7Ozs7Ozs7O0lBQ25DLG9HQUEyRjs7Ozs7Ozs7O0lBQzNGLDhHQUFpSDs7Ozs7OztJQUNqSCwySEFBOEc7Ozs7Ozs7SUFDOUcsMkdBQXNHOzs7Ozs7Ozs7SUFDdEcsc0hBQXlKOzs7O0lBRXpKLHFFQUFxQjs7Ozs7O0lBR3JCLHNGQUFzRDs7OztJQUV0RCxxRUFBcUI7Ozs7O0lBR3JCLDhEQUFjOzs7OztJQUVkLDhEQUFjOzs7OztJQUVkLDZEQUFhOzs7OztJQUViLGdFQUFnQjs7Ozs7SUFFaEIsOERBQWM7Ozs7O0lBRWQsZ0VBQWdCOzs7O0lBRWhCLGlFQUEwQzs7OztJQUUxQyxrRUFBNEM7OztBQUtoRDs7O0lBQ0kscUJBQ1csT0FBZSxFQUNmLElBQWdCLEVBQ2hCLFVBQThCLEVBQzlCLGNBQXlCLEVBQ3pCLFlBQW9CLEVBQ3BCLE9BQWUsRUFDZixXQUFtQjtRQU5uQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFvQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBVztRQUN6QixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFFOUIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7Ozs7O0lBVE8sOEJBQXNCOztJQUN0QiwyQkFBdUI7O0lBQ3ZCLGlDQUFxQzs7SUFDckMscUNBQWdDOztJQUNoQyxtQ0FBMkI7O0lBQzNCLDhCQUFzQjs7SUFDdEIsa0NBQTBCOzs7QUFLbEMsSUFBWSxVQUFVO0lBQ2xCLEtBQUssR0FBQTtJQUNMLE9BQU8sR0FBQTtJQUNQLE1BQU0sR0FBQTtFQUNUOzs7Ozs7O0FBS0Q7Ozs7SUFDSSxzQkFDVyxTQUF5QyxFQUN6QyxPQUFzQixFQUN0QixRQUFvQjtRQUZwQixjQUFTLEdBQVQsU0FBUyxDQUFnQztRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVk7SUFBSSxDQUFDO0lBQ3hDLG1CQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7Ozs7OztJQUhPLGlDQUFnRDs7SUFDaEQsK0JBQTZCOztJQUM3QixnQ0FBMkI7O0FBR25DO0lBQ0ksc0JBQ1csUUFBeUIsRUFDekIsT0FBZSxFQUNmLE1BQWM7UUFGZCxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUN6QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFDbEMsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7OztJQUhPLGdDQUFnQzs7SUFDaEMsK0JBQXNCOztJQUN0Qiw4QkFBcUI7OztBQUc3QixJQUFZLGVBQWU7SUFDdkIsT0FBTyxHQUFBO0lBQ1AsSUFBSSxHQUFBO0lBQ0osT0FBTyxHQUFBO0lBQ1AsS0FBSyxHQUFBO0lBQ0wsSUFBSSxHQUFBO0lBQ0osSUFBSSxHQUFBO0VBQ1AiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVzcG9uc2VCYXNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBbGVydFNlcnZpY2VDb250cmFjdCB7XG5cblxuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nKTtcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogRGlhbG9nVHlwZSwgb2tDYWxsYmFjazogKHZhbD86IGFueSkgPT4gYW55KTtcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogRGlhbG9nVHlwZSwgb2tDYWxsYmFjaz86ICh2YWw/OiBhbnkpID0+IGFueSwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiBhbnksIG9rTGFiZWw/OiBzdHJpbmcsIGNhbmNlbExhYmVsPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogRGlhbG9nVHlwZSwgb2tDYWxsYmFjaz86ICh2YWw/OiBhbnkpID0+IGFueSwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiBhbnksIG9rTGFiZWw/OiBzdHJpbmcsIGNhbmNlbExhYmVsPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpO1xuXG5cbiAgICBzaG93TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcpO1xuICAgIHNob3dNZXNzYWdlKHN1bW1hcnk6IHN0cmluZywgZGV0YWlsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dNZXNzYWdlKHN1bW1hcnlBbmREZXRhaWxzOiBzdHJpbmdbXSwgc3VtbWFyeUFuZERldGFpbHNTZXBhcmF0b3I6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd01lc3NhZ2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UsIGlnbm9yZVZhbHVlX3VzZU51bGw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd01lc3NhZ2UoZGF0YTogYW55LCBzZXBhcmF0b3JPckRldGFpbD86IHN0cmluZywgc2V2ZXJpdHk/OiBNZXNzYWdlU2V2ZXJpdHkpO1xuXG4gICAgc2hvd1N0aWNreU1lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nKTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nLCBkZXRhaWw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSwgZXJyb3I/OiBhbnksIG9uUmVtb3ZlPzogKCkgPT4gYW55KTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5QW5kRGV0YWlsczogc3RyaW5nW10sIHN1bW1hcnlBbmREZXRhaWxzU2VwYXJhdG9yOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlLCBpZ25vcmVWYWx1ZV91c2VOdWxsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKGRhdGE6IHN0cmluZyB8IHN0cmluZ1tdIHwgSHR0cFJlc3BvbnNlQmFzZSwgc2VwYXJhdG9yT3JEZXRhaWw/OiBzdHJpbmcsIHNldmVyaXR5PzogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSwgb25SZW1vdmU/OiAoKSA9PiBhbnkpO1xuXG4gICAgcmVzZXRTdGlja3lNZXNzYWdlKCk7XG5cblxuICAgIHN0YXJ0TG9hZGluZ01lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCBjYXB0aW9uOiBzdHJpbmcpO1xuXG4gICAgc3RvcExvYWRpbmdNZXNzYWdlKCk7XG5cblxuICAgIGxvZ0RlYnVnKG1zZyk7XG5cbiAgICBsb2dFcnJvcihtc2cpO1xuXG4gICAgbG9nSW5mbyhtc2cpO1xuXG4gICAgbG9nTWVzc2FnZShtc2cpO1xuXG4gICAgbG9nVHJhY2UobXNnKTtcblxuICAgIGxvZ1dhcm5pbmcobXNnKTtcblxuICAgIGdldERpYWxvZ0V2ZW50KCk6IE9ic2VydmFibGU8QWxlcnREaWFsb2c+O1xuXG4gICAgZ2V0TWVzc2FnZUV2ZW50KCk6IE9ic2VydmFibGU8QWxlcnRDb21tYW5kPjtcbn1cblxuXG4vLyAqKioqKioqKioqKioqKioqKioqKiBEaWFsb2cgKioqKioqKioqKioqKioqKioqKiovL1xuZXhwb3J0IGNsYXNzIEFsZXJ0RGlhbG9nIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHR5cGU6IERpYWxvZ1R5cGUsXG4gICAgICAgIHB1YmxpYyBva0NhbGxiYWNrOiAodmFsPzogYW55KSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyBjYW5jZWxDYWxsYmFjazogKCkgPT4gYW55LFxuICAgICAgICBwdWJsaWMgZGVmYXVsdFZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBva0xhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBjYW5jZWxMYWJlbDogc3RyaW5nKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIERpYWxvZ1R5cGUge1xuICAgIGFsZXJ0LFxuICAgIGNvbmZpcm0sXG4gICAgcHJvbXB0XG59XG4vLyAqKioqKioqKioqKioqKioqKioqKiBFbmQgKioqKioqKioqKioqKioqKioqKiovL1xuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqIEdyb3dscyAqKioqKioqKioqKioqKioqKioqKi8vXG5leHBvcnQgY2xhc3MgQWxlcnRDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG9wZXJhdGlvbjogJ2NsZWFyJyB8ICdhZGQnIHwgJ2FkZF9zdGlja3knLFxuICAgICAgICBwdWJsaWMgbWVzc2FnZT86IEFsZXJ0TWVzc2FnZSxcbiAgICAgICAgcHVibGljIG9uUmVtb3ZlPzogKCkgPT4gYW55KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFsZXJ0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LFxuICAgICAgICBwdWJsaWMgc3VtbWFyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZGV0YWlsOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgZW51bSBNZXNzYWdlU2V2ZXJpdHkge1xuICAgIGRlZmF1bHQsXG4gICAgaW5mbyxcbiAgICBzdWNjZXNzLFxuICAgIGVycm9yLFxuICAgIHdhcm4sXG4gICAgd2FpdFxufVxuLy8gKioqKioqKioqKioqKioqKioqKiogRW5kICoqKioqKioqKioqKioqKioqKioqLy9cbiJdfQ==