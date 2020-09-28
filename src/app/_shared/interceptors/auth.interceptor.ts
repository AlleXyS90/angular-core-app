import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Token} from '../../_core/models/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private static tokenKey = 'token';
  private static currentUserKey = 'user';

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const savedToken = new Token(JSON.parse(localStorage.getItem(AuthInterceptor.tokenKey)));
    const authToken = savedToken.token;

    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });

    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.removeItem(AuthInterceptor.tokenKey);
            localStorage.removeItem(AuthInterceptor.currentUserKey);
            this.router.navigateByUrl('/login');
          }
        }
      })
    );
  }
}

