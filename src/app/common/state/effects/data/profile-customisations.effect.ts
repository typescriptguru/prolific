import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProfileCustomizationsEndpoint } from '../../../endpoints';
import { NotificationService, LoaderService } from '../../../services';
import * as profileCustomisationsActions from '../../actions/data/profile-customisations.actions';
import * as authActions from '../../actions/data/auth.actions';

@Injectable()
export class ProfileCustomisationsEffect {
  constructor(
    private actions$: Actions,
    private profileCustomizationsEndpoint: ProfileCustomizationsEndpoint,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  @Effect() loadAvatarCustomisationsOnUserLoaded$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_INITIAL_STATE)
    .switchMap(() => {
      const loadAvatarClothes$ = this.profileCustomizationsEndpoint.loadAvatarClothes();
      this.loaderService.addPromise(loadAvatarClothes$.toPromise());

      return loadAvatarClothes$
        .map(clothes => new profileCustomisationsActions.ProfileCustomisationsLoadAvatarClothesSuccessAction(clothes))
        .catch(() => {
          this.notificationService.error('Avatar clothes weren\'t loaded');

          return Observable.of(new profileCustomisationsActions.ProfileCustomisationsLoadAvatarClothesFailAction())
        });
      }
    );

  @Effect() loadbackgroundsOnUserLoaded: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_INITIAL_STATE)
    .switchMap(() => {
      const loadBackgrounds$ = this.profileCustomizationsEndpoint.loadBackgrounds();
      this.loaderService.addPromise(loadBackgrounds$.toPromise());

      return loadBackgrounds$
        .map(clothes => new profileCustomisationsActions.ProfileCustomisationsLoadBackgroundsSuccessAction(clothes))
        .catch(() => {
          this.notificationService.error('Backgrounds weren\'t loaded');

          return Observable.of(new profileCustomisationsActions.ProfileCustomisationsLoadBackgroundsFailAction())
        });
      }
    );
}
