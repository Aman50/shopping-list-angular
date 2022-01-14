import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Recipe } from "../recipe-book/recipe.model";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipe-book/store/recipes.actions';
import { Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs/operators";
import { Actions, ofType } from "@ngrx/effects";
@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {

        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => recipeState.recipes),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                }
            })
        );
        // const recipes = this.recipeService.getRecipes();
        // return this.store.select('recipes').pipe(map(state => state.recipes));
        // if (recipes.length > 0) {
        //     return recipes;
        // } else {
        //     return this.dataStorageService.fetchRecipes();
        // }
    }
}