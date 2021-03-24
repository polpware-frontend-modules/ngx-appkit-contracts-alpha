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
    static appVersion: string;
    static defaultLanguage: string;
    static defaultHomeUrl: string;
    static defaultThemeId: number;
    static defaultShowDashboardStatistics: boolean;
    static defaultShowDashboardNotifications: boolean;
    static defaultShowDashboardTodo: boolean;
    static defaultShowDashboardBanner: boolean;
}
