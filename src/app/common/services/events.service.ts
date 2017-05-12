import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ApplicationState,
  getEventsSelector,
  getEventsAreLoadedSelector,
  getEventsAreLoadingSelector,
  getEventIsCreatingSelector
} from '../state';

import { EventType } from '../types';

import * as eventsActions from '../state/actions/data/events.actions';

@Injectable()
export class EventsService {
  events$: Observable<EventType[]> = this.store.let(getEventsSelector);
  eventsAreLoading$: Observable<boolean> = this.store.let(getEventsAreLoadingSelector);
  activityIsCreating$: Observable<boolean> = this.store.let(getEventIsCreatingSelector);

  eventsAfterLoaded$: Observable<EventType[]> = this.store.let(getEventsAreLoadedSelector)
    .filter(loaded => loaded)
    .switchMapTo(this.events$);

  constructor(private store: Store<ApplicationState>) {}

  loadEvents() {
    this.store.dispatch(new eventsActions.EventsLoadEventsAction());
  }

  createEvent(data) {
    this.store.dispatch(new eventsActions.EventsCreateEventAction(data));
  }
}
