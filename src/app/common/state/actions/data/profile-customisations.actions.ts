import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ProfileCustomisationsActionTypes = {
  PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES: type('PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES'),
  PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_SUCCESS: type('PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_SUCCESS'),
  PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_FAIL: type('PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_FAIL'),
  PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS: type('PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS'),
  PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_SUCCESS: type('PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_SUCCESS'),
  PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_FAIL: type('PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_FAIL'),
  PROFILE_CUSTOMISATIONS_CLEAN: type('AVATAR_CLOTHES_CLEAN')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class ProfileCustomisationsLoadAvatarClothesAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES;

  constructor() { }
}

export class ProfileCustomisationsLoadAvatarClothesSuccessAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_SUCCESS;

  constructor(public payload: any) { }
}

export class ProfileCustomisationsLoadAvatarClothesFailAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_AVATAR_CLOTHES_FAIL;

  constructor() { }
}

export class ProfileCustomisationsLoadBackgroundsAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS;

  constructor() { }
}

export class ProfileCustomisationsLoadBackgroundsSuccessAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_SUCCESS;

  constructor(public payload: any) { }
}

export class ProfileCustomisationsLoadBackgroundsFailAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_LOAD_BACKGROUNDS_FAIL;

  constructor() { }
}

export class ProfileCustomisationsCleanAction implements Action {
  type = ProfileCustomisationsActionTypes.PROFILE_CUSTOMISATIONS_CLEAN;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProfileCustomisationsActions = [
  ProfileCustomisationsLoadAvatarClothesAction,
  ProfileCustomisationsLoadAvatarClothesSuccessAction,
  ProfileCustomisationsLoadAvatarClothesFailAction,
  ProfileCustomisationsLoadBackgroundsAction,
  ProfileCustomisationsLoadBackgroundsSuccessAction,
  ProfileCustomisationsLoadBackgroundsFailAction,
  ProfileCustomisationsCleanAction
];
