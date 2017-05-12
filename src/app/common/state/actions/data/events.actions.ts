import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { EventType } from '../../../types/event.type';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const EventsActionTypes = {
  EVENTS_LOAD_EVENTS: type('EVENTS_LOAD_EVENTS'),
  EVENTS_LOAD_EVENTS_SUCCESS: type('EVENTS_LOAD_EVENTS_SUCCESS'),
  EVENTS_LOAD_EVENTS_FAIL: type('EVENTS_LOAD_EVENTS_FAIL'),
  EVENTS_SET_EVENTS_LOADING: type('EVENTS_SET_EVENTS_LOADING'),
  EVENTS_CREATE_EVENT: type('EVENTS_CREATE_EVENT'),
  EVENTS_CREATE_EVENT_SUCCESS: type('EVENTS_CREATE_EVENT_SUCCESS'),
  EVENTS_CREATE_EVENT_FAIL: type('EVENTS_CREATE_EVENT_FAIL'),
  EVENTS_SET_EVENT_CREATING: type('EVENTS_SET_EVENT_CREATING'),
  EVENTS_CLEAN: type('EVENTS_CLEAN')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class EventsLoadEventsAction implements Action {
  type = EventsActionTypes.EVENTS_LOAD_EVENTS;

  constructor() { }
}

export class EventsLoadEventsSuccessAction implements Action {
  type = EventsActionTypes.EVENTS_LOAD_EVENTS_SUCCESS;

  constructor(public payload: EventType[]) { }
}

export class EventsLoadEventsFailAction implements Action {
  type = EventsActionTypes.EVENTS_LOAD_EVENTS_FAIL;

  constructor() { }
}

export class EventsSetEventsLoadingAction implements Action {
  type = EventsActionTypes.EVENTS_SET_EVENTS_LOADING;

  constructor(public payload: boolean) { }
}

export class EventsCreateEventAction implements Action {
  type = EventsActionTypes.EVENTS_CREATE_EVENT;

  constructor(public payload: EventType) { }
}

export class EventsCreateEventSuccessAction implements Action {
  type = EventsActionTypes.EVENTS_CREATE_EVENT_SUCCESS;

  constructor(public payload: EventType) { }
}

export class EventsCreateEventFailAction implements Action {
  type = EventsActionTypes.EVENTS_CREATE_EVENT_FAIL;

  constructor() { }
}

export class EventsSetEventCreatingAction implements Action {
  type = EventsActionTypes.EVENTS_SET_EVENT_CREATING;

  constructor(public payload: boolean) { }
}

export class EventsCleanAction implements Action {
  type = EventsActionTypes.EVENTS_CLEAN;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EventsActions = [
  EventsLoadEventsAction,
  EventsLoadEventsSuccessAction,
  EventsLoadEventsFailAction,
  EventsSetEventsLoadingAction,
  EventsCreateEventAction,
  EventsCreateEventSuccessAction,
  EventsCreateEventFailAction,
  EventsSetEventCreatingAction,
  EventsCleanAction
];
