/**
 * @fileoverview added by tsickle
 * Generated from: lib/contracts/local-store-manager.service-contract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
 * @record
 */
export function ILocalStoreManagerContract() { }
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
export class StorageManagerConstants {
}
StorageManagerConstants.DBKEY_USER_DATA = 'user_data';
if (false) {
    /** @type {?} */
    StorageManagerConstants.DBKEY_USER_DATA;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLWNvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL2NvbnRyYWN0cy9sb2NhbC1zdG9yZS1tYW5hZ2VyLnNlcnZpY2UtY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsZ0RBbUNDOzs7OztJQWpDRyxxRkFBZ0M7Ozs7SUFFaEMsdUZBQWtDOzs7O0lBRWxDLHVFQUFrQjs7OztJQUVsQiwrRUFBMEI7Ozs7SUFFMUIsbUZBQThCOzs7O0lBRTlCLHlFQUFvQjs7Ozs7O0lBRXBCLGdGQUF3Qzs7Ozs7O0lBRXhDLHNGQUE4Qzs7Ozs7O0lBRTlDLGtGQUEwQzs7Ozs7SUFFMUMsbUZBQXNDOzs7OztJQUV0Qyx5RkFBNEM7Ozs7O0lBRTVDLHFGQUF3Qzs7Ozs7SUFFeEMsaUVBQW9COzs7OztJQUVwQixrRUFBcUI7Ozs7Ozs7SUFFckIsb0ZBQW1EOzs7OztJQUVuRCxxRUFBd0I7Ozs7SUFFeEIsb0VBQStCOztBQUduQyxNQUFNLE9BQU8sdUJBQXVCOztBQUNULHVDQUFlLEdBQUcsV0FBVyxDQUFDOzs7SUFBckQsd0NBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuKiBQcm92aWRlcyBhIHdyYXBwZXIgZm9yIGFjY2Vzc2luZyB0aGUgd2ViIHN0b3JhZ2UgQVBJIGFuZCBzeW5jaHJvbml6aW5nIHNlc3Npb24gc3RvcmFnZSBhY3Jvc3MgdGFicy93aW5kb3dzLlxuKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUxvY2FsU3RvcmVNYW5hZ2VyQ29udHJhY3Qge1xuXG4gICAgaW5pdGlhbGlzZVN0b3JhZ2VTeW5jTGlzdGVuZXIoKTtcblxuICAgIGRlaW5pdGlhbGlzZVN0b3JhZ2VTeW5jTGlzdGVuZXIoKTtcblxuICAgIGNsZWFyQWxsU3RvcmFnZSgpO1xuXG4gICAgY2xlYXJBbGxTZXNzaW9uc1N0b3JhZ2UoKTtcblxuICAgIGNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpO1xuXG4gICAgY2xlYXJMb2NhbFN0b3JhZ2UoKTtcblxuICAgIHNhdmVTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleTogc3RyaW5nKTtcblxuICAgIHNhdmVTeW5jZWRTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleTogc3RyaW5nKTtcblxuICAgIHNhdmVQZXJtYW5lbnREYXRhKGRhdGE6IGFueSwga2V5OiBzdHJpbmcpO1xuXG4gICAgbW92ZURhdGFUb1Nlc3Npb25TdG9yYWdlKGtleTogc3RyaW5nKTtcblxuICAgIG1vdmVEYXRhVG9TeW5jZWRTZXNzaW9uU3RvcmFnZShrZXk6IHN0cmluZyk7XG5cbiAgICBtb3ZlRGF0YVRvUGVybWFuZW50U3RvcmFnZShrZXk6IHN0cmluZyk7XG5cbiAgICBleGlzdHMoa2V5OiBzdHJpbmcpO1xuXG4gICAgZ2V0RGF0YShrZXk6IHN0cmluZyk7XG5cbiAgICBnZXREYXRhT2JqZWN0PFQ+KGtleTogc3RyaW5nLCBpc0RhdGVUeXBlOiBib29sZWFuKTtcblxuICAgIGRlbGV0ZURhdGEoa2V5OiBzdHJpbmcpO1xuXG4gICAgZ2V0SW5pdEV2ZW50KCk6IE9ic2VydmFibGU8e30+O1xufVxuXG5leHBvcnQgY2xhc3MgU3RvcmFnZU1hbmFnZXJDb25zdGFudHMge1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREJLRVlfVVNFUl9EQVRBID0gJ3VzZXJfZGF0YSc7XG59ICAgIFxuIl19