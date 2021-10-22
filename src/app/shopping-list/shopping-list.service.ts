import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
    ingredients: Array<Ingredient> = [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 10),
    ];

    emitIngredients: EventEmitter<Array<Ingredient>> = new EventEmitter<Array<Ingredient>>();

    getIngredients(): Array<Ingredient> {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.emitIngredients.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.emitIngredients.emit(this.getIngredients());
    }
}