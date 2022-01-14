import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from './recipes.actions';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipesEffects {
    fetchRecipeEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(action => {
                return this.http.get<Recipe[]>('https://ng-recipe-shopping-f70c4-default-rtdb.firebaseio.com/recipes.json')
                .pipe(map(recipes => {
                        return recipes.map(recipe => {
                            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                        });
                }), map(recipes => {
                    return new RecipesActions.SetRecipes(recipes);
                }));
            }))});

    storeRecipesEffect = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http.put('https://ng-recipe-shopping-f70c4-default-rtdb.firebaseio.com/recipes.json',
                recipesState.recipes)
            })
        )
    }, {
        dispatch: false
    });


    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}