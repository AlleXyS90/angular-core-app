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
  userProfile: DomainStatus<User>;
  forgotPasswordAction: DomainStatus<Array<ForgotPasswordEmailAttempt>>;
  passwordChangedAction: DomainStatus<boolean>;
  accountDeletedAction: DomainStatus<boolean>;
  isAuthenticated: boolean;
  userEntity: EntityState<User>; // todo to be removed
  user: User | null;
  token: Token | null;
  requestStatus: RequestStatus; // todo to be removed?
}

export const authInitialState: AuthState = {
  userProfile: {
    domain: undefined,
    requestStatus: initialRequestStatus
  },
  forgotPasswordAction: {
    domain: [],
    requestStatus: initialRequestStatus
  },
  passwordChangedAction: {
    domain: undefined,
    requestStatus: initialRequestStatus
  },
  accountDeletedAction: {
    domain: undefined,
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
        userProfile: {
          domain: action.payload.user,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        },
        userEntity: userAdapter.addOne(action.payload.user, userAdapter.getInitialState()),
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    }
    case AuthActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        userProfile: {
          domain: null,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        },
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
    case AuthActionTypes.GET_ME: {
      return {
        ...state,
        userProfile: {
          domain: undefined,
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }
    case AuthActionTypes.GET_ME_SUCCESS: {
      return {
        ...state,
        userProfile: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }
    case AuthActionTypes.GET_ME_FAILED: {
      return {
        ...state,
        userProfile: {
          domain: undefined,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }
    case AuthActionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        userProfile: {
          domain: undefined,
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }
    case AuthActionTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }
    case AuthActionTypes.UPDATE_PROFILE_FAILED: {
      return {
        ...state,
        userProfile: {
          domain: undefined,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        passwordChangedAction: {
          domain: undefined,
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordChangedAction: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        passwordChangedAction: {
          domain: undefined,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }
    case AuthActionTypes.DELETE_USER: {
      return {
        ...state,
        accountDeletedAction: {
          domain: undefined,
          requestStatus: {
            errorMessage: undefined,
            status: Status.PENDING
          }
        }
      };
    }
    case AuthActionTypes.DELETE_USER_SUCCESS: {
      return {
        ...authInitialState,
        accountDeletedAction: {
          domain: true,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }
    case AuthActionTypes.DELETE_USER_FAILED: {
      return {
        ...state,
        accountDeletedAction: {
          domain: undefined,
          requestStatus: {
            errorMessage: action.payload,
            status: Status.FAILED
          }
        }
      };
    }
    case AuthActionTypes.INITIALIZE_FROM_STORAGE: {
      return {
        ...state,
        userProfile: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        },
        user: action.payload,
        userEntity: userAdapter.addOne(action.payload, userAdapter.getInitialState()),
        isAuthenticated: true
      };
    }
    default:
      return {...state};
  }
}
