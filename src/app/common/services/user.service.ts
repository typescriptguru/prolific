import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState, getUserSelector } from '../state';
import { UserType } from '../types';

@Injectable()
export class UserService {
  user$: Observable<UserType> = this.store.let(getUserSelector);

  constructor(private store: Store<ApplicationState>) {}
}
