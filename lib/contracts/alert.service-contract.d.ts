import { HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface IAlertServiceContract {
    showDialog(message: string): any;
    showDialog(message: string, type: DialogType, okCallback: (val?: any) => any): any;
    showDialog(message: string, type: DialogType, okCallback?: (val?: any) => any, cancelCallback?: () => any, okLabel?: string, cancelLabel?: string, defaultValue?: string): any;
    showDialog(message: string, type?: DialogType, okCallback?: (val?: any) => any, cancelCallback?: () => any, okLabel?: string, cancelLabel?: string, defaultValue?: string): any;
    showMessage(summary: string): any;
    showMessage(summary: string, detail: string, severity: MessageSeverity): any;
    showMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity): any;
    showMessage(response: HttpResponseBase, ignoreValue_useNull: string, severity: MessageSeverity): any;
    showMessage(data: any, separatorOrDetail?: string, severity?: MessageSeverity): any;
    showStickyMessage(summary: string): any;
    showStickyMessage(summary: string, detail: string, severity: MessageSeverity, error?: any): any;
    showStickyMessage(summary: string, detail: string, severity: MessageSeverity, error?: any, onRemove?: () => any): any;
    showStickyMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity): any;
    showStickyMessage(response: HttpResponseBase, ignoreValue_useNull: string, severity: MessageSeverity): any;
    showStickyMessage(data: string | string[] | HttpResponseBase, separatorOrDetail?: string, severity?: MessageSeverity, error?: any, onRemove?: () => any): any;
    resetStickyMessage(): any;
    startLoadingMessage(message: string, caption: string): any;
    stopLoadingMessage(): any;
    logDebug(msg: any): any;
    logError(msg: any): any;
    logInfo(msg: any): any;
    logMessage(msg: any): any;
    logTrace(msg: any): any;
    logWarning(msg: any): any;
    getDialogEvent(): Observable<AlertDialog>;
    getMessageEvent(): Observable<AlertCommand>;
}
export declare class AlertDialog {
    message: string;
    type: DialogType;
    okCallback: (val?: any) => any;
    cancelCallback: () => any;
    defaultValue: string;
    okLabel: string;
    cancelLabel: string;
    constructor(message: string, type: DialogType, okCallback: (val?: any) => any, cancelCallback: () => any, defaultValue: string, okLabel: string, cancelLabel: string);
}
export declare enum DialogType {
    alert = 0,
    confirm = 1,
    prompt = 2
}
export declare class AlertCommand {
    operation: 'clear' | 'add' | 'add_sticky';
    message?: AlertMessage;
    onRemove?: () => any;
    constructor(operation: 'clear' | 'add' | 'add_sticky', message?: AlertMessage, onRemove?: () => any);
}
export declare class AlertMessage {
    severity: MessageSeverity;
    summary: string;
    detail: string;
    constructor(severity: MessageSeverity, summary: string, detail: string);
}
export declare enum MessageSeverity {
    default = 0,
    info = 1,
    success = 2,
    error = 3,
    warn = 4,
    wait = 5
}
