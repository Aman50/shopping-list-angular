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
            }
        default:
            return state;
    }
}