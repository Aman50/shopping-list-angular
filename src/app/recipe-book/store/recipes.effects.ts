import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";

import * as RecipesActions from './recipes.actions';

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


    constructor(private actions$: Actions, private http: HttpClient) {}
}