import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  emitRecipes: Subject<Recipe[]> = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    
    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.emitRecipes.next(this.recipes.slice());
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
        this.shoppingListService.addIngredients(ingredients);
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