import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {DomainStatus, initialRequestStatus, RequestStatus, Status} from '../../_shared/models/domain-status';
import {User} from '../../_core/models/user';
import {AuthActions, AuthActionTypes} from './auth.actions';
import {Token} from '../../_core/models/token';
import {ForgotPasswordEmailAttempt} from '../../_core/models/forgot-password-email-attempt';
import {NewPassword} from '../../_core/models/new-password';

export const userAdapter: EntityAdapter<User> =
  createEntityAdapter<User>();

export interface AuthState {
  forgotPasswordAction: DomainStatus<Array<ForgotPasswordEmailAttempt>>;
  isAuthenticated: boolean;
  userEntity: EntityState<User>; // todo to be removed
  user: User | null;
  token: Token | null;
  requestStatus: RequestStatus; // todo to be removed?
}

export const authInitialState: AuthState = {
  forgotPasswordAction: {
    domain: [],
    requestStatus: initialRequestStatus
  },
  isAuthenticated: false,
  userEntity: userAdapter.getInitialState(),
  user: null,
  token: null,
  requestStatus: initialRequestStatus
};

export function authReducer(state: AuthState = authInitialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        requestStatus: {
          errorMessage: undefined,
          status: Status.PENDING
        }
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        requestStatus: {
          errorMessage: undefined,
          status: Status.COMPLETED
        }
      };
    }
    case AuthActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        requestStatus: {
          errorMessage: action.payload,
          status: Status.FAILED
        }
      };
    }
    case AuthActionTypes.REGISTER: {
      return {
        ...state,
        requestStatus: {
          errorMessage: undefined,
          status: Status.PENDING
        }
      };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        userEntity: userAdapter.addOne(action.payload.user, userAdapter.getInitialState()),
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    }
    case AuthActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        requestStatus: {
          errorMessage: action.payload,
          status: Status.FAILED
        }
      };
    }
    case AuthActionTypes.FORGOT_PASSWORD: {
      const {domain} = state.forgotPasswordAction;
      return {
        ...state,
        forgotPasswordAction: {
          domain,
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }
    case AuthActionTypes.FORGOT_PASSWORD_SUCCESS: {
      let alteredAttempts: Array<ForgotPasswordEmailAttempt> = [...state.forgotPasswordAction.domain];
      const existingEmail = alteredAttempts.find(x => x.email === action.payload);
      if (existingEmail) {
        alteredAttempts = alteredAttempts.map(emailAttempt => {
          if (emailAttempt.email === action.payload) {
            return {...emailAttempt, attempts: emailAttempt.attempts + 1};
          } else {
            return emailAttempt;
          }
        });
      } else {
        alteredAttempts.push({
          email: action.payload,
          attempts: 1
        });
      }

      return {
        ...state,
        forgotPasswordAction: {
          domain: alteredAttempts,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }
    case AuthActionTypes.FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordAction: {
          domain: null,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }
    case AuthActionTypes.LOGOUT: {
      return authInitialState;
    }
    case AuthActionTypes.INITIALIZE_FROM_STORAGE: {
      return {
        ...state,
        token: action.payload[0],
        user: action.payload[1],
        userEntity: userAdapter.addOne(action.payload[1], userAdapter.getInitialState()),
        isAuthenticated: true
      };
    }
    default:
      return {...state};
  }
}
