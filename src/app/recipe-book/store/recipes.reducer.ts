import { act } from "@ngrx/effects";
import { Recipe } from "../recipe.model";
import * as RecipesAction from './recipes.actions';


export interface State{
    recipes: Recipe[];
}

export const initialState: State = {
    recipes: []
}


export function RecipesReducer(state = initialState, action: RecipesAction.RecipesAction) {
    switch (action.type) {
        case RecipesAction.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipesAction.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipesAction.UPDATE_RECIPE:
            const recipes = [...state.recipes];
            recipes[action.payload.recipeIndex] = {...action.payload.recipe};
            return {
                ...state,
                recipes: recipes
            };
        case RecipesAction.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => index !== action.payload)
            };
        default:
            return state;
    }
}