import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as nutritionsActions from '../../actions/data/nutritions.actions';

export interface DataNutritionsState {
  nutritions: any[];
  nutritionsAreLoaded: boolean;
  nutritionsAreLoading: boolean;
  nutritionIsCreating: boolean;
}

const initialState: DataNutritionsState = {
  nutritions: [],
  nutritionsAreLoaded: false,
  nutritionsAreLoading: false,
  nutritionIsCreating: false,
};

export function NutritionsReducer(state = initialState, action: Action): DataNutritionsState {
  switch (action.type) {
    case nutritionsActions.NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS_SUCCESS: {
      return Object.assign({}, state, {
        nutritions: action.payload,
        nutritionsAreLoaded: true
      });
    }

    case nutritionsActions.NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION_SUCCESS: {
      return Object.assign({}, state, {
        nutritions: [...state.nutritions, ...action.payload]
      });
    }

    case nutritionsActions.NutritionsActionTypes.NUTRITIONS_SET_NUTRITIONS_LOADING: {
      return Object.assign({}, state, {
        nutritionsAreLoading: action.payload
      });
    }

    case nutritionsActions.NutritionsActionTypes.NUTRITIONS_SET_NUTRITION_CREATING: {
      return Object.assign({}, state, {
        nutritionIsCreating: action.payload
      });
    }

    case nutritionsActions.NutritionsActionTypes.NUTRITIONS_CLEAN: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getNutritions(state$: Observable<DataNutritionsState>) {
  return state$.select(s => s.nutritions);
}

export function getNutritionsAreLoaded(state$: Observable<DataNutritionsState>) {
  return state$.select(s => s.nutritionsAreLoaded);
}

export function getNutritionsAreLoading(state$: Observable<DataNutritionsState>) {
  return state$.select(s => s.nutritionsAreLoading);
}

export function getNutritionIsCreating(state$: Observable<DataNutritionsState>) {
  return state$.select(s => s.nutritionIsCreating);
}
