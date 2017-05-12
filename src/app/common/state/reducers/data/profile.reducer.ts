import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as profileActions from '../../actions/data/profile.actions';

export interface DataProfileState {
  profile: any;
  profileIsLoaded: boolean;
}

const initialState: DataProfileState = {
  profile: null,
  profileIsLoaded: false
};

export function ProfileReducer(state = initialState, action: Action): DataProfileState {
  switch (action.type) {
    case profileActions.ProfileActionTypes.PROFILE_LOAD_PROFILE_SUCCESS:
    case profileActions.ProfileActionTypes.PROFILE_CREATE_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        profile: action.payload,
        profileIsLoaded: true
      });
    }

    case profileActions.ProfileActionTypes.PROFILE_CLEAN: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getProfile(state$: Observable<DataProfileState>) {
  return state$.select(s => s.profile);
}

export function getProfileIsLoaded(state$: Observable<DataProfileState>) {
  return state$.select(s => s.profileIsLoaded);
}
