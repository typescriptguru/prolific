import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import {
  ApplicationState,
  getNutritionsSelector,
  getNutritionsAreLoadedSelector,
  getNutritionsAreLoadingSelector,
  getNutritionIsCreatingSelector
} from '../state';

import { NutritionType } from '../types';

import * as nutritionsActions from '../state/actions/data/nutritions.actions';

@Injectable()
export class NutritionsService {
  nutritions$: Observable<NutritionType[]> = this.store.let(getNutritionsSelector)
    .map((data: any[]) => _.flatten(_.map(data, item => item.nutritionObject.hits)));

  nutritionsAreLoading$: Observable<boolean> = this.store.let(getNutritionsAreLoadingSelector);
  nutritionIsCreating$: Observable<boolean> = this.store.let(getNutritionIsCreatingSelector);

  nutritionsAfterLoaded$: Observable<NutritionType[]> = this.store.let(getNutritionsAreLoadedSelector)
    .filter(loaded => loaded)
    .switchMapTo(this.nutritions$);

  constructor(private store: Store<ApplicationState>) {}

  loadNutritions() {
    this.store.dispatch(new nutritionsActions.NutritionsLoadNutritionsAction());
  }

  createNutrition(data: NutritionType) {
    this.store.dispatch(new nutritionsActions.NutritionsCreateNutritionAction(data));
  }
}
