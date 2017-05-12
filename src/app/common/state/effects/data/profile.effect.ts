import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { AuthEndpoint, ProfileEndpoint } from '../../../endpoints';
import { NotificationService, LoaderService, ProfileService } from '../../../services';
import * as authActions from '../../actions/data/auth.actions';
import * as profileActions from '../../actions/data/profile.actions';

@Injectable()
export class ProfileEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private profileEndpoint: ProfileEndpoint,
    private authEndpoint: AuthEndpoint,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private profileService: ProfileService
  ) {}

  @Effect() userIsLoaded$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOAD_USER_SUCCESS)
    .switchMap(({ payload }) => {
        return this.profileEndpoint.getProfileWithAvatar(payload.email)
          .map(profile => new profileActions.ProfileLoadProfileSuccessAction(profile))
          .catch(error => {
            if (error.status !== 404) {
              this.notificationService.error('Profile wasn\'t loaded');
            }

            return Observable.of(new profileActions.ProfileLoadProfileFailAction(error))
          })
      }
    );

  @Effect({ dispatch: false }) profileDoesnNotExist$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_LOAD_PROFILE_FAIL)
    .do(({ payload }) => {
        // TODO: turn it on
        // if (payload.status === 404) {
          this.router.navigate(['/registration']);
        // }
      }
    );

  @Effect() createProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_CREATE_PROFILE)
    .switchMap(({ payload }) => {
        const createProfile$ = this.profileEndpoint.createProfile(payload);

        this.loaderService.addPromise(createProfile$.toPromise());

        return createProfile$
          .map(profile => new profileActions.ProfileCreateProfileSuccessAction(profile))
          .catch(() => {
            this.notificationService.error('Profile wasn\'t saved');

            return Observable.of(new profileActions.ProfileCreateProfileFailAction())
          });
      }
    );

  @Effect({ dispatch: false }) createProfileSuccess$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_CREATE_PROFILE_SUCCESS)
    .do(({ payload }) => {
      this.router.navigate(['/profile', payload.username]);
    });

  @Effect() updateProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_UPDATE_PROFILE)
    .switchMap(({ payload }) => {
      return this.profileService.profileAfterLoaded$
        .switchMap((profile) => {
          return this.profileEndpoint.updateProfile(_.assign({}, profile, payload))
            .map(profile => new profileActions.ProfileUpdateProfileSuccessAction(profile))
            .catch(() => {
              this.notificationService.error('Profile wasn\'t updated');

              return Observable.of(new profileActions.ProfileUpdateProfileFailAction());
            });
        });
    });

  @Effect() setProfileUpdating$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_UPDATE_PROFILE)
    .map(() => new profileActions.ProfileSetProfileUpdatingAction(true));

  @Effect() profileUpdateSuccess$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_UPDATE_PROFILE_SUCCESS)
    .map(() => new profileActions.ProfileSetProfileUpdatingAction(false));

  @Effect() profileUpdateFail$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_UPDATE_PROFILE_FAIL)
    .do(() => this.notificationService.error('Profile wasn\'t loaded'))
    .map(() => new profileActions.ProfileSetProfileUpdatingAction(false));

  @Effect() profileUpdateAvatarAction$: Observable<Action> = this.actions$
    .ofType(profileActions.ProfileActionTypes.PROFILE_UPDATE_AVATAR)
    .switchMap(({ payload }) => {
      return this.profileService.profileAfterLoaded$
        .map(profile => {
          return new profileActions.ProfileUpdateProfileAction(_.assign({}, profile, {
            userAvatar: _.assign({}, profile.userAvatar, payload)
          }));
        });
    });
}
