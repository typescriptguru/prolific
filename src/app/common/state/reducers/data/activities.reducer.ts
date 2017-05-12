import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as activitiesActions from '../../actions/data/activities.actions';

export interface DataActivitiesState {
  activities: any[];
  activitiesAreLoaded: boolean;
  activitiesAreLoading: boolean;
  activityIsCreating: boolean;
}

const initialState: DataActivitiesState = {
  activities: [],
  activitiesAreLoaded: false,
  activitiesAreLoading: false,
  activityIsCreating: false,
};

export function ActivitiesReducer(state = initialState, action: Action): DataActivitiesState {
  switch (action.type) {
    case activitiesActions.ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES_SUCCESS: {
      return Object.assign({}, state, {
        activities: action.payload,
        activitiesAreLoaded: true
      });
    }

    case activitiesActions.ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY_SUCCESS: {
      return Object.assign({}, state, {
        activities: [...state.activities, ...action.payload]
      });
    }

    case activitiesActions.ActivitiesActionTypes.ACTIVITIES_SET_ACTIVITIES_LOADING: {
      return Object.assign({}, state, {
        activitiesAreLoading: action.payload
      });
    }

    case activitiesActions.ActivitiesActionTypes.ACTIVITIES_SET_ACTIVITY_CREATING: {
      return Object.assign({}, state, {
        activityIsCreating: action.payload
      });
    }

    case activitiesActions.ActivitiesActionTypes.ACTIVITIES_CLEAN: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getActivities(state$: Observable<DataActivitiesState>) {
  return state$.select(s => s.activities);
}

export function getActivitiesAreLoaded(state$: Observable<DataActivitiesState>) {
  return state$.select(s => s.activitiesAreLoaded);
}

export function getActivitiesAreLoading(state$: Observable<DataActivitiesState>) {
  return state$.select(s => s.activitiesAreLoading);
}

export function getActivityIsCreating(state$: Observable<DataActivitiesState>) {
  return state$.select(s => s.activityIsCreating);
}
