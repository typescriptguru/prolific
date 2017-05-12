import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { API_BASE_URL } from '../config';


@Injectable()
export class AuthEndpoint {
  constructor(private http: Http) {}

  login(credentials) {
    return this.http.post(
      API_BASE_URL + '/authorize/login',
      credentials
    )
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }
}
