import { Observable } from 'rxjs';
export interface ITranslationServiceContract {
    languageChanged$: Observable<string>;
    addLanguages(lang: string[]): any;
    setDefaultLanguage(lang: string): any;
    getDefaultLanguage(): any;
    getBrowserLanguage(): any;
    getCurrentLanguage(): any;
    getLoadedLanguages(): any;
    useBrowserLanguage(): string | void;
    useDefaultLangage(): any;
    changeLanguage(language: string): any;
    getTranslation(key: string | Array<string>, interpolateParams?: Object): string | any;
    getTranslationAsync(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
}
