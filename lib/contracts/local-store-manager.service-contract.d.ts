import { Observable } from 'rxjs';
/**
* Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
*/
export interface ILocalStoreManagerContract {
    initialiseStorageSyncListener(): any;
    deinitialiseStorageSyncListener(): any;
    clearAllStorage(): any;
    clearAllSessionsStorage(): any;
    clearInstanceSessionStorage(): any;
    clearLocalStorage(): any;
    saveSessionData(data: any, key: string): any;
    saveSyncedSessionData(data: any, key: string): any;
    savePermanentData(data: any, key: string): any;
    moveDataToSessionStorage(key: string): any;
    moveDataToSyncedSessionStorage(key: string): any;
    moveDataToPermanentStorage(key: string): any;
    exists(key: string): any;
    getData(key: string): any;
    getDataObject<T>(key: string, isDateType: boolean): any;
    deleteData(key: string): any;
    getInitEvent(): Observable<{}>;
}
export declare class StorageManagerConstants {
    static readonly DBKEY_USER_DATA = "user_data";
}
