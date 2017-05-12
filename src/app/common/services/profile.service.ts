import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState, getProfileSelector, getProfileIsLoadedSelector } from '../state';
import * as profileActions from '../state/actions/data/profile.actions';

@Injectable()
export class ProfileService {
  profile$: Observable<any> = this.store.let(getProfileSelector);

  profileAfterLoaded$: Observable<any> = this.store.let(getProfileIsLoadedSelector)
    .filter(loaded => loaded)
    .switchMapTo(this.profile$);

  username$: Observable<string> = this.profileAfterLoaded$.map((profile: any) => profile.username);

  constructor(private store: Store<ApplicationState>) {}

  createProfile(data) {
    this.store.dispatch(new profileActions.ProfileCreateProfileAction(data));
  }

  updateProfile(data) {
    this.store.dispatch(new profileActions.ProfileUpdateProfileAction(data))
  }

  updateAvatar(data) {
    this.store.dispatch(new profileActions.ProfileUpdateAvatarAction(data))
  }
}
