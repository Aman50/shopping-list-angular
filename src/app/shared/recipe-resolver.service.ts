import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipe.service";
import { DataStorageService } from "./data-storage.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipe-book/store/recipes.actions';
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import { Actions, ofType } from "@ngrx/effects";
@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>,
        private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        // const recipes = this.recipeService.getRecipes();
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
        // return this.store.select('recipes').pipe(map(state => state.recipes));
        // if (recipes.length > 0) {
        //     return recipes;
        // } else {
        //     return this.dataStorageService.fetchRecipes();
        // }
    }
}