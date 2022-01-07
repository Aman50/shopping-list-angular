import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of, pipe } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../auth.service";
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

    loginEffect = createEffect(() => {
        return this.actions$.pipe(
        ofType(AuthActions.START_LOGIN),
        switchMap((authData: AuthActions.StartLogin) => {
            return this.http.post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            },
            {
                params: new HttpParams().append('key', environment.firebaseAPIKey)
            }
            ).pipe(
                map(responseData => {
                const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
                return (new AuthActions.Login(
                    {
                    email: responseData.email,
                    localId: responseData.localId,
                    idToken: responseData.idToken,
                    expirationDate: expirationDate
                    }
                ));
            }),catchError(errorRes => {
                let errorMessage = 'An unexpected error occurred.';
                if (errorRes && errorRes.error && errorRes.error.error) {
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMessage = 'Email already exists!';
                            break;
                        case 'INVALID_PASSWORD':
                            errorMessage = 'Email or Password is incorrect';
                            break;
                        case 'EMAIL_NOT_FOUND':
                            errorMessage = 'Email or Password is incorrect';
                            break;
                    }
                }
                return of(new AuthActions.LoginFailed(errorMessage));
            }))
        })
    )
    });

    navigateEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN),
            tap( resp => {
                this.router.navigate(['/']);
            })
        )
    }, {
        dispatch: false
    })

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}