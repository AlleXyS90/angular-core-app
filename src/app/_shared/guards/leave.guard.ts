import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {map, switchMap, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import * as fromAuth from '../../store/auth';
import {ConfirmationComponent} from '../../_core/components/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuard implements CanDeactivate<any> {

  constructor(
    private matDialog: MatDialog,
    private store: Store<AppState>) {
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(fromAuth.selectAuthenticationStatus),
      switchMap(status => {
        if (status !== true) {
          console.log('auth status = false; return CanLeave');
          return of(true);
        } else {
          console.log(`canLeave = ${component.canLeave}. if FALSE, open POPUP`);
          return component.canLeave === true ? of(true) : this.matDialog.open(ConfirmationComponent, {
            width: '500px',
            data: { title: 'Leave page', message: 'Do you really want to leave this page? All modified data will be lost.' }
          }).afterClosed()
            .pipe(
              map((dialogResult) => {
                return dialogResult === true;
              }));
        }
      })
    );
  }

}
