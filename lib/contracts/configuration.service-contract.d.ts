export interface UserConfiguration {
    language: string;
    homeUrl: string;
    themeId: number;
    showDashboardStatistics: boolean;
    showDashboardNotifications: boolean;
    showDashboardTodo: boolean;
    showDashboardBanner: boolean;
}
export interface IConfigurationServiceContract {
    language: string;
    themeId: number;
    homeUrl: string;
    showDashboardStatistics: boolean;
    showDashboardNotifications: boolean;
    showDashboardTodo: boolean;
    showDashboardBanner: boolean;
    baseUrl: string;
    tokenUrl: string;
    loginUrl: string;
    fallbackBaseUrl: string;
    configurationImported$: any;
    import(jsonValue: string): any;
    export(changesOnly: any): string;
    clearLocalChanges(): any;
}
export declare class ConfigurationServiceConstants {
    static readonly appVersion: string;
    static readonly defaultLanguage: string;
    static readonly defaultHomeUrl: string;
    static readonly defaultThemeId: number;
    static readonly defaultShowDashboardStatistics: boolean;
    static readonly defaultShowDashboardNotifications: boolean;
    static readonly defaultShowDashboardTodo: boolean;
    static readonly defaultShowDashboardBanner: boolean;
}
