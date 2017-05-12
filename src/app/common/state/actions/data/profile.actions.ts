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
export const ProfileActionTypes = {
  PROFILE_LOAD_PROFILE: type('PROFILE_LOAD_PROFILE'),
  PROFILE_LOAD_PROFILE_SUCCESS: type('PROFILE_LOAD_PROFILE_SUCCESS'),
  PROFILE_LOAD_PROFILE_FAIL: type('PROFILE_LOAD_PROFILE_FAIL'),
  PROFILE_SET_PROFILE_LOADING: type('PROFILE_SET_PROFILE_LOADING'),
  PROFILE_CREATE_PROFILE: type('PROFILE_CREATE_PROFILE'),
  PROFILE_CREATE_PROFILE_SUCCESS: type('PROFILE_CREATE_PROFILE_SUCCESS'),
  PROFILE_CREATE_PROFILE_FAIL: type('PROFILE_CREATE_PROFILE_FAIL'),
  PROFILE_SET_PROFILE_CREATING: type('PROFILE_SET_PROFILE_CREATING'),
  PROFILE_UPDATE_PROFILE: type('PROFILE_UPDATE_PROFILE'),
  PROFILE_UPDATE_PROFILE_SUCCESS: type('PROFILE_UPDATE_PROFILE_SUCCESS'),
  PROFILE_UPDATE_PROFILE_FAIL: type('PROFILE_UPDATE_PROFILE_FAIL'),
  PROFILE_UPDATE_AVATAR: type('PROFILE_UPDATE_AVATAR'),
  PROFILE_SET_PROFILE_UPDATING: type('PROFILE_SET_PROFILE_UPDATING'),
  PROFILE_CLEAN: type('PROFILE_CLEAN')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class ProfileLoadProfileAction implements Action {
  type = ProfileActionTypes.PROFILE_LOAD_PROFILE;

  constructor(public payload: string) { }
}

export class ProfileLoadProfileSuccessAction implements Action {
  type = ProfileActionTypes.PROFILE_LOAD_PROFILE_SUCCESS;

  constructor(public payload: any) { }
}

export class ProfileLoadProfileFailAction implements Action {
  type = ProfileActionTypes.PROFILE_LOAD_PROFILE_FAIL;

  constructor(public payload: any) { }
}

export class ProfileSetProfileLoadingAction implements Action {
  type = ProfileActionTypes.PROFILE_SET_PROFILE_LOADING;

  constructor(public payload: boolean) {}
}

export class ProfileCreateProfileAction implements Action {
  type = ProfileActionTypes.PROFILE_CREATE_PROFILE;

  constructor(public payload: string) { }
}

export class ProfileCreateProfileSuccessAction implements Action {
  type = ProfileActionTypes.PROFILE_CREATE_PROFILE_SUCCESS;

  constructor(public payload: any) { }
}

export class ProfileCreateProfileFailAction implements Action {
  type = ProfileActionTypes.PROFILE_CREATE_PROFILE_FAIL;

  constructor() { }
}

export class ProfileSetProfileCreatingAction implements Action {
  type = ProfileActionTypes.PROFILE_SET_PROFILE_CREATING;

  constructor(public payload: boolean) {}
}

export class ProfileUpdateProfileAction implements Action {
  type = ProfileActionTypes.PROFILE_UPDATE_PROFILE;

  constructor(public payload: any) {}
}

export class ProfileUpdateProfileSuccessAction implements Action {
  type = ProfileActionTypes.PROFILE_UPDATE_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

export class ProfileUpdateProfileFailAction implements Action {
  type = ProfileActionTypes.PROFILE_UPDATE_PROFILE_FAIL;

  constructor() {}
}

export class ProfileSetProfileUpdatingAction implements Action {
  type = ProfileActionTypes.PROFILE_SET_PROFILE_UPDATING;

  constructor(public payload: boolean) {}
}

export class ProfileUpdateAvatarAction implements Action {
  type = ProfileActionTypes.PROFILE_UPDATE_AVATAR;

  constructor(public payload: any) {}
}

export class ProfileCleanAction implements Action {
  type = ProfileActionTypes.PROFILE_CLEAN;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProfileActions = [
  ProfileLoadProfileAction,
  ProfileLoadProfileSuccessAction,
  ProfileLoadProfileFailAction,
  ProfileCreateProfileAction,
  ProfileSetProfileLoadingAction,
  ProfileCreateProfileSuccessAction,
  ProfileCreateProfileFailAction,
  ProfileSetProfileCreatingAction,
  ProfileUpdateProfileAction,
  ProfileUpdateProfileSuccessAction,
  ProfileUpdateProfileFailAction,
  ProfileSetProfileUpdatingAction,
  ProfileUpdateAvatarAction,
  ProfileCleanAction
];
