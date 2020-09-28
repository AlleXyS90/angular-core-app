import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, first, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import * as fromAuth from './auth.selectors';
import {
  AuthActionTypes,
  LoginAction,
  LoginSuccessAction,
  LoginFailedAction,
  InitializeFromStorageAction,
  CheckAuthenticationStatusAction,
  RegisterAction,
  RegisterSuccessAction,
  RegisterFailedAction,
  ForgotPasswordAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailedAction,
  GetMeAction,
  GetMeSuccessAction,
  GetMeFailedAction,
  UpdateProfileAction,
  UpdateProfileSuccessAction,
  UpdateProfileFailedAction,
  ChangePasswordAction,
  ChangePasswordSuccessAction,
  ChangePasswordFailedAction,
  DeleteUserAction, DeleteUserSuccessAction, DeleteUserFailedAction, LogOutAction
} from './auth.actions';

import {AuthService} from '../../_shared/services/auth.service';
import {User} from '../../_core/models/user';
import {UserLogin} from '../../_core/models/user-login';
import {AppState} from '../index';
import {UserRegister} from '../../_core/models/user-register';
import {AlertService} from '../../_shared/services/alert.service';
import {AuthUser} from '../../_core/models/auth-user';
import {UsersService} from '../../_core/services/users.service';
import {Token} from '../../_core/models/token';
import {NewPassword} from '../../_core/models/new-password';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private usersService: UsersService,
    private alertService: AlertService) {
  }

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.LOGIN),
    map((action: LoginAction) => action.payload),
    switchMap((userLogin: UserLogin) => this.authService.login(userLogin).pipe(
      switchMap((token: Token) => {
        return [new LoginSuccessAction(token), new GetMeAction()];
      }), catchError(error => of(new LoginFailedAction(error.message))))
    )
  );

  @Effect({dispatch: false})
  logInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((action: LoginSuccessAction) => {
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('token_expiration', JSON.stringify(action.payload.expiration));
      this.alertService.show('Logged in successfully');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  logInFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILED),
    tap((action: LoginFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType<RegisterAction>(AuthActionTypes.REGISTER),
    map((action: RegisterAction) => action.payload),
    switchMap((userRegister: UserRegister) =>
      this.authService.register(userRegister).pipe(
        map((authUser: AuthUser) => new RegisterSuccessAction(authUser)),
        catchError(error => of(new RegisterFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  registerSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((action: RegisterSuccessAction) => {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      this.alertService.show('Registration successfully');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  registerFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_FAILED),
    tap((action: RegisterFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  forgotPassword$ = this.actions$.pipe(
    ofType<ForgotPasswordAction>(AuthActionTypes.FORGOT_PASSWORD),
    map((action: ForgotPasswordAction) => action.payload),
    switchMap((email: string) =>
      this.authService.forgotPassword(email).pipe(
        map(() => new ForgotPasswordSuccessAction(email)),
        catchError(error => of(new ForgotPasswordFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  forgotPasswordSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD_SUCCESS),
    tap((action: ForgotPasswordSuccessAction) => {
      this.alertService.show('Request send. You\'ll receive an email with the reset password code.');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  forgotPasswordFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD_FAILED),
    tap((action: ForgotPasswordFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  getMe$ = this.actions$.pipe(
    ofType<GetMeAction>(AuthActionTypes.GET_ME),
    switchMap((action: GetMeAction) => this.usersService.getMe().pipe(
      map((user: User) => new GetMeSuccessAction(user)),
      catchError(error => of(new GetMeFailedAction(error.message)))
    )));

  @Effect({dispatch: false})
  getMeSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_ME_SUCCESS),
    tap((action: GetMeSuccessAction) => {
      console.log('no side effects here');
    })
  );

  @Effect({dispatch: false})
  getMeFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_ME_FAILED),
    tap((action: GetMeFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType<UpdateProfileAction>(AuthActionTypes.UPDATE_PROFILE),
    map((action: UpdateProfileAction) => action.payload),
    switchMap((payload: User) =>
      this.usersService.update(payload).pipe(
        map((user: User) => new UpdateProfileSuccessAction(user)),
        catchError(error => of(new UpdateProfileFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  updateProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.UPDATE_PROFILE_SUCCESS),
    tap((action: UpdateProfileSuccessAction) => {
      this.alertService.show('Profile updated');
    })
  );

  @Effect({dispatch: false})
  updateProfileFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.UPDATE_PROFILE_FAILED),
    tap((action: UpdateProfileFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType<DeleteUserAction>(AuthActionTypes.DELETE_USER),
    map((action: DeleteUserAction) => action.payload),
    switchMap((payload: number) =>
      this.usersService.delete(payload).pipe(
        map(() => new DeleteUserSuccessAction()),
        catchError(error => of(new DeleteUserFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  deleteUserSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.DELETE_USER_SUCCESS),
    tap((action: DeleteUserSuccessAction) => {
      localStorage.clear();
      this.alertService.show('Account deleted');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  deleteUserFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.DELETE_USER_FAILED),
    tap((action: DeleteUserFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  changePassword$ = this.actions$.pipe(
    ofType<ChangePasswordAction>(AuthActionTypes.CHANGE_PASSWORD),
    map((action: ChangePasswordAction) => action.payload),
    switchMap((payload: NewPassword) =>
      this.usersService.changePassword(payload).pipe(
        map((response: boolean) => new ChangePasswordSuccessAction(response)),
        catchError(error => of(new ChangePasswordFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  changePasswordSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD_SUCCESS),
    tap((action: ChangePasswordSuccessAction) => {
      this.alertService.show('Password updated');
    })
  );

  @Effect({dispatch: false})
  changePasswordFailed: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD_FAILED),
    tap((action: ChangePasswordFailedAction) => this.alertService.show(action.payload))
  );

  @Effect({dispatch: false})
  logOut: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.clear();
      this.alertService.show('Logged out');
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  checkAuthenticationStatus: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_AUTHENTICATION_STATUS),
    map((action: CheckAuthenticationStatusAction) => action),
    first(),
    tap(() => {
      const currentUserJson = localStorage.getItem(this.authService.currentUserKey);
      if (currentUserJson) {
        const user = JSON.parse(currentUserJson) as User;
        this.store.dispatch(new InitializeFromStorageAction(user));
      }
    })
  );
}
