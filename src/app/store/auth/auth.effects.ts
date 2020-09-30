import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, combineLatest, concatMap, first, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import * as fromUser from '../user/user.actions';
import * as fromUserSelect from '../user/user.selectors';
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
  ForgotPasswordFailedAction
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
import {GetMeAction, ResetStoreAction} from '../user/user.actions';

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
      switchMap((token: Token) => [new LoginSuccessAction(token), new GetMeAction()]),
      catchError(error => of(new LoginFailedAction(error.message))))
    )
  );

  @Effect({dispatch: false})
  logInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((action: LoginSuccessAction) => {
      localStorage.setItem('token', JSON.stringify(action.payload));
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
        switchMap((authUser: AuthUser) => [new RegisterSuccessAction(authUser), new GetMeAction()]),
        catchError(error => of(new RegisterFailedAction(error.message)))
      ))
  );


  @Effect({dispatch: false})
  registerSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((action: RegisterSuccessAction) => {
      const user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      this.alertService.show(`Welcome ${user.userName}`);
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


  @Effect({dispatch: false})
  logOut: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.store.dispatch(new fromUser.ResetStoreAction());
      localStorage.clear();
      this.alertService.show('Logged out');
      this.router.navigateByUrl('/');
    })
  );

//   ofType<LoginAction>(AuthActionTypes.LOGIN),
//   map((action: LoginAction) => action.payload),
//   switchMap((userLogin: UserLogin) => this.authService.login(userLogin).pipe(
//     switchMap((token: Token) => {
//   return [new LoginSuccessAction(token), new GetMeAction()];
// }), catchError(error => of(new LoginFailedAction(error.message))))
// )

  @Effect()
  checkAuthenticationStatus: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_AUTHENTICATION_STATUS),
    map((action: CheckAuthenticationStatusAction) => action),
    first(),
    tap(() => {
      const tokenJson = this.authService.getToken();
      const currentUserJson = localStorage.getItem(this.authService.currentUserKey);
      if (tokenJson && currentUserJson) {
        const token = JSON.parse(tokenJson) as Token;
        const user = JSON.parse(currentUserJson) as User;
        this.store.dispatch(new InitializeFromStorageAction([token, user]));
        this.store.dispatch(new fromUser.InitializeFromStorageAction(user));
      }
    })
  );
}
