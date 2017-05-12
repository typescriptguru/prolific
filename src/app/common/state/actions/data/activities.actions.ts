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
export const ActivitiesActionTypes = {
  ACTIVITIES_LOAD_ACTIVITIES: type('ACTIVITIES_LOAD_ACTIVITIES'),
  ACTIVITIES_LOAD_ACTIVITIES_SUCCESS: type('ACTIVITIES_LOAD_ACTIVITIES_SUCCESS'),
  ACTIVITIES_LOAD_ACTIVITIES_FAIL: type('ACTIVITIES_LOAD_ACTIVITIES_FAIL'),
  ACTIVITIES_SET_ACTIVITIES_LOADING: type('ACTIVITIES_SET_ACTIVITIES_LOADING'),
  ACTIVITIES_CREATE_ACTIVITY: type('ACTIVITIES_CREATE_ACTIVITY'),
  ACTIVITIES_CREATE_ACTIVITY_SUCCESS: type('ACTIVITIES_CREATE_ACTIVITY_SUCCESS'),
  ACTIVITIES_CREATE_ACTIVITY_FAIL: type('ACTIVITIES_CREATE_ACTIVITY_FAIL'),
  ACTIVITIES_SET_ACTIVITY_CREATING: type('ACTIVITIES_SET_ACTIVITY_CREATING'),
  ACTIVITIES_CLEAN: type('ACTIVITIES_CLEAN')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ActivitiesLoadActivitiesAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES;

  constructor() { }
}

export class ActivitiesLoadActivitiesSuccessAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES_SUCCESS;

  constructor(public payload: any[]) { }
}

export class ActivitiesLoadActivitiesFailAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES_FAIL;

  constructor() { }
}

export class ActivitiesSetActivitiesLoadingAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_SET_ACTIVITIES_LOADING;

  constructor(public payload: boolean) { }
}

export class ActivitiesCreateActivityAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY;

  constructor(public payload: any) { }
}

export class ActivitiesCreateActivitySuccessAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY_SUCCESS;

  constructor(public payload: any) { }
}

export class ActivitiesCreateActivityFailAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY_FAIL;

  constructor() { }
}

export class ActivitiesSetActivityCreatingAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_SET_ACTIVITY_CREATING;

  constructor(public payload: boolean) { }
}

export class ActivitiesCleanAction implements Action {
  type = ActivitiesActionTypes.ACTIVITIES_CLEAN;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActivitiesActions = [
  ActivitiesLoadActivitiesAction,
  ActivitiesLoadActivitiesSuccessAction,
  ActivitiesLoadActivitiesFailAction,
  ActivitiesSetActivitiesLoadingAction,
  ActivitiesCreateActivityAction,
  ActivitiesCreateActivitySuccessAction,
  ActivitiesCreateActivityFailAction,
  ActivitiesSetActivityCreatingAction,
  ActivitiesCleanAction
];
