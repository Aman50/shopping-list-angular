import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, localId: string, idToken: string) => {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return (new AuthActions.AuthenticationSuccess(
            {
            email: email,
            localId:localId,
            idToken: idToken,
            expirationDate: expirationDate
            }
        ));
};

const handleError = (errorRes: any) => {
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
    return of(new AuthActions.AuthenticationFail(errorMessage));
};

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
                tap(res => {
                    this.authService.setTimer(+res.expiresIn * 1000);
                }),
                map(resp => {
                    return handleAuthentication(+resp.expiresIn, resp.email, resp.localId, resp.idToken);
                }),catchError(errorRes => {
               return handleError(errorRes);
                }))
            }));
        })

    navigateEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATION_SUCCESS),
            tap( resp => {
                this.router.navigate(['/']);
            })
        )
    }, {
        dispatch: false
    });

    signUpEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.START_SIGNUP),
            switchMap((action: AuthActions.StartSignup) => {
                return this.http.post<AuthResponse>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
                    {
                        email: action.payload.email,
                        password: action.payload.password,
                        returnSecureToken: true
                    },
                    {
                       params: new HttpParams().append('key', environment.firebaseAPIKey)
                    }
                ).pipe(
                    tap(res => {
                    this.authService.setTimer(+res.expiresIn * 1000);
                    }),
                    map(resp => {
                    return handleAuthentication(+resp.expiresIn, resp.email, resp.localId, resp.idToken);
                }), catchError(errorRes => {
                    return handleError(errorRes);
                }))
            }))
    });

    logOutEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(action => {
                this.authService.clearTimer();
                localStorage.removeItem('currentUser');
                this.router.navigate(['/auth']);
            })
        );
    }, {dispatch: false});

    AutoLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(action => {
                const userData = JSON.parse(localStorage.getItem('currentUser'));
                if (userData) {
                    const user = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
                    if (user.token) {
                        this.authService.setTimer(+userData.expiresIn * 1000);
                        return new AuthActions.AuthenticationSuccess(
                            {
                                email: userData.email,
                                localId: userData.id, 
                                idToken: userData._token,
                                expirationDate: new Date(userData._expirationDate)
                            }
                        );
                    }
                }
                return {type: 'DUMMY'};
            })
        );
    });

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}
}