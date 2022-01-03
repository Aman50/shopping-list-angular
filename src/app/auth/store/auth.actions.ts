import { importExpr } from "@angular/compiler/src/output/output_ast";
import { Action } from "@ngrx/store";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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

export type AuthActions = Login | Logout;