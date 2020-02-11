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
export { ConfigurationServiceConstants };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLWNvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL2NvbnRyYWN0cy9jb25maWd1cmF0aW9uLnNlcnZpY2UtY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsdUNBUUM7OztJQVBHLHFDQUFpQjs7SUFDakIsb0NBQWdCOztJQUNoQixvQ0FBZ0I7O0lBQ2hCLG9EQUFpQzs7SUFDakMsdURBQW9DOztJQUNwQyw4Q0FBMkI7O0lBQzNCLGdEQUE2Qjs7Ozs7QUFHakMsbURBeUJDOzs7SUF2QkcsaURBQWlCOztJQUNqQixnREFBZ0I7O0lBQ2hCLGdEQUFnQjs7SUFDaEIsZ0VBQWlDOztJQUNqQyxtRUFBb0M7O0lBQ3BDLDBEQUEyQjs7SUFDM0IsNERBQTZCOztJQUc3QixnREFBZ0I7O0lBQ2hCLGlEQUFpQjs7SUFDakIsaURBQWlCOztJQUNqQix3REFBd0I7O0lBR3hCLCtEQUF1Qjs7Ozs7SUFFdkIsMEVBQTBCOzs7OztJQUUxQiw0RUFBNEI7Ozs7SUFFNUIsNEVBQW9COztBQUl4QjtJQUFBO0lBYUEsQ0FBQztJQVgwQix3Q0FBVSxHQUFXLE9BQU8sQ0FBQzs7SUFHN0IsNkNBQWUsR0FBVyxJQUFJLENBQUM7SUFDL0IsNENBQWMsR0FBVyxHQUFHLENBQUM7SUFDN0IsNENBQWMsR0FBVyxDQUFDLENBQUM7SUFDM0IsNERBQThCLEdBQVksSUFBSSxDQUFDO0lBQy9DLCtEQUFpQyxHQUFZLElBQUksQ0FBQztJQUNsRCxzREFBd0IsR0FBWSxLQUFLLENBQUM7SUFDMUMsd0RBQTBCLEdBQVksSUFBSSxDQUFDO0lBRXRFLG9DQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksNkJBQTZCOzs7SUFFdEMseUNBQW9EOztJQUdwRCw4Q0FBc0Q7O0lBQ3RELDZDQUFvRDs7SUFDcEQsNkNBQWtEOztJQUNsRCw2REFBc0U7O0lBQ3RFLGdFQUF5RTs7SUFDekUsdURBQWlFOztJQUNqRSx5REFBa0UiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRW1haWw6IGluZm9AZWJlbm1vbm5leS5jb21cbi8vIHd3dy5lYmVubW9ubmV5LmNvbS90ZW1wbGF0ZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckNvbmZpZ3VyYXRpb24ge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG4gICAgaG9tZVVybDogc3RyaW5nO1xuICAgIHRoZW1lSWQ6IG51bWJlcjtcbiAgICBzaG93RGFzaGJvYXJkU3RhdGlzdGljczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkVG9kbzogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkQmFubmVyOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uU2VydmljZUNvbnRyYWN0IHtcblxuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG4gICAgdGhlbWVJZDogbnVtYmVyO1xuICAgIGhvbWVVcmw6IHN0cmluZztcbiAgICBzaG93RGFzaGJvYXJkU3RhdGlzdGljczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkVG9kbzogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkQmFubmVyOiBib29sZWFuO1xuXG5cbiAgICBiYXNlVXJsOiBzdHJpbmc7XG4gICAgdG9rZW5Vcmw6IHN0cmluZztcbiAgICBsb2dpblVybDogc3RyaW5nO1xuICAgIGZhbGxiYWNrQmFzZVVybDogc3RyaW5nO1xuICAgIC8vICoqKkVuZCBvZiBkZWZhdWx0cyoqKlxuXG4gICAgY29uZmlndXJhdGlvbkltcG9ydGVkJDtcblxuICAgIGltcG9ydChqc29uVmFsdWU6IHN0cmluZyk7XG5cbiAgICBleHBvcnQoY2hhbmdlc09ubHkpOiBzdHJpbmc7XG5cbiAgICBjbGVhckxvY2FsQ2hhbmdlcygpO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGFwcFZlcnNpb246IHN0cmluZyA9ICczLjEuMCc7XG5cbiAgICAvLyAqKipTcGVjaWZ5IGRlZmF1bHQgY29uZmlndXJhdGlvbnMgaGVyZSoqKlxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdExhbmd1YWdlOiBzdHJpbmcgPSAnZW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdEhvbWVVcmw6IHN0cmluZyA9ICcvJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRUaGVtZUlkOiBudW1iZXIgPSAxO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdFNob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRTaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkZWZhdWx0U2hvd0Rhc2hib2FyZFRvZG86IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRTaG93RGFzaGJvYXJkQmFubmVyOiBib29sZWFuID0gdHJ1ZTtcblxufVxuIl19