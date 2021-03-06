import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipe-book/store/recipes.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  isAuthenticated: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = false;

    this.userSubscription = this.store.select('auth').pipe(
      map(authData => authData.user)
      ).subscribe(user => {
        console.log("auth");
        this.isAuthenticated = user && user.token ? true : false;
    });

  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    // this.authService.logOut();
    console.log("onlogout");
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData(): void {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData(): void {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

}
