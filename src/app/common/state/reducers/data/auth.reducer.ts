import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../../actions/data/auth.actions';
import { UserType } from '../../../types/user.type';

export interface DataAuthState {
  token: string;
  user: UserType;
  userIsLoaded: boolean;
}

const initialState: DataAuthState = {
  token: null,
  user: null,
  userIsLoaded: false
};

export function AuthReducer(state = initialState, action: Action): DataAuthState {
  switch (action.type) {
    case authActions.AuthActionTypes.AUTH_SET_TOKEN: {
      return Object.assign({}, state, {
        token: action.payload
      });
    }

    case authActions.AuthActionTypes.AUTH_LOAD_USER_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload,
        userIsLoaded: true
      });
    }

    case authActions.AuthActionTypes.AUTH_CLEAN: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getUser(state$: Observable<DataAuthState>) {
  return state$.select(s => s.user);
}
