import { Component } from '@angular/core';

import { AuthService, UserService, ProfileService } from '../../services';

@Component({
  selector: 'common-header',
  templateUrl: './common.header.component.html'
})
export class CommonHeaderComponent {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public profileService: ProfileService,
  ) {}
}
