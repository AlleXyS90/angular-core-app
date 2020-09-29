import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import {userReducer, UserState} from './user/user.reducer';

export interface AppState {
  authState: AuthState;
  userState: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  userState: userReducer
};
