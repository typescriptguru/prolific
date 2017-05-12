import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { NutritionType } from '../../../types'

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const NutritionsActionTypes = {
  NUTRITIONS_LOAD_NUTRITIONS: type('NUTRITIONS_LOAD_NUTRITIONS'),
  NUTRITIONS_LOAD_NUTRITIONS_SUCCESS: type('NUTRITIONS_LOAD_NUTRITIONS_SUCCESS'),
  NUTRITIONS_LOAD_NUTRITIONS_FAIL: type('NUTRITIONS_LOAD_NUTRITIONS_FAIL'),
  NUTRITIONS_SET_NUTRITIONS_LOADING: type('NUTRITIONS_SET_NUTRITIONS_LOADING'),
  NUTRITIONS_CREATE_NUTRITION: type('NUTRITIONS_CREATE_NUTRITION'),
  NUTRITIONS_CREATE_NUTRITION_SUCCESS: type('NUTRITIONS_CREATE_NUTRITION_SUCCESS'),
  NUTRITIONS_CREATE_NUTRITION_FAIL: type('NUTRITIONS_CREATE_NUTRITION_FAIL'),
  NUTRITIONS_SET_NUTRITION_CREATING: type('NUTRITIONS_SET_NUTRITION_CREATING'),
  NUTRITIONS_CLEAN: type('NUTRITIONS_CLEAN')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class NutritionsLoadNutritionsAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS;

  constructor() { }
}

export class NutritionsLoadNutritionsSuccessAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS_SUCCESS;

  constructor(public payload: NutritionType[]) { }
}

export class NutritionsLoadNutritionsFailAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS_FAIL;

  constructor() { }
}

export class NutritionsSetNutritionsLoadingAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_SET_NUTRITIONS_LOADING;

  constructor(public payload: boolean) { }
}

export class NutritionsCreateNutritionAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION;

  constructor(public payload: NutritionType) { }
}

export class NutritionsCreateNutritionSuccessAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION_SUCCESS;

  constructor(public payload: NutritionType) { }
}

export class NutritionsCreateNutritionFailAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION_FAIL;

  constructor() { }
}

export class NutritionsSetNutritionCreatingAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_SET_NUTRITION_CREATING;

  constructor(public payload: boolean) { }
}

export class NutritionsCleanAction implements Action {
  type = NutritionsActionTypes.NUTRITIONS_CLEAN;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type NutritionsActions = [
  NutritionsLoadNutritionsAction,
  NutritionsLoadNutritionsSuccessAction,
  NutritionsLoadNutritionsFailAction,
  NutritionsSetNutritionsLoadingAction,
  NutritionsCreateNutritionAction,
  NutritionsCreateNutritionSuccessAction,
  NutritionsCreateNutritionFailAction,
  NutritionsSetNutritionCreatingAction,
  NutritionsCleanAction
];
