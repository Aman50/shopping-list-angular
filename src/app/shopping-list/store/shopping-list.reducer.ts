import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 10),
    ]
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const newIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredientArray = [...state.ingredients];
            ingredientArray[action.payload.index] = newIngredient;
            return {
                ...state,
                ingredients: ingredientArray
            };
            // Embraces Immutability, creation of new objects, never modify old object and its properties.
        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => {
                    return action.payload !== index;
                })
            };
        default:
            console.log(action);
            return state;
    }

}