import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './_shared/guards/auth.guard';
import {LeaveGuard} from './_shared/guards/leave.guard';
import {LoginComponent} from './_core/components/login/login.component';
import {RegisterComponent} from './_core/components/register/register.component';
import {UserProfileComponent} from './_core/components/user-profile/user-profile.component';
import {ForgotPasswordComponent} from './_core/components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './_core/components/reset-password/reset-password.component';
import {EmailConfirmationComponent} from './_core/components/email-confirmation/email-confirmation.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [LeaveGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
