import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DBkeys {
}
DBkeys.CURRENT_USER = 'current_user';
DBkeys.USER_PERMISSIONS = 'user_permissions';
DBkeys.ACCESS_TOKEN = 'access_token';
DBkeys.REFRESH_TOKEN = 'refresh_token';
DBkeys.TOKEN_EXPIRES_IN = 'expires_in';
DBkeys.REMEMBER_ME = 'remember_me';
DBkeys.LANGUAGE = 'language';
DBkeys.HOME_URL = 'home_url';
DBkeys.THEME_ID = 'themeId';
DBkeys.SHOW_DASHBOARD_STATISTICS = 'show_dashboard_statistics';
DBkeys.SHOW_DASHBOARD_NOTIFICATIONS = 'show_dashboard_notifications';
DBkeys.SHOW_DASHBOARD_TODO = 'show_dashboard_todo';
DBkeys.SHOW_DASHBOARD_BANNER = 'show_dashboard_banner';
/** @nocollapse */ DBkeys.ɵfac = function DBkeys_Factory(t) { return new (t || DBkeys)(); };
/** @nocollapse */ DBkeys.ɵprov = i0.ɵɵdefineInjectable({ token: DBkeys, factory: DBkeys.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DBkeys, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIta2V5cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kYi1rZXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxNQUFNOztBQUVRLG1CQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLHVCQUFnQixHQUFHLGtCQUFrQixDQUFDO0FBQ3RDLG1CQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLG9CQUFhLEdBQUcsZUFBZSxDQUFDO0FBQ2hDLHVCQUFnQixHQUFHLFlBQVksQ0FBQztBQUVoQyxrQkFBVyxHQUFHLGFBQWEsQ0FBQztBQUU1QixlQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3RCLGVBQVEsR0FBRyxVQUFVLENBQUM7QUFDdEIsZUFBUSxHQUFHLFNBQVMsQ0FBQztBQUNyQixnQ0FBeUIsR0FBRywyQkFBMkIsQ0FBQztBQUN4RCxtQ0FBNEIsR0FBRyw4QkFBOEIsQ0FBQztBQUM5RCwwQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztBQUM1Qyw0QkFBcUIsR0FBRyx1QkFBdUIsQ0FBQzsrRUFoQjlELE1BQU07aUVBQU4sTUFBTSxXQUFOLE1BQU0sbUJBRkgsTUFBTTtrREFFVCxNQUFNO2NBSGxCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEQmtleXMge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDVVJSRU5UX1VTRVIgPSAnY3VycmVudF91c2VyJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFVTRVJfUEVSTUlTU0lPTlMgPSAndXNlcl9wZXJtaXNzaW9ucyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBQ0NFU1NfVE9LRU4gPSAnYWNjZXNzX3Rva2VuJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJFRlJFU0hfVE9LRU4gPSAncmVmcmVzaF90b2tlbic7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBUT0tFTl9FWFBJUkVTX0lOID0gJ2V4cGlyZXNfaW4nO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSRU1FTUJFUl9NRSA9ICdyZW1lbWJlcl9tZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExBTkdVQUdFID0gJ2xhbmd1YWdlJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEhPTUVfVVJMID0gJ2hvbWVfdXJsJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRIRU1FX0lEID0gJ3RoZW1lSWQnO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU0hPV19EQVNIQk9BUkRfU1RBVElTVElDUyA9ICdzaG93X2Rhc2hib2FyZF9zdGF0aXN0aWNzJztcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNIT1dfREFTSEJPQVJEX05PVElGSUNBVElPTlMgPSAnc2hvd19kYXNoYm9hcmRfbm90aWZpY2F0aW9ucyc7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTSE9XX0RBU0hCT0FSRF9UT0RPID0gJ3Nob3dfZGFzaGJvYXJkX3RvZG8nO1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU0hPV19EQVNIQk9BUkRfQkFOTkVSID0gJ3Nob3dfZGFzaGJvYXJkX2Jhbm5lcic7XG59XG4iXX0=