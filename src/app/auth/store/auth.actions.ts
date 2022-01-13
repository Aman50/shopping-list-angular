import { Action } from "@ngrx/store";

export const START_LOGIN = '[Auth] Start Login';
export const AUTHENTICATION_FAIL = '[Auth] Authenticaion Failed.';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success.';
export const START_SIGNUP = '[Auth] Start Signup';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticationSuccess implements Action {
    readonly type = AUTHENTICATION_SUCCESS;
    constructor(public payload: {
        email: string;
        localId: string;
        idToken: string;
        expirationDate: Date,
        redirect: boolean
    }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class StartLogin implements Action {
    readonly type  = START_LOGIN;
    constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticationFail implements Action {
    readonly type = AUTHENTICATION_FAIL;
    constructor(public payload: string) {}
}

export class StartSignup implements Action {
    readonly type = START_SIGNUP;
    constructor(public payload: {email: string, password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthenticationSuccess | Logout | StartLogin | AuthenticationFail | StartSignup | ClearError | AutoLogin;