import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from './store/recipes.actions';
@Injectable()
export class RecipeService {

  emitRecipes: Subject<Recipe[]> = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    
    constructor(private store: Store<fromApp.AppState> ) {}

    setRecipes(recipes: Recipe[]) {
      this.store.dispatch(new RecipesAction.SetRecipes(recipes));
      // this.recipes = recipes;
      // this.emitRecipes.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
      return this.recipes.slice(index, index + 1)[0];
    }

    fetchRecipeWithId(id: number) {
      return JSON.parse(JSON.stringify(this.recipes[id]));
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
        // this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.emitRecipes.next(this.recipes.slice());
    }

    updateRecipe(recipeIndex: number, recipe: Recipe) {
      this.recipes[recipeIndex] = recipe;
      this.emitRecipes.next(this.recipes.slice());
    }

    deleteRecipe(recipeIndex: number) {
      this.recipes.splice(recipeIndex, 1);
      this.emitRecipes.next(this.recipes.slice());
    }

}