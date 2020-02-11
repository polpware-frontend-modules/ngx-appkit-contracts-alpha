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
export function UserConfiguration() { }
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
export function IConfigurationServiceContract() { }
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
export class ConfigurationServiceConstants {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLWNvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL2NvbnRyYWN0cy9jb25maWd1cmF0aW9uLnNlcnZpY2UtY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsdUNBUUM7OztJQVBHLHFDQUFpQjs7SUFDakIsb0NBQWdCOztJQUNoQixvQ0FBZ0I7O0lBQ2hCLG9EQUFpQzs7SUFDakMsdURBQW9DOztJQUNwQyw4Q0FBMkI7O0lBQzNCLGdEQUE2Qjs7Ozs7QUFHakMsbURBeUJDOzs7SUF2QkcsaURBQWlCOztJQUNqQixnREFBZ0I7O0lBQ2hCLGdEQUFnQjs7SUFDaEIsZ0VBQWlDOztJQUNqQyxtRUFBb0M7O0lBQ3BDLDBEQUEyQjs7SUFDM0IsNERBQTZCOztJQUc3QixnREFBZ0I7O0lBQ2hCLGlEQUFpQjs7SUFDakIsaURBQWlCOztJQUNqQix3REFBd0I7O0lBR3hCLCtEQUF1Qjs7Ozs7SUFFdkIsMEVBQTBCOzs7OztJQUUxQiw0RUFBNEI7Ozs7SUFFNUIsNEVBQW9COztBQUl4QixNQUFNLE9BQU8sNkJBQTZCOztBQUVmLHdDQUFVLEdBQVcsT0FBTyxDQUFDOztBQUc3Qiw2Q0FBZSxHQUFXLElBQUksQ0FBQztBQUMvQiw0Q0FBYyxHQUFXLEdBQUcsQ0FBQztBQUM3Qiw0Q0FBYyxHQUFXLENBQUMsQ0FBQztBQUMzQiw0REFBOEIsR0FBWSxJQUFJLENBQUM7QUFDL0MsK0RBQWlDLEdBQVksSUFBSSxDQUFDO0FBQ2xELHNEQUF3QixHQUFZLEtBQUssQ0FBQztBQUMxQyx3REFBMEIsR0FBWSxJQUFJLENBQUM7OztJQVRsRSx5Q0FBb0Q7O0lBR3BELDhDQUFzRDs7SUFDdEQsNkNBQW9EOztJQUNwRCw2Q0FBa0Q7O0lBQ2xELDZEQUFzRTs7SUFDdEUsZ0VBQXlFOztJQUN6RSx1REFBaUU7O0lBQ2pFLHlEQUFrRSIsInNvdXJjZXNDb250ZW50IjpbIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBFbWFpbDogaW5mb0BlYmVubW9ubmV5LmNvbVxuLy8gd3d3LmViZW5tb25uZXkuY29tL3RlbXBsYXRlc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyQ29uZmlndXJhdGlvbiB7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgICBob21lVXJsOiBzdHJpbmc7XG4gICAgdGhlbWVJZDogbnVtYmVyO1xuICAgIHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmRUb2RvOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmRCYW5uZXI6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25TZXJ2aWNlQ29udHJhY3Qge1xuXG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgICB0aGVtZUlkOiBudW1iZXI7XG4gICAgaG9tZVVybDogc3RyaW5nO1xuICAgIHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmRUb2RvOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmRCYW5uZXI6IGJvb2xlYW47XG5cblxuICAgIGJhc2VVcmw6IHN0cmluZztcbiAgICB0b2tlblVybDogc3RyaW5nO1xuICAgIGxvZ2luVXJsOiBzdHJpbmc7XG4gICAgZmFsbGJhY2tCYXNlVXJsOiBzdHJpbmc7XG4gICAgLy8gKioqRW5kIG9mIGRlZmF1bHRzKioqXG5cbiAgICBjb25maWd1cmF0aW9uSW1wb3J0ZWQkO1xuXG4gICAgaW1wb3J0KGpzb25WYWx1ZTogc3RyaW5nKTtcblxuICAgIGV4cG9ydChjaGFuZ2VzT25seSk6IHN0cmluZztcblxuICAgIGNsZWFyTG9jYWxDaGFuZ2VzKCk7XG5cbn1cblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYXBwVmVyc2lvbjogc3RyaW5nID0gJzMuMS4wJztcblxuICAgIC8vICoqKlNwZWNpZnkgZGVmYXVsdCBjb25maWd1cmF0aW9ucyBoZXJlKioqXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkZWZhdWx0TGFuZ3VhZ2U6IHN0cmluZyA9ICdlbic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkZWZhdWx0SG9tZVVybDogc3RyaW5nID0gJy8nO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdFRoZW1lSWQ6IG51bWJlciA9IDE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkZWZhdWx0U2hvd0Rhc2hib2FyZFN0YXRpc3RpY3M6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdFNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRTaG93RGFzaGJvYXJkVG9kbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdFNob3dEYXNoYm9hcmRCYW5uZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG59XG4iXX0=