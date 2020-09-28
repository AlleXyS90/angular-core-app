import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AuthService} from '../services/auth.service';
import {AppState} from '../../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.getToken()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;

    // return this.store.pipe(
    //   select(fromAuth.selectAuthenticationStatus),
    //   tap(status => {
    //     if (status) {
    //       return true;
    //     }
    //
    //     this.router.navigateByUrl('login');
    //   })
    // );
  }
}
