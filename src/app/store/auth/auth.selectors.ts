import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const selectAuthState = (state: AppState) => state.authState;
export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectAuthenticationStatus = createSelector(selectAuthState, (state) => state.isAuthenticated);
