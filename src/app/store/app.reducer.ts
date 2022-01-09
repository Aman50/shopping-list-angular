import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipe-book/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.state,
    auth: fromAuth.State,
    recipes: fromRecipes.State
}

export const AppActionReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.AuthReducer,
    recipes: fromRecipes.RecipesReducer
}