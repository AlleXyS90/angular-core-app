import {Action} from '@ngrx/store';

import {User} from '../../_core/models/user';
import {UserLogin} from '../../_core/models/user-login';
import {AuthUser} from '../../_core/models/auth-user';
import {Token} from '../../_core/models/token';
import {NewPassword} from '../../_core/models/new-password';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILED = '[Auth] Login failed',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILED = '[Auth] Register failed',
  FORGOT_PASSWORD = '[Auth] Forgot password',
  FORGOT_PASSWORD_SUCCESS = '[Auth] Forgot password success',
  FORGOT_PASSWORD_FAILED = '[Auth] Forgot password failed',
  LOGOUT = '[Auth] Logout',
  CHECK_AUTHENTICATION_STATUS = '[Auth] Check authentication status',
  INITIALIZE_FROM_STORAGE = '[Auth] Initialize from storage',

  // UserActionTypes
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
  CHANGE_PASSWORD_FAILED = '[Users] Change password failed'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: UserLogin) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Token) {
  }
}

export class LoginFailedAction implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILED;

  constructor(public payload: string) {
  }
}

export class RegisterAction implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: UserLogin) {
  }
}

export class RegisterSuccessAction implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;

  constructor(public payload: AuthUser) {
  }
}

export class RegisterFailedAction implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILED;

  constructor(public payload: string) {
  }
}

export class ForgotPasswordAction implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;

  constructor(public payload: string) {
  }
}

export class ForgotPasswordSuccessAction implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_SUCCESS;

  constructor(public payload: string) {
  }
}

export class ForgotPasswordFailedAction implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD_FAILED;

  constructor(public payload: string) {
  }
}

export class LogOutAction implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class CheckAuthenticationStatusAction implements Action {
  readonly type = AuthActionTypes.CHECK_AUTHENTICATION_STATUS;
}

export class InitializeFromStorageAction implements Action {
  readonly type = AuthActionTypes.INITIALIZE_FROM_STORAGE;

  constructor(public payload: User) {
  }
}

export class GetMeAction implements Action {
  readonly type = AuthActionTypes.GET_ME;
}

export class GetMeSuccessAction implements Action {
  readonly type = AuthActionTypes.GET_ME_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetMeFailedAction implements Action {
  readonly type = AuthActionTypes.GET_ME_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateProfileAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE;

  constructor(public payload: User) {
  }
}

export class UpdateProfileSuccessAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateProfileFailedAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteUserAction implements Action {
  readonly type = AuthActionTypes.DELETE_USER;

  constructor(public payload: number) {
  }
}

export class DeleteUserSuccessAction implements Action {
  readonly type = AuthActionTypes.DELETE_USER_SUCCESS;
}

export class DeleteUserFailedAction implements Action {
  readonly type = AuthActionTypes.DELETE_USER_FAILED;

  constructor(public payload: string) {
  }
}

export class ChangePasswordAction implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD;

  constructor(public payload: NewPassword) {
  }
}

export class ChangePasswordSuccessAction implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class ChangePasswordFailedAction implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_FAILED;

  constructor(public payload: string) {
  }
}

export type AuthActions =
  LoginAction | LoginSuccessAction | LoginFailedAction |
  RegisterAction | RegisterSuccessAction | RegisterFailedAction |
  ForgotPasswordAction | ForgotPasswordSuccessAction | ForgotPasswordFailedAction |
  LogOutAction | CheckAuthenticationStatusAction | InitializeFromStorageAction |
  GetMeAction | GetMeSuccessAction | GetMeFailedAction |
  UpdateProfileAction | UpdateProfileSuccessAction | UpdateProfileFailedAction |
  DeleteUserAction | DeleteUserSuccessAction | DeleteUserFailedAction |
  ChangePasswordAction | ChangePasswordSuccessAction | ChangePasswordFailedAction;
