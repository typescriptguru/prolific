import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ApplicationState,
  getActivitiesSelector,
  getActivitiesAreLoadedSelector,
  getActivitiesAreLoadingSelector,
  getActivityIsCreatingSelector
} from '../state';

import * as activitiesActions from '../state/actions/data/activities.actions';

@Injectable()
export class ActivitiesService {
  activities$: Observable<any> = this.store.let(getActivitiesSelector);
  activitiesAreLoading$: Observable<any> = this.store.let(getActivitiesAreLoadingSelector);
  activityIsCreating$: Observable<any> = this.store.let(getActivityIsCreatingSelector);

  activitiesAfterLoaded$: Observable<any> = this.store.let(getActivitiesAreLoadedSelector)
    .filter(loaded => loaded)
    .switchMapTo(this.activities$);

  constructor(private store: Store<ApplicationState>) {}

  loadActivities() {
    this.store.dispatch(new activitiesActions.ActivitiesLoadActivitiesAction());
  }

  createActivity(data) {
    this.store.dispatch(new activitiesActions.ActivitiesCreateActivityAction(data));
  }
}
