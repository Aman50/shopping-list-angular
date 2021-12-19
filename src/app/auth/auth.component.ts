import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { ErrorModalComponent } from "../shared/error-modal/error-modal.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
    'selector': 'app-auth',
    'templateUrl': './auth.component.html',
    'styleUrls': ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean;
    authForm: FormGroup;
    isLoading: boolean;
    error: string;
    closeSub: Subscription;

    @ViewChild(PlaceholderDirective)
    appPlace: PlaceholderDirective;


    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit(): void {
        this.isLoginMode = false;
        this.isLoading = false;
        this.error = undefined;
        this.authForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
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
            this.showErrorModal(error);
        });
        this.authForm.reset();
    }

    onHandleError() {
        this.error = null;
    }

    showErrorModal(message: string) {
        // const modalCom = new ErrorModalComponent();
        const modalComFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorModalComponent);
        
        const viewContRef = this.appPlace.viewContainerRef;
        viewContRef.clear();
        const componentRef = viewContRef.createComponent(modalComFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            this.error = null;
            viewContRef.clear();
        });
    }

}