import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import * as fromAuth from '../../../store/auth';
import {AppState} from '../../../store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailAddress: FormControl;

  constructor(
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.emailAddress = new FormControl('', Validators.required);
  }

  cancel(): void {
    // todo navigate to the previous route
    this.router.navigateByUrl('/');
  }

  submit(): void {
    this.store.dispatch(new fromAuth.ForgotPasswordAction(this.emailAddress.value));
  }
}
