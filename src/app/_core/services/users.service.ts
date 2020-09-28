import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {UserLogin} from '../../_core/models/user-login';
import {User} from '../../_core/models/user';
import {UserRegister} from '../../_core/models/user-register';
import {AuthUser} from '../../_core/models/auth-user';
import {Token} from '../../_core/models/token';
import {NewPassword} from '../models/new-password';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  public update(user: User): Observable<User> {
    const queryUrl = `${this.serverUrl}/users/${user.id}`;
    return this.http.put<User>(queryUrl, user);
  }

  public getMe(): Observable<User> {
    // todo remove userName parameter (will be loaded from server state)
    const queryUrl = `${this.serverUrl}/users?userName=alex`;

    return this.http.get(queryUrl, this.httpOptions).pipe(
      map((users: Array<User>) => {
        // todo result will be entity, instead of array of entities
        return users[0];
      })
    );
  }

  public delete(id: number): Observable<void> {
    const queryUrl = `${this.serverUrl}/users/${id}`;
    return this.http.delete<void>(queryUrl, this.httpOptions);
  }

  public changePassword(pw: NewPassword): Observable<boolean> {
    //  todo need server implementation
    return of(true);

    // const queryUrl = `${this.serverUrl}/users/changePassword`;
    // return this.http.post<boolean>(queryUrl, pw, this.httpOptions);
  }
}
