import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EventsEndpoint } from '../../../endpoints';
import { NotificationService } from '../../../services';
import * as eventsActions from '../../actions/data/events.actions';
import * as profileActions from '../../actions/data/profile.actions';

@Injectable()
export class EventsEffect {
  constructor(
    private actions$: Actions,
    private eventsEndpoint: EventsEndpoint,
    private notificationService: NotificationService
  ) {}

  @Effect() loadEventsAfterProfileAreLoaded$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_LOAD_PROFILE_SUCCESS)
    .map(() => new eventsActions.EventsLoadEventsAction());

  @Effect() loadEvents$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_LOAD_EVENTS)
    .switchMap(() => {
        return this.eventsEndpoint.loadEvents()
          .map((events) => new eventsActions.EventsLoadEventsSuccessAction(events))
          .catch(() => Observable.of(new eventsActions.EventsLoadEventsFailAction()))
      }
    );

  @Effect() setEventsLoading$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_LOAD_EVENTS)
    .map(() => new eventsActions.EventsSetEventsLoadingAction(true));

  @Effect() eventsLoadSuccess$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_LOAD_EVENTS_SUCCESS)
    .map(() => new eventsActions.EventsSetEventsLoadingAction(false));

  @Effect() eventsLoadFail$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_LOAD_EVENTS_FAIL)
    .do(() => this.notificationService.error('Events weren\'t loaded'))
    .map(() => new eventsActions.EventsSetEventsLoadingAction(false));

  @Effect() createEvent$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_CREATE_EVENT)
    .switchMap(({ payload }) => {
        return this.eventsEndpoint.createEvent(payload)
          .map((activity) => new eventsActions.EventsCreateEventSuccessAction(activity))
          .catch(() => Observable.of(new eventsActions.EventsCreateEventFailAction()))
      }
    );

  @Effect() setEventCreating$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_CREATE_EVENT)
    .map(() => new eventsActions.EventsSetEventCreatingAction(true));

  @Effect() activitiyCreateSuccess$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_CREATE_EVENT_SUCCESS)
    .map(() => new eventsActions.EventsSetEventsLoadingAction(false));

  @Effect() activityCreateFail$: Observable<Action> = this.actions$
    .ofType(eventsActions.EventsActionTypes.EVENTS_CREATE_EVENT_FAIL)
    .do(() => this.notificationService.error('Events wasn\'t created'))
    .map(() => new eventsActions.EventsSetEventsLoadingAction(false));
}
