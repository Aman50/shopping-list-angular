import { Action } from "@ngrx/store";

export const START_LOGIN = '[Auth] Start Login';
export const LOGIN_FAILED = '[Auth] Login Failed.';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {
        email: string;
        localId: string;
        idToken: string;
        expirationDate: Date
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class StartLogin implements Action {
    readonly type  = START_LOGIN;
    constructor(public payload: {email: string, password: string}) {}
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public payload: string) {}
}

export type AuthActions = Login | Logout | StartLogin | LoginFailed;