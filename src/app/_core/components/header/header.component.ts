import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {faUserCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

import * as fromAuth from '../../../store/auth';
import * as fromUser from '../../../store/user';
import {AppState} from '../../../store/index';
import {User} from '../../models/user';
import {Status} from '../../../_shared/models/domain-status';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<User>;
  userLetter = '';
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;

  constructor(
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(fromUser.selectUserProfile),
      filter(x => x.requestStatus.status !== Status.PENDING),
      map(userState => {
        const user = userState.domain;
        if (user) {
          this.userLetter = user.userName.substring(0, 1).toUpperCase();
        }

        return user;
      })
    );
  }

  goTo(value: string): void {
    this.router.navigateByUrl(value);
  }

  logout(): void {
    this.store.dispatch(new fromAuth.LogOutAction());
  }
}
