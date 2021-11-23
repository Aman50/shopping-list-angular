import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
    ingredients: Array<Ingredient> = [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 10),
    ];

    emitIngredients: Subject<Array<Ingredient>> = new Subject<Array<Ingredient>>();
    emitEditItemIndex: Subject<number> = new Subject<number>();

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.emitIngredients.next(this.getIngredients());
    }

    updateIngredient(ingredient: Ingredient, index: number) {
        this.ingredients[index] = ingredient;
        this.emitIngredients.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.emitIngredients.next(this.getIngredients());
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.emitIngredients.next(this.getIngredients());
    }
}