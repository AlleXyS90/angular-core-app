import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AppState} from '../index';
import {AuthService} from '../../_shared/services/auth.service';
import {UsersService} from '../../_core/services/users.service';
import {AlertService} from '../../_shared/services/alert.service';
import {
  ChangePasswordAction,
  ChangePasswordFailedAction,
  ChangePasswordSuccessAction,
  DeleteUserAction,
  DeleteUserFailedAction,
  DeleteUserSuccessAction,
  GetMeAction,
  GetMeFailedAction,
  GetMeSuccessAction, ResetStoreAction,
  UpdateProfileAction,
  UpdateProfileFailedAction,
  UpdateProfileSuccessAction
} from '../user/user.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {User} from '../../_core/models/user';
import {Observable, of} from 'rxjs';
import {UserActionTypes} from './user.actions';
import {NewPassword} from '../../_core/models/new-password';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private usersService: UsersService,
    private alertService: AlertService) {
  }


  @Effect()
  getMe$ = this.actions$.pipe(
    ofType<GetMeAction>(UserActionTypes.GET_ME),
    switchMap((action: GetMeAction) => this.usersService.getMe().pipe(
      map((user: User) => new GetMeSuccessAction(user)),
      catchError(error => of(new GetMeFailedAction(error.message)))
    )));

  @Effect({dispatch: false})
  getMeSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.GET_ME_SUCCESS),
    tap((action: GetMeSuccessAction) => {
      console.log('no side effects here');
    })
  );

  @Effect({dispatch: false})
  getMeFailed: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.GET_ME_FAILED),
    tap((action: GetMeFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType<UpdateProfileAction>(UserActionTypes.UPDATE_PROFILE),
    map((action: UpdateProfileAction) => action.payload),
    switchMap((payload: User) =>
      this.usersService.update(payload).pipe(
        map((user: User) => new UpdateProfileSuccessAction(user)),
        catchError(error => of(new UpdateProfileFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  updateProfileSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.UPDATE_PROFILE_SUCCESS),
    tap((action: UpdateProfileSuccessAction) => {
      this.alertService.show('Profile updated');
    })
  );

  @Effect({dispatch: false})
  updateProfileFailed: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.UPDATE_PROFILE_FAILED),
    tap((action: UpdateProfileFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType<DeleteUserAction>(UserActionTypes.DELETE_USER),
    map((action: DeleteUserAction) => action.payload),
    switchMap((payload: number) =>
      this.usersService.delete(payload).pipe(
        map(() => new DeleteUserSuccessAction()),
        catchError(error => of(new DeleteUserFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  deleteUserSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.DELETE_USER_SUCCESS),
    tap((action: DeleteUserSuccessAction) => {
      localStorage.clear();
      this.alertService.show('Account deleted');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  deleteUserFailed: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.DELETE_USER_FAILED),
    tap((action: DeleteUserFailedAction) => this.alertService.show(action.payload))
  );

  @Effect()
  changePassword$ = this.actions$.pipe(
    ofType<ChangePasswordAction>(UserActionTypes.CHANGE_PASSWORD),
    map((action: ChangePasswordAction) => action.payload),
    switchMap((payload: NewPassword) =>
      this.usersService.changePassword(payload).pipe(
        map((response: boolean) => new ChangePasswordSuccessAction(response)),
        catchError(error => of(new ChangePasswordFailedAction(error.message)))
      ))
  );

  @Effect({dispatch: false})
  changePasswordSuccess: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.CHANGE_PASSWORD_SUCCESS),
    tap((action: ChangePasswordSuccessAction) => {
      this.alertService.show('Password updated');
    })
  );

  @Effect({dispatch: false})
  changePasswordFailed: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.CHANGE_PASSWORD_FAILED),
    tap((action: ChangePasswordFailedAction) => this.alertService.show(action.payload))
  );

  @Effect({dispatch: false})
  resetStore: Observable<any> = this.actions$.pipe(
    ofType<ResetStoreAction>(UserActionTypes.RESET_STORE),
    tap(() => {
      console.log('no side effects here');
    })
  );
}
