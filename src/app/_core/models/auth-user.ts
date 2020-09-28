import {Token} from './token';
import {User} from './user';

export interface AuthUser {
  token: Token;
  user: User;
}
