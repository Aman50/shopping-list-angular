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

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.emitIngredients.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.emitIngredients.next(this.getIngredients());
    }
}