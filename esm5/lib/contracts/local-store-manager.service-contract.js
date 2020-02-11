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
var StorageManagerConstants = /** @class */ (function () {
    function StorageManagerConstants() {
    }
    StorageManagerConstants.DBKEY_USER_DATA = 'user_data';
    return StorageManagerConstants;
}());
export { StorageManagerConstants };
if (false) {
    /** @type {?} */
    StorageManagerConstants.DBKEY_USER_DATA;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLWNvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL2NvbnRyYWN0cy9sb2NhbC1zdG9yZS1tYW5hZ2VyLnNlcnZpY2UtY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsZ0RBbUNDOzs7OztJQWpDRyxxRkFBZ0M7Ozs7SUFFaEMsdUZBQWtDOzs7O0lBRWxDLHVFQUFrQjs7OztJQUVsQiwrRUFBMEI7Ozs7SUFFMUIsbUZBQThCOzs7O0lBRTlCLHlFQUFvQjs7Ozs7O0lBRXBCLGdGQUF3Qzs7Ozs7O0lBRXhDLHNGQUE4Qzs7Ozs7O0lBRTlDLGtGQUEwQzs7Ozs7SUFFMUMsbUZBQXNDOzs7OztJQUV0Qyx5RkFBNEM7Ozs7O0lBRTVDLHFGQUF3Qzs7Ozs7SUFFeEMsaUVBQW9COzs7OztJQUVwQixrRUFBcUI7Ozs7Ozs7SUFFckIsb0ZBQW1EOzs7OztJQUVuRCxxRUFBd0I7Ozs7SUFFeEIsb0VBQStCOztBQUduQztJQUFBO0lBRUEsQ0FBQztJQUQwQix1Q0FBZSxHQUFHLFdBQVcsQ0FBQztJQUN6RCw4QkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLHVCQUF1Qjs7O0lBQ2hDLHdDQUFxRCIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiogUHJvdmlkZXMgYSB3cmFwcGVyIGZvciBhY2Nlc3NpbmcgdGhlIHdlYiBzdG9yYWdlIEFQSSBhbmQgc3luY2hyb25pemluZyBzZXNzaW9uIHN0b3JhZ2UgYWNyb3NzIHRhYnMvd2luZG93cy5cbiovXG5leHBvcnQgaW50ZXJmYWNlIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0IHtcblxuICAgIGluaXRpYWxpc2VTdG9yYWdlU3luY0xpc3RlbmVyKCk7XG5cbiAgICBkZWluaXRpYWxpc2VTdG9yYWdlU3luY0xpc3RlbmVyKCk7XG5cbiAgICBjbGVhckFsbFN0b3JhZ2UoKTtcblxuICAgIGNsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlKCk7XG5cbiAgICBjbGVhckluc3RhbmNlU2Vzc2lvblN0b3JhZ2UoKTtcblxuICAgIGNsZWFyTG9jYWxTdG9yYWdlKCk7XG5cbiAgICBzYXZlU2Vzc2lvbkRhdGEoZGF0YTogYW55LCBrZXk6IHN0cmluZyk7XG5cbiAgICBzYXZlU3luY2VkU2Vzc2lvbkRhdGEoZGF0YTogYW55LCBrZXk6IHN0cmluZyk7XG5cbiAgICBzYXZlUGVybWFuZW50RGF0YShkYXRhOiBhbnksIGtleTogc3RyaW5nKTtcblxuICAgIG1vdmVEYXRhVG9TZXNzaW9uU3RvcmFnZShrZXk6IHN0cmluZyk7XG5cbiAgICBtb3ZlRGF0YVRvU3luY2VkU2Vzc2lvblN0b3JhZ2Uoa2V5OiBzdHJpbmcpO1xuXG4gICAgbW92ZURhdGFUb1Blcm1hbmVudFN0b3JhZ2Uoa2V5OiBzdHJpbmcpO1xuXG4gICAgZXhpc3RzKGtleTogc3RyaW5nKTtcblxuICAgIGdldERhdGEoa2V5OiBzdHJpbmcpO1xuXG4gICAgZ2V0RGF0YU9iamVjdDxUPihrZXk6IHN0cmluZywgaXNEYXRlVHlwZTogYm9vbGVhbik7XG5cbiAgICBkZWxldGVEYXRhKGtleTogc3RyaW5nKTtcblxuICAgIGdldEluaXRFdmVudCgpOiBPYnNlcnZhYmxlPHt9Pjtcbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERCS0VZX1VTRVJfREFUQSA9ICd1c2VyX2RhdGEnO1xufSAgICBcbiJdfQ==