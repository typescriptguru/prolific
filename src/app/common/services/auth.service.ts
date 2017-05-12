import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { COOKIE_AUTH } from '../config';
import { ApplicationState } from '../state';
import * as authActions from '../state/actions/data/auth.actions';

@Injectable()
export class AuthService {
  public openLoginPopupSubject: Subject<any> = new Subject();
  public closeLoginPopupSubject: Subject<any> = new Subject();

  constructor(private store: Store<ApplicationState>) {}

  openLoginPopup() {
    this.openLoginPopupSubject.next();
  }

  closeLoginPopup() {
    this.closeLoginPopupSubject.next();
  }

  login(credentials) {
    this.store.dispatch(new authActions.AuthLoginAction(credentials));
  }

  getAuthToken(): string {
    return Cookie.get(COOKIE_AUTH);
  }

  initialCheckToken(): string {
    return this.getAuthToken();
  }

  removeAuthToken(): void {
    Cookie.delete(COOKIE_AUTH);
  }

  putTokenToStorage(token, days = 365): void {
    Cookie.set(COOKIE_AUTH, token, days);
  }

  logout() {
    this.removeAuthToken();
    this.store.dispatch(new authActions.AuthCleanAction());
  }
}
