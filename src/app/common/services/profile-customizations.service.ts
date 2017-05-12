import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  ApplicationState,
  getAvatarClothesSelector,
  getAvatarClothesAreLoadedSelector,
  getBackgroundsSelector,
  getBackgroundsAreLoadedSelector
} from '../state';

import { AvatarClothes } from '../types';
import * as profileCustomisationsActions from '../state/actions/data/profile-customisations.actions';

@Injectable()
export class ProfileCustomizationsService {
  avatarClothes$: Observable<AvatarClothes[]> = this.store.let(getAvatarClothesSelector);

  avatarClothesAfterLoaded$: Observable<AvatarClothes[]> = this.store.let(getAvatarClothesAreLoadedSelector)
    .filter(loaded => loaded)
    .switchMapTo(this.avatarClothes$);

  backgrounds$: Observable<AvatarClothes[]> = this.store.let(getBackgroundsSelector);

  backgroundsAfterLoaded$: Observable<any[]> = this.store.let(getBackgroundsAreLoadedSelector)
    .filter(loaded => loaded)
    .switchMapTo(this.backgrounds$);

  constructor(private store: Store<ApplicationState>) {}

  loadAvatarClothes() {
    this.store.dispatch(new profileCustomisationsActions.ProfileCustomisationsLoadAvatarClothesAction());
  }
}
