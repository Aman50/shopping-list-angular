import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-shopping-f70c4-default-rtdb.firebaseio.com/recipes.json',
        recipes
        ).subscribe(response => {
            // console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-recipe-shopping-f70c4-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}