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
        case AuthActions.AUTHENTICATION_SUCCESS:
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
        case AuthActions.START_SIGNUP:
            return {
                ...state,
                isLoading: true
            };
        case AuthActions.AUTHENTICATION_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case AuthActions.CLEAR_ERROR:
            return {
                    ...state,
                    error: null
            }
        default:
            return state;
    }
}