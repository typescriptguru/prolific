import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as profileCustomisationsActions from '../../actions/data/profile-customisations.actions';

export interface DataProfileCustomisationsState {
  avatarClothes: any[];
  avatarClothesAreLoaded: boolean;
  backgrounds: any[];
  backgroundsAreLoaded: boolean;
}

const initialState: DataProfileCustomisationsState = {
  avatarClothes: [],
  avatarClothesAreLoaded: false,
  backgrounds: [],
  backgroundsAreLoaded: false
};

export function ProfileCustomisationsReducer(state = initialState, action: Action): DataProfileCustomisationsState {
  switch (action.type) {
    case profileCustomisationsActions.ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_SUCCESS: {
      return Object.assign({}, state, {
        avatarClothes: action.payload,
        avatarClothesAreLoaded: true
      });
    }

    case profileCustomisationsActions.ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_SUCCESS: {
      return Object.assign({}, state, {
        backgrounds: action.payload,
        backgroundsAreLoaded: true
      });
    }

    case profileCustomisationsActions.ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_CLEAN: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getAvatarClothes(state$: Observable<DataProfileCustomisationsState>) {
  return state$.select(s => s.avatarClothes);
}

export function getAvatarClothesAreLoaded(state$: Observable<DataProfileCustomisationsState>) {
  return state$.select(s => s.avatarClothesAreLoaded);
}

export function getBackgrounds(state$: Observable<DataProfileCustomisationsState>) {
  return state$.select(s => s.backgrounds);
}

export function getBackgroundsAreLoaded(state$: Observable<DataProfileCustomisationsState>) {
  return state$.select(s => s.backgroundsAreLoaded);
}
