import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http'
import * as _ from 'lodash';

import { AuthService } from '../services/auth.service';
import { ProfileEndpoint } from '../endpoints/profile.endpoint';

const CHECK_UUID_API_URL = 'https://myprolific.auth0.com/tokeninfo';
const UPDATE_USER_URL: string = 'https://myprolific.auth0.com/api/v2/users/';
const GET_USER_URL: string = 'https://myprolific.auth0.com/api/v2/users/';

@Injectable()
export class UserEndpoint {
  constructor(
    private http: HttpInterceptorService,
    private nativeHttp: Http,
    private authService: AuthService,
    private profileEndpoint: ProfileEndpoint
  ) {}

  getCurrentUser() {
    return this.http.post(
      CHECK_UUID_API_URL,
      { id_token: this.authService.getAuthToken() }
    )
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  getCurrentUserWithProfile() {
    return this.getCurrentUser()
      .filter(user => !_.isEmpty(user))
      .flatMap(user => this.profileEndpoint.getProfileWithAvatar(user))
      .publishReplay(1)
      .refCount();
  }

  updateUser(userId, data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    headers.append('Authorization', 'Bearer ' + 123);

    return this.nativeHttp.patch(
      UPDATE_USER_URL + userId,
      _.assign({}, data, _.assign({}, {
          connection: 123,
          client_id: 123
        })
      ),
      { headers }
    )
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  private getUserLastLoginDate(userID) {
    let search = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/json' });

    search.set('fields', 'last_login');
    search.set('include_fields', 'true');
    headers.append('Authorization', 'Bearer ' + 123);

    return this.http.get(GET_USER_URL + userID, { search, headers })
      .map(res => res.json());
  }
}
