import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { ErrorModalComponent } from "../shared/error-modal/error-modal.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
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
    private storeSubscription;

    @ViewChild(PlaceholderDirective)
    appPlace: PlaceholderDirective;


    constructor(
         private componentFactoryResolver: ComponentFactoryResolver,
         private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.isLoginMode = false;
        this.isLoading = false;
        this.error = undefined;
        this.authForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.storeSubscription = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.isLoading;
            this.error = authState.error;
            if (this.error) {
                this.showErrorModal(this.error);
            }
        })
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if (this.storeSubscription) {
            this.storeSubscription.unsubscribe();
        }
    }

    switchMode(): void{
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmitForm(): void {
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;
        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.StartLogin({email, password}));
        } else {
            this.store.dispatch(new AuthActions.StartSignup({email, password}));
        }
        this.authForm.reset();
    }

    onHandleError() {
        // this.error = null;
        this.store.dispatch(new AuthActions.ClearError());
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
            this.onHandleError();
            viewContRef.clear();
        });
    }

}