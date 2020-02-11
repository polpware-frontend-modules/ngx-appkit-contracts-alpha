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
export class AlertDialog {
    /**
     * @param {?} message
     * @param {?} type
     * @param {?} okCallback
     * @param {?} cancelCallback
     * @param {?} defaultValue
     * @param {?} okLabel
     * @param {?} cancelLabel
     */
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
const DialogType = {
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
export class AlertCommand {
    /**
     * @param {?} operation
     * @param {?=} message
     * @param {?=} onRemove
     */
    constructor(operation, message, onRemove) {
        this.operation = operation;
        this.message = message;
        this.onRemove = onRemove;
    }
}
if (false) {
    /** @type {?} */
    AlertCommand.prototype.operation;
    /** @type {?} */
    AlertCommand.prototype.message;
    /** @type {?} */
    AlertCommand.prototype.onRemove;
}
export class AlertMessage {
    /**
     * @param {?} severity
     * @param {?} summary
     * @param {?} detail
     */
    constructor(severity, summary, detail) {
        this.severity = severity;
        this.summary = summary;
        this.detail = detail;
    }
}
if (false) {
    /** @type {?} */
    AlertMessage.prototype.severity;
    /** @type {?} */
    AlertMessage.prototype.summary;
    /** @type {?} */
    AlertMessage.prototype.detail;
}
/** @enum {number} */
const MessageSeverity = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS1jb250cmFjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9jb250cmFjdHMvYWxlcnQuc2VydmljZS1jb250cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLDJDQTZDQzs7Ozs7O0lBMUNHLG9FQUE0Qjs7Ozs7OztJQUM1QixzRkFBOEU7Ozs7Ozs7Ozs7O0lBQzlFLDBJQUEwSzs7Ozs7Ozs7Ozs7SUFDMUssMElBQTJLOzs7OztJQUczSyxxRUFBNkI7Ozs7Ozs7SUFDN0IsdUZBQXdFOzs7Ozs7O0lBQ3hFLHFIQUF3Rzs7Ozs7OztJQUN4RyxxR0FBZ0c7Ozs7Ozs7SUFDaEcsK0ZBQStFOzs7OztJQUUvRSwyRUFBbUM7Ozs7Ozs7O0lBQ25DLG9HQUEyRjs7Ozs7Ozs7O0lBQzNGLDhHQUFpSDs7Ozs7OztJQUNqSCwySEFBOEc7Ozs7Ozs7SUFDOUcsMkdBQXNHOzs7Ozs7Ozs7SUFDdEcsc0hBQXlKOzs7O0lBRXpKLHFFQUFxQjs7Ozs7O0lBR3JCLHNGQUFzRDs7OztJQUV0RCxxRUFBcUI7Ozs7O0lBR3JCLDhEQUFjOzs7OztJQUVkLDhEQUFjOzs7OztJQUVkLDZEQUFhOzs7OztJQUViLGdFQUFnQjs7Ozs7SUFFaEIsOERBQWM7Ozs7O0lBRWQsZ0VBQWdCOzs7O0lBRWhCLGlFQUEwQzs7OztJQUUxQyxrRUFBNEM7OztBQUtoRCxNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7OztJQUNwQixZQUNXLE9BQWUsRUFDZixJQUFnQixFQUNoQixVQUE4QixFQUM5QixjQUF5QixFQUN6QixZQUFvQixFQUNwQixPQUFlLEVBQ2YsV0FBbUI7UUFObkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQVc7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBRTlCLENBQUM7Q0FDSjs7O0lBVE8sOEJBQXNCOztJQUN0QiwyQkFBdUI7O0lBQ3ZCLGlDQUFxQzs7SUFDckMscUNBQWdDOztJQUNoQyxtQ0FBMkI7O0lBQzNCLDhCQUFzQjs7SUFDdEIsa0NBQTBCOzs7QUFLbEMsTUFBWSxVQUFVO0lBQ2xCLEtBQUssR0FBQTtJQUNMLE9BQU8sR0FBQTtJQUNQLE1BQU0sR0FBQTtFQUNUOzs7Ozs7O0FBS0QsTUFBTSxPQUFPLFlBQVk7Ozs7OztJQUNyQixZQUNXLFNBQXlDLEVBQ3pDLE9BQXNCLEVBQ3RCLFFBQW9CO1FBRnBCLGNBQVMsR0FBVCxTQUFTLENBQWdDO1FBQ3pDLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtJQUFJLENBQUM7Q0FDdkM7OztJQUhPLGlDQUFnRDs7SUFDaEQsK0JBQTZCOztJQUM3QixnQ0FBMkI7O0FBR25DLE1BQU0sT0FBTyxZQUFZOzs7Ozs7SUFDckIsWUFDVyxRQUF5QixFQUN6QixPQUFlLEVBQ2YsTUFBYztRQUZkLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztDQUNqQzs7O0lBSE8sZ0NBQWdDOztJQUNoQywrQkFBc0I7O0lBQ3RCLDhCQUFxQjs7O0FBRzdCLE1BQVksZUFBZTtJQUN2QixPQUFPLEdBQUE7SUFDUCxJQUFJLEdBQUE7SUFDSixPQUFPLEdBQUE7SUFDUCxLQUFLLEdBQUE7SUFDTCxJQUFJLEdBQUE7SUFDSixJQUFJLEdBQUE7RUFDUCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXNwb25zZUJhc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFsZXJ0U2VydmljZUNvbnRyYWN0IHtcblxuXG4gICAgc2hvd0RpYWxvZyhtZXNzYWdlOiBzdHJpbmcpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlOiBEaWFsb2dUeXBlLCBva0NhbGxiYWNrOiAodmFsPzogYW55KSA9PiBhbnkpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlOiBEaWFsb2dUeXBlLCBva0NhbGxiYWNrPzogKHZhbD86IGFueSkgPT4gYW55LCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IGFueSwgb2tMYWJlbD86IHN0cmluZywgY2FuY2VsTGFiZWw/OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk7XG4gICAgc2hvd0RpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBEaWFsb2dUeXBlLCBva0NhbGxiYWNrPzogKHZhbD86IGFueSkgPT4gYW55LCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IGFueSwgb2tMYWJlbD86IHN0cmluZywgY2FuY2VsTGFiZWw/OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk7XG5cblxuICAgIHNob3dNZXNzYWdlKHN1bW1hcnk6IHN0cmluZyk7XG4gICAgc2hvd01lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nLCBkZXRhaWw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd01lc3NhZ2Uoc3VtbWFyeUFuZERldGFpbHM6IHN0cmluZ1tdLCBzdW1tYXJ5QW5kRGV0YWlsc1NlcGFyYXRvcjogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5KTtcbiAgICBzaG93TWVzc2FnZShyZXNwb25zZTogSHR0cFJlc3BvbnNlQmFzZSwgaWdub3JlVmFsdWVfdXNlTnVsbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5KTtcbiAgICBzaG93TWVzc2FnZShkYXRhOiBhbnksIHNlcGFyYXRvck9yRGV0YWlsPzogc3RyaW5nLCBzZXZlcml0eT86IE1lc3NhZ2VTZXZlcml0eSk7XG5cbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHN1bW1hcnk6IHN0cmluZywgZGV0YWlsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHksIGVycm9yPzogYW55KTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSwgb25SZW1vdmU/OiAoKSA9PiBhbnkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHN1bW1hcnlBbmREZXRhaWxzOiBzdHJpbmdbXSwgc3VtbWFyeUFuZERldGFpbHNTZXBhcmF0b3I6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UsIGlnbm9yZVZhbHVlX3VzZU51bGw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2UoZGF0YTogc3RyaW5nIHwgc3RyaW5nW10gfCBIdHRwUmVzcG9uc2VCYXNlLCBzZXBhcmF0b3JPckRldGFpbD86IHN0cmluZywgc2V2ZXJpdHk/OiBNZXNzYWdlU2V2ZXJpdHksIGVycm9yPzogYW55LCBvblJlbW92ZT86ICgpID0+IGFueSk7XG5cbiAgICByZXNldFN0aWNreU1lc3NhZ2UoKTtcblxuXG4gICAgc3RhcnRMb2FkaW5nTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIGNhcHRpb246IHN0cmluZyk7XG5cbiAgICBzdG9wTG9hZGluZ01lc3NhZ2UoKTtcblxuXG4gICAgbG9nRGVidWcobXNnKTtcblxuICAgIGxvZ0Vycm9yKG1zZyk7XG5cbiAgICBsb2dJbmZvKG1zZyk7XG5cbiAgICBsb2dNZXNzYWdlKG1zZyk7XG5cbiAgICBsb2dUcmFjZShtc2cpO1xuXG4gICAgbG9nV2FybmluZyhtc2cpO1xuXG4gICAgZ2V0RGlhbG9nRXZlbnQoKTogT2JzZXJ2YWJsZTxBbGVydERpYWxvZz47XG5cbiAgICBnZXRNZXNzYWdlRXZlbnQoKTogT2JzZXJ2YWJsZTxBbGVydENvbW1hbmQ+O1xufVxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqIERpYWxvZyAqKioqKioqKioqKioqKioqKioqKi8vXG5leHBvcnQgY2xhc3MgQWxlcnREaWFsb2cge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgdHlwZTogRGlhbG9nVHlwZSxcbiAgICAgICAgcHVibGljIG9rQ2FsbGJhY2s6ICh2YWw/OiBhbnkpID0+IGFueSxcbiAgICAgICAgcHVibGljIGNhbmNlbENhbGxiYWNrOiAoKSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyBkZWZhdWx0VmFsdWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIG9rTGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGNhbmNlbExhYmVsOiBzdHJpbmcpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gRGlhbG9nVHlwZSB7XG4gICAgYWxlcnQsXG4gICAgY29uZmlybSxcbiAgICBwcm9tcHRcbn1cbi8vICoqKioqKioqKioqKioqKioqKioqIEVuZCAqKioqKioqKioqKioqKioqKioqKi8vXG5cblxuLy8gKioqKioqKioqKioqKioqKioqKiogR3Jvd2xzICoqKioqKioqKioqKioqKioqKioqLy9cbmV4cG9ydCBjbGFzcyBBbGVydENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgb3BlcmF0aW9uOiAnY2xlYXInIHwgJ2FkZCcgfCAnYWRkX3N0aWNreScsXG4gICAgICAgIHB1YmxpYyBtZXNzYWdlPzogQWxlcnRNZXNzYWdlLFxuICAgICAgICBwdWJsaWMgb25SZW1vdmU/OiAoKSA9PiBhbnkpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQWxlcnRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHksXG4gICAgICAgIHB1YmxpYyBzdW1tYXJ5OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBkZXRhaWw6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBlbnVtIE1lc3NhZ2VTZXZlcml0eSB7XG4gICAgZGVmYXVsdCxcbiAgICBpbmZvLFxuICAgIHN1Y2Nlc3MsXG4gICAgZXJyb3IsXG4gICAgd2FybixcbiAgICB3YWl0XG59XG4vLyAqKioqKioqKioqKioqKioqKioqKiBFbmQgKioqKioqKioqKioqKioqKioqKiovL1xuIl19