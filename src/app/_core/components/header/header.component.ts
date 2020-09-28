import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {AppState} from '../../../store/index';
import * as fromAuth from '../../../store/auth';
import {User} from '../../models/user';
import {AuthState, LogOutAction, selectAuthState} from '../../../store/auth';
import {filter, map} from 'rxjs/operators';
import {Status} from '../../../_shared/models/domain-status';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<User>;
  isAuthenticated = false;

  constructor(
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(fromAuth.selectUserProfile),
      filter(x => x.requestStatus.status !== Status.PENDING),
      map(user => user.domain)
    );
  }

  goTo(value: string): void {
    this.router.navigateByUrl(value);
  }

  logout(): void {
    this.store.dispatch(new fromAuth.LogOutAction());
  }
}
