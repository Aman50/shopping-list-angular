import { User } from "../user.model";
import * as AuthActions from './auth.actions';
export interface State {
    user: User;
    isLoading: boolean;
    error: string;
}

export const initialState: State = {
    user: null,
    isLoading: false,
    error: null
}

export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(action.payload.email, action.payload.localId, action.payload.idToken, action.payload.expirationDate);
            return {
                ...state,
                user,
                isLoading: false,
                error: null
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.START_LOGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case AuthActions.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}