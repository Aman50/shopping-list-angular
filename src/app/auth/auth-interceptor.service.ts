import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(authData => authData.user),
            exhaustMap(user => {
            if (user) {
                const newReq = req.clone({
                    'params': new HttpParams().append('auth', user.token)
                });
                return next.handle(newReq);
            } else {
                return next.handle(req);
            }
        }));
    }
}