import { Component } from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from './store';
import * as fromAuth from './store/auth';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-core-app';

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(new fromAuth.CheckAuthenticationStatusAction());
  }
}
