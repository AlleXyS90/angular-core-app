import {createSelector} from '@ngrx/store';
import {AppState} from '../index';

export const selectUserState = (state: AppState) => state.userState;
export const selectUserProfile = createSelector(selectUserState, (state) => state.userProfile);
