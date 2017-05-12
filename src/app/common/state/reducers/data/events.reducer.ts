import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as eventsActions from '../../actions/data/events.actions';
import { EventType } from '../../../types/event.type';

export interface DataEventsState {
  events: EventType[];
  eventsAreLoaded: boolean;
  eventsAreLoading: boolean;
  activityIsCreating: boolean;
}

const initialState: DataEventsState = {
  events: [],
  eventsAreLoaded: false,
  eventsAreLoading: false,
  activityIsCreating: false,
};

export function EventsReducer(state = initialState, action: Action): DataEventsState {
  switch (action.type) {
    case eventsActions.EventsActionTypes.EVENTS_LOAD_EVENTS_SUCCESS: {
      return Object.assign({}, state, {
        events: action.payload,
        eventsAreLoaded: true
      });
    }

    case eventsActions.EventsActionTypes.EVENTS_CREATE_EVENT_SUCCESS: {
      return Object.assign({}, state, {
        events: [...state.events, ...action.payload]
      });
    }

    case eventsActions.EventsActionTypes.EVENTS_SET_EVENTS_LOADING: {
      return Object.assign({}, state, {
        eventsAreLoading: action.payload
      });
    }

    case eventsActions.EventsActionTypes.EVENTS_SET_EVENT_CREATING: {
      return Object.assign({}, state, {
        activityIsCreating: action.payload
      });
    }

    case eventsActions.EventsActionTypes.EVENTS_CLEAN: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}

export function getEvents(state$: Observable<DataEventsState>) {
  return state$.select(s => s.events);
}

export function getEventsAreLoaded(state$: Observable<DataEventsState>) {
  return state$.select(s => s.eventsAreLoaded);
}

export function getEventsAreLoading(state$: Observable<DataEventsState>) {
  return state$.select(s => s.eventsAreLoading);
}

export function getEventIsCreating(state$: Observable<DataEventsState>) {
  return state$.select(s => s.activityIsCreating);
}
