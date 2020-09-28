import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {UserLogin} from '../../_core/models/user-login';
import {User} from '../../_core/models/user';
import {UserRegister} from '../../_core/models/user-register';
import {AuthUser} from '../../_core/models/auth-user';
import {Token} from '../../_core/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  public currentUserKey = 'user';
  public authenticationKey = 'authenticated';

  serverUrl = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) {
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  public login(userLogin: UserLogin): Observable<Token> {
    localStorage.clear();

    // todo token came from server
    const url = `${this.serverUrl}/users?userName=${userLogin.userName}&password=${userLogin.password}`;
    return this.http.get(url, this.httpOptions).pipe(
      map((users: Array<User>) => {
        // todo remove users / => type of response will be Token
        if (users.length === 0) {
          throw new Error('Invalid credentials.');
        }

        return new Token({
          token: `Bearer token.generated.by.server`,
          expiration: '12-31-2020 14:22:33'
        });
      })
    );
  }

  public register(userRegister: UserRegister): Observable<AuthUser> {
    // todo: UserRegister mapped to User (in server side)
    const user: User = {
      userName: userRegister.userName,
      password: userRegister.password,
      email: userRegister.email
    };

    return this.http.post(`${this.serverUrl}/users`, user, this.httpOptions).pipe(
      map((dbUser: User) => {
        // todo dbUser [typeof User] will be replaced by AuthUser [comed from server]
        // authUser will be returned from server as token & user
        const mockAuthUser: AuthUser = {
          token: new Token({
            token: `Bearer token.generated.by.server`,
            expiration: '12-31-2020 14:22:33'
          }),
          user: dbUser
        };

        return mockAuthUser;
      })
    );
  }

  public forgotPassword(email: string): Observable<string> {
    const queryUrl = `${this.serverUrl}/auth/forgotPassword?email=${email}`;

    // todo server implementation
    return of(email);
    // return this.http.get<void>(queryUrl, this.httpOptions);
  }
}
