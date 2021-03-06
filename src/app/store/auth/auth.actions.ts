import {Action} from '@ngrx/store';

import {User} from '../../_core/models/user';
import {UserLogin} from '../../_core/models/user-login';
import {AuthUser} from '../../_core/models/auth-user';
import {Token} from '../../_core/models/token';
import {NewPassword} from '../../_core/models/new-password';
import {UserRegister} from '../../_core/models/user-register';

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
  INITIALIZE_FROM_STORAGE = '[Auth] Initialize from storage'
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

  constructor(public payload: UserRegister) {
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

  constructor(public payload: [Token, User]) {
  }
}

export type AuthActions =
  LoginAction | LoginSuccessAction | LoginFailedAction |
  RegisterAction | RegisterSuccessAction | RegisterFailedAction |
  ForgotPasswordAction | ForgotPasswordSuccessAction | ForgotPasswordFailedAction |
  LogOutAction | CheckAuthenticationStatusAction | InitializeFromStorageAction;
