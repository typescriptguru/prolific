import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActivitiesEndpoint } from '../../../endpoints';
import { NotificationService } from '../../../services';
import * as activitiesActions from '../../actions/data/activities.actions';
import * as profileActions from '../../actions/data/profile.actions';

@Injectable()
export class ActivitiesEffect {
  constructor(
    private actions$: Actions,
    private activitiesEndpoint: ActivitiesEndpoint,
    private notificationService: NotificationService
  ) {}

  @Effect() loadActivitiesAfterProfileAreLoaded$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_LOAD_PROFILE_SUCCESS)
    .map(() => new activitiesActions.ActivitiesLoadActivitiesAction());

  @Effect() loadActivities$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES)
    .switchMap(() => {
        return this.activitiesEndpoint.loadActivities()
          .map((activities) => new activitiesActions.ActivitiesLoadActivitiesSuccessAction(activities))
          .catch(() => Observable.of(new activitiesActions.ActivitiesLoadActivitiesFailAction()))
      }
    );

  @Effect() setActivitiesLoading$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES)
    .map(() => new activitiesActions.ActivitiesSetActivitiesLoadingAction(true));

  @Effect() activitiesLoadSuccess$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES_SUCCESS)
    .map(() => new activitiesActions.ActivitiesSetActivitiesLoadingAction(false));

  @Effect() activitiesLoadFail$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_LOAD_ACTIVITIES_FAIL)
    .do(() => this.notificationService.error('Activities weren\'t loaded'))
    .map(() => new activitiesActions.ActivitiesSetActivitiesLoadingAction(false));

  @Effect() createActivity$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY)
    .switchMap(({ payload }) => {
        return this.activitiesEndpoint.createActivity(payload)
          .map((activity) => new activitiesActions.ActivitiesCreateActivitySuccessAction(activity))
          .catch(() => Observable.of(new activitiesActions.ActivitiesCreateActivityFailAction()))
      }
    );

  @Effect() setActivityCreating$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY)
    .map(() => new activitiesActions.ActivitiesSetActivityCreatingAction(true));

  @Effect() activitiyCreateSuccess$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY_SUCCESS)
    .map(() => new activitiesActions.ActivitiesSetActivitiesLoadingAction(false));

  @Effect() activityCreateFail$: Observable<Action> = this.actions$
    .ofType(activitiesActions.ActivitiesActionTypes.ACTIVITIES_CREATE_ACTIVITY_FAIL)
    .do(() => this.notificationService.error('Activities wasn\'t created'))
    .map(() => new activitiesActions.ActivitiesSetActivitiesLoadingAction(false));
}
