import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
    'selector': 'app-auth',
    'templateUrl': './auth.component.html',
    'styleUrls': ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean;
    authForm: FormGroup;
    isLoading: boolean;
    error: string;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.isLoginMode = false;
        this.isLoading = false;
        this.error = undefined;
        this.authForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    switchMode(): void{
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmitForm(): void {
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;
        this.isLoading = true;
        this.error = undefined;
        let callObs: Observable<AuthResponse>;
        if (this.isLoginMode) {
            callObs = this.authService.login(email, password);
        } else {
            callObs = this.authService.signUp(email, password);
        }
        callObs.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['/recipe-book']);
        }, error => {
            this.error = error;
            this.isLoading = false;
        });
        this.authForm.reset();
    }

}