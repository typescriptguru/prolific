import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response } from '@angular/http';
import { IHttpInterceptor } from '@covalent/http';
import * as _ from 'lodash'

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements IHttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  onRequest(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
    let authToken = this.authService.getAuthToken();

    if (!_.isEmpty(authToken)) {
      requestOptions.headers.set('x-access-token', 'JWT ' + authToken);
    }

    return requestOptions;
  }

  onResponseError(error: Response): Response {
    if (error.status === 401) {
      console.error('User is not authorised');
    }

    return error;
  }
}
