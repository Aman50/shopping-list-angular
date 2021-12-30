import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

const initialState: state = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 10),
    ],
    editIngredient: null,
    editIngredientIndex: -1
}

export interface state {
    ingredients: Ingredient[];
    editIngredient: Ingredient;
    editIngredientIndex: number;
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
            const ingredient = state.ingredients[state.editIngredientIndex];
            const newIngredient = {
                ...ingredient,
                ...action.payload
            };
            const ingredientArray = [...state.ingredients];
            ingredientArray[state.editIngredientIndex] = newIngredient;
            return {
                ...state,
                ingredients: ingredientArray,
                editIngredient: null,
                editIngredientIndex: -1
            };
            // Embraces Immutability, creation of new objects, never modify old object and its properties.
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, index) => {
                    return state.editIngredientIndex !== index;
                }),
                editIngredient: null,
                editIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editIngredient: {...state.ingredients[action.payload]},
                editIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editIngredient: null,
                editIngredientIndex: -1
            };
        default:
            console.log(action);
            return state;
    }

}