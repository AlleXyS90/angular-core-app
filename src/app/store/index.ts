import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface AppState {
  authState: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authState: authReducer
};
