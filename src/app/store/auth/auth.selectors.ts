import { AppState } from '../index';
import { createSelector } from '@ngrx/store';

export const selectAuthState = (state: AppState) => state.authState;
export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectUserState = createSelector(selectAuthState, (state) => state.userEntity);
export const selectUserProfile = createSelector(selectAuthState, (state) => state.userProfile);
export const selectAuthenticationStatus = createSelector(selectAuthState, (state) => state.isAuthenticated);
