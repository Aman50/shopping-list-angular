import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {

    user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    logoutTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
               params: new HttpParams().append('key', 'AIzaSyCbAjwa4RwHRytAGqb45Jr12AyOC2YReGc')
            }
        ).pipe(catchError(this.handleError), tap(resp => {
            this.authenticateUser(email, resp.localId, resp.idToken, +resp.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: new HttpParams().append('key', 'AIzaSyCbAjwa4RwHRytAGqb45Jr12AyOC2YReGc')
            }
        ).pipe(catchError(this.handleError), tap(resp => {
            this.authenticateUser(email, resp.localId, resp.idToken, +resp.expiresIn);
        }));
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        if (userData) {
            const user = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
            if (user.token) {
                this.user.next(user);
                const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        }
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('currentUser');
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }
        this.logoutTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.logoutTimer = setTimeout(() => {
            this.logOut()
        }, expirationDuration);
    }

    private authenticateUser(email: string, localId: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }

    private handleError(errorRes: HttpErrorResponse) {
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
        return throwError(errorMessage);
    }
}