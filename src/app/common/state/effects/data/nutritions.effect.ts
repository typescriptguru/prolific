import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NutritionsEndpoint } from '../../../endpoints';
import { NotificationService } from '../../../services';
import * as nutritionsActions from '../../actions/data/nutritions.actions';
import * as profileActions from '../../actions/data/profile.actions';

@Injectable()
export class NutritionsEffect {
  constructor(
    private actions$: Actions,
    private nutritionsEndpoint: NutritionsEndpoint,
    private notificationService: NotificationService
  ) {}

  @Effect() loadNutritionsAfterProfileAreLoaded$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_LOAD_PROFILE_SUCCESS)
    .map(() => new nutritionsActions.NutritionsLoadNutritionsAction());

  @Effect() loadNutritions$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS)
    .switchMap(() => {
        return this.nutritionsEndpoint.loadUserNutritions()
          .map((nutritions) => new nutritionsActions.NutritionsLoadNutritionsSuccessAction(nutritions))
          .catch(() => Observable.of(new nutritionsActions.NutritionsLoadNutritionsFailAction()))
      }
    );

  @Effect() setNutritionsLoading$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS)
    .map(() => new nutritionsActions.NutritionsSetNutritionsLoadingAction(true));

  @Effect() nutritionsLoadSuccess$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS_SUCCESS)
    .map(() => new nutritionsActions.NutritionsSetNutritionsLoadingAction(false));

  @Effect() nutritionsLoadFail$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_LOAD_NUTRITIONS_FAIL)
    .do(() => this.notificationService.error('Nutritions weren\'t loaded'))
    .map(() => new nutritionsActions.NutritionsSetNutritionsLoadingAction(false));

  @Effect() createNutrition$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION)
    .switchMap(({ payload }) => {
        return this.nutritionsEndpoint.createNutrition(payload)
          .map((nutrition) => new nutritionsActions.NutritionsCreateNutritionSuccessAction(nutrition))
          .catch(() => Observable.of(new nutritionsActions.NutritionsCreateNutritionFailAction()))
      }
    );

  @Effect() setNutritionCreating$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION)
    .map(() => new nutritionsActions.NutritionsSetNutritionCreatingAction(true));

  @Effect() activitiyCreateSuccess$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION_SUCCESS)
    .map(() => new nutritionsActions.NutritionsSetNutritionCreatingAction(false));

  @Effect() nutritionCreateFail$: Observable<Action> = this.actions$
    .ofType(nutritionsActions.NutritionsActionTypes.NUTRITIONS_CREATE_NUTRITION_FAIL)
    .do(() => this.notificationService.error('Nutritions wasn\'t created'))
    .map(() => new nutritionsActions.NutritionsSetNutritionCreatingAction(false));
}
