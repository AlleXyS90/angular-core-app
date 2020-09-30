import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import * as fromAuth from '../../../store/auth';
import * as fromUser from '../../../store/user';
import {MetaService} from '../../../_shared/services/meta.service';
import {UserLogin} from '../../models/user-login';
import {AppState} from '../../../store/index';
import {Meta, MetaList} from '../../../_shared/models/meta';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private metaService: MetaService) {
  }

  ngOnInit(): void {
    this.metaService.set(MetaList.get(Meta.LOGIN));

    this.store.pipe(
      select(fromAuth.selectAuthenticationStatus)
    ).subscribe(user => {
      if (status) {
        this.router.navigateByUrl('/');
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const payload: UserLogin = this.loginForm.value as UserLogin;
    this.store.dispatch(new fromAuth.LoginAction(payload));
  }

  goTo(value: string): void {
    this.router.navigateByUrl(value);
  }
}
