import {Action} from '@ngrx/store';
import {User} from '../../_core/models/user';
import {NewPassword} from '../../_core/models/new-password';

export enum UserActionTypes {
  GET_ME = '[Auth] Get me',
  GET_ME_SUCCESS = '[Auth] Get me success',
  GET_ME_FAILED = '[Auth] Get me failed',
  UPDATE_PROFILE = '[Users] Update profile',
  UPDATE_PROFILE_SUCCESS = '[Users] Update profile success',
  UPDATE_PROFILE_FAILED = '[Users] Update profile failed',
  DELETE_USER = '[Users] Delete user',
  DELETE_USER_SUCCESS = '[Users] Delete user success',
  DELETE_USER_FAILED = '[Users] Delete user failed',
  CHANGE_PASSWORD = '[Users] Change password',
  CHANGE_PASSWORD_SUCCESS = '[Users] Change password success',
  CHANGE_PASSWORD_FAILED = '[Users] Change password failed',
  RESET_STORE = '[Users] Reset store'
}


export class GetMeAction implements Action {
  readonly type = UserActionTypes.GET_ME;
}

export class GetMeSuccessAction implements Action {
  readonly type = UserActionTypes.GET_ME_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetMeFailedAction implements Action {
  readonly type = UserActionTypes.GET_ME_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateProfileAction implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE;

  constructor(public payload: User) {
  }
}

export class UpdateProfileSuccessAction implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateProfileFailedAction implements Action {
  readonly type = UserActionTypes.UPDATE_PROFILE_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteUserAction implements Action {
  readonly type = UserActionTypes.DELETE_USER;

  constructor(public payload: number) {
  }
}

export class DeleteUserSuccessAction implements Action {
  readonly type = UserActionTypes.DELETE_USER_SUCCESS;
}

export class DeleteUserFailedAction implements Action {
  readonly type = UserActionTypes.DELETE_USER_FAILED;

  constructor(public payload: string) {
  }
}

export class ChangePasswordAction implements Action {
  readonly type = UserActionTypes.CHANGE_PASSWORD;

  constructor(public payload: NewPassword) {
  }
}

export class ChangePasswordSuccessAction implements Action {
  readonly type = UserActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class ChangePasswordFailedAction implements Action {
  readonly type = UserActionTypes.CHANGE_PASSWORD_FAILED;

  constructor(public payload: string) {
  }
}

export class ResetStoreAction implements Action {
  readonly type = UserActionTypes.RESET_STORE;
}

export type UserActions =
  GetMeAction | GetMeSuccessAction | GetMeFailedAction |
  UpdateProfileAction | UpdateProfileSuccessAction | UpdateProfileFailedAction |
  DeleteUserAction | DeleteUserSuccessAction | DeleteUserFailedAction |
  ChangePasswordAction | ChangePasswordSuccessAction | ChangePasswordFailedAction |
  ResetStoreAction;
