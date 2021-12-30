import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.state,
    auth: fromAuth.State
}

export const AppActionReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.AuthReducer
}