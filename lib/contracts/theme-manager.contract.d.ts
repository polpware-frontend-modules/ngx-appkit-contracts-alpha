import { AppTheme } from '../models/app-theme.model';
export interface IThemeManagerContract {
    themes: Array<AppTheme>;
    installTheme(theme?: AppTheme): any;
    getDefaultTheme(): AppTheme;
    getThemeByID(id: number): AppTheme;
}
