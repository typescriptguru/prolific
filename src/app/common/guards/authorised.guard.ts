import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as _ from 'lodash';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    if (_.isEmpty(this.authService.getAuthToken())) {
      this.router.navigate(['/']);

      return false;
    }

    return true;
  }
}
