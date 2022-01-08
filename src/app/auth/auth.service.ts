import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Injectable()
export class AuthService {

    // user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    logoutTimer: any;

    constructor(private store: Store<fromApp.AppState>) {}


    setTimer(expirationDuration: number) {
        this.logoutTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }

    clearTimer() {
        if (this.logoutTimer) {
            this.logoutTimer = null;
        }
    }
}