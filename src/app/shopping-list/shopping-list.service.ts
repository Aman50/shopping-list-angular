import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
@Injectable()
export class ShoppingListService {

    constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}
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
        this.store.dispatch(new ShoppingListActions.UpdateIngredient({
            ingredient: ingredient,
            index: index
        }));
        // this.ingredients[index] = ingredient;
        // this.emitIngredients.next(this.ingredients.slice());
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