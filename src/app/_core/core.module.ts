import {NgModule, SkipSelf, Optional, ModuleWithProviders} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../_shared/shared.module';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {EmailConfirmationComponent} from './components/email-confirmation/email-confirmation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
