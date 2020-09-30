import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';

import * as fromUser from '../../../store/user';
import {AppState} from '../../../store';
import {MetaService} from '../../../_shared/services/meta.service';
import {Meta, MetaList} from '../../../_shared/models/meta';
import {User} from '../../models/user';
import {Status} from '../../../_shared/models/domain-status';
import {Router} from '@angular/router';
import {AlertService} from '../../../_shared/services/alert.service';
import {NewPassword} from '../../models/new-password';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  canLeave = false;
  detailForm: FormGroup;
  passwordForm: FormGroup;
  user$: Observable<User>;
  user: User;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private metaService: MetaService) {
  }

  ngOnInit(): void {
    this.metaService.set(MetaList.get(Meta.PROFILE));
    this.buildForm();

    this.store.dispatch(new fromUser.GetMeAction());
    this.user$ = this.store.pipe(
      select(fromUser.selectUserProfile)).pipe(
      filter(x => x.requestStatus.status === Status.COMPLETED),
      take(1),
      map(userState => {
        const user = userState.domain;
        this.user = user;
        this.initForm(user);

        return user;
      })
    );
  }

  buildForm(): void {
    this.detailForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      firstName: '',
      lastName: ''
    });

    this.passwordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {validators: this.passwordMatchValidator}
    );
  }

  passwordMatchValidator(form: FormGroup): null | object {
    return form.get('password').value === form.get('confirmPassword').value
      ? null : {mismatch: true};
  }

  initForm(user: User): void {
    this.detailForm.setValue({
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  save(): void {
    const firstName = this.detailForm.get('firstName').value;
    const lastName = this.detailForm.get('lastName').value;

    const payload = {
      ...this.user,
      firstName,
      lastName
    };

    this.store.dispatch(new fromUser.UpdateProfileAction(payload));
  }

  deleteAccount(): void {
    this.store.dispatch(new fromUser.DeleteUserAction(this.user.id));
  }

  changePassword(): void {
    const payload = {
      ...this.passwordForm.value as NewPassword,
      userId: this.user.id
    };

    this.store.dispatch(new fromUser.ChangePasswordAction(payload));
  }
}
