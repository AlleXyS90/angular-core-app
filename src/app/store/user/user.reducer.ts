import {DomainStatus, initialRequestStatus, Status} from '../../_shared/models/domain-status';
import {User} from '../../_core/models/user';
import {UserActions, UserActionTypes} from './user.actions';
import {AuthActionTypes, userAdapter} from '../auth';

export interface UserState {
  userProfile: DomainStatus<User>;
  passwordChangedAction: DomainStatus<boolean>;
  accountDeletedAction: DomainStatus<boolean>;
}

export const userInitialState: UserState = {
  userProfile: {
    domain: undefined,
    requestStatus: initialRequestStatus
  },
  passwordChangedAction: {
    domain: undefined,
    requestStatus: initialRequestStatus
  },
  accountDeletedAction: {
    domain: undefined,
    requestStatus: initialRequestStatus
  }
};

export function userReducer(state: UserState = userInitialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.GET_ME: {
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
    case UserActionTypes.GET_ME_SUCCESS: {
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
    case UserActionTypes.GET_ME_FAILED: {
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
    case UserActionTypes.UPDATE_PROFILE: {
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
    case UserActionTypes.UPDATE_PROFILE_SUCCESS: {
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
    case UserActionTypes.UPDATE_PROFILE_FAILED: {
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
    case UserActionTypes.CHANGE_PASSWORD: {
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
    case UserActionTypes.CHANGE_PASSWORD_SUCCESS: {
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
    case UserActionTypes.CHANGE_PASSWORD_FAILED: {
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
    case UserActionTypes.DELETE_USER: {
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
    case UserActionTypes.DELETE_USER_SUCCESS: {
      return {
        ...userInitialState,
        accountDeletedAction: {
          domain: true,
          requestStatus: {
            errorMessage: undefined,
            status: Status.COMPLETED
          }
        }
      };
    }
    case UserActionTypes.DELETE_USER_FAILED: {
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
    case UserActionTypes.INITIALIZE_FROM_STORAGE: {
      return {
        ...state,
        userProfile: {
          domain: action.payload,
          requestStatus: {
            errorMessage: undefined,
            status: Status.NEW
          }
        }
      };
    }
    case UserActionTypes.RESET_STORE: {
      console.log('reset store');
      return {
        ...userInitialState
      };
    }
    default:
      return {...state};
  }
}
