import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { AuthService, NotificationService } from '../../../services';
import { ApplicationState } from '../../../state';
import { UserEndpoint, AuthEndpoint } from '../../../endpoints';
import { UserType } from '../../../types';
import * as authActions from '../../actions/data/auth.actions';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userEndpoint: UserEndpoint,
    private authEndpoint: AuthEndpoint,
    private router: Router,
    private store: Store<ApplicationState>,
    private notificationService: NotificationService
  ) {
    this.store.dispatch(new authActions.AuthCheckInitialStateAction());
  }

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_INITIAL_STATE)
    .map(({ payload }) => this.authService.initialCheckToken())
    .map(token => !_.isEmpty(token) ? new authActions.AuthCheckHasTokenAction(token) : new authActions.AuthCheckHasNoTokenAction());

  @Effect() appHasToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_HAS_TOKEN)
    .map(({ payload }) => new authActions.AuthLoadUserAction(payload));

  @Effect() loadUserIfThereIsToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOAD_USER)
    .switchMap(() => {
        return this.userEndpoint.getCurrentUser()
          .map((user: UserType) => new authActions.AuthLoadUserSuccessAction(user))
          .catch(error => Observable.of(new authActions.AuthLoadUserFailAction()))
      }
    );

  @Effect({ dispatch: false }) appHasNoToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_HAS_NO_TOKEN)
    .do(() => console.log('EVENT_USER_IS_NOT_AUTHORISED'));

  @Effect() userLoadFail$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOAD_USER_FAIL)
    .map(() => new authActions.AuthCleanAction());

  @Effect() setToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_SET_TOKEN)
    .do(({ payload }) => this.authService.putTokenToStorage(payload, 365));

  @Effect({ dispatch: false }) authClean$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CLEAN)
    .do(() => {
      this.authService.removeAuthToken();
      this.router.navigate(['/']);
    });

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOGIN)
    .switchMap(({ payload }) => {
        return this.authEndpoint.login(payload)
          .map(user => new authActions.AuthLoginSuccessAction(user))
          .catch(error => Observable.of(new authActions.AuthLoginFailAction(error.json())))
      }
    );

  @Effect({ dispatch: false }) loginSuccess$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOGIN_SUCCESS)
    .do(({ payload }) => {
      this.authService.putTokenToStorage(payload.dailyKey, 365);
      this.router.navigate(['']);
    });

  @Effect({ dispatch: false }) loginFails$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOGIN_FAIL)
    .do(({ payload }) => this.notificationService.error(payload.message, 'Can\'t login'));
}
