import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {MetaService} from '../../../_shared/services/meta.service';
import * as fromAuth from '../../../store/auth';
import {UserRegister} from '../../models/user-register';
import {Meta, MetaList} from '../../../_shared/models/meta';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private metaService: MetaService) {
  }

  ngOnInit(): void {
    this.metaService.set(MetaList.get(Meta.REGISTER));

    this.store.pipe(
      select(fromAuth.selectUser)
    ).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/');
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.required]
      },
      {validators: this.passwordMatchValidator}
    );
  }

  passwordMatchValidator(form: FormGroup): null | object {
    return form.get('password').value === form.get('confirmPassword').value
      ? null : {mismatch: true};
  }

  register(): void {
    const user: UserRegister = {
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    };
    console.log(user);
    this.store.dispatch(new fromAuth.RegisterAction(user));
  }

}
